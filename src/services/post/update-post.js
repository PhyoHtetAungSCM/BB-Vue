export default {
	data() {
		return {
			routeID: this.$route.params.id,
			postInfo: this.$store.state.postList,
			error: "",
		};
	},
	mounted() {
		if(this.postInfo.length > 1) {
			const updatePost = this.postInfo.filter((post) => {
				return (
					post.id == this.routeID
				);
			});
			this.postInfo = updatePost[0];
			this.postInfo.profile = null;
		}
	},
	methods: {
		updatePostConfirm() {
			this.$store
				.dispatch("updatePostConfirm", this.postInfo)
				.then(() => {
					this.error = "";
					this.$router.push({ name: "update-post-confirm" });
				})
				.catch(err => {
					this.error = err.response.data.errors;
					console.log(err);
				});
		},
		removePostInputs() {
			this.postInfo.title = "",
			this.postInfo.description = ""
		}
	}
};