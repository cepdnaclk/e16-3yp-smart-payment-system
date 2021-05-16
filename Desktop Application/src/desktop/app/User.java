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
import java.util.Base64;
import javax.swing.JOptionPane;
import org.json.JSONObject;

/**
 *
 * @author Madusha Shanaka
 */
public class User {
   public static String token = "";
   public static String name = "";
   public static String id = "973131559V";
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
            
            Response res = Connection.connect(url, postData);
            try{
                //Get the token
                token = res.myResponse.getString("token");
                //JWT decording process
                String[] chunks = token.split("\\.");
                Base64.Decoder decoder = Base64.getDecoder();
                String header = new String(decoder.decode(chunks[0]));
                String payload = new String(decoder.decode(chunks[1]));  
                JSONObject json = new JSONObject(payload);
                //extrct the name
                name = json.getString("name");
                System.out.println("Hello,"+name);
                int res_code = res.responseCode;
                return (res_code == 200);
            }catch(Exception e){
                System.out.println(e);
                return (false);
            }
       
   }
   public static int issue_card(String name,String amount,String card_id,String employer_id,String security_tag) throws Exception {
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
            
            postData.append('&');
            postData.append(URLEncoder.encode("tag", "UTF-8"));
	    postData.append('=');
	    postData.append(URLEncoder.encode((String) security_tag, "UTF-8"));
            
            postData.append('&');
            postData.append(URLEncoder.encode("is_issued", "UTF-8"));
	    postData.append('=');
	    postData.append(URLEncoder.encode((String) "True", "UTF-8"));
            
            Response res = Connection.connect(url, postData);
	    
	   
            try{
                int res_code = res.responseCode;
                System.out.println(res.myResponse);
                return (res_code == 201)? 1:0;
            }catch(Exception e){
                System.out.println(e);
            }
            return 0;
   }
   
    public static int addCard(String card_id){
        try{
            URL url = new URL("http://localhost:3000/api/addCard");
            StringBuilder postData = new StringBuilder();
            postData.append(URLEncoder.encode("card_id", "UTF-8"));
            postData.append('=');
            postData.append(URLEncoder.encode((String) card_id, "UTF-8"));
            //Connecting to server
            Response res = Connection.connect(url, postData);
            try{
                int res_code = res.responseCode;
                return (res_code == 201)? 1:0;
            }catch(Exception e){
                return 0;
            }
        }catch(Exception e){
            if(e.getMessage().contains("response code: 409")){
                return 2;
            }
            System.out.println(e.getMessage());
        }
        return 0;    
    }
   
    public static int deleteCard(String card_id){
        try{
            URL url = new URL("http://localhost:3000/api/deleteCard");
            StringBuilder postData = new StringBuilder();
            postData.append(URLEncoder.encode("card_id", "UTF-8"));
            postData.append('=');
            postData.append(URLEncoder.encode((String) card_id, "UTF-8"));
            //Connecting to server
            Response res = Connection.connect(url, postData);
            try{
                int res_code = res.responseCode;
                return (res_code == 200)? 1:0;
            }catch(Exception e){
                return 0;
            }
        }catch(Exception e){
            if(e.getMessage().contains("response code: 500")){
                return 2;
            }
            System.out.println(e.getMessage());
        }
        return 0;    
    }
}
