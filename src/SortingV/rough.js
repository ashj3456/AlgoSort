function SelectionnAimation(arr, speed) {
    const animation = createAnimation(arr)
    let n = animation.length
    let x = n + 20
    let m = x + 30
    const arrbars = document.getElementsByClassName("arrbar");

    for (let i = 0; i < n; i++) {
        const [one, two] = animation[i]
        if (one === 'uc' || one === 'b') {
            setTimeout(() => {
                arrbars[two].style.backgroundColor = 'black'
            }, i * speed);
        }
        else if (one === 'c') {
            setTimeout(() => {
                arrbars[two].style.backgroundColor = 'blue'
            }, i * speed);
        }
        else if (one === 'r') {
            setTimeout(() => {
                arrbars[two].style.backgroundColor = 'red'
            }, i * speed);
        }
        else {
            const oneS = arrbars[one].style
            const twoS = arrbars[two].style
            setTimeout(() => {
                let temp2 = parseInt(twoS.height);
                let temp = parseInt(oneS.height);
                twoS.backgroundColor = 'blue'
                oneS.backgroundColor = 'black'
                oneS.height = `${temp2}px`
                twoS.height = `${temp}px`
            }, i * speed);
        }
    }

    setTimeout(() => {
        for (let i = 0; i < arrbars.length; i++) {
            const e = arrbars[i];
            e.style.backgroundColor = 'green'
        }
    }, x * speed);


    setTimeout(() => {
        value.setCount((count) => count = 0);
        for (let i = 0; i < arrbars.length; i++) {
            const e = arrbars[i];
            e.style.backgroundColor = 'black'
        }
    }, m * speed);
}

const createAnimation = (arr) => {
    const animation = []
    const arr2 = arr.slice()
    selectionSort(animation, arr, arr2.length)
    return arr
}

function selectionSort(animation, arr, n) {
    var i, j, min_idx;
    for (i = 0; i < n - 1; i++) {
        min_idx = i;
        animation.push(['c', i])
        for (j = i + 1; j < n; j++) {
            animation.push(['r', j])
            animation.push(['b', j])
            if (arr[j] < arr[min_idx]) {
                animation.push(['uc', min_idx])
                min_idx = j;
                animation.push(['c', min_idx])
            }
        }
        animation.push(['uc', min_idx])
        if (min_idx != i) {
            animation.push([min_idx, i]);
            [arr[min_idx], arr[i]] = [arr[i], arr[min_idx]]
        }
        else {
            animation.push(['c', min_idx])
        }
    }
}


var arr = [64, 25, 12, 22, 11];
console.log(createAnimation(arr));