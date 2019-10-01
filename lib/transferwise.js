import uuidv4 from 'uuid/v4'
import axios from 'axios'
require('dotenv').config()

const IS_SANDBOX = process.env.TRANSFERWISE_SANDBOX !== 'no'
const TW_API_URL = IS_SANDBOX
  ? process.env.TRANSFERWISE_SANDBOX_API_URL
  : process.env.TRANSFERWISE_API_URL
const TW_API_KEY = IS_SANDBOX
  ? process.env.TRANSFERWISE_SANDBOX_API_KEY
  : process.env.TRANSFERWISE_API_KEY
const TW_PROFILE_ID = IS_SANDBOX
  ? process.env.TRANSFERWISE_SANDBOX_PROFILE_ID
  : process.env.TRANSFERWISE_PROFILE_ID
const TW_RECIPIENT_ID = IS_SANDBOX
  ? process.env.TRANSFERWISE_SANDBOX_RECIPIENT_ID
  : process.env.TRANSFERWISE_RECIPIENT_ID

const twAuthHeader = {
  Authorization: 'Bearer ' + TW_API_KEY
}

const getBalances = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(TW_API_URL + '/borderless-accounts?profileId=' + TW_PROFILE_ID, {
        headers: twAuthHeader
      })
      .then(response => resolve(response.data))
      .catch(e => reject(e.response.data))
  })
}

const getTransfer = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(TW_API_URL + '/transfers/' + id, {
        headers: twAuthHeader
      })
      .then(response => resolve(response.data))
      .catch(e => reject(e.response.data))
  })
}

const createDepositQuote = (currency, amount) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        TW_API_URL + '/quotes',
        {
          profile: TW_PROFILE_ID,
          source: currency,
          target: currency,
          rateType: 'FIXED',
          sourceAmount: amount,
          type: 'REGULAR'
        },
        { headers: twAuthHeader }
      )
      .then(response => resolve(response.data))
      .catch(e => reject(e.response.data))
  })
}

const createReceipient = (currency, type, accountHolderName, details) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        TW_API_URL + '/accounts',
        {
          currency,
          type,
          profile: TW_PROFILE_ID,
          accountHolderName,
          legalType: 'PRIVATE',
          details
        },
        { headers: twAuthHeader }
      )
      .then(response => resolve(response.data))
      .catch(e => reject(e.response.data))
  })
}

const checkTransferRequirements = (transfer) => {
  return new Promise((resolve, reject) => {
    axios
      .post(TW_API_URL + '/transfer-requirements', transfer, {
        headers: twAuthHeader
      })
      .then((response) => {
        const check = response.data[0]
        let checkPassed = true
        check.fields.forEach((f) => {
          f.group.forEach((g) => {
            if (g.required) { checkPassed = false }
          })
        })
        if (checkPassed) { resolve(response.data) } else { reject(check) }
      })
      .catch(e => reject(e.response.data))
  })
}

const createDepositTransfer = (quote) => {
  return new Promise((resolve, reject) => {
    const transfer = {
      targetAccount: TW_RECIPIENT_ID,
      quote: quote.id,
      customerTransactionId: uuidv4(),
      details: {
        reference: 'deposit',
        transferPurpose: 'verification.transfers.purpose.pay.bills',
        sourceOfFunds: 'verification.source.of.funds.other'
      }
    }
    checkTransferRequirements(transfer)
      .then(() => {
        axios
          .post(TW_API_URL + '/transfers', transfer, {
            headers: twAuthHeader
          })
          .then(response => resolve(response.data))
          .catch(e => reject(e.response.data))
      })
      .catch(e => reject(e))
  })
}

export {
  getBalances,
  getTransfer,
  createDepositQuote,
  createReceipient,
  checkTransferRequirements,
  createDepositTransfer
}
