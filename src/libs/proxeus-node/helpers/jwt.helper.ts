import jwt, { JwtPayload, VerifyOptions } from 'jsonwebtoken';

/**
 * Verifies JWT token
 * @param {string} token - JWT token to verify
 * @param {string} secret - JWT secret
 * @param {VerifyOptions} options - Extra options for verifying
 * @returns {JwtPayload|null} - JWT payload or null if token is invalid
 */
export function jwtVerify(
  token: string,
  secret: string,
  options?: VerifyOptions,
): JwtPayload | null {
  try {
    return jwt.verify(token, secret, options) as JwtPayload;
  } catch {
    return null;
  }
}
