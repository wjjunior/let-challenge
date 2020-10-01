import { HttpResponse, HttpRequest } from './http'

export interface Controller<ReqBody = any, RespBody = any> {
  handle: (httpRequest: HttpRequest<ReqBody>) => Promise<HttpResponse<RespBody>>
}
