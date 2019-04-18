const server = require('./server');
const request = require('supertest');

describe('server.js', () => {

    describe('GET /', () => { 
        it('should respond with 200 OK', () => {
            return request(server)
                .get('/')
                .then(response => {
                    expect(response.status).toBe(200);
                });
        });
        it("should return a response body", async () => {
            const bands = [
                {id: 1, band: 'Red Hot Chili Peppers'},
                {id: 2, band: 'Led Zeppelin'},
                {id: 3, band: 'Eminem'},
                {id: 4, band: 'John Butler Trio'}
              ];
            const response = await request(server).get("/");
            expect(response.body).toEqual(bands);
          });
          it("should return a JSON object", async () => {
            const response = await request(server).get("/");
            expect(response.type).toBe("application/json");
          });
    });

    describe("POST to /", () => {
        it("should return a status code of 201", async () => {
          const response = await request(server)
            .post("/")
            .send({ id: 5, band: "The Scorpions" });
          expect(response.status).toEqual(201);
        });
        it("should return a status code of 500", async () => {
          const response = await request(server)
            .post("/")
            .send({ id: 4, band: "" }); // fails because there is no band
          expect(response.status).toEqual(500);
        });
        it("should return posted data in the response body", async () => {
          const expectedBody = { id: 5, band: "The Scorpions" };
          const response = await request(server)
            .post("/")
            .send(expectedBody);
          expect(response.body).toEqual(expectedBody);
        });
        it("should return a JSON object", async () => {
          const expectedBody = { id: 5, band: "The Scorpions" };
          const response = await request(server)
            .post("/")
            .send(expectedBody);
          expect(response.type).toBe("application/json");
        });
      });

      describe("DELETE /:id", () => {
        it("should return a status code of 200 when successfully deleted", async () => {
          const response = await request(server).delete("/1");
          expect(response.status).toEqual(200);
        });
        it("should return the ID of the deleted item", async () => {
          const response = await request(server)
            .delete("/1")
            .send({ id: "1" });
          expect(response.body).toEqual({ id: "1" });
        });
        it("should return a JSON object", async () => {
          const response = await request(server)
            .delete("/1")
            .send({ id: "1" });
          expect(response.type).toBe("application/json");
        });
      });

      describe('PUT to /:id', () => {
        it('should successfully return status code 200', async () => {
            const response = await request(server).put('/1').send({band: 'Fleetwood Mac'});
            expect(response.status).toEqual(200);
        });
        it('should return a status code of 500 if nothing is passed in', async () => {
            const response = await request(server).put('/1').send({});
            expect(response.status).toEqual(500);
        });
        it('should return the updated user', async () => {
            const expectedBody = { id: 1, band: "Fleetwood Mac" };
            const response = await request(server).put('/1').send(expectedBody);
            expect(response.body).toEqual(expectedBody);
        });
        it('should return a JSON object', async () => {
            const response = await request(server).put('/1').send({band: 'Fleetwood Mac'});
            expect(response.type).toBe('application/json');
        });
      });
      
});