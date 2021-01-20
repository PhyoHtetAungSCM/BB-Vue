<template>
<v-card class="mx-auto" max-width="450">
  <v-card-title class="user-title">
    <span class="title font-weight-light">Update User</span>
  </v-card-title>
  <v-form ref="form" @submit.prevent="updateUserConfirm">
    <v-card-text>
      <img :src="userInfo.profile_path" width="100" height="100">
      <div class="user-input">
        <v-text-field :value="userInfo.name" v-model="userInfo.name" type="text" label="Name" hide-details="auto">
        </v-text-field>
        <span v-if="error && error.name"  class="error-message">
          {{ error.name[0] }}
        </span>
      </div>
      <div class="user-input">
        <v-text-field :value="userInfo.email" v-model="userInfo.email" type="text" label="Email" hide-details="auto">
        </v-text-field>
        <span v-if="error && error.email"  class="error-message">
          {{ error.email[0] }}
        </span>
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

<script src="../../services/pages/user/update-user.js"></script>

<style scoped src="../../assets/css/pages/user/update-user.css"></style>