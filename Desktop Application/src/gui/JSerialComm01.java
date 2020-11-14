/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui;

import com.fazecast.jSerialComm.SerialPort;
import com.fazecast.jSerialComm.SerialPortDataListener;
import com.fazecast.jSerialComm.SerialPortEvent;
import java.io.InputStream;

/**
 *
 * 
 * @author vubon
 */
public class JSerialComm01 {

    public static String devicePortName = "Arduino Uno (COM4)";
    public static SerialPort arduinoPort = null;
    public static InputStream arduinoStream = null;
    public static int PACKET_SIZE_IN_BYTES = 8;
    public static String output = "";

    String scan() {
        output = "";
        int len = SerialPort.getCommPorts().length;
        SerialPort serialPorts[] = new SerialPort[len];
        serialPorts = SerialPort.getCommPorts();
        System.out.println(serialPorts);

        for (int i = 0; i < len; i++) {

            String portName = serialPorts[i].getDescriptivePortName();
            System.out.println(portName);
            System.out.println(serialPorts[i].getSystemPortName() + ": " + portName + ": " + i);

            if (portName.contains(devicePortName)) {
                arduinoPort = serialPorts[i];
                arduinoPort.openPort();
                System.out.println("connected to: " + portName + "[" + i + "]");
                break;
            }
        }
        while(output==""){
            PacketListener listener = new PacketListener();
            arduinoPort.addDataListener((SerialPortDataListener) listener);
        }
             

        //try {
        //    Thread.sleep(10000);
        //} catch (Exception e) {
        //    e.printStackTrace();
        //}
        arduinoPort.removeDataListener();
        arduinoPort.closePort();
        return output;
    }
}

