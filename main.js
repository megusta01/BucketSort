class App {
    // Função de ordenação Bubble Sort
    static bubbleSort(arr) {
        const n = arr.length;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    const temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        return arr;
    }

    // Função de ordenação Counting Sort
    static countingSort(arr) {
        const n = arr.length;

        // Encontrar o valor máximo no array
        let max = arr[0];
        for (let i = 1; i < n; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }

        // Criar um array de contagem
        const count = Array(max + 1).fill(0);

        // Contar as ocorrências de cada elemento
        for (let i = 0; i < n; i++) {
            count[arr[i]]++;
        }

        // Reconstruir o array ordenado
        const sortedArray = new Array(n);
        let index = 0;
        for (let i = 0; i <= max; i++) {
            while (count[i] > 0) {
                sortedArray[index++] = i;
                count[i]--;
            }
        }
        return sortedArray;
    }

    // Função de ordenação Insertion Sort
    static insertionSort(arr) {
        const len = arr.length;
        for (let i = 1; i < len; i++) {
            let key = arr[i];
            let j = i - 1;
            while (j >= 0 && key < arr[j]) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
        return arr;
    }

    // Função de ordenação Merge Sort
    static mergeSort(arr) {
        if (arr.length > 1) {
            const mid = Math.floor(arr.length / 2);
            const leftHalf = arr.slice(0, mid);
            const rightHalf = arr.slice(mid);

            App.mergeSort(leftHalf);
            App.mergeSort(rightHalf);

            let i = 0, j = 0, k = 0;
            while (i < leftHalf.length && j < rightHalf.length) {
                if (leftHalf[i] < rightHalf[j]) {
                    arr[k] = leftHalf[i];
                    i++;
                } else {
                    arr[k] = rightHalf[j];
                    j++;
                }
                k++;
            }

            while (i < leftHalf.length) {
                arr[k] = leftHalf[i];
                i++;
                k++;
            }

            while (j < rightHalf.length) {
                arr[k] = rightHalf[j];
                j++;
                k++;
            }
        }
        return arr;
    }

    // Função de ordenação Quick Sort
    static quickSort(arr) {
        if (arr.length <= 1) {
            return arr;
        }

        const pivot = arr[Math.floor(arr.length / 2)];
        const left = arr.filter(x => x < pivot);
        const middle = arr.filter(x => x === pivot);
        const right = arr.filter(x => x > pivot);

        return App.concatenateArrays(App.quickSort(left), middle, App.quickSort(right));
    }

    // Função de ordenação Selection Sort
    static selectionSort(arr) {
        const len = arr.length;
        for (let i = 0; i < len; i++) {
            let minIndex = i;
            for (let j = i + 1; j < len; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }

            const temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
        return arr;
    }

    // Função de ordenação Bucket Sort
    static bucketSort(arr, internalSort) {
        const n = arr.length;

        // Encontrar o valor máximo no array
        let max = arr[0];
        for (let i = 1; i < n; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }

        // Definir o número de baldes
        const numBuckets = 10;
        const buckets = new Array(numBuckets).fill().map(() => []);

        // Distribuir os elementos nos baldes
        for (let i = 0; i < n; i++) {
            const bucketIndex = Math.floor((arr[i] * numBuckets) / (max + 1));
            buckets[bucketIndex].push(arr[i]);
        }

        // Ordenar cada balde usando o algoritmo interno
        for (const bucket of buckets) {
            const bucketArray = internalSort(bucket);
            bucket.length = 0; // Limpar o balde
            Array.prototype.push.apply(bucket, bucketArray); // Adicionar elementos ordenados ao balde
        }

        // Juntar os baldes ordenados
        let index = 0;
        for (const bucket of buckets) {
            for (const value of bucket) {
                arr[index++] = value;
            }
        }

        return arr;
    }

    // Função para medir o tempo de execução de cada algoritmo
    static measureTime(sortingFunction, arr) {
        const startTime = new Date().getTime();
        sortingFunction(arr.slice());
        const endTime = new Date().getTime();
        const timeTaken = endTime - startTime;
    
        console.log(`${timeTaken} ms`); // Exibindo tempo de execução em milissegundos
    
        return timeTaken;
    }
    

    // Função para gerar um array de números aleatórios e únicos
    static generateRandomArray(size) {
        const dataSet = [];
        for (let i = 0; i < size; i++) {
            dataSet.push(Math.floor(Math.random() * (size + 1)));
        }
        return dataSet;
    }

    // Função auxiliar para concatenar arrays
    static concatenateArrays(left, middle, right) {

    }

    // Função para encontrar o algoritmo mais rápido
    static findFastestAlgorithm(...times) {
        let minTime = Number.MAX_VALUE;
        let fastestAlgorithm = "";

        const algorithms = ["Bubble Sort", "Counting Sort", "Insertion Sort", "Merge Sort", "Quick Sort", "Selection Sort"];

        for (let i = 0; i < times.length; i++) {
            if (times[i] < minTime) {
                minTime = times[i];
                fastestAlgorithm = algorithms[i];
            }
        }

        return fastestAlgorithm;
    }

    static main() {
        const randomArray = App.generateRandomArray(200000);

        // Tamanhos dos subarrays a serem testados
        const sizes = [100, 500, 1000, 5000, 30000, 80000, 100000, 150000, 200000];

        // Testa cada algoritmo para cada tamanho de subarray
        for (const size of sizes) {
            const subarray = randomArray.slice(0, size);
            console.log(`\nTamanho do Subarray: ${size}`);

            // Bucket Sort com Bubble Sort interno
            console.log("Bucket Sort (Bubble Sort): ");
            const bubbleSortTime = App.measureTime(arr => App.bucketSort(arr, App.bubbleSort), subarray);

            // Bucket Sort com Selection Sort interno
            console.log("Bucket Sort (Selection Sort): ");
            const selectionSortTime = App.measureTime(arr => App.bucketSort(arr, App.selectionSort), subarray);

            // Bucket Sort com Insertion Sort interno
            console.log("Bucket Sort (Insertion Sort): ");
            const insertionSortTime = App.measureTime(arr => App.bucketSort(arr, App.insertionSort), subarray);

            // Bucket Sort com Merge Sort interno
            console.log("Bucket Sort (Merge Sort): ");
            const mergeSortTime = App.measureTime(arr => App.bucketSort(arr, App.mergeSort), subarray);

            // Bucket Sort com Quick Sort interno
            console.log("Bucket Sort (Quick Sort): ");
            const quickSortTime = App.measureTime(arr => App.bucketSort(arr, App.quickSort), subarray);

            // Bucket Sort com Counting Sort interno
            console.log("Bucket Sort (Counting Sort): ");
            const countingSortTime = App.measureTime(arr => App.bucketSort(arr, App.countingSort), subarray);

            // Comparar os tempos e identificar o algoritmo mais rápido
            const fastestAlgorithm = App.findFastestAlgorithm(
                bubbleSortTime, countingSortTime, insertionSortTime,
                mergeSortTime, quickSortTime, selectionSortTime);

            console.log(`O algoritmo interno mais rápido para Bucket Sort foi: ${fastestAlgorithm}`);
        }
    }
}

// Executar o método main
App.main();
