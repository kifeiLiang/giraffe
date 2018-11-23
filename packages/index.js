
import {Button,ButtonGroup} from './button/index.js'
import {Breadcrumb, BreadcrumbItem} from './breadcrumb/index.js'
import Page from './page/index.js'
import Progress from './progress/index.js'
import {Tabs, TabPane} from './tabs/index.js'
import {Steps, Step} from './steps/index.js'
import {Collapse, Panel} from './collapse/index.js'
import {Menu,MenuGroup,MenuItem,SubMenu} from './menu/index.js'
import Icon from './icon/index.js'
import Input from './input/index.js'
import {Radio, RadioGroup, RadioButton} from './radio/index.js'
import {Checkbox, CheckboxGroup} from './checkbox/index.js'
import Switch from './switch/index.js'
import {Select, Option} from './select/index.js'
import Digital from './digitalInput/index.js'
import Scrollbar from './scrollbar/index.js'
import DatePicker from './datePicker/index.js'
import {Form, FormItem} from './form/index.js'
import {Row, Col} from './grid/index.js'
import Card from './card/index.js'
import Table from './table/index.js'
import TableColumn from './tableColumn/index.js'
import Alert from './alert/index.js'
import {Message, Notice} from './message/index.js'
import Poptip from './poptip/index.js'
import Tooltip from './tooltip/index.js'
import Dialog from './dialog/index.js'
import Upload from './upload/index.js'



const components = [
  Button,ButtonGroup,
  Breadcrumb,BreadcrumbItem,
  Page,
  Progress,
  Tabs,TabPane,
  Steps,Step,
  Collapse,
  Panel,
  Menu,MenuGroup,MenuItem,SubMenu,
  Icon,
  Input,
  Radio, RadioGroup, RadioButton,
  Checkbox, CheckboxGroup,
  Switch,
  Select, Option,
  Digital,
  Scrollbar,
  DatePicker,
  Form, FormItem,
  Row, Col,
  Card,
  Table,
  TableColumn,
  Alert,
  Message, Notice,
  Poptip,
  Tooltip,
  Dialog,
  Upload

]

const install = function(Vue) {
  if (install.installed) return
  components.map(component => Vue.component(component.name, component));
  Vue.prototype.$Message = Message;
  Vue.prototype.$Notice = Notice;
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  Button,ButtonGroup,
  Breadcrumb,BreadcrumbItem,
  Page,
  Progress,
  Tabs,TabPane,
  Steps,
  Step,
  Collapse,
  Panel,
  Menu,MenuGroup,MenuItem,SubMenu,
  Icon,
  Input,
  Radio, RadioGroup, RadioButton,
  Checkbox, CheckboxGroup,
  Switch,
  Select, Option,
  Digital,
  Scrollbar,
  DatePicker,
  Form, FormItem,
  Row, Col,
  Tooltip,
  Card,
  Table,
  TableColumn,
  Alert,
  Message, Notice,
  Poptip,
  Tooltip,
  Dialog,
  Upload
}
