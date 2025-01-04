import { PetNotFoundError } from '@/services/errors/pet-not-found-error copy'
import { makeGetPetService } from '@/services/factories/make-get-pet-service'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const routeSchema = z.object({
    id: z.string(),
  })

  const { id } = routeSchema.parse(request.params)

  const getPetService = makeGetPetService()

  try {
    const { pet } = await getPetService.execute({ id })

    return reply.status(200).send({ pet })
  } catch (error) {
    if (error instanceof PetNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
  }
}
