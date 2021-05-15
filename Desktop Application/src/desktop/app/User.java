/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package desktop.app;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import org.json.JSONObject;

/**
 *
 * @author Madusha Shanaka
 */
public class User {
    public static boolean login(String email,String pward) throws Exception {
     URL url = new URL("http://localhost:3000/api/login");

            StringBuilder postData = new StringBuilder();
            postData.append(URLEncoder.encode("email", "UTF-8"));
	    postData.append('=');
	    postData.append(URLEncoder.encode((String) email, "UTF-8"));
            
            postData.append('&');
            postData.append(URLEncoder.encode("password", "UTF-8"));
	    postData.append('=');
	    postData.append(URLEncoder.encode((String) pward, "UTF-8"));

            byte[] postDataBytes = postData.toString().getBytes("UTF-8");
	    HttpURLConnection conn = (HttpURLConnection)url.openConnection();
	    conn.setRequestMethod("POST");
	    conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
	    conn.setRequestProperty("Content-Length", String.valueOf(postDataBytes.length));
	    conn.setDoOutput(true);
	    conn.getOutputStream().write(postDataBytes);
	    java.io.Reader in = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
	    StringBuilder sb = new StringBuilder();
	    for (int c; (c = in.read()) >= 0;)
	        sb.append((char)c);
	    String response = sb.toString();
	    System.out.println(response);
	    JSONObject myResponse = new JSONObject(response.toString());
            in.close();
            conn.disconnect();
            try{
                Menu.token = myResponse.getString("token");
                int res_code = conn.getResponseCode();
                return (res_code == 200);
            }catch(Exception e){
                return (false);
            }
   }
    
   public static void issue_card(String name,String amount,String card_id,String employer_id) throws Exception {
     URL url = new URL("http://localhost:3000/api/issueCard");
            
            StringBuilder postData = new StringBuilder();
            
            postData.append(URLEncoder.encode("card_id", "UTF-8"));
	    postData.append('=');
	    postData.append(URLEncoder.encode((String) card_id, "UTF-8"));
     
            postData.append('&');
            postData.append(URLEncoder.encode("amount", "UTF-8"));
	    postData.append('=');
	    postData.append(URLEncoder.encode((String) amount, "UTF-8"));
            
            postData.append('&');
            postData.append(URLEncoder.encode("is_issued", "UTF-8"));
	    postData.append('=');
	    postData.append(URLEncoder.encode((String) "True", "UTF-8"));
            
            postData.append('&');
            postData.append(URLEncoder.encode("employer_id", "UTF-8"));
	    postData.append('=');
	    postData.append(URLEncoder.encode((String) employer_id, "UTF-8"));
            
            postData.append('&');
            postData.append(URLEncoder.encode("customer_name", "UTF-8"));
	    postData.append('=');
	    postData.append(URLEncoder.encode((String) name, "UTF-8"));
            
	    byte[] postDataBytes = postData.toString().getBytes("UTF-8");
	    HttpURLConnection conn = (HttpURLConnection)url.openConnection();
            //conn.setRequestProperty("Authorization", "admin2021");
	    conn.setRequestMethod("POST");
	    conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
	    conn.setRequestProperty("Content-Length", String.valueOf(postDataBytes.length));
	    conn.setDoOutput(true);
	    conn.getOutputStream().write(postDataBytes);
	    java.io.Reader in = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
            System.out.println("Madusha");
	    StringBuilder sb = new StringBuilder();
            System.out.println("Madusha");
	    for (int c; (c = in.read()) >= 0;)
	        sb.append((char)c);
	    String response = sb.toString();
	    System.out.println(response);
	    JSONObject myResponse = new JSONObject(response.toString());
            try{
                int res_code = conn.getResponseCode();
                //return (res_code == 200);
            }catch(Exception e){
                //return (false);
            }
   }
   
   
       public static boolean addCard(String card_id) throws Exception {
     URL url = new URL("http://localhost:3000/api/addCard");

            StringBuilder postData = new StringBuilder();
            postData.append(URLEncoder.encode("card_id", "UTF-8"));
	    postData.append('=');
	    postData.append(URLEncoder.encode((String) card_id, "UTF-8"));
            
            postData.append('&');
            postData.append(URLEncoder.encode("card_id", "UTF-8"));
	    postData.append('=');
	    postData.append(URLEncoder.encode((String) card_id, "UTF-8"));
            
         System.out.println(postData);
	    byte[] postDataBytes = postData.toString().getBytes("UTF-8");
             
	    HttpURLConnection conn1 = (HttpURLConnection)url.openConnection();
	    conn1.setRequestMethod("POST");
	    conn1.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
	    conn1.setRequestProperty("Content-Length", String.valueOf(postDataBytes.length));
	    conn1.setDoOutput(true);
	    conn1.getOutputStream().write(postDataBytes);
            
	    java.io.Reader in = new BufferedReader(new InputStreamReader(conn1.getInputStream(), "UTF-8"));
            System.out.println(postDataBytes);
	    StringBuilder sb = new StringBuilder();
            System.out.println(postDataBytes);
	    for (int c; (c = in.read()) >= 0;)
	        sb.append((char)c);
	    String response = sb.toString();
	    //System.out.println(response);
	    JSONObject myResponse = new JSONObject(response.toString());
            try{
                //Menu.token = myResponse.getString("msg");
                int res_code = conn1.getResponseCode();
                return (res_code == 201);
            }catch(Exception e){
                return (false);
            }
   }
}
