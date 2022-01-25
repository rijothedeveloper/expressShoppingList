process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
let db = require("./fakeDb");

let shopList1 = {"name": "popsicle", "price": 1.45}
let shopList2 = {"name":"cheerios", "price": 3.40}

beforeEach( () => {
    db.push(shopList1)
    db.push(shopList2)
})

afterEach( () => db.length = 0 )

describe(" GET /items", function() {

    test("return all lists", async ()=> {
        const res = await request(app).get("/shop/items")
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual([shopList1, shopList2])
    })

})

describe(" GET /items/name", function() {

    test("return one list matched with name", async ()=> {
        const res = await request(app).get("/shop/items/popsicle")
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(shopList1)
    })

    test("return 404 for not valid name", async ()=> {
        const res = await request(app).get("/shop/items/invalid")
        expect(res.statusCode).toBe(404)
    })

})

describe(" POST /items", function() {

    test("add one list to shopping lists", async ()=> {
        item = {"name":"cheerios2", "price": 3.40}
        const res = await request(app).post("/shop/items")
        .send(item)
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual({added: item})
    })

    test("calling without required data", async ()=> {
        const res = await request(app).post("/shop/items")
        expect(res.statusCode).toBe(404)
    })

})

describe(" PATCH /items", function() {

    test("rupdate list with invalid data", async ()=> {
        item = {"name":"cheerios", "price": 3.40}
        const res = await request(app).patch("/shop/items/popsicle")
        .send(item)
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(item)
    })

    test("rupdate list with invalid data", async ()=> {
        item = {"name":"cheerios", "price": 3.40}
        const res = await request(app).patch("/shop/items/invalid")
        .send(item)
        expect(res.statusCode).toBe(404)
    })

})

describe(" DELETE /items", function() {

    test("return all lists", async ()=> {
        const res = await request(app).delete("/shop/items/popsicle")
        // expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ message: "Deleted" });
    })

})