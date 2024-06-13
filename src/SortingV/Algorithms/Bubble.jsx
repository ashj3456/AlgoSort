import React, { useContext, useState } from 'react'
import SortedSignal from './SortedSignal'
import { counterContext } from '../context/context';
import stop from './stop.svg'
function Bubble(props) {
    const value = useContext(counterContext)
    const [myInterval, setMyInterval] = useState(0);
    const arrc = props.arr.slice()
    const animation = bblSort(arrc)
    const n = animation.length
    const arrbars = document.getElementsByClassName("arrbar")
    var inter = 0;
    var i = 0;

    function startI() {
        if(value.count===0){
            inter = setInterval(bblAnimation, props.speed);
            setMyInterval(inter)
        }
        else {
            alert("Generate New Array First !!!")
        }
    }

    function bblAnimation() {
        value.setCount((count) => count = 1);
        if (i < n) {
            const [one, two] = animation[i];
            if (one === 'r') {
                arrbars[two].style.backgroundColor = 'red'
                arrbars[two - 1].style.backgroundColor = 'red'
            }
            else if (one === 'b') {
                arrbars[two].style.backgroundColor = 'white'
                arrbars[two - 1].style.backgroundColor = 'white'
            }
            else if (one === 'blue') {
                arrbars[two].style.backgroundColor = 'rgb(0, 189, 252)'
            }
            else if (one !== two) {
                const oneS = arrbars[one].style
                const twoS = arrbars[two].style
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
            },1000);
            clearInterval(inter)
        }
    }


    function stopI() {
        if(value.count===1)
            value.setCount((count) => count = 3);
        for (let i = 0; i < arrc.length; i++) 
            arrbars[i].style.backgroundColor = 'white'            
        clearInterval(myInterval)
    }

    return (

        <div className='absolute bottom-[55px] text-black font-medium'>

            {
                props.algo === "bubble" && <div className='flex flex-col justify-between'>
                    <button className='rounded-3xl w-48 p-2 px-5 my-5 btnn bg-green-500' onClick={() => startI()}>Start Bubble Sort !</button>
                    <button className='flex rounded-3xl w-48 p-2 px-12 btnn bg-red-500 border' onClick={() => stopI()}>
                        <img className='mt-1 mr-2' src={stop} alt="" />
                        Stop</button>
                </div>
            }
        </div >
    )
}

export default Bubble


function bblSort(arr) {
    const animation = []
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < (arr.length - i - 1); j++) {
            animation.push(['r', j + 1])
            animation.push(['b', j + 1])
            if (arr[j] > arr[j + 1]) {
                animation.push([j, j + 1]);
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
        animation.push(['blue', (arr.length - i - 1)])
    }
    return animation
}