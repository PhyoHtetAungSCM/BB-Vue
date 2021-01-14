export default {
	data() {
		return {
			id: this.$route.params.id,
			title: '',
			description: '',
			updatePost: '',
			error: "",
		};
	},
	mounted() {
		this.updatePost = this.$store.state.postList.filter((post) => {
			return (
				post.id == this.id
			);
		}),
		this.title = this.updatePost[0].title,
		this.description = this.updatePost[0].description
	},
	methods: {
        updatePostConfirm() {
            this.$store
                .dispatch("updatePostConfirm", {
					id: this.id,
                    title: this.title,
                    description: this.description
                })
                .then(() => {
                    this.error = "";
                    this.$router.push({ name: "update-post-confirm" });
                })
                .catch(err => {
                    this.error = err.response.data.errors;
                    console.log(err);
                });
        },
    }
};
