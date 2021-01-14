import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

axios.defaults.baseURL = process.env.VUE_APP_SERVER;

export default new Vuex.Store({
    state: {
        authID: '',
        user: null,
        userList: [],
        postList: [],
    },
    mutations: {
        setUserData(state, data) {
            state.user = data;
        },
        setPostData(state, data) {
            state.postList.push({ title: data.title, description: data.description })
        },
        setUserList(state, data) {
            state.userList = data
        },
        deleteUserList(state, index) {
            state.userList.splice(index, 1)
        },
        setPostList(state, data) {
            state.postList = data
        },
        deletePostList(state, index) {
            state.postList.splice(index, 1)
        },
        updatePostList(state, data) {
            const index = state.postList.findIndex(post => post.id == data.id);
            state.postList.splice(index, 1, {
                'title': data.title,
                'description': data.description
            });
        }
    },
    actions: {
        login({ commit }, credentials) {
            return axios.post("/auth/login", {
                email: credentials.email,
                password: credentials.password
            }).then(({ data }) => {
                commit("setUserData", data);
            });
        },
        logout({ commit }, credentials) {
            return axios.post("/auth/logout", credentials).then(() => {
                commit("setUserData", null);
            });
        },
        createPostConfirm({ commit }, context) {
            return axios.post("/post/create-confirm", {
                title: context.title,
                description: context.description
            }).then(({ data }) => {
                commit("setPostList", data);
            });
        },
        createPost({ commit }, context) {
            return axios.post("/post/create", {
                authID: this.state.authID,
                ...context
            }).then(({ data }) => {
                commit("setPostList", data);
            });
        },
        updatePostConfirm({ commit }, context) {
            return axios.post("/post/update-confirm", {
                id: context.id,
                title: context.title,
                description: context.description
            }).then(({ data }) => {
                commit("setPostList", data);
            });
        },
        updatePost({ commit }, context) {
            return axios.post("/post/update", {
                authID: this.state.authID,
                ...context
            }).then(({ data }) => {
                commit("setPostList", data);
            });
        },
    },
    getters: {
        isLoggedIn: (state) => !!state.user,
        userType: (state) => {
            if (state.user && state.user.data.type) {
                return state.user.data.type;
            }
            return -1;
        },
        userId: (state) => {
            if (state.user && state.user.data.id) {
                return state.user.data.id;
            }
        },
        userName: (state) => {
            if (state.user && state.user.data.name) {
                return state.user.data.name;
            }
        },
        showList: (state) => {
            if (state.showList) {
                return state.showList;
            }
        },
        postList: (state) => {
            if (state.postList) {
                return state.postList;
            }
        }
    },
    plugins: [createPersistedState()],
});
