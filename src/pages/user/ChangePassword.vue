<template>
<v-card class="mx-auto" max-width="450">
    <v-card-title class="user-title">
        <span class="title font-weight-light">Change Password</span>
    </v-card-title>
    <v-form ref="form" @submit.prevent="changePassword()">
        <v-card-text>
          <div class="user-input">
            <v-text-field v-model="password.old_password" type="password" label="Old Password" hide-details="auto" class="error-box"></v-text-field>
            <span v-if="error && error.old_password"  class="error-message">{{ error.old_password[0] }}</span>
            <span v-if="err_msg != def_err_msg" class="error-message">{{ err_msg }}</span>
          </div>
          <div class="user-input">
            <v-text-field v-model="password.new_password" type="password" label="New Password" hide-details="auto" class="error-box"></v-text-field>
            <span v-if="error && error.new_password"  class="error-message">{{ error.new_password[0] }}</span>
          </div>
          <div class="user-input">
            <v-text-field v-model="password.password_confirmation" type="password" label="Confirm Password" hide-details="auto" class="error-box"></v-text-field>
            <span v-if="error && error.password_confirmation"  class="error-message">{{ error.password_confirmation[0] }}</span>
          </div>
        </v-card-text>
        <v-card-actions>
            <div class="user-create-action">
                <v-spacer></v-spacer>
                <v-btn type="submit" large color="primary" style="margin-right: 10px;">Change</v-btn>
                <v-btn large color="primary" style="margin-right: 10px;" @click="removeUserInputs">Clear</v-btn>
            </div>
        </v-card-actions>
    </v-form>
</v-card>
</template>

<script src="../../services/pages/user/change-password.js"></script>

<style scoped src="../../assets/css/pages/user/change-password.css"></style>