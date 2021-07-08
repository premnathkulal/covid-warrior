import { HttpException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { RegisterResponse, RegisterInput } from './dto/register.dto'
import { User } from './dto/user.dto'
import { UserDocument } from './schemas/user.schema'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly userModule: Model<UserDocument>,
  ) {}

  async findUser(userName: string): Promise<User | undefined> {
    const user = await this.userModule.findOne({
      username: userName,
    })
    return user as User
  }

  async registerUser(userDetail: RegisterInput): Promise<RegisterResponse> {
    if (!userDetail.username) {
      this.httpException('User name required', 400)
    }
    if (!userDetail.password) {
      this.httpException('Password required', 400)
    }

    const isUserExists = await this.findUser(userDetail.username)
    if (!!isUserExists) {
      this.httpException('User name already exists', 409)
    }

    const newUser = new this.userModule({
      name: userDetail.name,
      username: userDetail.username,
      password: userDetail.password,
    })
    const result = await newUser.save()
    return {
      response: 'created',
      statusCode: 201,
    }
  }

  private httpException(exception: string, statusCode: number) {
    throw new HttpException(exception, statusCode)
  }
}
