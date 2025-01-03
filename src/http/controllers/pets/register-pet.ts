import { OrgNotFoundError } from '@/services/errors/org-not-found-error'
import { makeRegisterPetService } from '@/services/factories/make-register-pet-service'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerPet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerOrgBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string(),
    size: z.string(),
    energy_level: z.string(),
    independency_level: z.string(),
    environment: z.string(),
  })

  const body = registerOrgBodySchema.parse(request.body)

  await request.jwtVerify()

  const org_id = request.user.sub

  try {
    const registerPetService = makeRegisterPetService()

    await registerPetService.execute({
      ...body,
      org_id,
    })
  } catch (err) {
    if (err instanceof OrgNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }

  reply.status(201).send()
}