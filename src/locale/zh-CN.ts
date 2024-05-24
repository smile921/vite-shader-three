import localeMessageBox from '@/components/message-box/locale/zh-CN'

/** simple */

import locale403 from '@/views/exception/403/locale/zh-CN'
import locale404 from '@/views/exception/404/locale/zh-CN'
import locale500 from '@/views/exception/500/locale/zh-CN'
/** simple end */

export default {
  'menu.dashboard': '仪表盘',
  'menu.list': '列表页',
  'menu.result': '结果页',
  'menu.exception': '异常页',
  'menu.form': '表单页',
  'menu.profile': '详情页',
  'menu.visualization': '数据可视化',
  'menu.user': '个人中心',
  'menu.toy': '惊艳好玩',
  'navbar.docs': '文档中心',
  'navbar.action.locale': '切换为中文',
  ...localeMessageBox,
  /** simple */
  ...locale403,
  ...locale404,
  ...locale500,
  /** simple end */
}
