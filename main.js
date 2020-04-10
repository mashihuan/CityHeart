import Vue from 'vue'
import App from './App'
import store from './store'
import '@/common/iconfont/iconfont.css'
import '@/common/css/common.scss'
import '@/common/css/avariables.scss'

Vue.config.productionTip = false
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
