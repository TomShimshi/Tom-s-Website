<template>
  <v-container>
    <v-row>
      <v-card>
        <v-form
          ref="form"
          @submit.prevent="submitForm"
          class="pa-5"
          enctype="multipart/form-data"
        >
          <v-card-title
            >Add Task
            <v-btn icon title="go back" :to="{ name: 'to-do-list' }"
              ><v-icon>mdi-arrow-left-top</v-icon></v-btn
            >
          </v-card-title>
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
    </v-row>
  </v-container>
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
    methods: {
      async submitForm() {
        const formData = new FormData();
        formData.append("title", this.task.title);
        formData.append("deadline", this.task.deadline);
        const response = await API.addTask(formData);
        this.$router.push({
          name: "to-do-list",
          params: { message: response.message },
        });
      },
    },
  };
</script>
