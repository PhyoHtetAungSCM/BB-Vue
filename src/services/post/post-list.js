import { mapGetters } from "vuex";
export default {
    data() {
        return {
            keyword: '',
            postInfo: null,
            dialogTitle: "",
            dialog: false,
            dialogDelete: false,
            headerList: [
                {
                    text: "ID",
                    align: "start",
                    value: "id",
                },
                {
                    text: "Post Title",
                    value: "title",
                },
                {
                    text: "Post Desciption",
                    value: "description",
                },
                {
                    text: "Posted User",
                    value: "user.name",
                },
                {
                    text: "Operation",
                    value: "operation",
                },
            ],
            showList: []
        };
    },
    mounted() {
        this.$axios
            .get("/post/list")
            .then(response => {
                this.$store.commit('setPostList', response.data);
                this.showList = this.$store.state.postList;
            });
    },
    computed: {
        ...mapGetters(["isLoggedIn"]),
        headers() {
            if (!this.isLoggedIn) {
                return this.headerList.slice(0, this.headerList.length - 1);
            } else {
                return this.headerList;
            }
        },  
    },
    methods: {
        filterPosts() {
            this.showList = this.$store.state.postList.filter((post) => {
                return (
                    post.title.includes(this.keyword) ||
                    post.description.includes(this.keyword) ||
                    post.user.name.includes(this.keyword)
                );
            });
        },
        deletePost(id) {
            this.$store
                .dispatch("deletePost", {
                    postID: id
                })
                .then(() => {
                    this.error = "";
                })
                .catch(err => {
                    this.error = err.response.data.errors;
                    console.log(err);
                });
        },
    }
};
