import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../pages/user/Login";
import UserList from "../pages/user/UserList";

import PostList from "../pages/post/PostList";
import CreatePost from "../pages/post/CreatePost";
import CreatePostConfirm from "../pages/post/CreatePostConfirm";
import UpdatePost from "../pages/post/UpdatePost";
import UpdatePostConfirm from "../pages/post/UpdatePostConfirm";
import store from "../store";

Vue.use(VueRouter);

const routes = [
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/user/list",
        name: "user-list",
        component: UserList,
    },
    {
        path: "/post/list",
        name: "post-list",
        component: PostList,
    },
    {
        path: "/post/create",
        name: "create-post",
        component: CreatePost,
    },
    {
        path: "/post/create-confirm",
        name: 'create-post-confirm',
        component: CreatePostConfirm,
    },
    {
        path: "/post/update/:id?",
        name: "update-post",
        component: UpdatePost,
    },
    {
        path: "/post/update-confirm",
        name: 'update-post-confirm',
        component: UpdatePostConfirm,
    },
    {
        path: "/*",
        redirect: "/post/list",
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

/**
 * This is to handle and check authentication for routing.
 */
router.beforeEach((to, from, next) => {
    const loggedIn = store.getters.isLoggedIn;
    if (!loggedIn && to.name != "login") {
        return next("/login");
    }
    next();
});

export default router;
