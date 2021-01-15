<template>
<v-card class="mx-auto" max-width="450">
    <v-card-title class="user-title">
        <span class="title font-weight-light">Update User</span>
    </v-card-title>
    <v-form ref="form" @submit.prevent="updateUserConfirm">
        <v-card-text>
            <div class="user-input">
                <v-text-field outlined :value="name" v-model="name" type="text" label="Name" hide-details="auto">
                </v-text-field>
                <span v-if="error && error.name"  class="error-message">
                  {{ error.name[0] }}
                </span>
            </div>

            <div class="user-input">
                <v-text-field outlined :value="email" v-model="email" type="text" label="Email" hide-details="auto">
                </v-text-field>
                <span v-if="error && error.email"  class="error-message">
                  {{ error.email[0] }}
                </span>
            </div>

            <div class="user-input">
                <v-text-field outlined :value="type" v-model="type" type="text" label="Type" hide-details="auto">
                </v-text-field>
                <span v-if="error && error.type"  class="error-message">
                  {{ error.type[0] }}
                </span>
            </div>
        </v-card-text>
        <v-card-actions>
            <div class="user-create-action">
                <v-spacer></v-spacer>
                <v-btn type="submit" large color="primary">Confirm</v-btn>
            </div>
        </v-card-actions>
    </v-form>
</v-card>
</template>

<script src="../../services/pages/user/update-user.js"></script>

<style scoped src="../../assets/css/pages/user/update-user.css"></style>
