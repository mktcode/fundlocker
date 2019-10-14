import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner, faChevronDown, faInfo, faKey, faEnvelope, faGlobe, faCalendar, faUniversity, faHashtag, faCheck } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSpinner, faChevronDown, faInfo, faKey, faEnvelope, faGlobe, faCalendar, faUniversity, faHashtag, faCheck)

Vue.component('font-awesome-icon', FontAwesomeIcon)
