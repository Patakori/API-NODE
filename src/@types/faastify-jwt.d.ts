import "@fastify/jwt"

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    // payload: { id: number }
    user: {
      sub: string,
    }
  }
}

// fastify.get('/', async (request, reply) => {
//   request.user.name
//   const token = await reply.jwtSign({
//     id: '123'
//   })
// })
