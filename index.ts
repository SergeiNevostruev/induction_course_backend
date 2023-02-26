import { IRoute } from './src/interface';
import { Server } from './src/Server';

console.log('Server Typescript');

const routeJson: IRoute<'json'>[] = [
  {
    method: 'GET',
    path: '/json-get',
    request: 'json',
    handler(reqData) {
      console.log(reqData);
      return { a: 'get A', b: 'get B' };
    },
  },
  {
    method: 'POST',
    path: '/json-post',
    request: 'json',
    handler: (reqData) => {
      console.log(reqData);
      return { message: 'Получен payload', payload: reqData.payload };
    },
  },
  {
    method: 'GET',
    path: '/json-get-query',
    request: 'json',
    handler: (reqData) => {
      console.log(reqData.query);
      return { message: 'Получен query', payload: reqData.query };
    },
  },
];

const routesDir: IRoute<'dir'>[] = [
  {
    method: 'GET',
    path: '/public',
    request: 'dir',
    pathToFileOrDir: 'public1',
  },
];

const routes = [...routeJson, ...routesDir];

const server = Server.createServer({ port: 8000, routes });

server.start();
