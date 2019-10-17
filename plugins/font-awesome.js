import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faSpinner,
  faChevronDown,
  faInfo,
  faKey,
  faEnvelope,
  faGlobe,
  faCalendar,
  faUniversity,
  faHashtag,
  faCheck,
  faExclamationTriangle,
  faCopy,
  faUndo,
  faDonate
} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faSpinner,
  faChevronDown,
  faInfo,
  faKey,
  faEnvelope,
  faGlobe,
  faCalendar,
  faUniversity,
  faHashtag,
  faCheck,
  faExclamationTriangle,
  faCopy,
  faUndo,
  faDonate
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
