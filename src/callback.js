// console.log("Start");
// let a;
// const timout = () => {
//     setTimeout(() => {
//         a = 2;
//         console.log("Callback");
//     })
// }
// timout();

// const promise = new Promise((res, rej) => {
//     const a = 3;
//     // if (true) rej('error');
//     setTimeout(() => {
//         res(a);
//     }, 2000)
// })

// promise
//     .then((v) => {
//         console.log(v);
//         return v*5;
//     })
//     .then((v) => {
//         console.log(v);
//     })
//     .catch((e) => {
//         console.log(e);
//     })
//     .finally(() => {
//         console.log('Filnaly');
//     })

// const asyncFunc = async () => {
//     console.log('start async');
//     const value = await promise;
//     console.log(value);
//     console.log('end async');
// }

// asyncFunc()



// console.log("End");

let a = 5;
setTimeout(function timeout() {
   console.log(a);
   a = 10;
}, 0);

const p = new Promise(function(resolve, reject) {
   console.log(a);
   a = 25;
   resolve();
});

p.then(function(){
   const b = 12;
 console.log(b);
});

console.log(a);


