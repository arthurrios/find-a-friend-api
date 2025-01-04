import { OrgAlreadyExistsError } from '@/services/errors/org-already-exists-error'
import { makeRegisterService } from '@/services/factories/make-register-service'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerOrg(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerOrgBodySchema = z.object({
    name: z.string(),
    owner_name: z.string(),
    email: z.string().email(),
    whatsapp: z.string(),
    password: z.string(),
    cep: z.string(),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  })

  const body = registerOrgBodySchema.parse(request.body)

  try {
    const registerService = makeRegisterService()

    const { org } = await registerService.execute(body)
    return reply.status(201).send(org)
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
