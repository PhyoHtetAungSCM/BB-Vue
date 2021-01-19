<template>
    <v-card class="mx-auto" max-width="450">
        <v-card-title class="user-title">
            <span class="title font-weight-light">Update User Confirmation</span>
        </v-card-title>
        <v-form ref="form" @submit.prevent="updateUser">
            <v-container>
                <img v-if="confirmProfile" :src="confirmProfile" style="width: 100px; height: 100px;">
                <img v-else :src="userList.profile_path" style="width: 100px; height: 100px;">
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <label for="name" class="font-bold">Name:</label>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <span>{{ userList.name }}</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <label for="email" class="font-bold">Email:</label>
                    </v-col>
                    <v-col cols="12" sm="6" md="8">
                        <span>{{ userList.email }}</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <label for="type" class="font-bold">Type:</label>
                    </v-col>
                    <v-col cols="12" sm="6" md="8">
                        <span>{{ userList.type == 0 ? "Admin" : "User" }}</span>
                    </v-col>
                </v-row>
            </v-container>
            <v-card-actions>
                <div class="user-create-action">
                    <v-spacer></v-spacer>
                    <v-btn type="submit" large color="primary">Create</v-btn>
                </div>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script src="../../services/pages/user/update-user-confirm.js"></script>

<style scoped src="../../assets/css/pages/user/update-user-confirm.css"></style>