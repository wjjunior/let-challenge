<template>
  <v-card hover flat @click="handlePostcard">
    <v-img class="white--text" height="200px" :src="this.image">
      <v-container fill-height fluid>
        <v-layout fill-height>
          <v-flex xs12 align-end flexbox>
            <h2 class="headline" style="text-shadow: 0px 2px 5px #222;">
              {{ article.title }}
            </h2>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
    <v-card-title>
      <div>
        <p class="grey--text">
          {{ article.date | date }} por
          {{ article.author.name }}
        </p>
        <p>
          {{ article.text | truncate(200) | tailing("...") }}
        </p>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    image: ""
  }),
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"])
  },
  methods: {
    handlePostcard() {
      this.$router.push(`/article/${this.article.id}`);
    },
    async getRandomImage() {
      const res = await axios.get("https://picsum.photos/600", {
        responseType: "arraybuffer"
      });
      this.image = `data:image/jpeg;base64,${Buffer.from(
        res.data,
        "binary"
      ).toString("base64")}`;
    }
  },
  mounted() {
    this.getRandomImage();
  }
};
</script>
