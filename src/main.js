import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import moment from "moment";

Vue.config.productionTip = false;

Vue.filter("data", (data) =>
  data ? moment(data, "YYYY-MM-DD").format("DD/MM/YYYY") : ""
);

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
