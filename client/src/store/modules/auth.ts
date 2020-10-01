import graphqlClient from "@/helpers/graphql";
import graphQLErrorMessages from "@/helpers/graphql-error-messages";
import JwtService from "@/helpers/jwt-helper";
import gql from "graphql-tag";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import { LOGIN, LOGOUT, REGISTER, CHECK_AUTH } from "../actions";
import { SET_AUTH, PURGE_AUTH, SET_ERROR } from "../mutations";
import { State } from "../types/Auth";
import { User } from "../types/User";

const state = {
  errors: null,
  user: {},
  isAuthenticated: !!JwtService.getToken()
};

const getters: GetterTree<State, any> = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  }
};

const actions: ActionTree<State, any> = {
  [LOGIN]({ commit }, credentials: { email: string; password: string }) {
    return new Promise(resolve => {
      graphqlClient
        .mutate({
          mutation: gql`
            mutation login($input: LoginInput!) {
              login(input: $input) {
                accessToken
                name
              }
            }
          `,
          variables: { input: { ...credentials } }
        })
        .then(({ data }) => {
          commit(SET_AUTH, data.login);
          resolve(data);
        })
        .catch(errors => {
          commit(SET_ERROR, graphQLErrorMessages(errors));
        });
    });
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
  },
  [REGISTER](
    { commit },
    credentials: {
      name: string;
      email: string;
      password: string;
      passwordConfirmation: string;
    }
  ) {
    return new Promise((resolve, reject) => {
      graphqlClient
        .mutate({
          mutation: gql`
            mutation signup($input: AccountInput!) {
              signup(input: $input) {
                accessToken
                name
              }
            }
          `,
          variables: { input: { ...credentials } }
        })
        .then(({ data }) => {
          commit(SET_AUTH, data.signup);
          resolve(data);
        })
        .catch(errors => {
          commit(SET_ERROR, graphQLErrorMessages(errors));
          reject(errors.message);
        });
    });
  },
  [CHECK_AUTH]({ commit }) {
    if (JwtService.getToken()) {
      graphqlClient
        .query({
          query: gql`
            query accountByToken($accessToken: String!) {
              accountByToken(accessToken: $accessToken) {
                name
              }
            }
          `,
          variables: { accessToken: JwtService.getToken() }
        })
        .then(({ data }) => {
          commit(SET_AUTH, {
            name: data.accountByToken.name,
            accessToken: JwtService.getToken()
          });
        })
        .catch(errors => {
          commit(SET_ERROR, graphQLErrorMessages(errors));
        });
    } else {
      commit(PURGE_AUTH);
    }
  }
};

const mutations: MutationTree<State> = {
  [SET_ERROR](state, error) {
    state.errors = { error };
  },
  [SET_AUTH](state, user: User) {
    state.isAuthenticated = true;
    state.user = user;
    state.errors = {};
    JwtService.saveToken(user.accessToken);
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.destroyToken();
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
