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
      <div class="text-center text-white mt-5">
        <div v-if="contract.requirements.password">
          This contract is password protected.
        </div>
        <template v-if="contract.requirements.email.address">
          <div v-if="contract.requirements.email.type === 'domain'">
            <span>Ownership over an email address under the domain <b>{{ contract.requirements.email.address }}</b> is required.</span>
          </div>
          <div v-else>
            <span>Ownership over the email address <b>{{ contract.requirements.email.address }}</b> is required.</span>
          </div>
        </template>
        <template v-if="contract.requirements.date.date">
          <div v-if="contract.requirements.date.type === 'max'">
            <span>Withdrawal is only possible until <b>{{ contract.requirements.date.date }}</b>.</span>
          </div>
          <div v-else>
            <span>Withdrawal is only possible after <b>{{ contract.requirements.date.date }}</b>.</span>
          </div>
        </template>
        <div v-if="contract.requirements.webhook">
          The URL <b>{{ contract.requirements.webhook }}</b> must return a 200 OK status.
        </div>
      </div>
    </div>
    <div v-else-if="error" class="text-white mt-5">
      <b-alert variant="danger" show class="d-flex align-items-center justify-content-between">
        <font-awesome-icon icon="exclamation-triangle" class="fa-2x ml-2 mr-3" />
        <span>
          This contract does not exist! Please make sure you are using the correct link. If you can solve the problem by yourself, feel free to <nuxt-link to="/contact">contact our support</nuxt-link>.
        </span>
        </nuxt-link>
      </b-alert>
    </div>
    <div v-else class="text-white text-center mt-5">
      <font-awesome-icon icon="spinner" spin class="fa-2x" />
    </div>
  </b-container>
</template>

<script>
import copy from 'copy-to-clipboard'

export default {
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  data () {
    return {
      error: false,
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
    this.$axios.$get(process.env.API_URL + '/contract/' + this.$route.params.block + '/' + this.$route.params.id).then((contract) => {
      this.contract = contract
    }).catch(() => {
      this.error = true
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
