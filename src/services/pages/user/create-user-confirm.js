import { mapGetters } from "vuex";

export default {
  data() {
    return {
      confirm_url: this.$store.state.url
    }
  },
	computed: {
    ...mapGetters(["userList"]),
  },
  methods: {
    createUser() {
      this.$store
          .dispatch("createUser", {
            ...this.$store.state.userList
          })
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
