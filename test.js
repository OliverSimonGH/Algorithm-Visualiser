
const mergeSort = (arr) => {
    let n = arr.length;
    let c_size;
    let l_start;

    for (c_size = 1; c_size <= n - 1; c_size = 2 * c_size) {
        for (l_start = 0; l_start < n - 1; l_start += 2 * c_size) {
            let mid = l_start + c_size - 1;
            let r_end = Math.min(l_start + 2 * c_size - 1, n - 1);
            
            merge(arr, l_start, mid, r_end)
        }
        
    }
}

const merge = (arr, l, m, r) => {
    let i, j, k;
    let n1 = m - l + 1;
    let n2 = r - m;

    let L = [];
    let R = [];

    for (i = 0; i < n1; i++) {
        L[i] = arr[l + i];
    }

    for (j = 0; j < n2; j++) {
        R[j] = arr[m + 1 + j];
    }

    i = 0;
    j = 0;
    k = l;

    while (i < n1 && j < n2){
        if(L[i] <= R[j]){
            arr[k] = L[i];
            i++;
        }
        else{
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    while (i < n1){
        arr[k] = L[i];
        i++;
        k++;
    }

    while (j < n2){
        arr[k] = R[j];
        j++;
        k++;
    }
}

let numbers = []
for (let i = 0; i < 90; i++) {
  numbers.push(Math.floor(Math.random() * 100) + 1);
}

console.log(numbers)
mergeSort(numbers)
console.log(numbers)
