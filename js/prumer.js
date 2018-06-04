let a = [1,2,3,34,6,9,8,6]
function prumer(pole) {
    let result = 0;
    for (let i = 0; i < pole.length; i++) {
        result += pole[i];
    }
    return result/pole.length;
}
let prumerPole = prumer(a);
console.log(prumerPole);