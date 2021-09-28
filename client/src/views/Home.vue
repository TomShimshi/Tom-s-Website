<template>
  <h1>Home Page</h1>
</template>

<script>
  import API from "../api";
  export default {
    name: "Home",
    data() {
      return {
        posts: [],
      };
    },
    async created() {
      this.posts = await API.getAllPost();
    },
  };
</script>
