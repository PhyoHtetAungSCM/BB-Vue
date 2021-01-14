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
        postList: [],
        showList: [],
        tmpList: [],
    },
    mutations: {
        setUserData(state, data) {
            state.user = data;
        },
        setPostData(state, data) {
            state.postList.push({ title: data.title, description: data.description })
        },
        setPostList(state, data) {
            state.postList = data
        },
        setShowList(state, data) {
            state.showList = data
        },
        setTmpList(state, data) {
            state.tmpList = data
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
                commit("setTmpList", data);
            });
        },
        createPost({ commit }, context) {
            return axios.post("/post/create", {
                authID: this.state.authID,
                ...context
            }).then(({ data }) => {
                commit("setPostData", data);
            });
        },
        updatePostConfirm({ commit }, context) {
            return axios.post("/post/update-confirm", {
                id: context.id,
                title: context.title,
                description: context.description
            }).then(({ data }) => {
                commit("setTmpList", data);
            });
        },
        updatePost({ commit }, context) {
            return axios.post("/post/update", {
                authID: this.state.authID,
                ...context
            }).then(({ data }) => {
                commit("updatePostList", data);
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
        tmpList: (state) => {
            if (state.tmpList) {
                return state.tmpList;
            }
        }
    },
    plugins: [createPersistedState()],
});
