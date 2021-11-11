import axios from "axios";

export const searchHero = async(name) => {
  try {
      const response = await axios.get(`http://localhost:5000/${name}`)
      return response
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
      let data = res.data.token
      return data
  }
  catch (error) {
      let data = error.response.data
      
      return data
  }
}

