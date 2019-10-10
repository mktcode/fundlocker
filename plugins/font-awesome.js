import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner, faChevronDown, faInfo } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSpinner, faChevronDown, faInfo)

Vue.component('font-awesome-icon', FontAwesomeIcon)
