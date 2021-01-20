export default {
  data() {
    return {
      error: '',
      csvFile: '',
    }
  },
  methods: {
    onFileChange(e) {
      this.csvFile = e.target.files[0];
    },
    upload() {
      let formData = new FormData();
      formData.append('csvFile', this.csvFile);
      this.$axios.post('/post/upload', formData)
                .then(() => {
                  this.error = '';
                  this.$router.push({ name: "post-list" });
                })
      .catch(error => {
        this.uploading = false
        this.error = error.response.data.errors[0][0]
        console.log('check error: ', this.error)
      });
    },
  }
}