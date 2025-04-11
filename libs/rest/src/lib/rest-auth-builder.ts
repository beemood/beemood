import type { Type } from '@nestjs/common';
import { Controller, Delete, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from './metadata.js';

export type RestAuthBuilderOptions = {
  loginDto: Type;
  loginWithOpt: Type;
  loginResponseDto: Type;
  signupDto: Type;
  forgotPasswordDto: Type;
  resetPasswordDto: Type;
};

export class RestAuthBuilder {
  constructor(protected readonly options: RestAuthBuilderOptions) {}

  Controller(path = 'auth'): ClassDecorator {
    return (...args) => {
      Controller(path)(...args);
      ApiTags(args[0].name)(...args);
      ApiBearerAuth()(...args);
    };
  }

  Login(): MethodDecorator {
    return (...args) => {
      ApiOperation({ summary: 'Login' })(...args);
      ApiOkResponse()(...args);
      Public()(...args);
      Post('login')(...args);
    };
  }

  LoginOtp(): MethodDecorator {
    return (...args) => {
      ApiOperation({ summary: 'Login with otp(one time password)' })(...args);
      ApiOkResponse()(...args);
      Public()(...args);
      Post('login-otp')(...args);
    };
  }

  ForgotPassword(): MethodDecorator {
    return (...args) => {
      ApiOperation({ summary: 'Request password recovery' })(...args);
      ApiOkResponse()(...args);
      Public()(...args);
      Post('forgot-password')(...args);
    };
  }

  ResetPassword(): MethodDecorator {
    return (...args) => {
      ApiOperation({ summary: 'Reset password' })(...args);
      ApiOkResponse()(...args);
      Post('reset-password')(...args);
    };
  }

  Logout(): MethodDecorator {
    return (...args) => {
      ApiOperation({ summary: 'Logout from current session' })(...args);
      ApiOkResponse()(...args);
      Delete('logout')(...args);
    };
  }

  LogoutAll(): MethodDecorator {
    return (...args) => {
      ApiOperation({ summary: 'Logout all sessions' })(...args);
      ApiOkResponse()(...args);
      Delete('logout-all')(...args);
    };
  }

  Signup(): MethodDecorator {
    return (...args) => {
      ApiOperation({ summary: 'Signup for a service' })(...args);
      ApiOkResponse()(...args);
      Public()(...args);
      Post('signup')(...args);
    };
  }

  CreateUser(): MethodDecorator {
    return (...args) => {
      ApiOperation({ summary: 'Create new user' })(...args);
      ApiOkResponse()(...args);
      Public()(...args);
      Post('user')(...args);
    };
  }

  RevokeSession(): MethodDecorator {
    return (...args) => {
      ApiOperation({ summary: 'Revoke a session' })(...args);
      ApiOkResponse()(...args);
      Public()(...args);
      Post('revoke-session')(...args);
    };
  }

  RevokeAllSessions(): MethodDecorator {
    return (...args) => {
      ApiOperation({ summary: 'Revoke all sessions' })(...args);
      ApiOkResponse()(...args);
      Public()(...args);
      Post('revoke-all-session')(...args);
    };
  }
}
