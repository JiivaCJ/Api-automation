import supertest from "supertest";
import { expect } from "chai";
const request = supertest('https://reqres.in/');

var chai = require('chai');
chai.use(require('chai-json-schema'));

const data = require('../jsonschema/users.json');

describe('users', () => {
    it('post users', async() => {
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const data = {
            name: `test-${(characters.charAt(Math.floor(Math.random() * characters.length)))}`,
            job:`lead-${(Math.floor(Math.random() * characters.length))}`    
        }
        await request.post('api/users')
            .send(data)
            .then((res) => {
                console.log(res.body);
                expect(res.body.name).to.be.equal(data.name);
                console.log(expect(res.body).to.be.jsonSchema(data));
            })    
    }); 
    it('get users', async() => {
        await request
            .get('api/users/4')
            .then((res) => {
                console.log(res.body);
                expect(res.body).to.be.jsonSchema(data);
            });
            
    });
    it('put', async() => {
        const data = {
            "job": "zion resident"
        }
        await request
            .put('api/users/100')
            .send(data)
            .then((res) => {
                console.log(res.body);
            })
    });

    it('delete', async() => {
        await request
            .delete('api/users/87');
    });
});