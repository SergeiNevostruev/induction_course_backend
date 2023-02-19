"use strict";
var str = "строка";
var arrStr = ["строка", "строка2"];
var tuple = ["Валера", 18];
var func = function (message) {
    console.log(message);
};
var func2 = function (message) {
    console.log(message);
};
var func3 = function (data) {
    console.log("login ---> ", data.login);
    console.log("password ---> ", data.password);
};
var func4 = function (data) {
    console.log("login ---> ", data.login);
    console.log("password ---> ", data.password);
    return { email: "admin@ya.ru" };
};
var customVar = {
    email: "admin@ya.ru",
    login: "login",
    password: "123"
};
console.log(customVar);
