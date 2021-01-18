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
			showList: []
		};
	},
	mounted() {
		this.$axios
			.get("/user/list")
			.then(response => {
				this.$store.commit('setUserList', response.data);
				this.showList = this.$store.state.userList;
			});
		console.log(this.$store.state.userList);
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
		filterUsers() {
			this.showList = this.$store.state.userList.filter((user) => {
				return (
					user.name.includes(this.keyword) ||
					user.email.includes(this.keyword) ||
					user.user.name.includes(this.keyword)
				);
			});
		},
		getUpdateUser(id) {
			const updateUser = this.$store.state.userList.filter((user) => {
				return (
					user.id == id
				);
			});
			this.$store.state.userList = updateUser[0];
			this.$router.push({ name: 'update-user' });
		},
		deleteUser(id) {
			this.$store
				.dispatch("deleteUser", {
					userID: id
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
