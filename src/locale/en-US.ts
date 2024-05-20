import localeMessageBox from '@/components/message-box/locale/en-US'
import localeLogin from '@/views/login/locale/en-US'

import localeWorkplace from '@/views/dashboard/workplace/locale/en-US'
/** simple */
import localeMonitor from '@/views/dashboard/monitor/locale/en-US'

import localeCardList from '@/views/list/card/locale/en-US'
import localeSearchTable from '@/views/list/search-table/locale/en-US'

import localeGroupForm from '@/views/form/group/locale/en-US'
import localeStepForm from '@/views/form/step/locale/en-US'

import localeBasicProfile from '@/views/profile/basic/locale/en-US'

import localeError from '@/views/result/error/locale/en-US'
import localeSuccess from '@/views/result/success/locale/en-US'

import locale403 from '@/views/exception/403/locale/en-US'
import locale404 from '@/views/exception/404/locale/en-US'
import locale500 from '@/views/exception/500/locale/en-US'

import localeUserInfo from '@/views/user/info/locale/en-US'
import localeUserSetting from '@/views/user/setting/locale/en-US'
/** simple end */

export default {
  'menu.dashboard': 'Dashboard',
  'menu.list': 'List',
  'menu.result': 'Result',
  'menu.exception': 'Exception',
  'menu.form': 'Form',
  'menu.profile': 'Profile',
  'menu.visualization': 'Data Visualization',
  'menu.user': 'User Center',
  'menu.toy': 'Amazing Toy',
  'navbar.docs': 'Docs',
  'navbar.action.locale': 'Switch to English',
  ...localeMessageBox,
  ...localeLogin,
  ...localeWorkplace,
  /** simple */
  ...localeMonitor,
  ...localeSearchTable,
  ...localeCardList,
  ...localeStepForm,
  ...localeGroupForm,
  ...localeBasicProfile,
  ...localeSuccess,
  ...localeError,
  ...locale403,
  ...locale404,
  ...locale500,
  ...localeUserInfo,
  ...localeUserSetting,
  /** simple end */
}
