import * as mongoose from 'mongoose'
export interface User extends mongoose.Document {
  id: string
  name: string
  username: string
  password: string
}

export interface RegisterResponse {
  response: string
  statusCode: number
}
