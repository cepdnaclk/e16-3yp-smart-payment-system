#include <Arduino.h>


/*
 *  Created by E/16/054 E/16/351 E/16/389
*/

#define SS_PIN D4
#define RST_PIN D3
#include <SPI.h>
#include <MFRC522.h>
#include <ArduinoJson.h>

//LCD monitor
#include <LiquidCrystal_I2C.h>
#include <Wire.h>

//Wifi
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#define SERVER_IP "192.168.43.27:3000"
#ifndef STASSID
#define STASSID "sathira"
#define STAPSK  "12345678"
#endif

//LCD monitor
LiquidCrystal_I2C lcd(0x27, 16, 2);

//Rfid
MFRC522 mfrc522(SS_PIN, RST_PIN);   // Create MFRC522 instance/object.
int variable = 0;
MFRC522::MIFARE_Key key;          //create a MIFARE_Key struct named 'key', which will hold the card information

//declared functions
int readBlock(int , byte []);
int writeBlock(int , byte []);
void lcd_init();
void wifi_init();

//this is the block number we will write into and then read.
int block=2;  

byte blockcontent[16] = {"sathiraBasnayak"};  //an array with 16 bytes to be written into one of the 64 card blocks is defined
//byte blockcontent[16] = {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0};  //all zeros. This can be used to delete a block.

//This array is used for reading out a block.

byte readbackblock[18];

void setup() 
{
 
  Serial.begin(9600);   // Initiate a serial communication
  SPI.begin();      // Initiate  SPI bus
  mfrc522.PCD_Init();   // Initiate MFRC522
  Serial.println  ();
  Serial.println("Welcome:");

  //lcd monitor
  lcd_init();
  
  //wifi 
  wifi_init();
  // Prepare the security key for the read and write functions.
  for (byte i = 0; i < 6; i++) {
    key.keyByte[i] = 0xFF;  //keyByte is defined in the "MIFARE_Key" 'struct' definition in the .h file of the library
  }
}

void loop() 


{
  //Serial.print("begin test");
  String tag ="";
  String id= "";

  // Look for new cards
  if ( ! mfrc522.PICC_IsNewCardPresent()) 
  {
    return;
  }
  // Select one of the cards
  if ( ! mfrc522.PICC_ReadCardSerial()) 
  {
    return;
  }
 
  //lcd monitor
  lcd.clear();
  lcd.print("UID tag:");
  lcd.setCursor(0,1);

  Serial.println();
  Serial.print(" UID tag :");
  

  

  //read the crad ID
  for (byte i = 0; i < mfrc522.uid.size; i++) 
  {
     id.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
     id.concat(String(mfrc522.uid.uidByte[i], HEX));
  }
  lcd.print(id);
  Serial.print(id);
  
  readBlock(block,readbackblock);
  
   Serial.print("read block: ");
   
   for (int j=0 ; j<16 ; j++)
   {
     tag.concat(String(readbackblock[j] < 0x10 ? " 0" : " "));
     tag.concat(String(readbackblock[j],HEX));
     //Serial.write(readbackblock[j]);
   }
   Serial.println("");
   Serial.println(tag);
   //tag = "73 61 74 68 69 72 61 12 a3 12 ds 12 34 12 as sd 12";
   if ((WiFi.status() == WL_CONNECTED)) {

    WiFiClient client;
    HTTPClient http;

    Serial.print("[HTTP] begin...\n");
    // configure traged server and url
    http.begin(client, "http://" SERVER_IP "/Id/"); //HTTP
    http.addHeader("Content-Type", "application/json");
    

    //creating the body of post request
    char JSON[150];
    sprintf(JSON, "{\"Card_id\": \"%s\",\"security\":\"%s\"}",id.c_str(),tag.c_str());
   

    Serial.print("[HTTP] POST...\n");
    // start connection and send HTTP header and body
   
   
    //sending the post request
    int httpCode = http.POST(JSON);
   
    // httpCode will be negative on error
    if (httpCode > 0) {
      // HTTP header has been send and Server response header has been handled
      Serial.printf("[HTTP] POST... code: %d\n", httpCode);

      // file found at server
      if (httpCode == HTTP_CODE_OK) {
        const String& payload = http.getString();
        Serial.println("received payload:\n<<");
        Serial.println(payload);
        StaticJsonDocument<50> doc; // <- a little more than 200 bytes in the stack
        deserializeJson(doc, payload);
        const char* reply = doc["msg"];
        lcd.clear();
        lcd.print(reply);
        Serial.println(">>");
      }
    } else {
      Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());
    }

    http.end();
     Serial.println("end");
  }

   
  
} 

//Read specific block
int readBlock(int blockNumber, byte arrayAddress[]) 
{
  int largestModulo4Number=blockNumber/4*4;
  int trailerBlock=largestModulo4Number+3;//determine trailer block for the sector

  //authentication of the desired block for access
  byte status = mfrc522.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, trailerBlock, &key, &(mfrc522.uid));

  if (status != MFRC522::STATUS_OK) {
         Serial.print("PCD_Authenticate() failed (read): ");
         //Serial.println(mfrc522.GetStatusCodeName(status));
         return 3;//return "3" as error message
  }

//reading a block
byte buffersize = 18;//we need to define a variable with the read buffer size, since the MIFARE_Read method below needs a pointer to the variable that contains the size... 
status = mfrc522.MIFARE_Read(blockNumber, arrayAddress, &buffersize);//&buffersize is a pointer to the buffersize variable; MIFARE_Read requires a pointer instead of just a number
  if (status != MFRC522::STATUS_OK) {
          Serial.print("MIFARE_read() failed: ");
         // Serial.println(mfrc522.GetStatusCodeName(status));
          return 4;//return "4" as error message
  }
  Serial.println("block was read");

   // Halt PICC
    mfrc522.PICC_HaltA();
    // Stop encryption on PCD
    mfrc522.PCD_StopCrypto1();
  return 0;  
}

//Write specific block    
int writeBlock(int blockNumber, byte arrayAddress[]) 
{
  //this makes sure that we only write into data blocks. Every 4th block is a trailer block for the access/security info.
  int largestModulo4Number=blockNumber/4*4;
  int trailerBlock=largestModulo4Number+3;//determine trailer block for the sector
  if (blockNumber > 2 && (blockNumber+1)%4 == 0){Serial.print(blockNumber);Serial.println(" is a trailer block:");return 2;}
  Serial.print(blockNumber);
  Serial.println(" is a data block:");
  
  //authentication of the desired block for access
  byte status = mfrc522.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, trailerBlock, &key, &(mfrc522.uid));
  if (status != MFRC522::STATUS_OK) {
         Serial.print("PCD_Authenticate() failed: ");
        // Serial.println(mfrc522.GetStatusCodeName(status));
         return 3;//return "3" as error message
  }
  
  //writing the block 
  status = mfrc522.MIFARE_Write(blockNumber, arrayAddress, 16);
  //status = mfrc522.MIFARE_Write(9, value1Block, 16);
  if (status != MFRC522::STATUS_OK) {
           Serial.print("MIFARE_Write() failed: ");
          // Serial.println(mfrc522.GetStatusCodeName(status));
           return 4;//return "4" as error message
  }
  Serial.println("block was written");
  return 0;
}

void lcd_init(){
  Wire.begin(D2, D1);
  lcd.init();
  lcd.init();
  lcd.backlight();
  lcd.print("Show your card");
}

void wifi_init(){
   WiFi.begin(STASSID, STAPSK);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected! IP address: ");
  Serial.println(WiFi.localIP());
}