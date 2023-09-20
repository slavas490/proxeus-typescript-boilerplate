import {
  HandlerReply,
  OnNextHandlerRequest,
} from 'src/common/types/handler.type';
import { IOnNextHandlerResponse } from 'src/common/interfaces/handler.interface';
import { ProxeusOnOperationResponse } from 'src/libs/proxeus-node/types/response.type';

/**
 * On next handler function
 * @param {OnNextHandlerRequest} request - Webserver request from the Proxeus core
 * @param {HandlerReply} reply - Webserver reply to the Proxeus core
 * @returns {Promise<ProxeusOnOperationResponse>}
 */
export async function OnNextHandler(
  request: OnNextHandlerRequest,
  reply: HandlerReply,
): Promise<ProxeusOnOperationResponse> {
  const body = request.body;

  const eurUsdPrice = Math.random() * 0.15 + 0.95;

  const output: IOnNextHandlerResponse = { eur_usd_price: eurUsdPrice };

  if (typeof body?.my_custom_field === 'string') {
    output.my_custom_field = body.my_custom_field.toUpperCase();
  }

  return output;
}
