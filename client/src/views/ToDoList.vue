<template>
  <v-row>
    <v-col>
      <v-container class="mx-auto" max-width="500">
        <v-toolbar color="primary" dark>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
          <v-toolbar-title>To Do List</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-btn icon @click="dialog = !dialog">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list>
          <v-list-item-group color="primary" multiple>
            <template v-for="(task, index) in tasks">
              <v-list-item :key="task.title">
                <template v-slot:default="{ active }">
                  <v-list-item-content>
                    <v-list-item-title v-text="task.title"></v-list-item-title>
                    <v-list-item-subtitle
                      v-text="task.deadline"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
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
                      <v-btn plain small class="mx-0" color="indigo">
                        <v-icon>
                          mdi-pencil-outline
                        </v-icon>
                      </v-btn>
                      <v-btn
                        plain
                        small
                        class="mx-0"
                        color="indigo"
                        @change="deleteTask(task)"
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
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>Add Task</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-text-field
              label="Title"
              prepend-icon="mdi-note"
              @change="newTask.title"
            ></v-text-field>
            <v-text-field
              label="Deadline"
              prepend-icon="mdi-calendar-month-outline"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="addTask()">
              Submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
  import API from "../api";
  export default {
    data() {
      return {
        dialog: false,
        newTask: { title: "", deadline: "" },
        tasks: [],
      };
    },
    async created() {
      this.tasks = await API.getAllTask();
      console.log(this.tasks);
    },
    computed: {
      async deleteTask(task) {
        const id = task._id;
        res = await API.deleteTask(id);
        console.log(res.data);
      },
      async addTask() {
        // res = await API.addTask();
      },
      async updateTask() {
        res = await API.updateTask();
      },
    },
  };
</script>
