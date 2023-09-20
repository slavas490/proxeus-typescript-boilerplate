import axios from 'axios';
import config from 'src/config';
import Fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
  FastifyError,
} from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { jwtVerify } from 'src/libs/proxeus-node/helpers/jwt.helper';
import { IExternalNodeConfig } from 'src/libs/proxeus-node/interfaces/proxeus.interface';
import { AuthorizeRequest } from 'src/libs/proxeus-node/types/request.type';
import {
  BaseHttpException,
  UnauthorizedException,
} from 'src/libs/proxeus-node/exceptions/http.exception';
import { ProxeusOperationHandler } from 'src/common/types/handler.type';
import {
  NodeServerException,
  ProxeusCoreConnectionException,
} from 'src/libs/proxeus-node/exceptions/basic.exception';

class ProxeusNode {
  private server: FastifyInstance;

  private onNextHandler: ProxeusOperationHandler = this.nopHandler;
  private onGetConfigHandler: ProxeusOperationHandler = this.nopHandler;
  private onSetConfigHandler: ProxeusOperationHandler = this.nopHandler;
  private onRemoveHandler: ProxeusOperationHandler = this.nopHandler;
  private onCloseHandler: ProxeusOperationHandler = this.nopHandler;

  /**
   * @constructor
   */
  constructor() {
    this.setupNodeServer();
  }

  /**
   * Setup a webserver for the incoming connection
   * @returns {void}
   */
  private setupNodeServer(): void {
    this.server = Fastify({
      logger: true,
    });

    this.server.get('/health', this.onHealthHandler);

    this.server.register(
      (instance, opts, next) => {
        instance.addHook('preParsing', this.authorizeRequest);

        instance.post('/next', this.onNextHandler);
        instance.get('/config', this.onGetConfigHandler);
        instance.post('/config', this.onSetConfigHandler);
        instance.post('/remove', this.onRemoveHandler);
        instance.post('/close', this.onCloseHandler);

        next();
      },
      { prefix: '/node/:id' },
    );

    this.server.setErrorHandler(this.serverErrorHandler);
  }

  /**
   * Fastify exception handler
   * @param {FastifyError} error
   * @param {FastifyRequest} request
   * @param {FastifyReply} reply
   * @returns {void}
   */
  private serverErrorHandler(
    error: FastifyError,
    request: FastifyRequest,
    reply: FastifyReply,
  ): void {
    if (error instanceof BaseHttpException) {
      reply.code(error.statusCode).send({
        error: error.message,
      });
    } else {
      reply.send(error);
    }
  }

  /**
   * Authorize incoming request from core
   * @param {AuthorizeRequest} request - Object with authorization params
   * @throws {UnauthorizedException}
   * @returns {Promise<void>}
   */
  private async authorizeRequest(request: AuthorizeRequest): Promise<void> {
    const id = request.params.id;
    const token = request.query.auth;

    const parsedJWT = jwtVerify(token, config.PROXEUS_NODE_JWT_SECRET);

    if (parsedJWT?.jti === id) {
      return;
    }

    throw new UnauthorizedException();
  }

  /**
   * Register node to the core proxeus server
   * @throws {NodeServerException} Unable to start a server for incomming connections from the Proxeus core server
   * @throws {ProxeusCoreConnectionException} Unable to connect to the Proxeus core server
   * @returns {Promise<boolean>} Returns true if everything is running without exceptions
   */
  public async register(
    id: string = config.PROXEUS_NODE_ID,
    name: string = config.PROXEUS_NODE_NAME,
    description: string = config.PROXEUS_NODE_DESCRIPTION,
    secret: string = config.PROXEUS_NODE_JWT_SECRET,
  ): Promise<boolean> {
    try {
      await this.server.listen({ port: config.PORT });
    } catch (error) {
      throw new NodeServerException(error);
    }

    const nodeUrl =
      config.PROXEUS_NODE_URL ?? `http://localhost:${config.PORT}`;

    const nodeConfig: IExternalNodeConfig = {
      ID: id,
      Name: name,
      Detail: description,
      Url: nodeUrl,
      Secret: secret,
    };

    try {
      const request = await axios.post(
        `${config.PROXEUS_CORE_URL}/api/admin/external/register`,
        nodeConfig,
      );

      if (request.status === StatusCodes.OK) {
        return true;
      }
    } catch (error) {
      throw new ProxeusCoreConnectionException(error);
    }
  }

  /**
   * No operation default handler
   * @returns {null}
   */
  public nopHandler(): null {
    return null;
  }

  /**
   * On health default handler
   * @returns {boolean}
   */
  public onHealthHandler(): boolean {
    return true;
  }

  /**
   * Set onNext operation handler
   * @param {ProxeusOperationHandler} handler
   * @returns {void}
   */
  public setOnNextHandler(handler: ProxeusOperationHandler): void {
    this.onNextHandler = handler;
  }

  /**
   * Set onGetConfig operation handler
   * @param {ProxeusOperationHandler} handler
   * @returns {void}
   */
  public setOnGetConfigHandler(handler: ProxeusOperationHandler): void {
    this.onGetConfigHandler = handler;
  }

  /**
   * Set onSetConfig operation handler
   * @param {ProxeusOperationHandler} handler
   * @returns {void}
   */
  public setOnSetConfigHandler(handler: ProxeusOperationHandler): void {
    this.onSetConfigHandler = handler;
  }

  /**
   * Set onRemove operation handler
   * @param {ProxeusOperationHandler} handler
   * @returns {void}
   */
  public setOnRemoveHandler(handler: ProxeusOperationHandler): void {
    this.onRemoveHandler = handler;
  }

  /**
   * Set onClose operation handler
   * @param {ProxeusOperationHandler} handler
   * @returns {void}
   */
  public setOnCloseHandler(handler: ProxeusOperationHandler): void {
    this.onCloseHandler = handler;
  }
}

export default new ProxeusNode();
