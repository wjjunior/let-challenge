import Vue from "vue";
import gql from "graphql-tag";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import graphqlClient from "@/helpers/graphql";
import { Article as State } from "@/store/types/Article";
import {
  ARTICLE_PUBLISH,
  ARTICLE_RESET_STATE,
  FETCH_ARTICLE
} from "../actions";
import { RESET_STATE, SET_ARTICLE } from "../mutations";

const initialState = {
  article: {
    title: "",
    description: "",
    text: "",
    author: {
      name: "",
      email: ""
    },
    date: ""
  }
};

export const state = { ...initialState };

const getters: GetterTree<State, any> = {
  article(state) {
    return state.article;
  }
};

export const actions: ActionTree<State, any> = {
  async [FETCH_ARTICLE]({ commit }, articleId: string) {
    try {
      const { data } = await graphqlClient.query({
        query: gql`
          query article($id: ID!) {
            article(id: $id) {
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
        `,
        variables: { id: articleId }
      });
      commit(SET_ARTICLE, data.article);
    } catch (error) {
      throw new Error(error);
    }
  },
  async [ARTICLE_PUBLISH]({ state }) {
    return await graphqlClient.mutate({
      mutation: gql`
        mutation createArticle($input: ArticleInput!) {
          createArticle(input: $input) {
            id
            title
            description
            text
            author {
              name
            }
            date
          }
        }
      `,
      variables: {
        input: {
          title: state.article.title,
          description: state.article.description,
          text: state.article.text
        }
      },
      refetchQueries: [
        {
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
        }
      ]
    });
  },
  [ARTICLE_RESET_STATE]({ commit }) {
    commit(RESET_STATE);
  }
};

export const mutations: MutationTree<State> = {
  [SET_ARTICLE](state, article) {
    state.article = article;
  },
  [RESET_STATE]() {
    Vue.set(state, "article", { ...initialState });
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
