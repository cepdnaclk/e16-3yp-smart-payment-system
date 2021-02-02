const superset = require('supertest')
sql =  require('../../src/services/mysql')
sql.connect()

let app;
let request
describe('/',()=> {

    beforeEach(()=>{app = require('../../src/services/express');
                   request = superset(app.app)
                 
                })
    //afterEach(()=>{sql.disconnect();})

    describe('', ()=>{
        it('Should add new card into database', async done => {
            // Sends GET Request to /test endpoint
            const res = await request.post('/api/addCard').send({"card_id":"987654321"})
            expect(res.status).toBe(409)
            //expect(res.body.msg).toBe("d")
            done()
          })
          it('Should refund a card ', async done => {
            // Sends GET Request to /test endpoint
            const res = await request.post('/api/addCard').send({"cardd_id":"7998"})
            expect(res.status).toBe(400)
            //expect(res.body.msg).toBe("d")
            done()
          })
    })

  
});

describe('/api/card',()=> {

    beforeEach(()=>{app = require('../../src/services/express');
                   request = superset(app.app)
                //    sql =  require('../../src/services/mysql')
                //    sql.connect()
                })
    //afterEach(()=>{sql.disconnect();})

    describe('POST/refundCard', ()=>{
        it('Should refund a issued card', async done => {
            // Sends GET Request to /test endpoint
            const res = await request.post('/api/refundCard').send({"card_id":"12345","refund_amount":"1000"})
            expect(res.status).toBe(500)
            //expect(res.body.msg).toBe("d")
            done()
          })
        //   it('Should refund a card ', async done => {
        //     // Sends GET Request to /test endpoint
        //     const res = await request.post('/api/addCard').send({"card_id":"7998",""})
        //     expect(res.status).toBe(409)
        //     //expect(res.body.msg).toBe("d")
        //     done()
        //   })
    });

  
});

