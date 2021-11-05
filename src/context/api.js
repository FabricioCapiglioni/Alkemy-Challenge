import axios from "axios";

const baseUrl = 'https://superheroapi.com/api/10158625777930823/'

export async function getHeroes(name) {
    try {
      const response = await axios.get(`${baseUrl}/search/${name}`);
      return response
    } catch (error) {
      console.error(error);
    }
}

