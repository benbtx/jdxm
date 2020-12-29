import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'

// 注册工具类
import dayjs from 'dayjs'

import ELEMENT, {
  Pagination,
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Alert,
  Slider,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  ColorPicker,
  Transfer,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Loading,
  MessageBox,
  Message,
  Notification
} from 'element-ui'

import krPagination from '@/projectModule/components/kr-pagination/index.vue'
import krElTable from '@/projectModule/components/kr-el-table/index.vue'
// import krElTable from '@/projectModule/components/d2-table/index.vue'
import krSearch from '@/projectModule/components/kr-search/index.vue'
import krSearchItem from '@/projectModule/components/kr-search/item.vue'
import krTitleBox from '@/projectModule/components/kr-title-box/index.vue'
import krNoData from '@/projectModule/components/kr-no-data/index.vue'

import '@/projectModule/assets/css/main.scss'
import '@/projectModule/assets/css/rewrite-element.scss'
import '@/projectModule/assets/icon/iconfont.css'

import ECharts from 'vue-echarts/components/ECharts.vue'
import 'echarts'

Vue.component('krElTable', krElTable)
Vue.component('krSearch', krSearch)
Vue.component('krSearchItem', krSearchItem)
Vue.component('krPagination', krPagination)
Vue.component('krTitleBox', krTitleBox)
Vue.component('vue-charts', ECharts)
Vue.component('kr-no-data', krNoData)
Vue.prototype.$dayjs = dayjs
Vue.use(ELEMENT, { size: 'small' })
Select.props.clearable.default = true
Input.props.clearable.default = true
Cascader.props.clearable.default = true
Pagination.components.Sizes.components.ElSelect.props.clearable.default = false

Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Autocomplete)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Popover)
Vue.use(Tooltip)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Alert)
Vue.use(Slider)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Progress)
Vue.use(Badge)
Vue.use(Card)
Vue.use(Rate)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Cascader)
Vue.use(ColorPicker)
Vue.use(Transfer)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
Vue.use(krPagination)

const loadingList = []
Vue.directive('krLoading', {
  update: function (el, value) {
    if (value.value) {
      const index = loadingList.findIndex(value => el === value.target)
      if (index === -1) {
        const one = Loading.service({
          target: el,
          text: '数据计算中......',
          lock: true,
          fullscreen: true,
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.1)'
        })
        loadingList.push(one)
      }
    } else {
      const index = loadingList.findIndex(value => el === value.target)
      if (index !== -1 && loadingList[index].visible) {
        loadingList[index].close()
        loadingList.splice(index, 1)
      }
    }
  }
})
/** 权限指令**/
Vue.directive('has', {
  inserted: function (el, binding) {
    if (!window.permission.check(binding.value)) {
      el.parentNode.removeChild(el)
    }
  }
})
