/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import org.json.JSONObject;

/**
 *
 * @author Madusha Shanaka
 */
public class issue_card {
    public static void call_me(String fname,String lname,String amount,String card_id,String employer_id) throws Exception {
     URL url = new URL("https://httpbin.org/post");

            StringBuilder postData = new StringBuilder();
            postData.append(URLEncoder.encode("first_name", "UTF-8"));
	    postData.append('=');
	    postData.append(URLEncoder.encode((String) fname, "UTF-8"));
            
            postData.append('&');
            postData.append(URLEncoder.encode("last_name", "UTF-8"));
	    postData.append('=');
	    postData.append(URLEncoder.encode((String) lname, "UTF-8"));
            
            postData.append('&');
            postData.append(URLEncoder.encode("amount", "UTF-8"));
	    postData.append('=');
	    postData.append(URLEncoder.encode((String) amount, "UTF-8"));
            
            postData.append('&');
            postData.append(URLEncoder.encode("card_id", "UTF-8"));
	    postData.append('=');
	    postData.append(URLEncoder.encode((String) card_id, "UTF-8"));
            
            postData.append('&');
            postData.append(URLEncoder.encode("employer_id", "UTF-8"));
	    postData.append('=');
	    postData.append(URLEncoder.encode((String) employer_id, "UTF-8"));
            
	    byte[] postDataBytes = postData.toString().getBytes("UTF-8");
	    HttpURLConnection conn = (HttpURLConnection)url.openConnection();
            conn.setRequestProperty("Authorization", "admin2021");
	    conn.setRequestMethod("POST");
	    conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
	    conn.setRequestProperty("Content-Length", String.valueOf(postDataBytes.length));
	    conn.setDoOutput(true);
	    conn.getOutputStream().write(postDataBytes);
	    Reader in = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
	    StringBuilder sb = new StringBuilder();
	    for (int c; (c = in.read()) >= 0;)
	        sb.append((char)c);
	    String response = sb.toString();
	    System.out.println(response);
	    JSONObject myResponse = new JSONObject(response.toString());
	    System.out.println("result after Reading JSON Response");
	    System.out.println("origin- "+myResponse.getString("origin"));
	    System.out.println("url- "+myResponse.getString("url"));
	    JSONObject form_data = myResponse.getJSONObject("form");
	    System.out.println("First name- "+form_data.getString("first_name"));
	    System.out.println("Last name- "+form_data.getString("last_name"));
   }

}
