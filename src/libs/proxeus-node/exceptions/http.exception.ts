import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { IHttpException } from 'src/libs/proxeus-node/interfaces/http-exception.interface';

export class BaseHttpException implements IHttpException {
  constructor(readonly statusCode: number, readonly message: string) {}
}

export class UnauthorizedException extends BaseHttpException {
  constructor() {
    super(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
  }
}
