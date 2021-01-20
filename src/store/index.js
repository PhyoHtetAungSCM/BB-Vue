import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

axios.defaults.baseURL = process.env.VUE_APP_SERVER;

export default new Vuex.Store({
	state: {
		authType: '',
		confirmProfile: '',
		user: null,
		userList: [],
		postList: [],
	},
	mutations: {
		setUserData(state, data) {
			state.user = data;
		},
		setUserName(state, name) {
			state.user.data.name = name;
		},
		setUserList(state, data) {
			state.userList = data
		},
		deleteUserList(state, id) {
			const index = state.userList.findIndex(user => user.id == id);
			state.userList.splice(index, 1)
		},
		setPostList(state, data) {
			state.postList = data
		},
		deletePostList(state, id) {
			const index = state.postList.findIndex(post => post.id == id);
			state.postList.splice(index, 1)
		},
	},
	actions: {
		/** Authentication */
		login({ commit }, credentials) {
			return axios.post("/auth/login", {
				email: credentials.email,
				password: credentials.password
			}).then(({ data }) => {
				commit("setUserData", data);
			});
		},
		logout({ commit }) {
			return axios.post("/auth/logout").then(() => {
				commit("setUserData", null);
			});
		},
		/** User Actions */
		createUserConfirm({ commit }, context) {
			return axios.post("/user/create-confirm", context).then(({ data }) => {
				commit("setUserList", data);
			});
		},
		createUser({ commit }, context) {
			return axios.post("/user/create", context).then(({ data }) => {
				commit("setUserList", data);
			});
		},
		updateUserConfirm({ commit }, context) {
			return axios.post("/user/update-confirm", context).then(({ data }) => {
				commit("setUserList", data);
			});
		},
		updateUser({ commit }, context) {
			return axios.post("/user/update", context).then(({ data }) => {
				commit("setUserList", data);
				commit("setUserName", context.name);
			});
		},
		deleteUser({ commit }, id) {
			return axios.delete("/user/delete/" + id).then(() => {
				commit('deleteUserList', id);
			})
		},
		/** Post Actions */
		createPostConfirm({ commit }, context) {
			return axios.post("/post/create-confirm", context).then(({ data }) => {
				commit("setPostList", data);
			});
		},
		createPost({ commit }, context) {
			return axios.post("/post/create", context).then(({ data }) => {
				commit("setPostList", data);
			});
		},
		updatePostConfirm({ commit }, context) {
			return axios.post("/post/update-confirm", context).then(({ data }) => {
				commit("setPostList", data);
			});
		},
		updatePost({ commit }, context) {
			return axios.post("/post/update", context).then(({ data }) => {
				commit("setPostList", data);
			});
		},
		deletePost({ commit }, id) {
			return axios.delete("/post/delete/" + id).then(() => {
				commit('deletePostList', id);
			})
		}
	},
	getters: {
		isLoggedIn: (state) => !!state.user,
		/** User Getters */
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
		userType: (state) => {
			if (state.user && state.user.data.type) {
				return state.user.data.type;
			}
		},
		userList: (state) => {
			if (state.userList) {
				return state.userList;
			}
		},
		confirmProfile: (state) => {
			if (state.confirmProfile) {
				return state.confirmProfile;
			}
		},
		
		/** Post Getters */
		postList: (state) => {
			if (state.postList) {
				return state.postList;
			}
		},
	},
	plugins: [createPersistedState()],
});