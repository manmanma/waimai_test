import  moment  from 'moment'
import Vue from 'vue'
Vue.filter('date-format', function (value, format) {
  return moment(value).format(format || 'YYYY-MM-DD HH:mm:ss')
})
