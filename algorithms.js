/*
 * Комплект алгоритмов сортировки и поиска, реализованных на JavaScript.
 *
 * В исходном архиве (Python, C++, Java) присутствовали реализации
 * Selection Sort, Bubble Sort, Insertion Sort, Merge Sort, Shell Sort,
 * Quick Sort, Heap Sort, а также алгоритмы поиска: Linear Search,
 * Binary Search, Interpolation Search и Fibonacci Search. В данном файле
 * все эти алгоритмы представлены на другом языке — JavaScript (Node.js).
 *
 * Каждая функция принимает массив (и, при необходимости, искомый
 * элемент), и возвращает либо отсортированный массив (для сортировок),
 * либо индекс найденного элемента (для поисков). В случае, если
 * элемент не найден, функции поиска возвращают -1.
 */

/**
 * Сортировка выбором (Selection Sort).
 * Находит минимальный элемент в неотсортированной части массива
 * и меняет его местами с текущим элементом.
 * @param {number[]} arr Входной массив для сортировки.
 * @returns {number[]} Отсортированный массив (массив изменяется по месту).
 */
function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    // Обмен текущего элемента с минимальным
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}

/**
 * Сортировка обменом (пузырьком) (Bubble Sort).
 * Повторно проходит по массиву, сравнивая соседние элементы и
 * меняя их местами, если они расположены в неправильном порядке.
 * Использует флаг swapped для раннего выхода, если массив уже отсортирован.
 * @param {number[]} arr Массив для сортировки.
 * @returns {number[]} Отсортированный массив.
 */
function bubbleSort(arr) {
  const n = arr.length;
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
  } while (swapped);
  return arr;
}

/**
 * Сортировка вставками (Insertion Sort).
 * Постепенно строит отсортированную часть массива, вставляя каждую
 * следующую запись в нужное место среди уже отсортированных элементов.
 * @param {number[]} arr Массив для сортировки.
 * @returns {number[]} Отсортированный массив.
 */
function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    // Сдвигаем элементы, пока они больше key
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

/**
 * Вспомогательная функция для слияния двух отсортированных подмассивов.
 * Используется в алгоритме сортировки слиянием.
 * @param {number[]} left Отсортированный левый подмассив.
 * @param {number[]} right Отсортированный правый подмассив.
 * @returns {number[]} Результат слияния двух массивов.
 */
function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  // Добавляем оставшиеся элементы
  return result.concat(left.slice(i)).concat(right.slice(j));
}

/**
 * Сортировка слиянием (Merge Sort).
 * Рекурсивно делит массив пополам, сортирует каждую половину и
 * затем сливает отсортированные части. Алгоритм реализован
 * функциональным образом и возвращает новый отсортированный массив.
 * @param {number[]} arr Массив для сортировки.
 * @returns {number[]} Новый отсортированный массив.
 */
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

/**
 * Сортировка Шелла (Shell Sort).
 * Улучшенная сортировка вставками, которая обменивает элементы на
 * определённом расстоянии (gap) друг от друга. Gap постепенно
 * уменьшается до 1.
 * @param {number[]} arr Массив для сортировки.
 * @returns {number[]} Отсортированный массив.
 */
function shellSort(arr) {
  const n = arr.length;
  // Начальный gap выбираем как половину массива
  let gap = Math.floor(n / 2);
  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
    gap = Math.floor(gap / 2);
  }
  return arr;
}

/**
 * Быстрая сортировка (Quick Sort).
 * Использует стратегию «разделяй и властвуй»: выбирает опорный элемент,
 * перемещает меньшие элементы влево, большие — вправо, затем
 * рекурсивно сортирует полученные части. Реализована как
 * внутрипроцедурная сортировка (in-place).
 * @param {number[]} arr Массив для сортировки.
 * @param {number} [low=0] Начальный индекс для сортировки.
 * @param {number} [high=arr.length-1] Конечный индекс для сортировки.
 * @returns {number[]} Отсортированный массив.
 */
function quickSort(arr, low = 0, high = arr.length - 1) {
  // Внутренняя функция для разделения массива по опорному элементу
  function partition(a, l, h) {
    const pivot = a[Math.floor((l + h) / 2)];
    let i = l;
    let j = h;
    while (i <= j) {
      while (a[i] < pivot) i++;
      while (a[j] > pivot) j--;
      if (i <= j) {
        [a[i], a[j]] = [a[j], a[i]];
        i++;
        j--;
      }
    }
    return i;
  }
  if (low < high) {
    const index = partition(arr, low, high);
    if (low < index - 1) quickSort(arr, low, index - 1);
    if (index < high) quickSort(arr, index, high);
  }
  return arr;
}

/**
 * Вспомогательная функция heapify для поддержания свойства max-heap.
 * Перестраивает поддерево с корнем i в массиве длины n.
 * @param {number[]} arr Массив.
 * @param {number} n Размер кучи (длина обрабатываемой части массива).
 * @param {number} i Индекс вершины поддерева.
 */
function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  // Находим наибольший элемент среди корня и его потомков
  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;
  // Если наибольший элемент не корень, меняем и продолжаем heapify
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

/**
 * Пирамидальная сортировка (Heap Sort).
 * Строит max‑кучу из массива, затем последовательно извлекает
 * максимальные элементы, помещая их в конец массива.
 * @param {number[]} arr Массив для сортировки.
 * @returns {number[]} Отсортированный массив.
 */
function heapSort(arr) {
  const n = arr.length;
  // Строим max‑кучу
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  // Извлекаем элементы из кучи по одному
  for (let i = n - 1; i > 0; i--) {
    // Перемещаем текущий корень в конец
    [arr[0], arr[i]] = [arr[i], arr[0]];
    // Вызываем heapify для уменьшенной кучи
    heapify(arr, i, 0);
  }
  return arr;
}

/**
 * Последовательный (линейный) поиск (Linear Search).
 * Последовательно проходит по массиву в поисках заданного элемента.
 * @param {number[]} arr Массив для поиска.
 * @param {number} target Искомое значение.
 * @returns {number} Индекс найденного элемента или -1, если элемент не найден.
 */
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}

/**
 * Бинарный поиск (Binary Search).
 * Работает на отсортированном массиве, рекурсивно или итеративно
 * деля область поиска пополам. Эта реализация — итеративная.
 * @param {number[]} arr Отсортированный массив для поиска.
 * @param {number} target Искомое значение.
 * @returns {number} Индекс найденного элемента или -1.
 */
function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1;
}

/**
 * Интерполирующий поиск (Interpolation Search).
 * Улучшение бинарного поиска для равномерно распределённых массивов.
 * Предсказывает положение элемента с помощью линейной интерполяции.
 * @param {number[]} arr Отсортированный массив для поиска.
 * @param {number} target Искомое значение.
 * @returns {number} Индекс найденного элемента или -1.
 */
function interpolationSearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  while (
    low <= high &&
    target >= arr[low] &&
    target <= arr[high]
  ) {
    // Если все элементы одинаковы, избегаем деления на ноль
    if (arr[high] === arr[low]) {
      if (arr[low] === target) return low;
      else return -1;
    }
    // Формула интерполяции для приблизительного положения
    const pos = low + Math.floor(
      ((target - arr[low]) * (high - low)) /
        (arr[high] - arr[low])
    );
    if (arr[pos] === target) return pos;
    if (arr[pos] < target) low = pos + 1;
    else high = pos - 1;
  }
  return -1;
}

/**
 * Поиск по Фибоначчи (Fibonacci Search).
 * Использует числа Фибоначчи для определения позиций разделения
 * массива. Эффективен для большого числа счётных операций
 * на старых архитектурах (избегает деления), но выполняет
 * чуть больше сравнений, чем бинарный поиск. Требует отсортированный массив.
 * @param {number[]} arr Отсортированный массив для поиска.
 * @param {number} target Искомое значение.
 * @returns {number} Индекс найденного элемента или -1.
 */
function fibonacciSearch(arr, target) {
  const n = arr.length;
  // Находим наименьшее число Фибоначчи >= n
  let fm2 = 0; // F_{m-2}
  let fm1 = 1; // F_{m-1}
  let fm = fm1 + fm2; // F_m
  while (fm < n) {
    fm2 = fm1;
    fm1 = fm;
    fm = fm1 + fm2;
  }
  // offset обозначает сдвиг относительно начала массива
  let offset = -1;
  while (fm > 1) {
    // Выбираем индекс для сравнения
    const i = Math.min(offset + fm2, n - 1);
    if (arr[i] < target) {
      // Смещаем область поиска вправо
      fm = fm1;
      fm1 = fm2;
      fm2 = fm - fm1;
      offset = i;
    } else if (arr[i] > target) {
      // Смещаем область поиска влево
      fm = fm2;
      fm1 = fm1 - fm2;
      fm2 = fm - fm1;
    } else {
      return i;
    }
  }
  // Проверяем последний возможный элемент
  if (fm1 && arr[offset + 1] === target) {
    return offset + 1;
  }
  return -1;
}

// Экспортируем функции для возможности импорта из других модулей
module.exports = {
  selectionSort,
  bubbleSort,
  insertionSort,
  mergeSort,
  shellSort,
  quickSort,
  heapSort,
  linearSearch,
  binarySearch,
  interpolationSearch,
  fibonacciSearch,
};