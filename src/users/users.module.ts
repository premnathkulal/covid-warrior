import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from 'src/auth/auth.module'
import { StatesDistrictsModule } from 'src/states-districts/states-districts.module'
import { UserSchema } from './schemas/user.schema'
import { UserController } from './user.controller'
import { UserResolver } from './user.resolver'
import { UsersService } from './users.service'

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => StatesDistrictsModule),
    MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UsersService, UserResolver],
  exports: [UsersService],
})
export class UsersModule {}
