import {
  BeneficiaryDetails,
  CreateUpdateSchedule,
  LoginDetails,
  RegisterDetails,
} from '@/types/interface'
import axios, { AxiosResponse } from 'axios'
import axiosApi from '@/utils/axiosInterceptor'

const TOM_TOM_API = 'https://api.tomtom.com/search/2/'
const COVID_19_API = 'https://api.covid19india.org/data.json'
const NEWS_API = 'https://api.nytimes.com/svc/'
const COVID_WARRIOR_API = 'http://localhost:3000/'

const getUpdates = (): Promise<AxiosResponse> => {
  const BASE_URL = COVID_19_API
  return axios.get<AxiosResponse>(BASE_URL)
}

const getAddressDetails = (
  lat: number,
  lon: number
): Promise<AxiosResponse> => {
  const BASE_URL = TOM_TOM_API
  return axios.get<AxiosResponse>(
    `${BASE_URL}reverseGeocode/${lat}%2c${lon}.json?key=${process.env.VUE_APP_TOM_TOM_API_KEY}`
  )
}

const topStoriesAPI = (): Promise<AxiosResponse> => {
  const BASE_URL = NEWS_API
  return axios.get(
    `${BASE_URL}topstories/v2/health.json?api-key=${process.env.VUE_APP_NEWS_API_KEY}`
  )
}

const statesAPI = (): Promise<AxiosResponse> => {
  const BASE_URL = COVID_WARRIOR_API
  return axiosApi.get(`${BASE_URL}states-districts/states`)
}

const districtsAPI = (stateId: string): Promise<AxiosResponse> => {
  const BASE_URL = COVID_WARRIOR_API
  return axiosApi.get(`${BASE_URL}states-districts/districts/${stateId}`)
}

const pinCodesAPI = (districtId: string): Promise<AxiosResponse> => {
  const BASE_URL = COVID_WARRIOR_API
  return axiosApi.get(`${BASE_URL}states-districts/pincode/${districtId}`)
}

const vaccinationCentersAPI = (queryParam: string): Promise<AxiosResponse> => {
  const BASE_URL = COVID_WARRIOR_API
  return axiosApi.get(
    `${BASE_URL}vaccinationCenters/findVaccinationCenter?${queryParam}`
  )
}

const loginAPI = (authCredentials: LoginDetails): Promise<AxiosResponse> => {
  const BASE_URL = COVID_WARRIOR_API
  return axiosApi.post(`${BASE_URL}auth/login`, {
    username: authCredentials.username.value,
    password: authCredentials.password.value,
  })
}

const registerAPI = (userDetails: RegisterDetails): Promise<AxiosResponse> => {
  const BASE_URL = COVID_WARRIOR_API
  return axiosApi.post(`${BASE_URL}auth/register`, {
    name: userDetails.name.value,
    username: userDetails.username.value,
    password: userDetails.password.value,
  })
}

const googleAuthAPI = (
  googleAuthCode: string | (string | null)[]
): Promise<AxiosResponse> => {
  const BASE_URL = COVID_WARRIOR_API
  return axiosApi.get(`${BASE_URL}auth/google?code=${googleAuthCode}`)
}

const facebookAuthAPI = (
  facebookAuthCode: string | (string | null)[]
): Promise<AxiosResponse> => {
  const BASE_URL = COVID_WARRIOR_API
  return axiosApi.get(`${BASE_URL}auth/facebook?code=${facebookAuthCode}`)
}

const profileAPI = (): Promise<AxiosResponse> => {
  const BASE_URL = COVID_WARRIOR_API
  return axiosApi.get(`${BASE_URL}auth/profile`)
}

const addBeneficiaryAPI = (
  beneficiaryDetails: BeneficiaryDetails
): Promise<AxiosResponse> => {
  const BASE_URL = COVID_WARRIOR_API
  return axiosApi.post(`${BASE_URL}beneficiary`, {
    name: beneficiaryDetails.name.value,
    birth_year: beneficiaryDetails.birthDate.value,
    gender_id: beneficiaryDetails.gender.value,
    photo_id_type: beneficiaryDetails.photoIdType.value,
    photo_id_number: beneficiaryDetails.idNumber.value,
    comorbidity_ind: 'N',
    consent_version: '1',
  })
}

const getBeneficiariesAPI = (): Promise<AxiosResponse> => {
  const BASE_URL = COVID_WARRIOR_API
  return axiosApi.get(`${BASE_URL}beneficiary`)
}

const scheduleAPI = (
  scheduleDetails: CreateUpdateSchedule
): Promise<AxiosResponse> => {
  const BASE_URL = COVID_WARRIOR_API
  return axiosApi.post(`${BASE_URL}schedule`, {
    ...scheduleDetails,
    centerID: scheduleDetails.centerId.toString(),
  })
}

const updateScheduleAPI = (
  scheduleDetails: CreateUpdateSchedule
): Promise<AxiosResponse> => {
  const BASE_URL = COVID_WARRIOR_API
  return axiosApi.patch(
    `${BASE_URL}schedule/${scheduleDetails.beneficiaryId}`,
    {
      ...scheduleDetails,
      centerID: scheduleDetails.centerId.toString(),
    }
  )
}

const loadScheduleByIdAPI = (idNumber: string): Promise<AxiosResponse> => {
  const BASE_URL = COVID_WARRIOR_API
  return axiosApi.get(`${BASE_URL}schedule/${idNumber}`)
}

const deleteBeneficiaryScheduleAPI = (id: string): Promise<AxiosResponse> => {
  const BASE_URL = COVID_WARRIOR_API
  return axiosApi.delete(`${BASE_URL}schedule/${id}`)
}

const deleteBeneficiaryAPI = (id: string): Promise<AxiosResponse> => {
  const BASE_URL = COVID_WARRIOR_API
  return axiosApi.delete(`${BASE_URL}beneficiary/${id}`)
}

export {
  getUpdates,
  getAddressDetails,
  topStoriesAPI,
  statesAPI,
  districtsAPI,
  pinCodesAPI,
  vaccinationCentersAPI,
  loginAPI,
  registerAPI,
  googleAuthAPI,
  facebookAuthAPI,
  profileAPI,
  addBeneficiaryAPI,
  getBeneficiariesAPI,
  scheduleAPI,
  updateScheduleAPI,
  loadScheduleByIdAPI,
  deleteBeneficiaryAPI,
  deleteBeneficiaryScheduleAPI,
}
