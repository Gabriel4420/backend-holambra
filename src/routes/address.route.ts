import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

import { AddressController } from 'controllers/address'

export const addressRoutes = async (app: FastifyInstance) => {
  const address = new AddressController()

  app.post(
    '/address/register',
    async (request: FastifyRequest, reply: FastifyReply) =>
      await address.create(request, reply),
  )

  app.patch(
    '/address/update/:id',
    async (request: FastifyRequest, reply: FastifyReply) =>
      await address.update(request, reply),
  )

  app.delete(
    '/addresses/delete/:id',
    async (request: FastifyRequest, reply: FastifyReply) =>
      await address.delete(request, reply),
  )

  app.get('/addresses', async () => await address.findManyAddresses())

  app.get(
    '/addresses/:id',
    async (request: FastifyRequest, reply: FastifyReply) =>
      address.findOneAddress(request, reply),
  )
}
