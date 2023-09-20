import { ErrorDetailed } from 'src/libs/proxeus-node/types/exception.type';

export class NodeServerException extends Error {
  public readonly code: string;

  constructor(error: ErrorDetailed) {
    super(`Unable to start a Node server: ${error.message}`);

    this.code = error.code;
  }
}

export class ProxeusCoreConnectionException extends Error {
  public readonly code: string;

  constructor(error: ErrorDetailed) {
    super(
      `Unable to create a connection with Proxeus Core server: ${error.message}`,
    );

    this.code = error.code;
  }
}
