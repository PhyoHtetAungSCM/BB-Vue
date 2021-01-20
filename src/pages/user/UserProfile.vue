<template>
	<v-card class="mx-auto" max-width="450">
		<v-card-title class="user-title">
			<span class="title font-weight-light">User Profile</span>
		</v-card-title>
		<v-card-actions>
			<div class="user-create-action">
				<v-spacer></v-spacer>
				<a color="primary" class="profile-operation" @click="getUpdateUser">Edit</a>
				<span class="profile-operation">|</span>
				<a class="profile-operation" @click="changePassword">Change Password</a>
			</div>
		</v-card-actions>
		<v-container>
			<img :src="userProfile.profile_path" width="100" height="100">
			<v-row>
				<v-col cols="12" sm="6" md="4">
					<label for="name" class="font-bold">Name:</label>
				</v-col>
				<v-col cols="12" sm="6" md="4">
					<span>{{ userProfile.name }}</span>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12" sm="6" md="4">
					<label for="email" class="font-bold">Email:</label>
				</v-col>
				<v-col cols="12" sm="6" md="8">
					<span>{{ userProfile.email }}</span>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12" sm="6" md="4">
					<label for="type" class="font-bold">Type:</label>
				</v-col>
				<v-col cols="12" sm="6" md="8">
					<span>{{ userProfile.type == 0 ? "Admin" : "User" }}</span>
				</v-col>
			</v-row>
		</v-container>
	</v-card>
</template>

<script src="../../services/pages/user/user-profile.js"></script>

<style scoped src="../../assets/css/pages/user/user-profile.css"></style>