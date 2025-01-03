import type { FastifyInstance } from 'fastify'
import { registerPet } from './register-pet'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', registerPet)
}
