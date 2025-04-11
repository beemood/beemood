import { RestAuthBuilder } from '@bmod/rest';
import { ForgotPasswordDto } from './dto/forgot-password.dto.js';
import { LoginOtpDto } from './dto/login-otp.js';
import { LoginResponseDto } from './dto/login-response.js';
import { LoginDto } from './dto/login.dto.js';
import { ResetPasswordDto } from './dto/reset-password..js';
import { SignupDto } from './dto/signup.dto.js';

export const AuthRest = new RestAuthBuilder({
  forgotPasswordDto: ForgotPasswordDto,
  loginDto: LoginDto,
  loginResponseDto: LoginResponseDto,
  loginWithOpt: LoginOtpDto,
  resetPasswordDto: ResetPasswordDto,
  signupDto: SignupDto,
});
