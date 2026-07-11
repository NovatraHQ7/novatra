import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

  async sendPasswordReset(params: { to: string; url: string }) {
    const from = process.env.EMAIL_FROM || 'Novatra <no-reply@novatrahq.com>';
    const subject = 'Reset your Novatra password';
    const html = `
      <div style="font-family: ui-sans-serif, system-ui; line-height:1.5">
        <h2 style="margin:0 0 12px 0">Reset your password</h2>
        <p style="margin:0 0 12px 0">Click the link below to reset your password. This link expires in 30 minutes.</p>
        <p style="margin:0 0 12px 0"><a href="${params.url}">Reset password</a></p>
        <p style="margin:0; color:#666">If you didn’t request this, you can ignore this email.</p>
      </div>
    `;

    if (!this.resend) {
      this.logger.warn(
        `RESEND_API_KEY not set. Password reset email not sent. Link: ${params.url}`,
      );
      return;
    }

    await this.resend.emails.send({
      from,
      to: params.to,
      subject,
      html,
    });
  }
}
