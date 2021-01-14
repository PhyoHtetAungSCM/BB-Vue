import { mapGetters } from "vuex";

export default {
	computed: {
    ...mapGetters(["postList"]),
  },
  methods: {
    createPost() {
      this.$store
          .dispatch("createPost", {
            ...this.$store.state.postList
          })
          .then(() => {
              this.error = "";
              this.$router.push({ name: "post-list" });
          })
          .catch(err => {
            console.log(err);
          });
    }
  }
};
