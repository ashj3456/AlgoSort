import React, { useContext, useState } from 'react'
import SortedSignal from './SortedSignal';
import { counterContext } from '../context/context';
import stop from './stop.svg'

function QuickSort(props) {
    const value = useContext(counterContext)
    const [myInterval, setMyInterval] = useState(0);
    const arrc = props.arr.slice()
    const animations = animated(arrc);
    const arrbars = document.getElementsByClassName("arrbar");
    const n = animations.length
    var inter = 0;
    var i = 0;
    let flag = true;

    function startI() {
        if (value.count === 0) {
            inter = setInterval(QuickSorta, props.speed);
            setMyInterval(inter)
        }
        else {
            alert("Generate New Array First !!!")
        }
    }

    function QuickSorta() {
        value.setCount((count) => count = 1);
        if (i < n) {
            const [one, two] = animations[i];
            if (one == 'c') {
                i += 1;
                const [x, y] = animations[i];
                let onestyle = arrbars[x].style
                let twostyle = arrbars[y].style
                let temp = parseInt(twostyle.height);
                let temp2 = parseInt(onestyle.height);
                twostyle.height = `${temp2}px`
                onestyle.height = `${temp}px`
            }
            else if (flag) {
                const onestyle = arrbars[one].style
                const twostyle = arrbars[two].style
                onestyle.backgroundColor = 'red';
                twostyle.backgroundColor = 'red';

                flag = false;

            }
            else if (!flag) {
                const onestyle = arrbars[one].style
                const twostyle = arrbars[two].style

                onestyle.backgroundColor = 'white';
                twostyle.backgroundColor = 'white';

                flag = true;
            }
            i += 1
            if (i == n) {
                SortedSignal(arrbars)
                setTimeout(() => {
                    value.setCount((count) => count = 2);
                }, 1000);
                clearInterval(inter)
            }
        }

    }

    function stopI() {
        if (value.count === 1)
            value.setCount((count) => count = 3);
        for (let i = 0; i < arrc.length; i++)
            arrbars[i].style.backgroundColor = 'white'
        clearInterval(myInterval)
    }

    return (
        <div className='absolute bottom-[55px] text-black font-medium'>
            {
                props.algo === "quick" && <div className='flex flex-col justify-between'>
                    <button className='rounded-3xl w-48 p-2 px-5 my-5 btnn bg-green-500' onClick={() => startI()}>Start Quick Sort !</button>
                    <button className='flex rounded-3xl w-48 p-2 px-12 btnn bg-red-500 border' onClick={() => stopI()}>
                        <img className='mt-1 mr-2' src={stop} alt="" />
                        Stop</button>

                </div>
            }
        </div>
    )
}

export default QuickSort



//Creation of Animation Array
const animated = (arr) => {
    const animations = [];
    quickSort(animations, arr, 0, arr.length - 1)
    return animations

}


function quickSort(animations, arr, low, high) {
    if (low >= high) return;
    let pi = partition(animations, arr, low, high);
    quickSort(animations, arr, low, pi - 1);
    quickSort(animations, arr, pi + 1, high);
}

function partition(animations, arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j <= high - 1; j++) {
        animations.push([j, high])
        animations.push([j, high])
        if (arr[j] < pivot) {
            i++;
            animations.push([i, j])
            animations.push([i, j])
            animations.push(['c', 'c']);
            animations.push([i, j]);
            [arr[i], arr[j]] = [arr[j], arr[i]]
        }
    }
    animations.push([i + 1, high]);
    animations.push([i + 1, high]);
    animations.push(['c', 'c']);
    animations.push([i + 1, high]);
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

