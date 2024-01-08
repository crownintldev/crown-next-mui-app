import mock from './mock'

import './auth/jwt'
import './cards'
import './apps/invoice'
import './pages/profile'
mock.onAny().passThrough()
