
const cardController = require("../../src/controllers/card.controller")
const mockups = require("../mocks/mockups")



describe('addCard',()=>{
    it('Should failed if card id is undifined',()=>{
        const req = mockups.mockRequest();
        const res = mockups.mockResponse();
        const next = mockups.mockNext();
       
        expect(()=>{cardController.addCard(req,res,next).toBeCalledWith(new Error("ID is undifined!"))})
    });
    it('Should failed if card id isnot valid',()=>{
        const req = mockups.mockRequest();
        const res = mockups.mockResponse();
        const next = mockups.mockNext();
        req.params.card_Id = "some_invalid_id";
        expect(()=>{cardController.addCard(req,res,next).toBeCalledWith(new Error("ID is not valid!"))})
    });

    it('Should failed if card id is less than 4 characters',()=>{
        const req = mockups.mockRequest();
        const res = mockups.mockResponse();
        const next = mockups.mockNext();
        req.params.card_Id = "123";
        expect(()=>{cardController.addCard(req,res,next).toBeCalledWith(new Error("ID lenghth is too short"))})
    });
  
    it('Should success if card id is avilable and valid',()=>{
        const req = mockups.mockRequest();
        const res = mockups.mockResponse();
        const next = mockups.mockNext();
        req.params.card_id = "123456";
        expect(()=>{cardController.addCard(req,res,next).toBe({"msg": "card 123456 is added to the system"})})
    });

    
});

describe('refundCard',()=>{
    it('Should failed if card id is not valid',()=>{
        const req = mockups.mockRequest();
        const res = mockups.mockResponse();
        const next = mockups.mockNext();
        req.params.refund_amount = 9000.0;
       
        expect(()=>{cardController.addCard(req,res,next).toBeCalledWith()})
    });
    it('Should failed if card id null',()=>{
        const req = mockups.mockRequest();
        const res = mockups.mockResponse();
        const next = mockups.mockNext();
        req.params.card_Id = "some_invalid_id";
        req.params.refund_amount = 9000.0
        expect(()=>{cardController.addCard(req,res,next).toBeCalledWith(new Error("ID is not valid!"))})
    });

    it('Should failed if card id is less than 4 characters',()=>{
        const req = mockups.mockRequest();
        const res = mockups.mockResponse();
        const next = mockups.mockNext();
        req.params.card_Id = "123";
        req.params.refund_amount = 9000.0
        expect(()=>{cardController.addCard(req,res,next).toBeCalledWith(new Error("ID lenghth is too short"))})
    });
    it('Should failed if amount is undefined',()=>{
        const req = mockups.mockRequest();
        const res = mockups.mockResponse();
        const next = mockups.mockNext();
        req.params.card_Id = "123";
        expect(()=>{cardController.addCard(req,res,next).toBeCalledWith(new Error("Amount is undefined"))})
    });

    it('Should failed if amount is not a number',()=>{
        const req = mockups.mockRequest();
        const res = mockups.mockResponse();
        const next = mockups.mockNext();
        req.params.card_Id = "1232456";
        req.params.refund_amount = "abc";
        expect(()=>{cardController.addCard(req,res,next).toBeCalledWith(new Error("Amount shoud be number"))})
    });

    it('Should failed if amount is null',()=>{
        const req = mockups.mockRequest();
        const res = mockups.mockResponse();
        const next = mockups.mockNext();
        req.params.card_Id = "123";
        req.params.refund_amount = null;
        expect(()=>{cardController.addCard(req,res,next).toBeCalledWith(new Error("Amount cannot be null"))})
    });
  
    it('Should success if card id is avilable and valid',()=>{
        const req = mockups.mockRequest();
        const res = mockups.mockResponse();
        const next = mockups.mockNext();
        req.params.card_id = "123456";
        req.params.refund_amount = 9000.0;
        expect(()=>{cardController.addCard(req,res,next).toBe({"msg": "card 123456 is added to the system"})})
    });
});

describe('returnCard',()=>{
    it('Should failed if card id undifined',()=>{
        const req = mockups.mockRequest();
        const res = mockups.mockResponse();
        const next = mockups.mockNext();
       
        expect(()=>{cardController.addCard(req,res,next).toBeCalledWith(new Error("ID is undifined!"))})
    });
    it('Should failed if card id isnot valid',()=>{
        const req = mockups.mockRequest();
        const res = mockups.mockResponse();
        const next = mockups.mockNext();
        req.params.card_Id = "some_invalid_id";
        expect(()=>{cardController.addCard(req,res,next).toBeCalledWith(new Error("ID is not valid!"))})
    });

    it('Should failed if card id is less than 4 characters',()=>{
        const req = mockups.mockRequest();
        const res = mockups.mockResponse();
        const next = mockups.mockNext();
        req.params.card_Id = "123";
        expect(()=>{cardController.addCard(req,res,next).toBeCalledWith(new Error("ID lenghth is too short"))})
    });
  
    it('Should success if card id is avilable and valid and allready issued',()=>{
        const req = mockups.mockRequest();
        const res = mockups.mockResponse();
        const next = mockups.mockNext();
        req.params.card_id = "123456";
        expect(()=>{cardController.addCard(req,res,next).toBe({"msg": "card 123456 is succesfully returned"})})
    });

    
});

// describe('refundCard',()=>{
//     it('Should failed if card id is not valid',()=>{
//         const req = mockups.mockRequest();
//         const res = mockups.mockResponse();
//         const next = mockups.mockNext();
       
//         expect(()=>{cardController.addCard(req,res,next).toBeCalledWith()})
//     });
// });





describe('scanCard',()=>{
    it('Should failed if card id or node id is not valid',()=>{
        const req = mockups.mockRequest();
        const res = mockups.mockResponse();
        const next = mockups.mockNext();
        req.params.card_id = "123456a";
        req.params.node_id = "1a";
       
        expect(()=>{cardController.addCard(req,res,next).toBeCalledWith(new Error("card_id or node_id is not valid"))})
    });
    it('Should failed if card id is not valid',()=>{
        const req = mockups.mockRequest();
        const res = mockups.mockResponse();
        const next = mockups.mockNext();
        req.params.card_id = "invalid";
        req.params.node_id = "1";
       


        expect(()=>{cardController.addCard(req,res,next).toBeCalledWith(new Error("card_id  is not valid"))})
    });
    it('Should failed not enough money',()=>{
        const req = mockups.mockRequest();
        const res = mockups.mockResponse();
        const next = mockups.mockNext();
        req.params.card_id = "123456";
        req.params.node_id = "1";
       


        expect(()=>{cardController.addCard(req,res,next).toBeCalledWith(new Error("Sorry, amout is insufficient"))})
    });
    it('Should success if amount is ok',()=>{
        const req = mockups.mockRequest();
        const res = mockups.mockResponse();
        const next = mockups.mockNext();
        req.params.card_id = "123456";
        req.params.node_id = "1";
       


        expect(()=>{cardController.addCard(req,res,next).toBeCalledWith(new Error("Hi, you can now play the game"))})
    });
 
});

