import { FastifyReply, FastifyRequest } from 'fastify';
import { ProxeusOnOperationResponse } from 'src/libs/proxeus-node/types/response.type';

/**
 * On get config handler function
 * @param {FastifyRequest} request - Webserver request from the Proxeus core
 * @param {FastifyReply} reply - Webserver reply to the Proxeus core
 * @returns {Promise<ProxeusOnOperationResponse>}
 */
export async function OnGetConfigHandler(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<ProxeusOnOperationResponse> {
  return null;
}
