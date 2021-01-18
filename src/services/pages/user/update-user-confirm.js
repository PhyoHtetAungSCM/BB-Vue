import { mapGetters } from "vuex";

export default {
  mounted() {
    this.$store.state.userList['authID'] = this.$store.state.authID;
  },
	computed: {
    ...mapGetters(["userList", "confirmProfile"]),
  },
  methods: {
    updateUser() {
      this.$store
        .dispatch("updateUser", this.$store.state.userList)
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