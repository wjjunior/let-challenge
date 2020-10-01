import { AuthenticationModel } from '../../../domain/models/authentication'
import { adaptGraphql } from '../../../main/adapters/graphql-adapter'
import { makeSignUpController } from '../../../main/factories/controllers/login/signup/signup-controller-factory'
import { makeLoginController } from '../../../main/factories/controllers/login/login/login-controller-factory'
import { ArticleModel } from '../../../domain/models/article'
import { adaptAuthMiddleware } from '../../../main/adapters/graphql-auth-adapter'
import { makeAuthMiddleware } from '../../../main/factories/middlewares/auth-middleware-factory'
import { makeAddArticleController } from '../../../main/factories/controllers/article/add-article/add-article-controller-factory'
import { makeLoadArticlesController } from '../../../main/factories/controllers/article/load-articles/load-articles-controller-factory'
import { makeLoadArticleByIdController } from '../../../main/factories/controllers/article/load-article-by-id/load-article-by-id-controller-factory'
import { makeLoadAccountByTokenController } from '../../../main/factories/controllers/login/load-account-by-token/load-account-by-token-controller-factory'

export const resolvers = {
  Query: {
    accountByToken: async (_parent, args: { accessToken: string }) =>
      adaptGraphql(makeLoadAccountByTokenController(), { ...args }),
    articles: async (_parent, args) =>
      adaptGraphql(makeLoadArticlesController(), { ...args }),
    article: async (_parent, args: { id: string }) =>
      adaptGraphql(makeLoadArticleByIdController(), { ...args })
  },

  Mutation: {
    signup: async (
      _,
      args: {
        input: {
          name: string
          email: string
          password: string
          passwordConfirmation: string
        }
      }
    ): Promise<AuthenticationModel> =>
      adaptGraphql(makeSignUpController(), { ...args.input }),

    login: async (
      _,
      args: {
        input: {
          email: string
          password: string
        }
      }
    ): Promise<AuthenticationModel> =>
      adaptGraphql(makeLoginController(), { ...args.input }),

    createArticle: async (
      _,
      args: {
        input: {
          title: string
          description: string
          text: string
        }
      },
      context: { token: string }
    ): Promise<ArticleModel> =>
      adaptAuthMiddleware(
        makeAuthMiddleware(),
        makeAddArticleController(),
        { ...args.input },
        context.token
      )
  }
}
