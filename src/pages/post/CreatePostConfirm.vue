<template>
	<v-card class="mx-auto" max-width="450">
		<v-card-title class="post-title">
			<span class="title font-weight-light">Create Post</span>
		</v-card-title>
		<v-form ref="form" @submit.prevent="createPost">
			<v-container>
				<v-row>
					<v-col cols="12" sm="6" md="4">
						<label for="title" class="font-bold">Title:</label>
					</v-col>
					<v-col cols="12" sm="6" md="8">
						<span>{{ postList.title }}</span>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12" sm="6" md="4">
						<label for="description" class="font-bold">Description:</label>
					</v-col>
					<v-col cols="12" sm="6" md="8">
						<span>{{ postList.description }}</span>
					</v-col>
				</v-row>
			</v-container>
			<v-card-actions>
				<div class="post-create-action">
					<v-spacer></v-spacer>
					<v-btn type="submit" large color="primary" style="margin-right: 10px;">Create</v-btn>
					<v-btn large color="primary" style="margin-right: 10px;" @click="$router.back()">Cancel</v-btn>
				</div>
			</v-card-actions>
		</v-form>
	</v-card>
</template>

<script src="../../services/post/create-post-confirm.js"></script>

<style scoped src="../../assets/css/pages/post/create-post-confirm.css"></style>