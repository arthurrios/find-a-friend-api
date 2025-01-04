import type { FastifyInstance } from 'fastify'
import { registerPet } from './register-pet'
import { searchPets } from './search-pets'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', registerPet)
  app.get('/pets/byCity', searchPets)
}
