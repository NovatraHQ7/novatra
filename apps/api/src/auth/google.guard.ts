import {
  ExecutionContext,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { isGoogleOauthConfigured } from './google.strategy';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  canActivate(context: ExecutionContext) {
    if (!isGoogleOauthConfigured(process.env)) {
      throw new ServiceUnavailableException(
        'Google OAuth is not configured on this server.',
      );
    }
    return super.canActivate(context);
  }
}
