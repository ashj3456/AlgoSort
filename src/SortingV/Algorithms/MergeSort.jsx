import React, { useContext, useState } from 'react'
import SortedSignal from './SortedSignal';
import { counterContext } from '../context/context';
import stop from './stop.svg'
function Merge(props) {
    const value = useContext(counterContext)
    const [myInterval, setMyInterval] = useState(0);
    const arrc = props.arr.slice()
    const animations = animated(arrc);
    const arrbars = document.getElementsByClassName("arrbar");
    const n = animations.length;
    var inter = 0;
    var i = 0;

    function startI() {
        if (value.count === 0) {
            inter = setInterval(mergeSort, props.speed);
            setMyInterval(inter)
        }
        else{
            alert("Generate New Array First !!!")
        }
    }

    function mergeSort() {
        value.setCount((count) => count = 1);
        if (i < n) {
            const [one, two] = animations[i];
            if (i % 3 == 0) {
                const onestyle = arrbars[one].style
                const twostyle = arrbars[two].style

                onestyle.backgroundColor = 'red';
                twostyle.backgroundColor = 'red';

            }
            else if (i % 3 == 1) {
                const onestyle = arrbars[one].style
                const twostyle = arrbars[two].style

                onestyle.backgroundColor = 'white';
                twostyle.backgroundColor = 'white';

            }
            else {

                const onestyle = arrbars[one].style
                onestyle.height = `${two}px`

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
                props.algo === "merge" && <div className='flex flex-col justify-between'>
                    <button className='rounded-3xl w-48 p-2 px-5 my-5 btnn bg-green-500' onClick={() => startI()}>Start Merge Sort !</button>
                    <button className='flex rounded-3xl w-48 p-2 px-12 btnn bg-red-500' onClick={() => stopI()}>
                        <img className='mt-1 mr-2' src={stop} alt="" />
                        Stop</button>
                </div>
            }
        </div>
    )
}

export default Merge




//Creation of Animation Array
const animated = (arr) => {
    const animations = [];
    const arr2 = arr.slice()
    mergeSort(animations, arr2, 0, arr.length - 1)
    return animations
}

//Merge Sort
const mergeSort = (animations, arr, l, r) => {
    if (l >= r) {
        return;
    }
    var m = l + parseInt((r - l) / 2);
    mergeSort(animations, arr, l, m);
    mergeSort(animations, arr, m + 1, r);
    merge(animations, arr, l, m, r);
    return arr
}


function merge(animations, arr, l, m, r) {
    var n1 = m - l + 1;
    var n2 = r - m;
    var L = new Array(n1);
    var R = new Array(n2);
    for (var i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (var j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];
    var i = 0;
    var j = 0;
    var k = l;
    while (i < n1 && j < n2) {
        animations.push([i, k])
        animations.push([i, k])
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            animations.push([k, L[i]])
            i++;
        }
        else {
            arr[k] = R[j];
            animations.push([k, R[j]])
            j++;
        }
        k++;
    }
    while (i < n1) {
        animations.push([i, i])
        animations.push([i, i])
        arr[k] = L[i];
        animations.push([k, L[i]])
        i++;
        k++;
    }
    while (j < n2) {
        animations.push([k, k])
        animations.push([k, k])
        arr[k] = R[j];
        animations.push([k, R[j]])
        j++;
        k++;
    }
}

