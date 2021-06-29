export interface States {
  state_id: number
  state_name: string
}

export interface Districts {
  state_id: number
  districts: District[]
}

export interface District {
  district_id: number
  district_name: string
}
