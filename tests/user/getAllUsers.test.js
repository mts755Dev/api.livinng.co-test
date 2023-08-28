import app from '../../src/index.js'
import request from 'supertest'

describe('GET /user/', () => {
    it('should return 200', async () => {
        const res = await request(app).get('/user').send()
        expect(res.status).toBe(200)
    })
})