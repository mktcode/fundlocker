<template>
  <b-container class="py-5 w-50">
    <h1 class="text-center text-white">
      Contract
    </h1>
    <p class="lead text-white-50 m-0 text-center">
      {{ contractLink }}
    </p>
  </b-container>
</template>

<script>
import steem from 'steem'

export default {
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  data () {
    return {
      contract: null
    }
  },
  computed: {
    contractLink () {
      return process.env.URL + '/' + this.$route.params.block + '/' + this.$route.params.id
    }
  },
  mounted () {
    steem.api.getBlock(this.$route.params.block, (error, block) => {
      if (error) {
      } else {
        block.transactions.forEach((tx) => {
          if (
            tx.transaction_id === this.$route.params.id &&
            tx.operations.length === 1 &&
            tx.operations[0][1].id === 'contract'
          ) {
            this.contract = JSON.parse(tx.operations[0][1].json)
          }
        })
      }
    })
  }
}
</script>
