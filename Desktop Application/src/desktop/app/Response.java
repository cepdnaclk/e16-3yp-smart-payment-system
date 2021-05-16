/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package desktop.app;

import org.json.JSONObject;

/**
 *
 * @author Madusha Shanaka
 */
public class Response {
    public int responseCode;
    public JSONObject myResponse;
    public Response(int responseCode,JSONObject myResponse){
        this.responseCode = responseCode;
        this.myResponse = myResponse;
    }
}
