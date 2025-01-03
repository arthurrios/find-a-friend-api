import type { FastifyInstance } from 'fastify'
import { registerOrg } from './register-org'
import { authenticateOrg } from './authenticate-org'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', registerOrg)
  app.post('/sessions', authenticateOrg)
}