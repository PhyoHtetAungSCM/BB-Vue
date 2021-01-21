export default {
	data() {
		return {
			userProfile: ''
		};
	},
	mounted() {
		this.$store.state.userList = this.$store.state.user.data;
		this.userProfile = this.$store.state.userList;
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