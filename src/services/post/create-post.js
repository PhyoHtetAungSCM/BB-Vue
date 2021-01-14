export default {
	data() {
		return {
			title: "",
			description: "",
			error: "",
		};
    },
	methods: {
        createPostConfirm() {
            this.$store
                .dispatch("createPostConfirm", {
                    title: this.title,
                    description: this.description
                })
                .then(() => {
                    this.error = "";
                    this.$router.push({ name: "create-post-confirm" });
                })
                .catch(err => {
                    this.error = err.response.data.errors;
                    for(let error in this.error) {
                        console.log(error);
                    } 
                });
        },
    }
};
