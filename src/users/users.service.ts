import { Injectable } from '@nestjs/common'
import { User } from './interfaces/user.interface'

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    { id: 1, name: 'Bran Stark', username: 'brans', password: 'bran123' },
    { id: 2, name: 'Jhon Snow', username: 'snowman', password: 'snow123' },
  ]

  async findUser(userName: string): Promise<User | undefined> {
    return this.users.find(user => userName === user.username)
  }
}
