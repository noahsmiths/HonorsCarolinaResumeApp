const chai = require('chai')
const controller = require("../app/controllers/resume.controller")
const expect = chai.expect
const request = require('supertest')
const server = require("../server")

describe("API", ()=>{
    it("Should get all resumes", async () => {
        const res = await request(server)
        .get("/resumes")
        .expect(200)
        expect(res.body).to.be.an('array')
    })
    it("Should return 404 with unassociated ID", async () => {
        const res = await request(server)
        .get("/resumes/2")
        .expect(404)
    })
    it("Should return a resume based on ID", async () => {
        const res = await request(server)
        .get("/resumes/61858e6df29ef500221a1e4f")
        .expect(200)
        const resume = {
            "_id": "61858e6df29ef500221a1e4f",
            "name": "Habib Khadri",
            "link": "https://drive.google.com/file/d/1_HYqEm9-L49kzmsFRoidDwMdjrlOxHbC/view?usp=sharing",
            "major": "Business, CS",
            "tags": "Project Management, Trello, Organization",
            "approved": "approved",
            "createdAt": "2021-11-05T20:05:01.290Z",
            "updatedAt": "2021-11-05T20:06:42.017Z",
            "__v": 0
        }
        expect(res.body).to.deep.eq(resume)
    })
    it("Should create a new resume, approve it and delete it", async() => {
        const body = {
            "name": "Test Khadri",
            "link": "https://drive.google.com/file/d/1_HYqEm9-L49kzmsFRoidDwMdjrlOxHbC/view?usp=sharing",
            "major": "Business, CS",
            "tags": "Project Management, Trello, Organization",
            "approved": "pending"
        }
        const postRes = await request(server)
        .post("/resumes")
        .send(body)
        .expect(200)
        const id = postRes.body._id
        const approveBody = {
            "approved": "approved"
        }
        const approveRes = await request(server)
        .put(`/resumes/${id}`)
        .send(approveBody)
        .expect(200)
        const deleteRes = await request(server)
        .delete(`/resumes/${id}`)
        .expect(200)
        const getById = await request(server)
        .get(`/resumes/${id}`)
        .expect(404)
    })
    it("Should refuse to accept invalid input for approved status", async ()=> {
        const body = {
            "name": "Test Khadri",
            "link": "https://drive.google.com/file/d/1_HYqEm9-L49kzmsFRoidDwMdjrlOxHbC/view?usp=sharing",
            "major": "Business, CS",
            "tags": "Project Management, Trello, Organization",
            "approved": "pending"
        }
        const postRes = await request(server)
        .post("/resumes")
        .send(body)
        .expect(200)
        const id = postRes.body._id
        var approveBody = {
            "approved": 4
        }
        var approveRes = await request(server)
        .put(`/resumes/${id}`)
        .send(approveBody)
        .expect(400)
        approveBody = {
            "approved": "$"
        }
        approveRes = await request(server)
        .put(`/resumes/${id}`)
        .send(approveBody)
        .expect(400)
        approveBody = {
            "approved": "approooooved"
        }
        approveRes = await request(server)
        .put(`/resumes/${id}`)
        .send(approveBody)
        .expect(400)
        approveBody = {
            "approved": "approved"
        }
        approveRes = await request(server)
        .put(`/resumes/${id+"282*d"}`)
        .send(approveBody)
        .expect(404)
        const deleteRes = await request(server)
        .delete(`/resumes/${id}`)
        .expect(200)
    })
    it("Should refuse to create a resume when not given all relavant information", async()=> {
        var body = {
            "link": "https://drive.google.com/file/d/1_HYqEm9-L49kzmsFRoidDwMdjrlOxHbC/view?usp=sharing",
            "major": "Business, CS",
            "tags": "Project Management, Trello, Organization",
        }
        var postRes = await request(server)
        .post("/resumes")
        .send(body)
        .expect(400)
        body = {
            "name": "Test Khadri",
            "link": "https://drive.google.com/file/d/1_HYqEm9-L49kzmsFRoidDwMdjrlOxHbC/view?usp=sharing",
            "major": "Business, CS",
            "tags": "Project Management, Trello, Organization",
        }
        postRes = await request(server)
        .post("/resumes")
        .send(body)
        .expect(400)
        body = {
            "name": "Test Khadri",
            "link": "https://drive.google.com/file/d/1_HYqEm9-L49kzmsFRoidDwMdjrlOxHbC/view?usp=sharing",
            "tags": "Project Management, Trello, Organization",
            "approved": "pending"
        }
        postRes = await request(server)
        .post("/resumes")
        .send(body)
        .expect(400)
    })
    it("Should fail to delete a resume which does not exist or when given malformed ID", async ()=> {
        const body = {
            "name": "Test Khadri",
            "link": "https://drive.google.com/file/d/1_HYqEm9-L49kzmsFRoidDwMdjrlOxHbC/view?usp=sharing",
            "major": "Business, CS",
            "tags": "Project Management, Trello, Organization",
            "approved": "pending"
        }
        const postRes = await request(server)
        .post("/resumes")
        .send(body)
        .expect(200)
        const id = postRes.body._id
        await request(server)
        .delete(`/resumes/${id + "32#"}`)
        .expect(404)
        const deleteRes = await request(server)
        .delete(`/resumes/${id}`)
        .expect(200)
    })
})