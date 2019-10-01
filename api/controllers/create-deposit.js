import uuidv4 from 'uuid/v4'
import steem from 'steem'
import Cryptr from 'cryptr'
import { getBalances, createDepositQuote, createDepositTransfer } from '../../lib/transferwise'

const getRandomRef = () => {
  // a trillion possibilities should be enough randomness here:
  const min = 68719476736 // smallest 10-digit hex value
  const max = 1099511627775 // biggest 10-digit hex value
  const random = Math.floor(Math.random() * (max - min + 1) + min)
  return random.toString(16)
}

export default (req, res) => {
  const amount = req.body.amount
  const currency = req.body.currency
  const requirements = req.body.requirements
  const reference = getRandomRef()

  const key = uuidv4()
  const cryptr = new Cryptr(key)

  // check if currency is available
  getBalances().then((balances) => {
    const balance = balances[0].balances.find(
      b =>
        b.currency === currency &&
        b.balanceType === 'AVAILABLE' &&
        b.bankDetails !== null
    )
    if (balance) {
      // create quote
      createDepositQuote(currency, amount).then((quote) => {
        createDepositTransfer(quote).then((transfer) => {
          steem.broadcast.customJson(
            process.env.STEEM_POSTING_KEY,
            [],
            [process.env.STEEM_NAME],
            reference,
            JSON.stringify({
              requirements,
              transferId: cryptr.encrypt(transfer.id)
            }),
            (error, block) => {
              if (error) {
                res.status(500)
                res.send(error)
              } else {
                res.send({ transfer, quote, block, key, reference })
              }
            }
          )
        }).catch((error) => {
          res.status(500)
          res.send(error)
        })
      }).catch((error) => {
        res.status(500)
        res.send(error)
      })
    } else {
      res.status(400)
      res.send('Bad Request: Currency not supported.')
    }
  }).catch((error) => {
    res.status(500)
    res.send(error)
  })
}
