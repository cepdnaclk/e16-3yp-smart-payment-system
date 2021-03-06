const superset = require('supertest')
//sql =  require('../../src/services/mysql')
// sql.connect()

let app;
let request
describe('basic route',()=> {

    beforeEach(()=>{app = require('../../src/services/express');
                   request = superset(app.app)
                 
                })
    
    describe('basic route', ()=>{
        it('Should get whether the basic endpoint is working', async done => {
            // Sends GET Request to /test endpoint
            const res = await request.get('/')
            expect(res.status).toBe(200)
            done()
          })
    })

  
});

describe('404 error',()=> {

    beforeEach(()=>{app = require('../../src/services/express');
                   request = superset(app.app)
                 
                })

    describe('basic route for 404 error', ()=>{
        it('Should get whether the basic endpoint is working', async done => {
            // Sends GET Request to /test endpoint
            const res = await request.get('/any_Invalid_End_Point')
            expect(res.status).toBe(404)
            done()
          })
    })

  
});

