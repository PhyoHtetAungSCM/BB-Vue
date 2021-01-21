import { mapGetters } from "vuex";
export default {
	data() {
		return {
			keyword: '',
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
					text: "User Name",
					value: "name",
				},
				{
					text: "User Email",
					value: "email",
				},
				{
					text: "Created User",
					value: "user.name",
				},
				{
					text: "Operation",
					value: "operation",
				},
			],
			showList: [],
			userDetail: [],
			userType: this.$store.state.user.data.type,
		};
	},
	mounted() {
		this.$axios
			.get("/user/list")
			.then(response => {
				this.$store.commit('setUserList', response.data);
				this.showList = this.$store.state.userList;
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
		getUserDetail(id) {
			const userDetail = this.showList.filter((user) => {
				return (
					user.id == id
				);
			});
			this.userDetail = userDetail[0];
		},
		filterUsers() {
			this.showList = this.$store.state.userList.filter((user) => {
				return (
					user.name.includes(this.keyword) ||
					user.email.includes(this.keyword) ||
					user.user.name.includes(this.keyword)
				);
			});
		},
		deleteUser(id) {
			if(confirm("Do you really want to delete?")){
				this.$store
					.dispatch("deleteUser", id)
					.then(() => {
						this.error = "";
					})
					.catch(err => {
						this.error = err.response.data.errors;
						console.log(err);
					});
			}
		},
	}
};