import Vue from 'vue'
import { Button, Input, FormItem, Form, Message } from 'element-ui'

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
// message弹框提示组件有所不同，要全局挂载
Vue.prototype.$message = Message
