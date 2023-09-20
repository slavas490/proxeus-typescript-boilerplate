import { FastifyReply, FastifyRequest } from 'fastify';
import { ProxeusOnOperationResponse } from 'src/libs/proxeus-node/types/response.type';

export type ProxeusOperationHandler<T = ProxeusOnOperationResponse> = (
  request: FastifyRequest,
  reply: FastifyReply,
) => Promise<T>;

export type HandlerReply = FastifyReply;

export type OnNextHandlerRequest = FastifyRequest<{
  Body: {
    my_custom_field?: string;
  };
}>;
