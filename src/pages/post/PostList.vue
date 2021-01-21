<template>
<v-card>
	<v-card-title>
		Post list
		<v-spacer></v-spacer>
		<v-form ref="form">
			<v-row class="filter-bar">
				<v-col md="2.5">
					<v-text-field label="Search keyword" hide-details="auto" v-model='keyword'></v-text-field>
				</v-col>
				<v-btn class="post-list-btn mr-4" color="primary" @click="filterPosts">Filter</v-btn>
				<template v-if="userId">
					<v-btn class="post-list-btn mr-4" color="primary" @click="$router.push({ name: 'create-post' })">Create</v-btn>
					<v-btn class="post-list-btn mr-4" color="primary" @click="$router.push({ name: 'post-upload' })">Upload</v-btn>
					<v-btn class="post-list-btn mr-4" color="primary" @click="download()">Download</v-btn	>
				</template>
			</v-row>
		</v-form>
	</v-card-title>
	<v-container>
		<v-data-table :headers="headers" :items="showList">
			<template v-slot:[`item.title`]="{ item }">
				<v-dialog transition="dialog-top-transition" max-width="600">
					<template v-slot:activator="{ on, attrs }">
						<a color="primary" 
						v-if="item.title" 
						:key="item.id" 
						v-bind="attrs" 
						v-on="on"
						@click="getPostDetail(item.id)"
						>{{ item.title }}</a>
					</template>
					<template v-slot:default="dialog">
						<v-card>
							<v-toolbar color="primary" dark>Post Detail</v-toolbar>
							<v-container>
								<v-row>
									<v-col cols="12" sm="6" md="4">
										<label class="font-bold">Title:</label>
									</v-col>
									<v-col cols="12" sm="6" md="8">
										<span>{{ postDetail.title }}</span>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" sm="6" md="4">
										<label class="font-bold">Description:</label>
									</v-col>
									<v-col cols="12" sm="6" md="8">
										<span>{{ postDetail.description }}</span>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" sm="6" md="4">
										<label class="font-bold">Status:</label>
									</v-col>
									<v-col cols="12" sm="6" md="8">
										<span>{{ postDetail.status == 1 ? "Active" : "Inactive" }}</span>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" sm="6" md="4">
										<label class="font-bold">Posted User:</label>
									</v-col>
									<v-col cols="12" sm="6" md="8">
										<span>{{ postDetail.user.name }}</span>
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
				<template v-if="item.create_user_id == userId || userType == 0">
					<v-row>
						<div class="operation-btn">
							<v-btn color="primary" class="post-list-btn" @click="$router.push({ name: 'update-post', params: { id: item.id } })">Edit</v-btn>
						</div>
						<div class="operation-btn">
							<v-btn color="error" class="post-list-btn" @click="deletePost(item.id)">Delete</v-btn>
						</div>
					</v-row>
				</template>
			</template>
		</v-data-table>
	</v-container>
</v-card>
</template>

<script src="../../services/post/post-list.js"></script>

<style scoped src="../../assets/css/pages/post/post-list.css"></style>