
// https://www.geeksforgeeks.org/iterative-merge-sort/
// https://github.com/clementmihailescu/Sorting-Visualizer-Tutorial/blob/master/src/sortingAlgorithms/sortingAlgorithms.js

const mergeSortAnimations = (arr) => {
    let animations = [];
    let aux = arr.slice();
  
    mergeSort(arr, 0, arr.length - 1, aux, animations);
  
    return animations
  }
  
  const mergeSort = (arr, s, e, aux, animations) => {
     if (s === e) return;
     let m = Math.floor((s + e) / 2);
     mergeSort(aux, s, m, arr ,animations);
     mergeSort(aux, m + 1, e, arr ,animations)
     merge(arr, s, m, e, aux, animations)
  }
  
  const merge = (arr, s, m, e, aux, animations) => {
    let i = s;
    let k = s;
    let j = m + 1;
   
  
    while (i <= m && j <= e) {
    
     if (arr[i] <= arr[j]) {
       animations.push([k, i]);
       animations.push([k, aux[i]]);
  
       aux[k++] = arr[i++];
     } else {
       animations.push([k, aux[j]]);
       animations.push([k, aux[j]]);
  
       aux[k++] = arr[j++];
     }
   }
   while (i <= m) {
     animations.push([k, aux[i]]);
     animations.push([k, aux[i]]);
  
     aux[k++] = arr[i++];
   }
   while (j <= e) {
     animations.push([k, aux[j]]);
     animations.push([k, aux[j]]);
  
     aux[k++] = arr[j++];
   }
  }

let numbers = []
for (let i = 0; i < 50; i++) {
  numbers.push(Math.floor(Math.random() * 100) + 1);
}

console.log(numbers)
let res = mergeSortAnimations(numbers)
console.log(numbers)
console.log(res)

