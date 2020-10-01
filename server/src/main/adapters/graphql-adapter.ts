import { Controller, HttpRequest } from '../../presentation/protocols'

export const adaptGraphql = async <Args, ResponseBody>(
  controller: Controller<Args, ResponseBody>,
  args: Args,
  accountId: string = null
): Promise<ResponseBody> => {
  const httpRequest: HttpRequest<Args> = {
    body: args,
    accountId
  }
  const httpResponse = await controller.handle(httpRequest)
  return httpResponse.body
}
