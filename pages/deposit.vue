<template>
  <b-container class="py-5 w-50">
    <b-row class="mt-5">
      <b-col>
        <h1 class="text-center text-white mb-5">
          Deposit
        </h1>
        <p class="lead text-white-50 m-0 text-center">
          Choose a currency, enter the amount and set up your contract.
        </p>
        <div class="text-center my-3 d-flex">
          <b-button id="select-currency" v-b-modal.currency-modal class="d-flex justify-content-end align-items-center">
            <font-awesome-icon icon="chevron-down" class="small mr-2" />
            {{ currency }}
          </b-button>
          <currency-input id="select-amount" v-model="amount" :currency="{prefix: null}" :distraction-free="false" :max="100000" />
        </div>
        <b-row class="my-3">
          <b-col>
            <b-button variant="outline-light" size="sm" class="w-100">
              Date
            </b-button>
          </b-col>
          <b-col>
            <b-button variant="outline-light" size="sm" class="w-100">
              Bank Account
            </b-button>
          </b-col>
        </b-row>
        <b-row class="my-3">
          <b-col>
            <b-button variant="outline-light" size="sm" class="w-100">
              Social Media
            </b-button>
          </b-col>
          <b-col>
            <b-button variant="outline-light" size="sm" class="w-100">
              Webhook
            </b-button>
          </b-col>
        </b-row>
        <b-button variant="light" size="lg" class="w-100">
          Get Deposit Details
        </b-button>
      </b-col>
    </b-row>
    <b-modal id="currency-modal" centered>
      <b-alert variant="primary" show class="d-flex align-items-center justify-content-between">
        <font-awesome-icon icon="info" class="fa-2x ml-2 mr-3" />
        Did you know? Regardless of the currency you deposit, the money can be withdrawn in over 40 currencies.
      </b-alert>
      <b-button
        v-for="c in availableCurrencies"
        :key="c"
        variant="light"
        class="w-100 my-1"
        @click="currency = c; $bvModal.hide('currency-modal')"
      >
        {{ c }}
      </b-button>
    </b-modal>
  </b-container>
</template>

<script>
export default {
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  data () {
    return {
      loading: false,
      error: null,
      availableCurrencies: [],
      availableBankDetails: [],
      reference: null,
      key: null,
      steemTxId: null,
      estimatedArrival: null,
      currency: 'USD',
      amount: 0,
      requirements: []
    }
  },
  computed: {
    bankDetails () {
      return this.availableBankDetails.find(bd => bd.currency === this.currency)
    }
  },
  mounted () {
    this.$axios.$get(process.env.API_URL + '/balances').then((balances) => {
      balances[0].balances.forEach((b) => {
        if (b.balanceType === 'AVAILABLE' && b.bankDetails !== null) {
          this.availableCurrencies.push(b.currency)
          this.availableBankDetails.push(b.bankDetails)
        }
      })
    })
  },
  methods: {
    proceed () {
      this.loading = true
      this.$axios.$post(process.env.API_URL + '/deposit', {
        currency: this.currency,
        amount: this.amount,
        requirements: this.requirements
      }).then((result) => {
        this.reference = result.reference
        this.key = result.key
        this.steemTxId = result.steemTx.id
      }).catch((error) => {
        this.error = error
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
