import * as mongoose from 'mongoose'
export class User extends mongoose.Document {
  id: string
  name: string
  username: string
  password: string
}
