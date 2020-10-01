import graphqlClient from "@/helpers/graphql";
import gql from "graphql-tag";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import { FETCH_ARTICLES } from "../actions";
import { Article, ArticleList as State } from "../types/Article";
import { FETCH_END, FETCH_START } from "../mutations";

const state = {
  articles: []
};

const getters: GetterTree<State, any> = {
  articlesCount(state: { articlesCount: number }) {
    return state.articlesCount;
  },
  articles(state: { articles: Article[] }) {
    return state.articles;
  },
  isLoading(state: { isLoading: boolean }) {
    return state.isLoading;
  }
};

const actions: ActionTree<State, any> = {
  async [FETCH_ARTICLES]({ commit }) {
    commit(FETCH_START);
    try {
      const { data } = await graphqlClient.query({
        query: gql`
          query articles {
            articles {
              id
              title
              description
              text
              author {
                id
                name
              }
              date
            }
          }
        `
      });
      commit(FETCH_END, data.articles);
    } catch (error) {
      throw new Error(error);
    }
  }
};

const mutations: MutationTree<State> = {
  [FETCH_START](state) {
    state.isLoading = true;
  },
  [FETCH_END](state, articles) {
    state.articles = articles;
    state.articlesCount = articles ? articles.length : 0;
    state.isLoading = false;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
