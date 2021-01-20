import { mapGetters } from "vuex";

export default {
	computed: {
    ...mapGetters(["postList"]),
  },
  methods: {
    updatePost() {
      this.$store
        .dispatch("updatePost", this.$store.state.postList)
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
