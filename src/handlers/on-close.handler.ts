import { FastifyReply, FastifyRequest } from 'fastify';
import { ProxeusOnOperationResponse } from 'src/libs/proxeus-node/types/response.type';

/**
 * On close handler function
 * @param {FastifyRequest} request - Webserver request from the Proxeus core
 * @param {FastifyReply} reply - Webserver reply to the Proxeus core
 * @returns {Promise<ProxeusOnOperationResponse>}
 */
export async function OnCloseHandler(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<ProxeusOnOperationResponse> {
  return null;
}
