
const authController = require("../../src/controllers/auth.controller")
const mockups = require("../mocks/mockups")


describe('register',()=>{
    it('Should failed if any required field is null',()=>{
        const req = mockups.mockRequest();
        const res = mockups.mockResponse();
        const next = mockups.mockNext();
       
        expect(()=>{cardController.addCard(req,res,next).toBeCalledWith(new Error("ID is undifined!"))})
    });
    it('Should failed if email is already taken',()=>{
        const req = mockups.mockRequest();
        const res = mockups.mockResponse();
        const next = mockups.mockNext();
        req.params.card_Id = "some_invalid_id";
        expect(()=>{cardController.addCard(req,res,next).toBeCalledWith(new Error("ID is not valid!"))})
    });

    it('Should failed if NIC is allready taken',()=>{
        const req = mockups.mockRequest();
        const res = mockups.mockResponse();
        const next = mockups.mockNext();
        req.params.card_Id = "123";
        expect(()=>{cardController.addCard(req,res,next).toBeCalledWith(new Error("ID lenghth is too short"))})
    });
  
    it('Should successfully register if every detail is valid',()=>{
        const req = mockups.mockRequest();
        const res = mockups.mockResponse();
        const next = mockups.mockNext();
        req.params.card_id = "123456";
        expect(()=>{cardController.addCard(req,res,next).toBe({"msg": "card 123456 is added to the system"})})
    });

    
});

describe('login',()=>{
    it('Should failed if any required field is null',()=>{
        const req = mockups.mockRequest();
        const res = mockups.mockResponse();
        const next = mockups.mockNext();
       
        expect(()=>{cardController.addCard(req,res,next).toBeCalledWith(new Error("ID is undifined!"))})
    });
    it('Should failed if email is invalid',()=>{
        const req = mockups.mockRequest();
        const res = mockups.mockResponse();
        const next = mockups.mockNext();
        req.params.card_Id = "some_invalid_id";
        expect(()=>{cardController.addCard(req,res,next).toBeCalledWith(new Error("ID is not valid!"))})
    });

    it('Should failed if email is not registered',()=>{
        const req = mockups.mockRequest();
        const res = mockups.mockResponse();
        const next = mockups.mockNext();
        req.params.card_Id = "123";
        expect(()=>{cardController.addCard(req,res,next).toBeCalledWith(new Error("ID lenghth is too short"))})
    });
  
    it('Should successfully login if every detail is valid',()=>{
        const req = mockups.mockRequest();
        const res = mockups.mockResponse();
        const next = mockups.mockNext();
        req.params.card_id = "123456";
        expect(()=>{cardController.addCard(req,res,next).toBe({"msg": "card 123456 is added to the system"})})
    });

    
});