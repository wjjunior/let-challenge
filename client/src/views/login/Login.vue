<template>
  <v-container fill-height>
    <v-layout flex justify-center mt-10>
      <v-flex xs12 sm4>
        <div class="text-h6 mb-6">Acesse sua conta</div>
        <v-alert dense outlined type="error" v-if="errors.error">
          Email ou senha inválidos
        </v-alert>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            label="Senha"
            v-model="password"
            min="8"
            type="password"
            :rules="passwordRules"
            required
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            Entrar
          </v-btn>
          <v-btn color="primary" class="mr-4 text-right" to="/register">
            Criar conta
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { LOGIN } from "@/store/actions";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      passwordRules: [v => !!v || "Informe a senha"],
      valid: false,
      emailRules: [
        v => !!v || "Informe o e-mail",
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail deve ser válido"
      ]
    };
  },
  methods: {
    validate() {
      const email = this.email;
      const password = this.password;
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch(LOGIN, { email, password })
          .then(() => this.$router.push({ name: "home" }));
      }
    }
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  }
};
</script>
