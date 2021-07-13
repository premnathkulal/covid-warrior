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
