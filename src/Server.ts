import { IRequestType, IRoute, ReqDataType } from './interface';
import http from 'node:http';
import { parse } from 'node:url';
import { join } from 'node:path';
import { access } from 'node:fs/promises';
import { createReadStream } from 'node:fs';

export class Server {
  private readonly methodWithBody = ['POST', 'PUT', 'PATCH'];

  private constructor(private port: number, private host: string, private routes: IRoute<IRequestType>[]) {}

  static createServer(options: { port: number; host?: string; routes: IRoute<IRequestType>[] }) {
    const server = new Server(options.port, options.host || 'localhost', options.routes);
    return server;
  }

  private async parseReq(req: http.IncomingMessage): Promise<{
    path: string | null;
    method: string;
    data: ReqDataType;
  }> {
    const url = parse(req.url || '');
    let query: ReqDataType['query'];
    if (url.query) {
      query = Object.fromEntries(url.query.split('&').map((v) => v.split('=')));
    }
    console.log(url);

    const result = {
      path: url.pathname,
      method: req.method || 'GET',
      data: { query, payload: undefined },
    };

    if (this.methodWithBody.includes(req.method || 'GET')) {
      const payload = JSON.parse(
        await new Promise((res, rej) => {
          let input = '';
          req.on('data', (d) => {
            input += d;
          });
          req.on('end', () => {
            res(input === '' ? '{}' : input);
          });
          req.on('error', (err) => {
            rej(err);
          });
        }),
      );
      result.data.payload = payload;
      return result;
    }
    return result;
  }

  private notFound(res: http.ServerResponse) {
    res.writeHead(404);
    res.end('Not Found');
  }

  private badRequest(res: http.ServerResponse) {
    res.writeHead(400);
    res.end('Bad Request');
  }

  private async returnDir(path: string, folder: string) {
    const rootPath = process.cwd();
    const dirPath = join(rootPath, folder, ...path.split('/').slice(2));
    try {
      await access(dirPath);
      const stream = createReadStream(dirPath);
      return stream;
    } catch (error) {
      return false;
    }
  }

  private async response(req: http.IncomingMessage, res: http.ServerResponse) {
    const reqData = await this.parseReq(req);
    const route = this.routes.filter(
      (v) =>
        v.method === reqData.method && v.path === reqData.path?.split('/').slice(0, v.path.split('/').length).join('/'),
    )[0];
    console.log(reqData, route);

    if (!route) {
      this.notFound(res);
      return;
    }
    try {
      if (route.request === 'json') {
        const response = await route.handler(reqData.data);
        const responseJSON = JSON.stringify(response, null, 2);
        res.end(responseJSON);
        return;
      } else if (route.request === 'dir') {
        const response = await this.returnDir(reqData.path || '/', route.pathToFileOrDir);
        if (!response) {
          this.notFound(res);
          return;
        } else {
          response.pipe(res);
          return;
        }
      } else {
        this.notFound(res);
        return;
      }
    } catch (error) {
      this.badRequest(res);
    }
  }

  public start() {
    http
      .createServer(async (req, res) => {
        await this.response(req, res);
      })
      .listen(this.port, this.host);
  }
}
