import Vue from "vue";
import VueRouter from "vue-router";

/** Authentication Import */
import Login from "../pages/user/Login";

/** Post Import */
import UserList from "../pages/user/UserList";
import CreateUser from "../pages/user/CreateUser";
import CreateUserConfirm from "../pages/user/CreateUserConfirm";
import UpdateUser from "../pages/user/UpdateUser";
import UpdateUserConfirm from "../pages/user/UpdateUserConfirm";

/** Post Import */
import PostList from "../pages/post/PostList";
import CreatePost from "../pages/post/CreatePost";
import CreatePostConfirm from "../pages/post/CreatePostConfirm";
import UpdatePost from "../pages/post/UpdatePost";
import UpdatePostConfirm from "../pages/post/UpdatePostConfirm";

import store from "../store";

Vue.use(VueRouter);

//push
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

const routes = [

    /** Authentication */
    {
        path: "/login",
        name: "login",
        component: Login,
    },

    /** User List Route */
    {
        path: "/user/list",
        name: "user-list",
        component: UserList,
    },
    {
        path: "/user/create",
        name: "create-user",
        component: CreateUser,
    },
    {
        path: "/user/create-confirm",
        name: 'create-user-confirm',
        component: CreateUserConfirm,
    },
    {
        path: "/user/update/:id?",
        name: "update-user",
        component: UpdateUser,
    },
    {
        path: "/user/update-confirm",
        name: 'update-user-confirm',
        component: UpdateUserConfirm,
    },

    /** Post List Route */
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

    /** Initial */
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
