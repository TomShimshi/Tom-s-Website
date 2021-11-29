<template>
  <v-container>
    <v-alert
      border="left"
      close-text="Close Alert"
      color="green accent-4"
      dark
      dismissible
      v-model="alert"
      v-if="message"
    >
      {{ message }}</v-alert
    >
    <v-col>
      <v-container class="mx-auto" max-width="500">
        <v-toolbar color="primary" dark>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
          <v-toolbar-title>To Do List</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="addDialog = !addDialog">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list>
          <v-list-item-group color="primary" multiple>
            <template v-for="(task, index) in tasks">
              <v-list-item :key="task._id">
                <template v-slot:default="{ active }">
                  <v-list-item-content>
                    <v-col cols="1">
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
                        @click.stop="updateTask(task)"
                        class="mx-0"
                        color="indigo"
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
                        @click.stop="deleteTask(task)"
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
    <v-dialog v-model="updateDialog">
      <v-card>
        <v-form
          ref="form"
          @submit.prevent="updateForm()"
          class="pa-5"
          enctype="multipart/form-data"
        >
          <v-card-title>Update Task</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-text-field
              label="Title"
              prepend-icon="mdi-note"
              v-model="taskToUpdate.title"
            ></v-text-field>
            <v-text-field
              label="Deadline"
              prepend-icon="mdi-calendar-month-outline"
              v-model="taskToUpdate.deadline"
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
    </v-dialog>
    <v-dialog v-model="addDialog">
      <v-card>
        <v-form
          ref="form"
          @submit.prevent="submitForm"
          class="pa-5"
          enctype="multipart/form-data"
        >
          <v-card-title>Add Task </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-text-field
              label="Title"
              prepend-icon="mdi-note"
              v-model="taskToAdd.title"
            ></v-text-field>
            <v-text-field
              label="Deadline"
              prepend-icon="mdi-calendar-month-outline"
              v-model="taskToAdd.deadline"
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
    </v-dialog>
  </v-container>
</template>

<script>
  import API from "../api";
  export default {
    data() {
      return {
        taskToAdd: { title: "", deadline: "" },
        taskToUpdate: { title: "", deadline: "" },
        taskIdToUpdate: "",
        tasks: [],
        updateDialog: false,
        addDialog: false,
        alert: true,
        message: "",
        timer: null,
      };
    },
    created() {
      this.initialize();
    },
    methods: {
      async initialize() {
        this.tasks = await API.getAllTask();
        clearTimeout(this.timer);
        if (this.message) {
          this.timer = setTimeout(() => {
            this.alert = false;
          }, 3000);
        }
      },
      async deleteTask(task) {
        const id = task._id;
        const res = await API.deleteTask(id);
        this.tasks = await API.getAllTask();
        this.message = res.message;
        // this.message = "Task deleted successfully";
        this.alert = true;
        this.initialize();
        // this.$forceUpdate(); //Render the page!!
      },
      async updateTask(task) {
        this.updateDialog = !this.updateDialog;
        this.taskToUpdate = { title: "", deadline: "" };
        this.taskIdToUpdate = task._id;
        const response = await API.getTaskById(task._id);
        this.taskToUpdate = response;
      },
      async updateForm() {
        const formData = new FormData();
        formData.append("title", this.taskToUpdate.title);
        formData.append("deadline", this.taskToUpdate.deadline);
        const response = await API.updateTask(this.taskIdToUpdate, formData);
        this.updateDialog = !this.updateDialog;
        this.message = response.message;
        this.alert = true;
        this.initialize();
        // this.$router.go(); // Refresh the page!!
      },
      async submitForm() {
        const formData = new FormData();
        formData.append("title", this.taskToAdd.title);
        formData.append("deadline", this.taskToAdd.deadline);
        const response = await API.addTask(formData);
        this.taskToAdd = { title: "", deadline: "" };
        this.addDialog = !this.addDialog;
        this.message = response.message;
        this.alert = true;
        this.initialize();
        // this.$router.go(); // Refresh the page!!
      },
    },
  };
</script>
