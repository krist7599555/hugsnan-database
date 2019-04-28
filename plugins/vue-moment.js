import Vue from "vue";
import * as moment from "moment";
import "moment/locale/th";

moment.updateLocale("th");
// moment.locale("th");
Vue.filter("momentTime", date => {
  return date ? moment(date).fromNow() : date;
});
Vue.filter("momentDate", date => {
  return date ? moment(date, "l") : date;
});
