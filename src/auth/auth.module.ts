import { forwardRef, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UsersModule } from 'src/users/users.module'
import { jwtConstants } from './auth.constants'
import { AuthService } from './auth.service'
import { FacebookStrategy } from './strategies/facebook.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '6000s',
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, FacebookStrategy],
  exports: [AuthService],
})
export class AuthModule {}
