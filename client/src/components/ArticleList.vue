<template>
  <v-container fluid>
    <v-alert
      v-if="!articles || articles.length === 0"
      border="top"
      colored-border
      type="info"
      elevation="2"
      class="mt-16"
    >
      Nenhum artigo publicado.
    </v-alert>
    <v-layout row wrap>
      <ArticlePreview
        v-for="(article, index) in articles"
        :article="article"
        :key="article.title + index"
      />
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import ArticlePreview from "./ArticlePreview";
import { FETCH_ARTICLES } from "@/store/actions";

export default {
  name: "ArticleList",
  components: {
    ArticlePreview
  },
  props: {
    type: {
      type: String,
      required: false,
      default: "all"
    },
    itemsPerPage: {
      type: Number,
      required: false,
      default: 10
    }
  },
  data() {
    return {
      currentPage: 1
    };
  },
  computed: {
    ...mapGetters(["articlesCount", "isLoading", "articles"])
  },
  mounted() {
    this.fetchArticles();
  },
  methods: {
    fetchArticles() {
      this.$store.dispatch(FETCH_ARTICLES);
    },
    resetPagination() {
      this.listConfig.offset = 0;
      this.currentPage = 1;
    }
  }
};
</script>
