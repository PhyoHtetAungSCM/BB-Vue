export default {
	data() {
		return {
      password: {
        userID: this.$store.state.authID,
        old_password: "",
        new_password: "",
        password_confirmation: "",
      },
      error: "",
      err_msg: "",
      def_err_msg: "The given data was invalid.",
		};
	},
	methods: {
		changePassword() {
			this.$axios.post("/user/change-password", this.password)
                .then(() => {
                  this.error = "";
                  this.$router.push({ name: "user-list" });
                })
                .catch(err => {
                  console.log(err.response);
                  this.error = err.response.data.errors;
                  if(err.response.data.message) {
                    this.err_msg = err.response.data.message;
                  }
                });
      },
      removeUserInputs() {
        this.password.old_password = "",
        this.password.new_password = "",
        this.password.password_confirmation = ""
      }
    }
		
};