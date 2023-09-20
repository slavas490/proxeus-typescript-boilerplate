import { FastifyRequest } from 'fastify';

export type AuthorizeRequest = FastifyRequest<{
  Params: { id: string };
  Querystring: { auth: string };
}>;
