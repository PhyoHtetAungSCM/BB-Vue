<template>
<v-card class="mx-auto" max-width="450">
  <v-card-title class="user-title">
    <span class="title font-weight-light">Create User</span>
  </v-card-title>
  <v-form ref="form" @submit.prevent="createUserConfirm">
    <v-card-text>
      <div class="user-input">
        <v-text-field v-model="userInfo.name" type="text" label="Name" hide-details="auto" class="error-box"></v-text-field>
        <span v-if="error && error.name"  class="error-message">{{ error.name[0] }}</span>
      </div>
      <div class="user-input">
        <v-text-field v-model="userInfo.email" type="text" label="Email" hide-details="auto" class="error-box"></v-text-field>
        <span v-if="error && error.email"  class="error-message">{{ error.email[0] }}</span>
      </div>
      <div class="user-input">
        <v-text-field v-model="userInfo.password" type="password" label="Password" hide-details="auto" class="error-box"></v-text-field>
        <span v-if="error && error.password"  class="error-message">{{ error.password[0] }}</span>
      </div>
      <div class="user-input">
        <v-text-field v-model="userInfo.password_confirmation" type="password" label="Confirm Password" hide-details="auto" class="error-box"></v-text-field>
        <span v-if="error && error.password_confirmation"  class="error-message">{{ error.password_confirmation[0] }}</span>
      </div>
      <v-select 
        label="Type"
        :value="selectedType" 
        :items="types"
        @input="setSelected"
      ></v-select>
      <div class="img-wrap">
        <div class="img-container">
          <img v-if="previewProfile" :src="previewProfile" id="profile">
        </div>
        <div class="profile-wrap">
          <div class="profile-label">
            <label class="font-bold">Select your avatar</label>
          </div>
          <input type="file" id="file" @change="imageChanged" accept="image/*">
          <span v-if="error && error.profile"  class="error-message">{{ error.profile[0] }}</span>
        </div>
      </div>
    </v-card-text>
    <v-card-actions>
      <div class="user-create-action">
        <v-spacer></v-spacer>
        <v-btn type="submit" large color="primary" class="action-btn">Confirm</v-btn>
        <v-btn large color="primary" class="action-btn" @click="removeUserInputs">Clear</v-btn>
      </div>
    </v-card-actions>
  </v-form>
</v-card>
</template>

<script src="../../services/pages/user/create-user.js"></script>

<style scoped src="../../assets/css/pages/user/create-user.css"></style>