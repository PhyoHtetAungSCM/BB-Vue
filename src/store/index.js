import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueExcelXlsx from "vue-excel-xlsx";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);
Vue.use(VueExcelXlsx);

axios.defaults.baseURL = process.env.VUE_APP_SERVER;

export default new Vuex.Store({
	state: {
		authID: '',
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
		setPostData(state, data) {
			state.postList.push({ title: data.title, description: data.description })
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
		}
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
			return axios.post("/auth/logout").then((response) => {
				console.log(response);
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
			});
		},
		deleteUser({ commit }, context) {
			return axios.post("/user/delete", {
				authID: this.state.authID,
				userID: context.userID
			}).then(() => {
				commit('deleteUserList', context.userID);
			})
		},
		/** Post Actions */
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
		deletePost({ commit }, id) {
			return axios.post("/post/delete", {
				authID: this.state.authID,
				postID: id
			}).then(() => {
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