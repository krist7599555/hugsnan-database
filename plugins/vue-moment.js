import Vue from "vue"
import moment from "moment"
import "moment/locale/th"

moment.updateLocale("th")
// moment.locale("th");
Vue.filter("momentTime", date => {
  console.log(date)
  return date ? moment(date).fromNow() : date
})
Vue.filter("momentDate", date => {
  return date ? moment(date, "l") : date
})
