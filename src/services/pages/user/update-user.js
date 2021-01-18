export default {
	data() {
		return {
			routeID: this.$route.params.id,
			types: [
				{ value: 0, text: "Admin" },
				{ value: 1, text: "User" }
			],
			userInfo: this.$store.state.userList,
			selectedType: "",
			previewProfile: "",
			error: "",
		};
	},
	mounted() {
		/** Empty createObjectURL */
		this.$store.state.confirmProfile = '';

		/** 
		 * 	1) Filter to get related data
		 * 	2) If statement -> to prevent data loss when page is refreshed
		 */
		if(this.userInfo.length > 1) {
			const updateUser = this.userInfo.filter((user) => {
				return (
					user.id == this.routeID
				);
			});
			this.userInfo = updateUser[0];
			this.selectedType = updateUser[0].type;
			this.userInfo.profile = null;
		}
	},
	methods: {
		setSelected(value) {
				this.userInfo.type = value
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
		updateUserConfirm() {
			this.$store
			.dispatch("updateUserConfirm", this.userInfo)
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