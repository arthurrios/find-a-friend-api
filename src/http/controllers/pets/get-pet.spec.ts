import { app } from '@/app'
import request from 'supertest'
import { makeOrg } from 'tests/factories/make-org.factory'
import { makePet } from 'tests/factories/make-pet.factory'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org).expect(201)

    const authResponse = await request(app.server).post('/sessions').send({
      email: org.email,
      password: org.password,
    })

    const { token } = authResponse.body

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet())
      .expect(201)

    const getPetResponse = await request(app.server)
      .get(`/pets/${response.body.pet.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(getPetResponse.status).toBe(200)
  })
})
