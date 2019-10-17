import steem from 'steem'

export default (req, res) => {
  const block = req.params.block
  const id = req.params.id

  steem.api.getBlock(block, (error, block) => {
    if (error) {
      res.status(500)
      res.send('Server Error')
    } else if (block) {
      let contract
      block.transactions.forEach((tx) => {
        if (
          tx.transaction_id === id &&
            tx.operations.length === 1 &&
            tx.operations[0][1].id === 'contract'
        ) {
          contract = JSON.parse(tx.operations[0][1].json)
        }
      })
      if (contract) {
        res.send(contract)
      } else {
        res.status(404)
        res.send('Not Found')
      }
    } else {
      res.status(404)
      res.send('Not Found')
    }
  })
}
