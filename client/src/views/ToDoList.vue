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
    <v-col>
      <v-container class="mx-auto" max-width="500">
        <v-toolbar color="primary" dark>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
          <v-toolbar-title>To Do List</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon :to="{ name: 'add-task' }" color="secondary">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list>
          <v-list-item-group color="primary" multiple>
            <template v-for="(task, index) in tasks">
              <v-list-item :key="task._id">
                <template v-slot:default="{ active }">
                  <v-list-item-content>
                    {{ task._id }}
                    <v-col>
                      <v-icon
                        v-if="!active"
                        class="mx-3"
                        color="grey lighten-1"
                      >
                        mdi-checkbox-blank-circle
                      </v-icon>
                      <v-icon v-else class="mx-3" color="blue darken-3">
                        mdi-checkbox-marked-circle
                      </v-icon>
                    </v-col>
                    <v-col>
                      <v-list-item-title
                        v-text="task.title"
                      ></v-list-item-title>
                      <v-list-item-subtitle
                        v-text="task.deadline"
                      ></v-list-item-subtitle>
                    </v-col>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-col>
                      <v-btn
                        plain
                        small
                        class="mx-0"
                        color="indigo"
                        :to="{ name: 'edit-task', params: { id: task._id } }"
                      >
                        <v-icon>
                          mdi-pencil-outline
                        </v-icon>
                      </v-btn>
                      <v-btn
                        plain
                        small
                        class="mx-0"
                        color="indigo"
                        @click="deleteTask(task)"
                      >
                        <v-icon>
                          mdi-delete-outline
                        </v-icon>
                      </v-btn>
                    </v-col>
                  </v-list-item-action>
                </template>
              </v-list-item>
              <v-divider
                v-if="index < tasks.length - 1"
                :key="index"
              ></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
      </v-container>
    </v-col>
  </v-container>
</template>

<script>
  import API from "../api";
  export default {
    data() {
      return {
        task: { title: "", deadline: "" },
        tasks: [],
        alert: true,
      };
    },
    async created() {
      this.tasks = await API.getAllTask();
      if (this.$route.params.message) {
        setTimeout(() => {
          this.alert = false;
        }, 5000);
      }
    },
    methods: {
      async deleteTask(task) {
        const id = task._id;
        const res = await API.deleteTask(id);
        // this.$router.push({
        //   name: "home",
        //   params: { message: response.message },
        // });
        this.tasks = await API.getAllTask();
        this.$forceUpdate(); //Render the page!!
      },
    },
  };
</script>
