import * as mongoose from 'mongoose'

export const StatesSchema = new mongoose.Schema({
  state_id: { type: Number, required: true },
  state_name: { type: String, required: true },
})

export const DistrictsSchema = new mongoose.Schema({
  district_id: { type: Number, required: true },
  district_name: { type: String, required: true },
})
