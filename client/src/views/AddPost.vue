<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="10" class="mx-auto">
        <v-card class="pa-5">
          <v-card-title class="indigo--text"
            >Add New Post
            <div class="flex-grow-1"></div>
            <v-col sm="4" class="text-right">
              <v-btn
                icon
                title="go back"
                text
                color="indigo"
                :to="{ name: 'home' }"
                ><v-icon>mdi-arrow-left</v-icon></v-btn
              >
            </v-col>
          </v-card-title>

          <v-divider></v-divider>
          <v-form
            ref="form"
            @submit.prevent="submitForm"
            class="pa-5"
            enctype="multipart/form-data"
          >
            <v-text-field
              label="Title"
              v-model="post.title"
              prepend-icon="mdi-note"
              :rules="rules"
            ></v-text-field>
            <v-text-field
              label="Category"
              v-model="post.category"
              prepend-icon="mdi-view-list"
              :rules="rules"
            ></v-text-field>
            <v-textarea
              label="Content"
              v-model="post.content"
              prepend-icon="mdi-note-plus"
              :rules="rules"
            ></v-textarea>
            <v-file-input
              label="Select Image"
              :rules="rules"
              @change="selectFile"
              show-size
              counter
              multiple
            ></v-file-input>
            <v-btn type="submit" class="mt-3" color="primary">Add Post</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import API from "../api";
  export default {
    data() {
      return {
        rules: [(value) => !!value || "This field is required!"],
        post: {
          title: "",
          category: "",
          content: "",
          image: "",
        },
        image: "",
      };
    },
    methods: {
      selectFile(file) {
        this.image = file[0];
      },
      async submitForm() {
        const formData = new FormData();
        formData.append("image", this.image);
        formData.append("title", this.post.title);
        formData.append("category", this.post.category);
        formData.append("content", this.post.content);
        if (this.$refs.form.validate()) {
          const response = await API.addPost(formData);
          this.$router.push({
            name: "home",
            params: { message: response.message },
          });
        }
      },
    },
  };
</script>
