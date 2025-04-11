import { Body, SessionId, UserId } from '@bmod/rest';
import { Inject } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { ForgotPasswordDto } from './dto/forgot-password.dto.js';
import { LoginOtpDto } from './dto/login-otp.js';
import { LoginDto } from './dto/login.dto.js';
import { ResetPasswordDto } from './dto/reset-password..js';
import { SignupDto } from './dto/signup.dto.js';

import { RestAuthBuilder } from '@bmod/rest';
import { LoginResponseDto } from './dto/login-response.js';

export const R = new RestAuthBuilder({
  forgotPasswordDto: ForgotPasswordDto,
  loginDto: LoginDto,
  loginResponseDto: LoginResponseDto,
  loginWithOpt: LoginOtpDto,
  resetPasswordDto: ResetPasswordDto,
  signupDto: SignupDto,
});

@R.Controller()
export class AuthController {
  constructor(
    @Inject(AuthService) protected readonly authService: AuthService
  ) {}

  @R.Signup()
  async signup(@Body() dto: SignupDto) {
    return await this.authService.signup(dto);
  }

  @R.Login()
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  @R.LoginOtp()
  async loginOtp(@Body() dto: LoginOtpDto) {
    return await this.authService.loginOtp(dto);
  }

  @R.Logout()
  logout(@SessionId() sessionId: number) {
    return this.authService.logout(sessionId);
  }

  @R.LogoutAll()
  async logoutAll(@UserId() userId: number) {
    return await this.authService.logoutAll(userId);
  }

  @R.ForgotPassword()
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return await this.authService.forgotPassword(dto);
  }

  @R.ResetPassword()
  async resetPassword(@UserId() userId: number, @Body() dto: ResetPasswordDto) {
    return await this.authService.resetPassword(userId, dto);
  }
}
