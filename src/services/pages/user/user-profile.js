export default {
	data() {
		return {
			userProfile: []
		};
	},
	mounted() {
		this.$axios
			.get("/user/profile/" + this.$store.state.authID)
			.then(response => {
				this.$store.commit('setUserList', response.data);
				this.userProfile = this.$store.state.userList;
			});
	},
	methods: {
		getUpdateUser() {
			this.$router.push({ name: 'update-user' });
    },
    changePassword() {
      this.$router.push({ name: 'change-password'});
    }
	}
};