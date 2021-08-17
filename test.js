let animations = [];

const quicksort = (arr, l, h) => {
    if(l < h){
        let pi = partition(arr, l, h);

        quicksort(arr, l, pi - 1);
        quicksort(arr, pi + 1, h);
    }
}

const partition = (arr, l ,h) => {
    let pivot = arr[h];
    let i = (l - 1);

    for (let j = l; j <= h - 1; j++) {
        if (arr[j] < pivot){
            i++;
            animations.push([arr[j], arr[i]]);
            animations.push([arr[j], arr[i]]);
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        
    }
    animations.push([arr[h], arr[i + 1]]);
    animations.push([arr[h], arr[i + 1]]);
    [arr[i + 1], arr[h]] = [arr[h], arr[i + 1]];
    return i + 1;
}

let numbers = []
for (let i = 0; i < 100; i++) {
  numbers.push(Math.floor(Math.random() * 100) + 1);
}

console.log(numbers)
quicksort(numbers, 0, numbers.length - 1)
console.log(numbers)
console.log(animations)
