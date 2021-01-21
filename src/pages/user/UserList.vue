<template>
<v-card>
	<v-card-title>
		User list
		<v-spacer></v-spacer>
		<v-form ref="form">
			<v-row class="filter-bar">
				<v-col md="2.5">
					<v-text-field label="Search keyword" hide-details="auto" v-model='keyword'></v-text-field>
				</v-col>
				<v-btn class="user-list-btn mr-4" color="primary" @click="filterUsers">Filter</v-btn>
				<v-btn class="user-list-btn mr-4" color="primary" @click="$router.push({ name: 'create-user' })">Create</v-btn>
			</v-row>
		</v-form>
	</v-card-title>
	<v-container>
		<v-data-table :headers="headers" :items="showList">
			<template v-slot:[`item.name`]="{ item }">
				<v-dialog transition="dialog-top-transition" max-width="500">
					<template v-slot:activator="{ on, attrs }">
						<a color="primary" 
						v-if="item.name" 
						:key="item.id" 
						v-bind="attrs" 
						v-on="on"
						@click="getUserDetail(item.id)"
						>{{ item.name }}</a>
					</template>
					<template v-slot:default="dialog">
						<v-card>
							<v-toolbar color="primary" dark>User Detail</v-toolbar>
							<v-container>
								<img :src="userDetail.profile_path" width="100" height="100">
								<v-row>
									<v-col cols="12" sm="6" md="4">
										<label class="font-bold">Name:</label>
									</v-col>
									<v-col cols="12" sm="6" md="8">
										<span>{{ userDetail.name }}</span>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" sm="6" md="4">
										<label class="font-bold">Email:</label>
									</v-col>
									<v-col cols="12" sm="6" md="8">
										<span>{{ userDetail.email }}</span>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" sm="6" md="4">
										<label class="font-bold">Type:</label>
									</v-col>
									<v-col cols="12" sm="6" md="8">
										<span>{{ userDetail.type == 0 ? "Admin" : "User" }}</span>
									</v-col>
								</v-row>
							</v-container>
							<!-- card action -->
							<v-card-actions class="justify-end">
								<v-btn
									text
									@click="dialog.value = false"
								>Close</v-btn>
							</v-card-actions>
						</v-card>
					</template>
				</v-dialog>
			</template>
			<template v-slot:[`item.operation`] = "{ item }">
				<v-row>
					<div class="operation-btn">
						<v-btn color="error" class="user-list-btn" @click="deleteUser(item.id)">Delete</v-btn>
					</div>
				</v-row>
			</template>
		</v-data-table>
	</v-container>
</v-card>
</template>

<script src="../../services/pages/user/user-list.js"></script>

<style scoped src="../../assets/css/pages/user/user-list.css"></style>