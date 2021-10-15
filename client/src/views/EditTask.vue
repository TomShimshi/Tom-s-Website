<template>
  <v-card>
    <v-form
      ref="form"
      @submit.prevent="updateForm"
      class="pa-5"
      enctype="multipart/form-data"
    >
      <v-card-title>Update Task</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-text-field
          label="Title"
          prepend-icon="mdi-note"
          v-model="task.title"
        ></v-text-field>
        <v-text-field
          label="Deadline"
          prepend-icon="mdi-calendar-month-outline"
          v-model="task.deadline"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" type="submit">
          Submit
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
  import API from "../api";
  export default {
    data() {
      return {
        task: {
          title: "",
          deadline: "",
        },
      };
    },
    async created() {
      const response = await API.getTaskById(this.$route.params.id);
      this.task = response;
    },
    methods: {
      async updateForm() {
        const formData = new FormData();
        formData.append("title", this.task.title);
        formData.append("deadline", this.task.deadline);
        const response = await API.updateTask(this.$route.params.id, formData);
        this.$router.push({
          name: "to-do-list",
          params: { message: response.message },
        });
      },
    },
  };
</script>
