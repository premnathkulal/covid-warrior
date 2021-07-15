interface PropertyValues {
  value: string
  error: string
}

export interface LoginDetails {
  username: PropertyValues
  password: PropertyValues
}

export interface RegisterDetails {
  name: PropertyValues
  username: PropertyValues
  password: PropertyValues
}

export interface StateWiseUpdates {
  active: string
  confirmed: string
  deaths: string
  deltaconfirmed: string
  deltadeaths: string
  deltarecovered: string
  lastupdatedtime: string
  migratedother: string
  recovered: string
  state: string
  statecode: string
  statenotes: string
}
