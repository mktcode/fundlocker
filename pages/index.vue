<template>
  <b-container class="py-5 w-50">
    <h1 class="text-center text-white brand">
      FundLocker
    </h1>
    <h1 class="text-center text-white mb-5 pb-5">
      Smart Contracts for real money.
    </h1>
    <b-row class="mt-5">
      <b-col class="d-flex flex-column justify-content-between">
        <p class="lead text-white-50 mb-5 text-center">
          Create a contract and deposit money from your bank account.
        </p>
        <b-button variant="light" size="lg" class="w-100" to="/deposit">
          Create Contract
        </b-button>
      </b-col>
      <b-col class="d-flex flex-column justify-content-between">
        <p class="lead text-white-50 mb-5 text-center">
          Withdraw money from a contract if you meet it's requirements.
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
