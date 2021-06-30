import { forwardRef, Module } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { UserController } from './user.controller'
import { UsersService } from './users.service'

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
