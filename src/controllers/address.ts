import { z } from 'zod'
import { prisma } from '../infra/conn'
import { FastifyReply, FastifyRequest } from 'fastify'

export class AddressController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const createAddressBody = z.object({
      country: z.string(),
      state: z.string(),
      district: z.string(),
      numberStreet: z.string(),
      street: z.string(),
      city: z.string(),
    })

    const {
      country,
      state,
      district,
      numberStreet,
      street,
      city,
    } = createAddressBody.parse(request.body)

    const address = await prisma.address.create({
      data: { country, state, district, numberStreet, street, city },
    })

    reply.code(201)

    return { address }
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const addressId = z.object({ id: z.string().uuid() })

    const { id } = addressId.parse(request.params)

    const createAddressBody = z.object({
      country: z.string(),
      state: z.string(),
      district: z.string(),
      numberStreet: z.string(),
      street: z.string(),
      city: z.string(),
    })

    const {
      country,
      state,
      district,
      numberStreet,
      street,
      city,
    } = createAddressBody.parse(request.body)

    try {
      const address = await prisma.address.update({
        where: {
          id,
        },
        data: {
          country,
          state,
          district,
          numberStreet,
          street,
          city,
        },
      })

      reply.code(200)

      return { address }
    } catch (error) {
      console.error(error)
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const addressId = z.object({ id: z.string().uuid() })

    const { id } = addressId.parse(request.params)

    const address = await prisma.address.delete({
      where: {
        id,
      },
    })

    reply.status(204)

    return { address }
  }

  async findManyAddresses() {
    const addresses = await prisma.address.findMany()

    return { addresses }
  }

  async findOneAddress(request: FastifyRequest, reply: FastifyReply) {
    const addressId = z.object({ id: z.string().uuid() })

    const { id } = addressId.parse(request.params)

    let address = await prisma.prospect.findUnique({
      where: {
        id,
      },
    })

    reply.code(200)

    return { address }
  }
}
