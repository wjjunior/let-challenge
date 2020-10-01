<template>
  <v-container fill-height>
    <v-layout flex justify-center mt-10>
      <v-flex xs12 sm4>
        <div class="text-h6 mb-6">Criar conta</div>
        <div v-if="errors.error">
          <v-alert dense outlined type="error">
            {{ errors.error }}
          </v-alert>
        </div>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Nome"
            required
          ></v-text-field>

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

          <v-text-field
            label="Confirmação da senha"
            v-model="passwordConfirmation"
            min="8"
            type="password"
            :rules="passwordConfirmationRules"
            required
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="onSubmit"
          >
            Criar conta
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { REGISTER } from "@/store/actions";
export default {
  name: "Register",
  data() {
    return {
      valid: false,
      name: "",
      nameRules: [v => !!v || "Informe um nome"],
      password: "",
      passwordRules: [v => !!v || "Informe a senha"],
      email: "",
      emailRules: [
        v => !!v || "Informe o e-mail",
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail deve ser válido"
      ],
      passwordConfirmation: "",
      passwordConfirmationRules: [
        v => !!v || "Informe a senha",
        v => v === this.password || "Confirmação de senha incorreta"
      ]
    };
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch(REGISTER, {
            email: this.email,
            password: this.password,
            passwordConfirmation: this.passwordConfirmation,
            name: this.name
          })
          .then(() => this.$router.push({ name: "home" }));
      }
    }
  }
};
</script>
