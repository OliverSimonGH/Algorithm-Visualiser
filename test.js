const quicksort = (arr) => {
    let animations = [];

    let stack = [];

    let start = 0;
    let end = arr.length - 1;

    stack.push({x: start, y: end})

    while(stack.length){
        const { x, y } = stack.shift();
        
        let pivot = partition(arr, x, y);

        if(pivot[0] - 1 > x){
            stack.push({x: x, y: pivot[0] - 1});
        }

        if(pivot[0] + 1 < y){
            stack.push({x: pivot[0] + 1, y: y});
        }
    }
}

const partition = (arr, l ,h) => {
    let animations = []
    let pivot = arr[h];
    let i = (l);

    for (let j = l; j < h ; j++) {
        if (arr[j] <= pivot){
            animations.push([arr[j], arr[i]]);
            animations.push([arr[j], arr[i]]);
            [arr[i], arr[j]] = [arr[j], arr[i]];

            i++;
        }
    }

    animations.push([arr[h], arr[i]]);
    animations.push([arr[h], arr[i]]);
    [arr[i], arr[h]] = [arr[h], arr[i]];

    return [i, animations];
}

let numbers = []
for (let i = 0; i < 100; i++) {
  numbers.push(Math.floor(Math.random() * 100) + 1);
}

console.log(numbers)
quicksort(numbers, 0, numbers.length)
console.log(numbers)
