<template>
  <b-container class="py-5 w-50">
    <h1 class="text-center text-white brand">
      FundLocker
    </h1>
    <h1 class="text-center text-white mb-5 pb-5">
      Smart Contracts for real money.
    </h1>
    <b-row class="mt-5">
      <b-col>
        <p class="lead text-white-50 mb-5 text-center">
          Deposit money and set up a withdrawal contract...
        </p>
        <b-button variant="light" size="lg" class="w-100" to="/deposit">
          Deposit
        </b-button>
      </b-col>
      <b-col>
        <p class="lead text-white-50 mb-5 text-center">
          Or withdraw money, if you meet a contract's requirements.
        </p>
        <b-button variant="light" size="lg" class="w-100">
          Withdraw
        </b-button>
      </b-col>
    </b-row>
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
      currency: 'EUR',
      amount: 0
    }
  }
}
</script>
