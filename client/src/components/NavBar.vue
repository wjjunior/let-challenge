<template>
  <v-app-bar app color="dark" dark>
    <div class="d-flex align-center">
      <router-link to="/" tag="div" class="v-toolbar__title"
        >Small-Medium</router-link
      >
    </div>
    <v-spacer></v-spacer>
    <v-toolbar-title class="mr-4" v-if="isAuthenticated">{{
      currentUser.name
    }}</v-toolbar-title>
    <v-btn to="/" text>
      Home
    </v-btn>
    <v-btn to="/login" text v-if="!isAuthenticated">
      Acesse a sua conta
    </v-btn>
    <v-btn to="/register" text v-if="!isAuthenticated">
      Criar conta
    </v-btn>
    <v-btn to="/editor" text v-if="isAuthenticated">
      Novo Artigo
    </v-btn>
    <v-btn text @click="logout" v-if="isAuthenticated">
      <span class="mr-2">Sair</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
import { LOGOUT } from "@/store/actions";
export default {
  name: "NavBar",
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"])
  },
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT).then(() => {
        this.$router.push({ name: "home" });
      });
    }
  }
};
</script>
