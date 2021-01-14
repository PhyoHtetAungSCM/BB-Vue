import { mapGetters } from "vuex";

export default {
	computed: {
    ...mapGetters(["tmpList"]),
  },
  methods: {
    updatePost() {
      this.$store
          .dispatch("updatePost", {
            id: this.$route.params.id,
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
