import app from '../../src/index.js'
import request from 'supertest'

describe('DELETE /acc/:id', () => {
    it('should return 400', async () => {
        const res = await request(app).delete('/acc/-1').send()
        expect(res.status).toBe(400)
    })
})
