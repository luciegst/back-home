import axios, { type AxiosResponse } from 'axios'

export async function get<T>(url: string, opts?: Object): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axios.get<T>(url)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error message: ', error.message)
      if (error.response) {
        console.error('Response data: ', error.response.data)
      }
      throw error
    } else {
      console.error('Unexpected error: ', error)
    }
    throw new Error(`Failed to fetch data`)
  }
}

export async function post<T>(url: string, data?: Object, opts?: Object): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axios.post<T>(url, data, opts)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error message: ', error.message)
      if (error.response) {
        console.error('Response data: ', error.response.data)
      }
      throw error
    } else {
      console.error('Unexpected error: ', error)
    }
    throw new Error(`Failed to create data: ${error}`)
  }
}
