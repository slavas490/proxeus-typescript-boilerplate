import OpenAI from 'openai';
import config from 'src/config';

export class OpenAIClient {
  private readonly client: OpenAI;

  /**
   * @constructor
   */
  constructor() {
    this.client = new OpenAI({
      apiKey: config.OPENAI_API_KEY,
    });
  }

  /**
   * Creates a model response for the given chat conversation
   * @param {string} content - Content data to make completion for (as a user role)
   * @param {OpenAI.ChatModel} chatModel - OpenAI chat model
   * @returns {Promise<OpenAI.Chat.Completions.ChatCompletion>} OpenAI response with completion message
   */
  public async completion(
    content: string,
    chatModel: OpenAI.ChatModel = 'gpt-3.5-turbo',
  ): Promise<OpenAI.Chat.Completions.ChatCompletion> {
    const completion = await this.client.chat.completions.create({
      model: chatModel,
      messages: [{ role: 'user', content }],
    });

    return completion;
  }

  /**
   * Retrieves a list of the possible OpenAI chat models
   * @returns {Promise<OpenAI.Models.ModelsPage>} Models list
   */
  public async models(): Promise<OpenAI.Models.ModelsPage> {
    return this.client.models.list();
  }
}
