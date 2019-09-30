import axios from 'axios'
require('dotenv').config()

export default (req, res) => {
  const token = req.body.token

  axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`).then((response) => {
    if (response.data.success) {
      res.status(200)
      res.send(response.data)
    } else {
      res.status(500)
      res.send(response.data.errors)
    }
  }).catch((error) => {
    res.status(500)
    res.send(error)
  })
}
