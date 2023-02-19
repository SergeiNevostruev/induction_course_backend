const str: string = "строка";
const arrStr: string[] = ["строка", "строка2"];
const tuple: [string, number] = ["Валера", 18];
const func = (message: string): void => {
  console.log(message);
};

type customType = string | number;

const func2 = (message: customType): void => {
  console.log(message);
};

interface ICustomInterface {
  login: string;
  password: string;
}

interface ICustomInterface2 {
  email: string;
}

const func3 = (data: ICustomInterface): void => {
  console.log("login ---> ", data.login);
  console.log("password ---> ", data.password);
};

const func4 = (data: ICustomInterface): ICustomInterface2 => {
  console.log("login ---> ", data.login);
  console.log("password ---> ", data.password);
  return { email: "admin@ya.ru" };
};

type ICustomDuobleInt = ICustomInterface & ICustomInterface2;

const customVar: ICustomDuobleInt = {
  email: "admin@ya.ru",
  login: "login",
  password: "123",
};

console.log(customVar);

interface ICustomInterface4<T> {
  login: string;
  data: T;
}

const func5 = (data: ICustomInterface4<string>) => {
  return data.data.split("");
};

const func6 = (data: ICustomInterface4<number>) => {
  return data.data + 5;
};

const func7 = (data: ICustomInterface4<string[]>) => {
  return data.data.map((v) => "_" + v);
};
