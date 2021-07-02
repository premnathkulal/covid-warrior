import * as mongoose from 'mongoose'

export interface AppointmentCenter extends mongoose.Document {
  center_id: number
  name: string
  address: string
  state_name: string
  district_name: string
  block_name: string
  pincode: number
  from: string
  to: string
  lat: number
  long: number
  fee_type: string
  session_id: string
  date: string
  available_capacity: number
  available_capacity_dose1: number
  available_capacity_dose2: number
  fee: string
  allow_all_age: boolean
  min_age_limit: number
  vaccine: string
  slots: string[]
}
