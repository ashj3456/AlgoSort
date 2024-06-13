import React, { useContext, useState } from 'react'
import { counterContext } from '../context/context';
import stop from './stop.svg'
import SortedSignal from './SortedSignal';

function HeapSort(props) {

    const value = useContext(counterContext)
    const [myInterval, setMyInterval] = useState(0);
    const arrc = props.arr.slice()
    const animation = sort(arrc)
    const n = animation.length
    const arrbars = document.getElementsByClassName("arrbar");
    var inter = 0;
    var i = 0;

    function startI() {
        if (value.count === 0) {
            inter = setInterval(HeapAnimation, props.speed);
            setMyInterval(inter)
        }
        else {
            alert("Generate New Array First !!!")
        }
    }

    function HeapAnimation() {
        value.setCount((count) => count = 1);
        if (i < n) {
            const [one, two, three] = animation[i];
            const oneS = arrbars[one].style
            const twoS = arrbars[two].style
            if (three !== 'swap') {
                oneS.backgroundColor = `${three}`
                twoS.backgroundColor = `${three}`
            }
            else {
                let temp2 = parseInt(twoS.height);
                let temp = parseInt(oneS.height);
                oneS.height = `${temp2}px`
                twoS.height = `${temp}px`
            }
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
                props.algo === "heap" && <div className='flex flex-col justify-between'>
                    <button className='rounded-3xl w-48 p-2 px-5 my-5 btnn bg-green-500' onClick={() => startI()}>Start Heap Sort !</button>
                    <button className='flex rounded-3xl w-48 p-2 px-12 btnn bg-red-500 border' onClick={() => stopI()}>
                        <img className='mt-1 mr-2' src={stop} alt="" />
                        Stop</button>
                </div>
            }
        </div>
    )
}

export default HeapSort


function sort(arr) {
    var N = arr.length;
    const animation = []
    for (var i = Math.floor(N / 2) - 1; i >= 0; i--) {
        animation.push([i, i, 'red'])//red
        animation.push([i, i, 'white'])//white
        heapify(animation, arr, N, i);
    }

    for (var i = N - 1; i > 0; i--) {
        animation.push([i, 0, 'red'])
        animation.push([i, 0, 'swap']) //swap
        animation.push([i, 0, 'white']);
        [arr[0], arr[i]] = [arr[i], arr[0]]
        heapify(animation, arr, i, 0);
    }
    return animation
}



function heapify(animation, arr, N, i) {
    var largest = i;
    var l = 2 * i + 1;
    var r = 2 * i + 2;
    if (l < N) {
        animation.push([l, largest, 'red'])//red
        if (arr[l] > arr[largest]) {
            animation.push([largest, largest, 'white'])//white
            largest = l;
        }
        else {
            animation.push([l, largest, 'white']) //white
        }
    }

    if (r < N) {
        animation.push([r, largest, 'red'])//red
        if (arr[r] > arr[largest]) {
            animation.push([largest, largest, 'white'])//white
            largest = r;
        }
        else {
            animation.push([r, largest, 'white'])
        }
    }

    if (largest != i) {
        animation.push([i, i, 'red'])
        animation.push([i, largest, 'swap'])//swap
        animation.push([i, largest, 'white']);//white
        [arr[i], arr[largest]] = [arr[largest], arr[i]]
        heapify(animation, arr, N, largest);
    }
}
