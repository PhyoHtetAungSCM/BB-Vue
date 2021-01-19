<template>
    <v-card class="mx-auto" max-width="450">
        <v-card-title class="user-title">
            <span class="title font-weight-light">User Profile</span>
        </v-card-title>
        <v-card-actions>
            <div class="user-create-action">
                <v-spacer></v-spacer>
                <a color="primary" style="margin-right: 10px;" @click="getUpdateUser">Edit</a>
                <span style="margin-right: 10px;">|</span>
                <a style="margin-right: 10px;" @click="changePassword">Change Password</a>
            </div>
        </v-card-actions>
        <v-container>
            <img :src="userProfile.profile_path" style="width: 100px; height: 100px;">
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