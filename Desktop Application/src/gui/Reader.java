/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui;

//import j.extentions.comm.*;
import java.io.InputStream;
import java.io.OutputStream;
import com.fazecast.jSerialComm.*;
import java.io.IOException;
import java.util.Scanner;  // Import the Scanner class
/**
 *
 * @author Madusha Shanaka
 */
public class Reader {
    int len = SerialPort.getCommPorts().length;
    SerialPort ports[] = SerialPort.getCommPorts();
    String out = "";
    char code[] = {'M','a','d','u','s','h','a'};
    String test() throws IOException{
        SerialPort port = ports[0];
        port.openPort();
     
        port.setComPortTimeouts(SerialPort.TIMEOUT_READ_SEMI_BLOCKING, 0, 0);
        
        OutputStream output = port.getOutputStream();
        for(int j=0;j<code.length;j++){
            int k = code[j];
            output.write(k);
        }
      
        InputStream in = port.getInputStream();
        in.skip(in.available());
        try
        {
           for (int j = 0; j < 8; ++j){
              //System.out.print((char)in.read());
              out = out+(char)in.read();
              in.close();
           }
        } catch (Exception e) { e.printStackTrace(); }
        port.closePort();
        //System.out.println(out);
        return out;
    }
}
