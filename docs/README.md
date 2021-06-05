
# Smart-payment-system
---
This is the 3rd year embedded system project
## Group Members : 
>[Basnayake S.S.](https://github.com/sathirauop) **E/16/054**

>[Madusha shanaka](https://github.com/MadushaShanaka) **E/16/351**

>[Nadun welikanda](https://github.com/Nadun360) **E/16/389**

---

## Table of contents

1. >[Problem](https://github.com/cepdnaclk/e16-3yp-smart-payment-system#problem)
2. >[Our solution](https://github.com/cepdnaclk/e16-3yp-smart-payment-system#our-solution)
3. >[Solution Architecture](https://github.com/cepdnaclk/e16-3yp-smart-payment-system#solution-architecture)
4. >[Hardware & Software Design](https://github.com/cepdnaclk/e16-3yp-smart-payment-systemr#hardware-and-software-design)
5. >[Testing](https://github.com/cepdnaclk/e16-3yp-smart-payment-system#testing)
6. >[Detailed budget](https://github.com/cepdnaclk/e16-3yp-smart-payment-system#detailed-budget)
7. >[Links](https://github.com/cepdnaclk/e16-3yp-smart-payment-system#Links)

## OVERVIEW
  As we all know gaming industry is growing day by day. As a result of this growth the concept of gaming centers has been popular lately. In a gaming center they normally use coins to play the games. The procedure is when a customer comes to the gaming center they have to buy coins from the cashier in order to use those as a paying method to the gaming machine. Once they put enough number of coins into the machine they are allowed to play the game.
![introduction](https://github.com/MadushaShanaka/e16-3yp-smart-payment-system/blob/main/images/smart_payment_system_intro.png?raw=true)

  
## Problem
  The problems of this approach are the coins are simply hard to carry around the gaming center when the customer has large number of coins and also they have good chance to loose a coin or two. When we consider the gaming center's point of view they have to collect coins every day at each machines and count it and keep the record.

## Our Solution
  As a solution for above problems we came up with a solution which completely replace coins system with a RFID and NFC technology. In our solution, when the customer arrives at the cashier and pay money they will be issued a RFID card or if they have NFC supported mobile device they can use our mobile app instead of coins. To play the game what they have to do is simply tap the RFID card or the mobile device into the reading area which is in the gaming machine. After the customer done playing he can go to the cashier and return the card. If there is any balance the cashier will return the balance.
  ![overview](https://github.com/cepdnaclk/e16-3yp-smart-payment-system/blob/main/images/main%20idea.PNG?raw=true)


## Solution Architecture
![overview](https://github.com/MadushaShanaka/e16-3yp-smart-payment-system/blob/main/images/smart_payment_system_overview.png?raw=true)

## Detailed Budget
![Our Budjet](https://github.com/sathirauop/e16-3yp-smart-payment-system/blob/main/images/Budget.jpeg?raw=true)  


## Hardware and Software designs
  
  3D model Design
  
  1. Cashier Node
  
  [![Cashier Hardware 3D](https://github.com/MadushaShanaka/e16-3yp-smart-payment-system/blob/main/Demonstration/img_cashier_hard_3d.jpg?raw=true)](https://youtu.be/4YNhmeZaI7E)
  
  2. Gaming Node

  [![Gaming Node Hardware 3D](https://github.com/MadushaShanaka/e16-3yp-smart-payment-system/blob/main/Demonstration/img_gaming_node_hard_3d.jpg?raw=true)](https://youtu.be/KYDXmXD5vWg)
  
  Hardware design
![Our Design](https://github.com/sathirauop/e16-3yp-smart-payment-system/blob/main/Diagrams/EasyEDA_diagram.png?raw=true)  

![Our Design](https://github.com/MadushaShanaka/e16-3yp-smart-payment-system/blob/main/Diagrams/PCB/PCB.jpeg?raw=true) 

  Demonstration
  1. Cashier Node
  
  [![Cashier Hardware demonstration](https://github.com/MadushaShanaka/e16-3yp-smart-payment-system/blob/main/Demonstration/img_cashier_hard.jpg?raw=true)](https://youtu.be/FA2izcUz030)
  
  2. Gaming Node

  [![Gaming Node Hardware demonstration](https://github.com/MadushaShanaka/e16-3yp-smart-payment-system/blob/main/Demonstration/img_gaming_node.jpg?raw=true)](https://youtu.be/XCwr7IixzDE)
  
  Software design
  
    1. Database
    
![EER Diagram](https://github.com/cepdnaclk/e16-3yp-smart-payment-system/blob/main/Diagrams/EER_diagram/EER_diagram.png?raw=true)  

    2. Cashier Application
    
 [![Cashier App](https://github.com/MadushaShanaka/e16-3yp-smart-payment-system/blob/main/Demonstration/img_cashier_app.jpg?raw=true)](https://youtu.be/9UNsXmhzdWU)
 
    3. Web Application
    
[![img_web_app](https://user-images.githubusercontent.com/54934856/120007420-84286800-bff7-11eb-9ab5-6f6fdeaf4f03.jpg?raw=true)](https://youtu.be/JaxcWVb3in4)

## Testing
  Under testing we checked for unit testing and intergration testing. In unit testing we checked all functions related to adding a card, refunding, return, scanning a card, issue a card, register and login.
  
 ![Testing](https://github.com/cepdnaclk/e16-3yp-smart-payment-system/blob/main/images/Testing/unit%20testing.jpeg?raw=true)  
 
  Under intergration testing we tested Basic route to see the server up and ruining and Route which send the 404 message
    
 ![Testing1](https://github.com/cepdnaclk/e16-3yp-smart-payment-system/blob/main/images/Testing/integrtion%20testing.jpeg?raw=true)  
 
## Target Audience
  The target audience of this project is Gaming centers which is our primary target. As our next milestone, we are planning to update this system in a way that it can be used in any commercial market place such as casino, leisure world, etc.
  
## Links
- [Department of Computer Engineering](http://www.ce.pdn.ac.lk/)
- [Faculty of Engineering](http://eng.pdn.ac.lk/)
- [University of Peradeniya](https://www.pdn.ac.lk/)
- [Project website](https://cepdnaclk.github.io/e16-3yp-smart-payment-system/)


