import { RestAuthBuilder } from '@bmod/rest';
import { LoginDto } from './dto/login.dto.js';
import { ProfileDto } from './dto/profile.dto.js';

const R = new RestAuthBuilder({
  loginDto: LoginDto,
  profileDto: ProfileDto,
});

@R.Controller()
export class AuthController {
  @R.Login()
  login() {
    return { some: 'login' };
  }

  @R.Profile()
  profile() {
    return { name: 'profile ' };
  }
}
