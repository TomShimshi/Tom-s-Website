<template>
  <v-container>
    <v-alert
      border="left"
      close-text="Close Alert"
      color="green accent-4"
      dark
      dismissible
      v-model="alert"
      v-if="this.$route.params.message"
    >
      {{ this.$route.params.message }}</v-alert
    >
    <v-toolbar>
      <v-toolbar-title class="indigo--text">All Courses</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-toolbar-items>
        <v-col sm="4" class="text-right">
          <v-btn icon :to="{ name: 'add-post' }" color="indigo">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-toolbar-items>
    </v-toolbar>
    <v-row no-gutters>
      <v-col sm="4" class="pa-3" v-for="post in posts" :key="post._id">
        <v-card class="pa-1" :to="{ name: 'post', params: { id: post._id } }">
          <v-img height="250" :src="`/${post.image}`"></v-img>
          <v-btn class="ml-4 mt-3" small outlined color="indigo">
            {{ post.category }}
          </v-btn>
          <v-card-title class="headline">{{ post.title }}</v-card-title>
          <v-card-text class="py-0">
            <p>{{ post.content.substring(0, 100) + "..." }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import API from "../api";
  export default {
    name: "Home",
    data() {
      return {
        posts: [],
        alert: true,
      };
    },
    async created() {
      this.posts = await API.getAllPost();
      if (this.$route.params.message) {
        setTimeout(() => {
          this.alert = false;
        }, 5000);
      }
    },
  };
</script>
