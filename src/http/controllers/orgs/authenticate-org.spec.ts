import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to authenticate as an org', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Org name',
      owner_name: 'Owner name',
      email: 'org@email.com',
      whatsapp: '61999999999',
      password: '123456',
      cep: '70000000',
      state: 'DF',
      city: 'Brasília',
      neighborhood: 'Plano Piloto',
      street: 'Quadra 1',
      latitude: 0,
      longitude: 0,
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'org@email.com',
      password: '123456',
    })

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({ token: expect.any(String) }),
    )
  })
})
