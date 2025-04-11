import { Hash, Otp } from '@bmod/crypto';
import { InjectDelegate } from '@bmod/prisma';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { User } from '@prisma/auth-api';
import { Prisma } from '@prisma/auth-api';
import type { ForgotPasswordDto } from './dto/forgot-password.dto.js';
import type { LoginOtpDto } from './dto/login-otp.js';
import type { LoginResponseDto } from './dto/login-response.js';
import type { LoginDto } from './dto/login.dto.js';
import type { ResetPasswordDto } from './dto/reset-password..js';
import type { SignupDto } from './dto/signup.dto.js';

@Injectable()
export class AuthService {
  constructor(
    @Inject(JwtService) protected readonly jwt: JwtService,
    @InjectDelegate(Prisma.ModelName.User)
    protected readonly userRepo: Prisma.UserDelegate,
    @InjectDelegate(Prisma.ModelName.UserSession)
    protected readonly userSessionRepo: Prisma.UserSessionDelegate,

    @InjectDelegate(Prisma.ModelName.Subscription)
    protected readonly subscriptionRepo: Prisma.SubscriptionDelegate
  ) {}

  protected async findUserByUsername(username: string) {
    return await this.userRepo.findUniqueOrThrow({ where: { username } });
  }

  protected async comparePassword(password: string, hashedPassword: string) {
    const passwordMatch = await Hash.compare(password, hashedPassword);
    if (passwordMatch) {
      return true;
    }
    throw new BadRequestException('Wrong password');
  }

  protected async updateOtp(username: string) {
    const foundUser = await this.findUserByUsername(username);
    const { otp, secret } = await Otp.generate();
    await this.userRepo.update({
      where: { id: foundUser.id },
      data: { otp: `${otp}::${secret}` },
    });
    return foundUser;
  }

  protected async verifyOtp(username: string, otp: string) {
    const foundUser = await this.userRepo.findUniqueOrThrow({
      where: { username, otp: { startsWith: otp + '::' } },
    });
    if (!foundUser.otp)
      throw new NotFoundException(`User does not have one time password`);

    if (!Otp.verify(foundUser.otp))
      throw new BadRequestException('Otp is expired');

    return foundUser;
  }

  async createUserSession(user: User) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 7);
    return await this.userSessionRepo.create({
      data: {
        expiration: currentDate,
        userId: user.id,
      },
    });
  }

  async login(dto: LoginDto): Promise<LoginResponseDto> {
    const foundUser = await this.findUserByUsername(dto.username);
    await this.comparePassword(dto.password, foundUser.password);
    const newSession = await this.createUserSession(foundUser);
    const token = await this.jwt.signAsync({ sub: newSession.id });
    return { token };
  }

  async loginOtp(dto: LoginOtpDto): Promise<LoginResponseDto> {
    const foundUser = await this.verifyOtp(dto.username, dto.otp);
    const newSession = await this.createUserSession(foundUser);
    const token = await this.jwt.signAsync({ sub: newSession.id });
    return { token };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    await this.updateOtp(dto.username);
    return { message: 'Check you email' };
  }

  async resetPassword(userId: number, dto: ResetPasswordDto) {
    await this.userRepo.update({
      where: { id: userId },
      data: { password: dto.password },
    });
    return { message: 'Updated password' };
  }

  async signup(dto: SignupDto) {
    await this.subscriptionRepo.create({
      data: {
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        subscriptionType: 'new',
      },
    });

    const passwordHash = await Hash.hash('password');
    await this.userRepo.create({
      data: { username: dto.email, password: passwordHash },
    });

    return { message: 'Welcome, we will be in touch soon.' };
  }

  async logout(sessionId: number) {
    return await this.userSessionRepo.delete({
      where: { id: sessionId },
      select: { id: true },
    });
  }

  async logoutAll(userId: number) {
    return await this.userSessionRepo.deleteMany({ where: { userId } });
  }
}
