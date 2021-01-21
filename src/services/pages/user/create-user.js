export default {
	data() {
		return {
			types: [
				{ value: 0, text: "Admin" },
				{ value: 1, text: "User" }
			],
			userInfo: {
				name: "",
				email: "",
				password: "",
				password_confirmation: "",
				type: 1,
				profile: '',
			},
			previewProfile: "",
			error: "",
		};
	},
	methods: {
		setSelected(value) {
			this.userInfo.type = value;
		},
		imageChanged(e) {
			/** Preview Image */
			this.previewProfile = URL.createObjectURL(e.target.files[0]);
			this.$store.state.confirmProfile = URL.createObjectURL(e.target.files[0]);
			/** Even.Target.Result */
			let fileReader = new FileReader();
			fileReader.readAsDataURL(e.target.files[0]);
			fileReader.onload = (e) => {
				this.userInfo.profile = e.target.result;
			}
		},
		createUserConfirm() {
			this.$store
				.dispatch("createUserConfirm", this.userInfo)
				.then(() => {
					this.error = "";
					this.$router.push({ name: "create-user-confirm" });
				})
				.catch(err => {
					this.error = err.response.data.errors;
					console.log(err);
				});
		},
		removeUserInputs() {
			this.userInfo.name = "",
      this.userInfo.email = "",
			this.userInfo.password = "",
			this.userInfo.password_confirmation = "",
			this.previewProfile = "",
			document.getElementById('file').value = ""
		}
  }
};