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
        };
    },
    mounted() {
        this.$axios
            .get("/post/list")
            .then(response => {
                this.$store.commit('setPostList', response.data);
                this.$store.commit('setShowList', this.$store.state.postList);
            });
    },
    computed: {
        ...mapGetters(["isLoggedIn", "showList"]),
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
            this.$store.state.showList = this.$store.state.postList.filter((post) => {
                return (
                    post.title.includes(this.keyword) ||
                    post.description.includes(this.keyword) ||
                    post.user.name.includes(this.keyword)
                );
            });
        },
        deletePost(id) {
            this.$axios.delete("/post/delete/" + id)
                .then(() => {
                    const index = this.$store.state.postList.findIndex(post => post.id == id);
                    this.$store.commit('deletePostList', index)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
};
