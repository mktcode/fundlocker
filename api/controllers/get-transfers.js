import { getAllTransfers } from '../../lib/transferwise'

export default (req, res) => {
  const referenceCode = req.params.referenceCode

  getAllTransfers(referenceCode)
    .then((transfers) => {
      res.send(
        referenceCode
          ? transfers.filter(t => t.reference === referenceCode)
          : transfers
      )
    })
    .catch((error) => {
      res.status(500)
      res.send(error)
    })
}
