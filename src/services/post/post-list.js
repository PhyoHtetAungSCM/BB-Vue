import { mapGetters } from "vuex";
import XLSX from 'xlsx';

export default {
	data() {
		return {
			keyword: "",
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
			showList: [],
			postDetail: [],
			userType: this.$store.state.user.data.type,
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
			...mapGetters(["isLoggedIn", "userId"]),
			headers() {
				if (!this.isLoggedIn) {
					return this.headerList.slice(0, this.headerList.length - 1);
				} else {
					return this.headerList;
				}
			},  
    },
    methods: {
			getPostDetail(id) {
				const postDetail = this.showList.filter((post) => {
					return (
						post.id == id
					);
				});
				this.postDetail = postDetail[0];
			},
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
				if(confirm("Do you really want to delete?")){
					this.$store
						.dispatch("deletePost", id)
						.then(() => {
							this.error = "";
						})
						.catch(err => {
							this.error = err.response.data.errors;
							console.log(err);
						});
				}
			},
			download() {
        const data = XLSX.utils.json_to_sheet(this.showList)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, data, 'Post List')
        XLSX.writeFile(wb,'SCM BulletinBoard.xlsx')
      }
    }
};