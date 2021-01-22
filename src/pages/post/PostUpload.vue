<template>
<v-card class="mx-auto" max-width="500">
    <v-card-title class="post-title">
        <span class="title font-weight-light">Upload Post</span>
    </v-card-title>
    <v-container>
        <v-card-text>
          <div v-if="error" class="upload-error"><span>{{error}}</span></div>
          <div class="upload-excel-wrap">
            <div class="upload-excel-container">
              <label class="font-bold">Choose your import file</label>
            </div>
            <input type="file" id="file" name="uploadFile" ref="csvFile"  @change="onFileChange" accept=".csv" />
          </div>
        </v-card-text>
        <v-card-actions>
            <div class="post-create-action">
                <v-spacer></v-spacer>
                <v-btn type="submit" color="primary" class="action-btn" @click="upload">Upload</v-btn>
                <v-btn color="primary" class="action-btn" @click="removePostInput">Clear</v-btn>
            </div>
        </v-card-actions>
    </v-container>
</v-card>
</template>

<script src="../../services/post/post-upload.js"></script>

<style scoped src="../../assets/css/pages/post/post-upload.css"></style>

