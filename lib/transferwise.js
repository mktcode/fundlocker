import axios from 'axios'
require('dotenv').config()

const twAuthHeader = {
  Authorization: 'Bearer ' + process.env.TRANSFERWISE_API_KEY
}

const getBalances = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.TRANSFERWISE_API_URL + '/borderless-accounts?profileId=' + process.env.TRANSFERWISE_PROFILE_ID, {
        headers: twAuthHeader
      })
      .then(response => resolve(response.data))
      .catch(e => reject(e))
  })
}

const getTransfers = (limit, offset) => {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.TRANSFERWISE_API_URL + '/transfers', {
        params: {
          profile: process.env.TRANSFERWISE_PROFILE_ID,
          limit: limit || 100,
          offset: offset || 0
        },
        headers: twAuthHeader
      })
      .then(response => resolve(response.data))
      .catch((e) => {
        reject(e)
      })
  })
}

const getAllTransfers = (referenceCode, limit, offset) => {
  limit = limit || 100
  offset = offset || 0
  return new Promise((resolve, reject) => {
    getTransfers(limit, offset).then((transfers) => {
      if (transfers.length) {
        getAllTransfers(referenceCode, limit, offset + limit)
          .then(innerResult => resolve([...transfers, ...innerResult]))
          .catch(error => reject(error))
      } else {
        resolve(transfers)
      }
    }).catch(error => reject(error))
  })
}

export {
  getBalances,
  getTransfers,
  getAllTransfers
}
