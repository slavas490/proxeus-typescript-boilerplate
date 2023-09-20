import { FastifyReply, FastifyRequest } from 'fastify';
import { ProxeusOnOperationResponse } from 'src/libs/proxeus-node/types/response.type';

/**
 * On remove handler function
 * @param {FastifyRequest} request - Webserver request from the Proxeus core
 * @param {FastifyReply} reply - Webserver reply to the Proxeus core
 * @returns {Promise<ProxeusOnOperationResponse>}
 */
export async function OnRemoveHandler(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<ProxeusOnOperationResponse> {
  return null;
}
