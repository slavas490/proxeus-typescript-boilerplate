import {
  HandlerReply,
  OnNextHandlerRequest,
} from 'src/common/types/handler.type';
import { IOnNextHandlerResponse } from 'src/common/interfaces/handler.interface';
import { ProxeusOnOperationResponse } from 'src/libs/proxeus-node/types/response.type';
import { OpenAIClient } from 'src/libs/openai';

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

  if (typeof body?.openai_request === 'string') {
    const client = new OpenAIClient();
    const completion = await client.completion(body.openai_request);

    const content = completion?.choices?.[0]?.message?.content ?? null;

    if (content) {
      output.openai_response = content;
    }
  }

  return output;
}
