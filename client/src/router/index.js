import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AddPost from "../views/AddPost.vue";
import Post from "../views/Post.vue";
import EditPost from "../views/EditPost.vue";
import ToDoList from "../views/ToDoList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/add-post",
    name: "add-post",
    component: AddPost,
  },
  {
    path: "/post/:id",
    name: "post",
    component: Post,
  },
  {
    path: "/edit-post/:id",
    name: "edit-post",
    component: EditPost,
  },
  {
    path: "/to-do-list",
    name: "to-do-list",
    component: ToDoList,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
