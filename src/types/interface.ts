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

export interface BeneficiaryDetails {
  name: PropertyValues
  birthDate: PropertyValues
  gender: PropertyValues
  photoIdType: PropertyValues
  idNumber: PropertyValues
}

export interface BeneficiaryDetailsResponse {
  name: string
  birth_year: string
  comorbidity_ind: string
  consent_version: string
  gender_id: string
  id: string
  photo_id_number: string
  photo_id_type: string
  scheduled: boolean
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

export interface Address {
  countryCode: string
  countrySubdivision: string
  countrySecondarySubdivision: string
  municipality: string
  postalCode: string
  country: string
  countryCodeISO3: string
  freeformAddress: string
  localName: string
  position?: string
}
export interface FullAddress {
  address: Address
  position: string
}

export interface Position {
  lat: number
  lon: number
}

export interface Multimedia {
  url: string
}

export interface TopNews {
  section: string
  title: string
  url: string
  byline: string
  published_date: string
  multimedia: Multimedia[]
}

export interface VaccinationCenter {
  address: string
  block_name: string
  center_id: number
  date: string
  district_name: string
  fee: string
  fee_type: string
  lat: number
  long: number
  name: string
  pincode: number
  slots: string[]
  state_name: string
  vaccine: string
}

export interface VaccinationCenterFilter {
  date: string
  district?: string
  state?: string
  pincode?: string
  lat?: number
  lon?: number
}

export interface State {
  id: string
  state_id: number
  state_name: string
}

export interface Districts {
  district_id: number
  district_name: string
}

export interface PinCode {
  name: string
  pincode: number
}

export interface ProfileInfo {
  id: string
  name: string
  username: string
}

export interface ScheduleInfo {
  beneficiaryId: string
  centerAddress: string
  centerID: string
  centerName: string
  date: string
  pincode: string
  slot: string | string[]
  vaccine: string
}

export interface CreateUpdateSchedule {
  beneficiaryId: string
  centerId: string
  date: string
  slot: string
  vaccine: string
}
