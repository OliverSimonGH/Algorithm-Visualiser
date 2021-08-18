const ANIMATION_TYPE = {
  PIVOT: "PIVOT",
  SWAP: "SWAP",
  RED: "RED",
  BLACK: "BLACK"
}

const partition = (arr, l, h) => {
  let animations = [];
  let pivot = arr[h];
  let i = l;

  for (let j = l; j < h; j++) {
    if (arr[j] <= pivot) {
      animations.push([j, i]);
      animations.push([j, i]);
      [arr[i], arr[j]] = [arr[j], arr[i]];

      i++;
    }
  }

  animations.push([h, i]);
  animations.push([h, i]);
  [arr[i], arr[h]] = [arr[h], arr[i]];

  return [i, animations];
};

const insertionSortAnimations = (arr) => {
  let animations = [];

  for (let i = 1; i < arr.length; i++) {
    let index = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > index) {
      animations.push([j + 1, j]);
      animations.push([j + 1, j]);
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = index;
  }

  return animations;
};

const bubbleSortAnimations = (arr) => {
  let animations = [];

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        animations.push([j + 1, j]);
        animations.push([j + 1, j]);

        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return animations;
};

const heapSortAnimations = (arr) => {
  let animations = [];
  let n = arr.length;

  for (let i = 1; i < n; i++) {
    if (arr[i] > arr[parseInt((i - 1) / 2)]) {
      let j = i;

      while (arr[j] > arr[parseInt((j - 1) / 2)]) {
        const l = j;
        const r = parseInt((j - 1) / 2);

        animations.push([r, l]);
        animations.push([r, l]);
        [arr[l], arr[r]] = [arr[r], arr[l]];

        j = parseInt((j - 1) / 2);
      }
    }
  }

  for (let i = n - 1; i > 0; i--) {
    animations.push([i, 0]);
    animations.push([i, 0]);
    [arr[0], arr[i]] = [arr[i], arr[0]];

    let j = 0,
      index;

    do {
      index = 2 * j + 1;

      if (index < i - 1 && arr[index] < arr[index + 1]) {
        index++;
      }

      if (index < i && arr[j] < arr[index]) {
        animations.push([index, j]);
        animations.push([index, j]);
        [arr[j], arr[index]] = [arr[index], arr[j]];
      }

      j = index;
    } while (index < i);
  }

  return animations;
};

const quickSortAnimations = (arr) => {
  let animations = [];
  let stack = [];

  let start = 0;
  let end = arr.length - 1;

  stack.push({ x: start, y: end });

  while (stack.length) {
    const { x, y } = stack.shift();

    let pivot = partition(arr, x, y);

    animations = [...animations, ...pivot[1]];

    if (pivot[0] - 1 > x) {
      stack.push({ x: x, y: pivot[0] - 1 });
    }

    if (pivot[0] + 1 < y) {
      stack.push({ x: pivot[0] + 1, y: y });
    }
  }

  return animations;
};

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
   animations.push([i, j, ANIMATION_TYPE.RED]);
   animations.push([i, j, ANIMATION_TYPE.BLACK]);

   if (aux[i] <= aux[j]) {
     animations.push([k, aux[i], ANIMATION_TYPE.SWAP]);

     arr[k++] = aux[i++];
   } else {
     animations.push([k, aux[j], ANIMATION_TYPE.SWAP]);

     arr[k++] = aux[j++];
   }
 }
 while (i <= m) {
   animations.push([i, i, ANIMATION_TYPE.RED]);
   animations.push([i, i, ANIMATION_TYPE.BLACK]);
   animations.push([k, aux[i], ANIMATION_TYPE.SWAP]);

   arr[k++] = aux[i++];
 }
 while (j <= e) {
   animations.push([j, j, ANIMATION_TYPE.RED]);
   animations.push([j, j, ANIMATION_TYPE.BLACK]);
   animations.push([k, aux[j], ANIMATION_TYPE.SWAP]);

   arr[k++] = aux[j++];
 }
}

module.exports = {
  insertionSortAnimations,
  bubbleSortAnimations,
  heapSortAnimations,
  quickSortAnimations,
  mergeSortAnimations,
  ANIMATION_TYPE
};
