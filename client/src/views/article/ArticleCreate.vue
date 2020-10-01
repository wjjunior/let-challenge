<template>
  <v-container fill-height>
    <v-layout flex justify-center mt-10>
      <v-flex xs12 sm6>
        <div class="text-h6 mb-6">Novo Artigo</div>
        <div v-if="error">
          <v-alert dense outlined type="error">
            {{ error }}
          </v-alert>
        </div>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="article.title"
            :rules="titleRules"
            label="Título"
            required
          ></v-text-field>
          <v-text-field
            v-model="article.description"
            :rules="descriptionRules"
            label="Descrição"
            required
          ></v-text-field>
          <v-textarea
            v-model="article.text"
            :rules="textRules"
            label="Texto"
            required
            auto-grow
            filled
          ></v-textarea>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="onPublish"
          >
            Criar Artigo
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { ARTICLE_PUBLISH, ARTICLE_RESET_STATE } from "@/store/actions";

export default {
  name: "ArticleEdit",
  props: {
    previousArticle: {
      type: Object,
      required: false
    }
  },
  async beforeRouteUpdate(to, from, next) {
    await store.dispatch(ARTICLE_RESET_STATE);
    return next();
  },
  async beforeRouteEnter(to, from, next) {
    await store.dispatch(ARTICLE_RESET_STATE);
    return next();
  },
  async beforeRouteLeave(to, from, next) {
    await store.dispatch(ARTICLE_RESET_STATE);
    next();
  },
  data() {
    return {
      inProgress: false,
      error: "",
      valid: false,
      titleRules: [v => !!v || "Informe um título"],
      descriptionRules: [v => !!v || "Informe uma descrição"],
      textRules: [v => !!v || "Informe um texto"]
    };
  },
  computed: {
    ...mapGetters(["article"])
  },
  methods: {
    onPublish() {
      if (this.$refs.form.validate()) {
        this.inProgress = true;
        this.$store
          .dispatch(ARTICLE_PUBLISH)
          .then(({ data }) => {
            this.inProgress = false;
            this.$router.push({
              name: "article",
              params: { id: data.createArticle.id }
            });
          })
          .catch((response) => {
            this.inProgress = false;
            this.error = response.message;
          });
      }
    }
  }
};
</script>
