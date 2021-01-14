import { mapGetters } from "vuex";

export default {
	computed: {
    ...mapGetters(["tmpList"]),
  },
  methods: {
    createPost() {
      this.$store
          .dispatch("createPost", {
            ...this.$store.state.tmpList
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
