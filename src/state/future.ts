import { FutureInstance, attemptP, chain } from 'fluture'

interface HttpResponse<T> extends Response {
  data?: T
}

const FetchFuture =
  <Err, Res, T extends (...args: any[]) => Promise<any> = any>(func: T) =>
  (...args: Parameters<T>) =>
    attemptP<Err, Res>(() => func(...args))

const fetchfu = FetchFuture<Error, HttpResponse<any>>(fetch)
export const get = (url: string) => fetchfu(url, { headers: { Accept: 'application/json' } })
export const post = <T extends {}>(url: string, body: any) =>
  fetchfu(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  }).pipe(chain((res) => attemptP(() => res.json()))) as FutureInstance<Error, T>
