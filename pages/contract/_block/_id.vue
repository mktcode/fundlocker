<template>
  <b-container class="py-5 w-50">
    <h1 class="text-center text-white mb-0">
      Contract
    </h1>
    <div class="text-center text-white-50">
      ID: {{ $route.params.block + '/' + $route.params.id }}
    </div>
    <div v-if="contract">
      <h1 class="text-center text-white font-weight-bold mt-5 mb-2" style="font-size: 3rem">
        {{ contract.amount }} {{ contract.currency }}
      </h1>
      <div class="text-center mb-5">
        <b-button-group>
          <a href="#" class="btn btn-sm btn-light">
            <font-awesome-icon icon="donate" />
            Deposit
          </a>
          <a :href="refundLink" class="btn btn-sm btn-light">
            <font-awesome-icon icon="undo" />
            Refund
          </a>
        </b-button-group>
      </div>
      <div class="text-center text-white mb-2">
        Share this link to allow people to withdraw the money:
      </div>
      <b-input-group>
        <b-form-input
          :value="withdrawalLink"
          size="lg"
          readonly
          class="bg-transparent border text-white"
          @focus="$event.target.select()"
        />
        <b-input-group-append>
          <b-button
            v-b-tooltip.hover.left
            :title="copyTooltip"
            variant="light"
            size="sm"
            @click="copy(withdrawalLink)"
          >
            <font-awesome-icon icon="copy" />
          </b-button>
          <nuxt-link
            class="btn btn-sm btn-light"
            :to="'/withdraw/' + $route.params.block + '/' + $route.params.id"
          >
            Withdraw
          </nuxt-link>
        </b-input-group-append>
      </b-input-group>
      <h2 class="text-center text-white mt-5">
        Requirements
      </h2>
      <div class="text-center text-white">
        {{ contract.requirements }}
      </div>
    </div>
    <div v-else class="text-white text-center mt-5">
      <font-awesome-icon icon="spinner" spin class="fa-2x" />
    </div>
  </b-container>
</template>

<script>
import steem from 'steem'
import copy from 'copy-to-clipboard'

export default {
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  data () {
    return {
      contract: null,
      copyTooltip: 'Copy'
    }
  },
  computed: {
    withdrawalLink () {
      return process.env.URL + '/withdraw/' + this.$route.params.block + '/' + this.$route.params.id
    },
    refundLink () {
      return process.env.URL + '/refund/' + this.$route.params.block + '/' + this.$route.params.id
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
  },
  methods: {
    copy (string) {
      copy(string)
      this.copyTooltip = 'Copied!'
      setTimeout(() => {
        this.copyTooltip = 'Copy'
      }, 1000)
    }
  }
}
</script>
