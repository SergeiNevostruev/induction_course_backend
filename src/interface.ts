type MethodType = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
export type IRequestType = 'json' | 'dir';
type IHandlerFunc = (reqData: ReqDataType) => any | Promise<any>;

export interface ReqDataType {
  query?: {
    [param: string]: any;
  };
  payload?: {
    [param: string]: any;
  };
}

interface IRouteBase<T extends IRequestType> {
  method: MethodType;
  path: string; // "/api/users"
  request: T;
}

interface IHandler {
  handler: IHandlerFunc;
}

interface IDir {
  pathToFileOrDir: string;
}

export type IRoute<T extends IRequestType> = T extends 'json' ? IRouteBase<T> & IHandler : IRouteBase<T> & IDir;
