require('dotenv').config();
const {Router} = require('express');
const router = Router()

const axios = require('axios');


const API_KEY = process.env.REACT_APP_API_KEY
const API_URL = `https://superheroapi.com/api/${API_KEY}`;

router.get('/:name', (req, res) => {
  axios.get(`${API_URL}/search/${req.params.name}`).then((heroes) => {
    res.json(heroes.data);
  }).catch((err) => {
    console.log(err)
  })
});


module.exports = router;