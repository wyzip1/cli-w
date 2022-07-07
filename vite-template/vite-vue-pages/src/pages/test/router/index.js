import { createRouter, createWebHashHistory } from "vue-router";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/test",
      name: "Test",
      component: () => import("pages/test/view/index.vue"),
    },
  ],
});
