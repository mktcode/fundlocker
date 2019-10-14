<template>
  <b-container class="py-5 w-50">
    <b-row class="mt-5">
      <b-col>
        <h1 class="text-center text-white mb-4">
          Deposit
        </h1>
        <p class="lead text-white-50 m-0 text-center">
          Choose a currency, enter the amount and set up your contract.
        </p>
        <div class="text-center my-5 d-flex">
          <b-button
            id="select-currency"
            v-b-modal.currency-modal
            class="d-flex justify-content-end align-items-center w-50"
          >
            <font-awesome-icon icon="chevron-down" class="small mr-2" />
            {{ currency }}
          </b-button>
          <currency-input
            id="select-amount"
            v-model="amount"
            :currency="{prefix: null}"
            :distraction-free="false"
            :max="100000"
            class="w-50"
          />
        </div>
        <b-row class="my-3">
          <b-col>
            <b-button v-b-modal.password-modal :variant="requirements.password ? 'light' : 'outline-light'" size="sm" class="w-100 d-flex align-items-center justify-content-between">
              <font-awesome-icon icon="key" class="small" />
              Password
              <font-awesome-icon v-if="requirements.password" icon="check" class="text-success" />
              <i v-else />
            </b-button>
          </b-col>
          <b-col>
            <b-button v-b-modal.email-modal :variant="requirements.email.address ? 'light' : 'outline-light'" size="sm" class="w-100 d-flex align-items-center justify-content-between">
              <font-awesome-icon icon="envelope" class="small" />
              E-Mail
              <font-awesome-icon v-if="requirements.email.address" icon="check" class="text-success" />
              <i v-else />
            </b-button>
          </b-col>
          <b-col>
            <b-button v-b-modal.date-modal :variant="requirements.date.date ? 'light' : 'outline-light'" size="sm" class="w-100 d-flex align-items-center justify-content-between">
              <font-awesome-icon icon="calendar" class="small" />
              Date
              <font-awesome-icon v-if="requirements.date.date" icon="check" class="text-success" />
              <i v-else />
            </b-button>
          </b-col>
        </b-row>
        <b-row class="my-3">
          <b-col>
            <b-button v-b-modal.webhook-modal :variant="requirements.webhook ? 'light' : 'outline-light'" size="sm" class="w-100 d-flex align-items-center justify-content-between">
              <font-awesome-icon icon="globe" class="small" />
              Webhook
              <font-awesome-icon v-if="requirements.webhook" icon="check" class="text-success" />
              <i v-else />
            </b-button>
          </b-col>
          <b-col>
            <b-button v-b-modal.bankaccount-modal variant="outline-light" size="sm" class="w-100 d-flex align-items-center justify-content-between">
              <font-awesome-icon icon="university" class="small" />
              Bank Account
              <i />
            </b-button>
            <b-badge variant="success" class="position-absolute" style="bottom: -5px; right: 5px">
              Coming soon!
            </b-badge>
          </b-col>
          <b-col>
            <b-button v-b-modal.socialmedia-modal variant="outline-light" size="sm" class="w-100 d-flex align-items-center justify-content-between">
              <font-awesome-icon icon="hashtag" class="small" />
              Social Media
              <i />
            </b-button>
            <b-badge variant="success" class="position-absolute" style="bottom: -5px; right: 5px">
              Coming soon!
            </b-badge>
          </b-col>
        </b-row>
        <div class="text-center">
          <b-button variant="light" size="lg" class="mt-4 px-5">
            Get Deposit Details
          </b-button>
        </div>
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
    <b-modal id="password-modal" centered>
      <b-alert variant="primary" show class="d-flex align-items-center justify-content-between">
        <font-awesome-icon icon="info" class="fa-2x ml-2 mr-3" />
        If you set a password, you can share it with someone you want to give access to your deposited money.
      </b-alert>
      <b-form-input v-model="requirements.password" size="lg" type="text" placeholder="Enter a password..." />
      <b-button variant="primary" size="sm" class="w-100 mt-3" @click="$bvModal.hide('password-modal')">
        Save
      </b-button>
    </b-modal>
    <b-modal id="email-modal" centered>
      <b-alert variant="primary" show class="d-flex align-items-center justify-content-between">
        <font-awesome-icon icon="info" class="fa-2x ml-2 mr-3" />
        If you specify an address, whoever wants to withdraw your money needs to proof ownership over that address by entering a code that will be send to it. If you specify a domain instead, all addresses under that domain can be used, e.g. your company's domain.
      </b-alert>
      <b-button-group class="w-100 mb-3">
        <b-button :variant="requirements.email.type === 'address' ? 'light' : 'outline-light'" size="sm" @click="requirements.email.type = 'address'">
          Address
        </b-button>
        <b-button :variant="requirements.email.type === 'domain' ? 'light' : 'outline-light'" size="sm" @click="requirements.email.type = 'domain'">
          Domain
        </b-button>
      </b-button-group>
      <b-form-input v-if="requirements.email.type === 'address'" v-model="requirements.email.address" size="lg" type="email" placeholder="Enter an email address..." />
      <b-form-input v-if="requirements.email.type === 'domain'" v-model="requirements.email.address" size="lg" type="text" placeholder="Enter a domain..." />
      <b-button variant="primary" size="sm" class="w-100 mt-3" @click="$bvModal.hide('email-modal')">
        Save
      </b-button>
    </b-modal>
    <b-modal id="date-modal" centered>
      <b-alert variant="primary" show class="d-flex align-items-center justify-content-between">
        <font-awesome-icon icon="info" class="fa-2x ml-2 mr-3" />
        You can specify a certain date until or after which your money can be withdrawn.
      </b-alert>
      <b-button-group class="w-100 mb-3">
        <b-button :variant="requirements.date.type === 'min' ? 'light' : 'outline-light'" size="sm" @click="requirements.date.type = 'min'">
          Minimum Date
        </b-button>
        <b-button :variant="requirements.date.type === 'max' ? 'light' : 'outline-light'" size="sm" @click="requirements.date.type = 'max'">
          Maximum Date
        </b-button>
      </b-button-group>
      <b-form-input v-model="requirements.date.date" size="lg" type="date" />
      <b-button variant="primary" size="sm" class="w-100 mt-3" @click="$bvModal.hide('date-modal')">
        Save
      </b-button>
    </b-modal>
    <b-modal id="webhook-modal" centered>
      <b-alert variant="primary" show class="d-flex align-items-center justify-content-between">
        <font-awesome-icon icon="info" class="fa-2x ml-2 mr-3" />
        <span>Enter any URL, most likely one that you own and control. Your money can only be withdrawn if this URL returns a <b>200 OK</b> status code. This way you can programm completely custom requirements.</span>
      </b-alert>
      <b-form-input v-model="requirements.webhook" size="lg" type="url" placeholder="Enter a URL..." />
      <b-button variant="primary" size="sm" class="w-100 mt-3" @click="$bvModal.hide('webhook-modal')">
        Save
      </b-button>
    </b-modal>
    <b-modal id="bankaccount-modal" centered>
      <b-alert variant="primary" show class="d-flex align-items-center justify-content-between">
        <font-awesome-icon icon="info" class="fa-2x ml-2 mr-3" />
        In the near future you will be able to predefine the receiving bank account. This way you can for example set up scheduled and/or conditional payments or donations.
      </b-alert>
    </b-modal>
    <b-modal id="socialmedia-modal" centered>
      <b-alert variant="primary" show class="d-flex align-items-center justify-content-between">
        <font-awesome-icon icon="info" class="fa-2x ml-2 mr-3" />
        In the near future you will be able to choose from a variaty of social media plattforms and restrict withdrawals to specific accounts, groups, like counts and more.
      </b-alert>
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
      requirements: {
        password: null,
        email: {
          type: 'address',
          address: null
        },
        date: {
          type: 'min',
          date: null
        },
        webhook: null
      }
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
