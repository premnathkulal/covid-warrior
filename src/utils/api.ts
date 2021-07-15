import axios, { AxiosResponse } from 'axios'
import {} from '@/types/interface'

const BASE_URL = 'https://api.covid19india.org/data.json'

const getUpdates = (): Promise<AxiosResponse> => {
  return axios.get<AxiosResponse>(BASE_URL)
}

export { getUpdates }
