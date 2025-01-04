import type { FastifyInstance } from 'fastify'
import { registerPet } from './register-pet'
import { searchPets } from './search-pets'
import { getPet } from './get-pet'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', registerPet)
  app.get('/pets/byCity', searchPets)
  app.get('/pets/:id', getPet)
}
