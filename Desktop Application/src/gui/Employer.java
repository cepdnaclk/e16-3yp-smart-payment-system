/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui;

/**
 *
 * @author Madusha Shanaka
 */
public class Employer {
        String email;
        String pward;
        String nic;
        Boolean is_admin;

    public void setData(String e_mail,String passward,String nic_no,Boolean status){
        email = e_mail;
        pward = passward;
        nic = nic_no;
        is_admin = status;
    }
    
    public String get_email() { return this.email; }
    public String get_pward() { return this.pward; }
}
