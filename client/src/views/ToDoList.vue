<template>
  <v-container class="mx-auto" max-width="500">
    <v-toolbar color="primary" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>To Do List</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list>
      <v-list-item-group color="primary" multiple>
        <template v-for="(assignment, index) in assignments">
          <v-list-item :key="assignment.title">
            <template v-slot:default="{ active }">
              <v-list-item-content>
                <v-list-item-title
                  v-text="assignment.title"
                ></v-list-item-title>

                <v-list-item-subtitle
                  v-text="assignment.deadline"
                ></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-col>
                  <v-icon v-if="!active" class="mx-3" color="grey lighten-1">
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
                  <v-btn plain small class="mx-0" color="indigo">
                    <v-icon>
                      mdi-delete-outline
                    </v-icon>
                  </v-btn>
                </v-col>
              </v-list-item-action>
            </template>
          </v-list-item>
          <v-divider
            v-if="index < assignments.length - 1"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        assignments: [
          { title: "Super", deadline: "-" },
          { title: "Jerusalem", deadline: "Friday" },
        ],
      };
    },
    created() {},
  };
</script>
