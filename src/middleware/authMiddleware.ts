import { Request } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { prisma } from '../config/prisma';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export class UnauthorizedError extends Error {
  public readonly statusCode = 401;

  public constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

const jwtSecret = process.env.JWT_SECRET ?? 'development-secret-change-me';

export async function expressAuthentication(request: Request, securityName: string): Promise<void> {
  if (securityName !== 'bearerAuth') {
    throw new UnauthorizedError('Unsupported authentication scheme');
  }

  const authorization = request.header('authorization');
  const [scheme, token] = authorization?.split(' ') ?? [];

  if (scheme?.toLowerCase() !== 'bearer' || !token) {
    throw new UnauthorizedError('Authorization bearer token is required');
  }

  try {
    const payload = verify(token, jwtSecret);
    const userId = typeof payload === 'string'
      ? undefined
      : (payload as JwtPayload).id;

    if (typeof userId !== 'string') {
      throw new UnauthorizedError('Invalid authorization token');
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedError('Token user no longer exists');
    }

    request.userId = user.id;
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      throw error;
    }

    const message = error instanceof Error && error.name === 'TokenExpiredError'
      ? 'Authorization token has expired'
      : 'Invalid authorization token';
    throw new UnauthorizedError(message);
  }
}
