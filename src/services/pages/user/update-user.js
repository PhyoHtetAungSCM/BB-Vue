export default {
	data() {
		return {
			id: this.$route.params.id,
			name: '',
			email: '',
      type: '',
      error: '',
		};
	},
	mounted() {
		this.updateUser = this.$store.state.userList.filter((user) => {
			return (
				user.id == this.id
			);
		}),
		this.name = this.updateUser[0].name,
    this.email = this.updateUser[0].email,
    this.type = this.updateUser[0].type
	},
	methods: {
        updateUserConfirm() {
            this.$store
                .dispatch("updateUserConfirm", {
										id: this.id,
                    name: this.name,
                    email: this.email,
                    type: this.type
                })
                .then(() => {
                    this.error = "";
                    this.$router.push({ name: "update-user-confirm" });
                })
                .catch(err => {
                    this.error = err.response.data.errors;
                    console.log(err);
                });
        },
    }
};
