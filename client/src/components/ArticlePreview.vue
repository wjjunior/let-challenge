<template>
  <v-col cols="6" md="4">
    <ArticleMeta :article="article" />
  </v-col>
</template>

<script>
import ArticleMeta from "./ArticleMeta";

export default {
  name: "ArticlePreview",
  components: {
    ArticleMeta
  },
  props: {
    article: { type: Object, required: true }
  },
  computed: {
    articleLink() {
      return {
        name: "article",
        params: {
          id: this.article.id
        }
      };
    }
  }
};
</script>
