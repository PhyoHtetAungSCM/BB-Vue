export default {
	data() {
		return {
			name: "",
			email: "",
			password: "",
			password_confirmation: "",

			types: ['Admin', 'User'],
			selectedType: "",
			
			profile: null,
			preview_url: null,
			error: "",
		};
    },
	methods: {
		setSelected(value) {
			this.selectedType = value;
		},
		previewImage(e) {
			if (e) {
				this.$store.state.url= URL.createObjectURL(this.profile);
				this.preview_url = this.$store.state.url;
			}
		},
        createUserConfirm() {
            this.$store
                .dispatch("createUserConfirm", {
                    name: this.name,
					email: this.email,
					password: this.password,
					password_confirmation: this.password_confirmation,
					type: this.selectedType == "Admin" ? 0 : 1,
					profile_url: this.$store.state.url,
                })
                .then(() => {
                    this.error = "";
                    this.$router.push({ name: "create-user-confirm" });
                })
                .catch(err => {
                    this.error = err.response.data.errors;
					console.log(this.error);
                });
        },
    }
};
