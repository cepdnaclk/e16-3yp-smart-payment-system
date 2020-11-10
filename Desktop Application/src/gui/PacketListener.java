/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui;

import com.fazecast.jSerialComm.SerialPort;
import com.fazecast.jSerialComm.SerialPortEvent;
import com.fazecast.jSerialComm.SerialPortPacketListener;
import java.io.UnsupportedEncodingException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author vubon
 */
public final class PacketListener implements SerialPortPacketListener {

    @Override
    public int getListeningEvents() {
        return SerialPort.LISTENING_EVENT_DATA_RECEIVED;
    }

    @Override
    public int getPacketSize() {
        return JSerialComm01.PACKET_SIZE_IN_BYTES;
    }

    @Override
    public void serialEvent(SerialPortEvent event) {
        byte[] newData = event.getReceivedData();
        //System.out.println(newData);
        String str = new String(newData).split("\n", 2)[0].replaceAll("\\s+", "");
        int byteSize = 0;
        try {
            byteSize = str.getBytes("UTF-8").length;
        } catch (UnsupportedEncodingException ex) {
            Logger.getLogger(PacketListener.class.getName()).log(Level.SEVERE, null, ex);
        }
        if (byteSize == JSerialComm01.PACKET_SIZE_IN_BYTES) {
            //System.out.println("(Received data of size: " + byteSize + ")" + str);
            System.out.println("Received data: " + str);
            //menu.setCarId(str);
            JSerialComm01.output = str;
        }else{
            JSerialComm01.output = "0";
        }
    }
}
