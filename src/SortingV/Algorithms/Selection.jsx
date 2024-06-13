import React, { useContext, useState } from 'react'
import SortedSignal from './SortedSignal'
import { counterContext } from '../context/context';
import stop from './stop.svg'

function Selection(props) {
    const value = useContext(counterContext)
    const [myInterval, setMyInterval] = useState(0);
    const arrc = props.arr.slice()
    const animation = createAnimation(arrc)
    let n = animation.length
    const arrbars = document.getElementsByClassName("arrbar");
    var inter = 0;
    var i = 0;

    function startI() {
        if (value.count === 0) {
            inter = setInterval(SelectionAnimation, props.speed);
            setMyInterval(inter)
        }
        else {
            alert("Generate New Array First !!!")
        }
    }

    function SelectionAnimation() {
        value.setCount((count) => count = 1);
        if (i < n) {
            const [one, two] = animation[i]
            if (one === 'uc' || one === 'b') {
                arrbars[two].style.backgroundColor = 'white'
            }
            else if (one === 'c') {
                arrbars[two].style.backgroundColor = 'rgb(0, 189, 252)'
                console.log("anup")

            }
            else if (one === 'r') {
                arrbars[two].style.backgroundColor = 'red'
            }
            else {
                const oneS = arrbars[one].style
                const twoS = arrbars[two].style
                let temp2 = parseInt(twoS.height);
                let temp = parseInt(oneS.height);
                twoS.backgroundColor = 'rgb(0, 189, 252)'
                oneS.backgroundColor = 'white'
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
                props.algo === "selection" && <div className='flex flex-col justify-between'>
                    <button className='rounded-3xl w-48 p-2 px-5 my-5 btnn bg-green-500' onClick={() => startI()}>Start Selection Sort !</button>
                    <button className='flex rounded-3xl w-48 p-2 px-12 btnn bg-red-500 border' onClick={() => stopI()}>
                        <img className='mt-1 mr-2' src={stop} alt="" />
                        Stop</button>
                </div>
            }
        </div>
    )
}

export default Selection

const createAnimation = (arr) => {
    const animation = []
    const arr2 = arr.slice()
    selectionSort(animation, arr2, arr2.length)
    return animation
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