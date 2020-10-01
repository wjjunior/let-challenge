import { Controller, HttpRequest, Middleware } from '../../presentation/protocols'
import { adaptGraphql } from './graphql-adapter'
import { AuthenticationError } from 'apollo-server'

export const adaptAuthMiddleware = async <ResponseBody, Args>(
  middleware: Middleware,
  controller: Controller<Args, ResponseBody>,
  args: Args,
  bearerToken: string
): Promise<any> => {
  const httpRequest: HttpRequest = {
    headers: {
      authorization: bearerToken
    }
  }
  const httpResponse = await middleware.handle(httpRequest)
  if (httpResponse.statusCode === 200) {
    return await adaptGraphql(controller, args, httpResponse.body.accountId)
  } else {
    throw new AuthenticationError('must authenticate')
  }
}
