import Fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from 'fastify';
import axios from 'axios';
import config from 'src/config';
import { IExternalNodeConfig } from 'src/libs/proxeus-node/interfaces/proxeus.interface';

class ProxeusNode {
  private server: FastifyInstance;

  constructor() {
    this.setupNodeServer();
  }

  /**
   * Setup a server for the incoming connection
   * @returns {void}
   */
  private setupNodeServer(): void {
    this.server = Fastify({
      logger: true,
    });
    this.server.get('/health', this.onHealth);
    this.server.post('/node/:id/next', this.onNext);
    this.server.get('/node/:id/config', this.nop);
    this.server.post('/node/:id/config', this.nop);
    this.server.post('/node/:id/remove', this.nop);
    this.server.post('/node/:id/close', this.nop);
  }

  /**
   * Register node to the core proxeus server
   * @returns {Promise<void>}
   */
  public async register(
    id: string = config.PROXEUS_NODE_ID,
    name: string = config.PROXEUS_NODE_NAME,
    description: string = config.PROXEUS_NODE_DESCRIPTION,
    secret: string = config.PROXEUS_NODE_JWT_SECRET,
  ): Promise<void> {
    await this.server.listen({ port: config.PORT });

    const nodeUrl =
      config.PROXEUS_NODE_URL ?? `http://localhost:${config.PORT}`;

    const nodeConfig: IExternalNodeConfig = {
      ID: id,
      Name: name,
      Detail: description,
      Url: nodeUrl,
      Secret: secret,
    };

    const request = await axios.post(
      `${config.PROXEUS_CORE_URL}/api/admin/external/register`,
      nodeConfig,
    );

    console.log(request);
  }

  public async nop() {
    return null;
  }

  public async onHealth(...args) {
    console.log('onHealt', args);
  }

  public async onNext(request: FastifyRequest, reply: FastifyReply) {
    console.log('onNext', request.body);

    return { firstname: 'Alex' };
  }

  public async onClose(request: FastifyRequest, reply: FastifyReply) {
    console.log('onClose', request.body);

    return null;
  }
}

export default new ProxeusNode();
