import axios from "axios";

axios.defaults.headers = {
  'Content-Type': 'application/json',
  Authorization: '10158625777930823'
}

const baseUrl = 'https://superheroapi.com/api/10158625777930823'

export const searchHero = async(name) => {
  try {
      const response = await axios.get(`${baseUrl}/search/${name}`)
      return response.data
  }
  catch (error) {
      console.log(error)
  }
}

export const getToken = async(email, password) => {
  try {
      const res = await axios.post(`http://challenge-react.alkemy.org/`, {
          email,
          password
      })
      let data = {
          status: res.status,
          message: res.data
      }
      return data
  }
  catch (error) {
      let data = {
          status: error.response.status,
          message: error.response.data
      }
      return data
  }
}

