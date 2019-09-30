import { getBalances } from '../../lib/transferwise'

export default (req, res) => {
  return new Promise((resolve, reject) => {
    getBalances()
      .then((balances) => {
        res.send(balances)
      })
      .catch((error) => {
        res.status(500)
        res.send(error)
      })
  })
}
