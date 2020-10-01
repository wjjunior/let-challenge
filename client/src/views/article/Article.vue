<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <ArticleMeta :article="article" :actions="true"></ArticleMeta>
      </div>
    </div>
    <div class="container page">
      <div class="row article-content">
        <div class="col-xs-12">
          <div v-html="parseMarkdown(article.text)"></div>
        </div>
      </div>
      <hr />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import marked from "marked";
import store from "@/store";
import ArticleMeta from "@/components/ArticleMeta";
import { FETCH_ARTICLE } from "@/store/actions";

export default {
  name: "Article",
  components: {
    ArticleMeta
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([store.dispatch(FETCH_ARTICLE, to.params.id)]).then(() => {
      next();
    });
  },
  computed: {
    ...mapGetters(["article", "currentUser", "isAuthenticated"])
  },
  methods: {
    parseMarkdown(content) {
      return marked(content);
    }
  }
};
</script>
