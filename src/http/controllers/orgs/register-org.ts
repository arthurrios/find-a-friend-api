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
    whatsapp: z.string().min(11),
    password: z.string().min(6),
    cep: z.string().min(8),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  })

  const {
    name,
    owner_name,
    email,
    whatsapp,
    password,
    cep,
    state,
    city,
    neighborhood,
    street,
    latitude,
    longitude,
  } = registerOrgBodySchema.parse(request.body)

  try {
    const registerService = makeRegisterService()

    await registerService.execute({
      name,
      owner_name,
      email,
      whatsapp,
      password,
      cep,
      state,
      city,
      neighborhood,
      street,
      latitude,
      longitude,
    })
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  reply.status(201).send()
}
