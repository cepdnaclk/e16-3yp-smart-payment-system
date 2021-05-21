/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package desktop.app;

import arduino.*;
import com.fazecast.jSerialComm.SerialPort;
import java.io.OutputStream;
 /*
 * @author Madusha Shanaka
 */
public class Writer {
   
    //char code[] = {'M','a','d','u','s','h','a'};
    void serialWrite(String security_tag){
       SerialPort port = ports[0];
        port.openPort();
     
        port.setComPortTimeouts(SerialPort.TIMEOUT_READ_SEMI_BLOCKING, 0, 0);
        
        OutputStream output = port.getOutputStream();
        output.write("M".getBytes());
        /*for(int j=0;j<code.length;j++){
            int k = code[j];
            output.write(k);
        }*/
      
        
        
    }
}
