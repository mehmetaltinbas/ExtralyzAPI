import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request as ExpressRequest } from 'express';
import JwtPayload from './types/jwt-payload.interface';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private configService: ConfigService,
        private jwtService: JwtService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // console.log("authguard hit!");
        const request: ExpressRequest = context.switchToHttp().getRequest();
        let token;
        token = this.extractTokenFromHeader(request);
        // console.log(`token: ${token}`);
        if (!token) {
            token = this.extractTokenFromCookie(request);
            // console.log(`token: ${token}`);
            if (!token) {
                throw new UnauthorizedException();
            }
        }
        try {
            // console.log(`passed to token verification`);
            const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>('JWT_SECRET'),
            });
            // We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: ExpressRequest): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    private extractTokenFromCookie(request: ExpressRequest): string | undefined {
        const jwtCookieName = this.configService.get<string>('JWT_COOKIE_NAME');
        if (jwtCookieName !== undefined && request.cookies) {
            const token = (request.cookies as Record<string, string>)[jwtCookieName];
            return token;
        } else {
            return undefined;
        }
    }
}
