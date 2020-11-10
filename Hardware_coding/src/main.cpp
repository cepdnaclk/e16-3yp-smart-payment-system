#include <Arduino.h>

/*
 *  Created by Mostly Programing
 *  Subscribe to my Channel
 *  Do follow us on Facebook : @mostlyprograming
 *  Instagram: @viveksgarg
 *  Twitter: @ivivekkgarg
*/

#define SS_PIN D4
#define RST_PIN D3
#include <SPI.h>
#include <MFRC522.h>

//LCD monitor
#include <LiquidCrystal_I2C.h>
#include <Wire.h>
LiquidCrystal_I2C lcd(0x27, 16, 2);

MFRC522 mfrc522(SS_PIN, RST_PIN);   // Create MFRC522 instance/object.
int variable = 0;
void setup() 
{
  Serial.begin(9600);   // Initiate a serial communication
  SPI.begin();      // Initiate  SPI bus
  mfrc522.PCD_Init();   // Initiate MFRC522
  Serial.println("Show your card:");

   Wire.begin(D2, D1);
  lcd.init();
  lcd.init();
  lcd.backlight();
  lcd.print("Show your card");
}
void loop() 
{


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
  //Show UID on serial monitor
  Serial.println();
  lcd.clear();
  lcd.print("UID tag:");
  lcd.setCursor(0,1);
  Serial.print(" UID tag :");
  String content= "";
  byte letter;
  for (byte i = 0; i < mfrc522.uid.size; i++) 
  {
     Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
     Serial.print(mfrc522.uid.uidByte[i], HEX);
     lcd.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
     lcd.print(mfrc522.uid.uidByte[i], HEX);
     content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
     content.concat(String(mfrc522.uid.uidByte[i], HEX));
  }
  content.toUpperCase();
  Serial.println();
  delay(1000);
  // if (content.substring(1) == "07 93 88 B4") //change UID of the card that you want to give access
  // {
  //   Serial.println(" Authorized Access ");
  //   Serial.println(" Welcome to my channel Mostly Programing ");
  //   delay(1000);
  //   Serial.println(" Learn Programming and Coding Skills ");
  //   Serial.println();
  // }
  
  // else   {
  //   Serial.println(" Access Denied ");
  //   delay(3000);
  // }
} 