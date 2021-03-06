import { mapGetters } from "vuex";

export default {
	computed: {
    ...mapGetters(["userList", "confirmProfile"]),
  },
  methods: {
    createUser() {
      this.$store
				.dispatch("createUser", this.$store.state.userList)
				.then(() => {
					this.error = "";
					this.$router.push({ name: "user-list" });
				})
				.catch(err => {
					console.log(err);
				});
    }
  }
};