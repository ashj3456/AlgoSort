import React, { useContext, useState } from 'react'
import SortedSignal from './SortedSignal'
import { counterContext } from '../context/context';
import stop from '../../assets/stop.svg'


function Insertion({ arr, algo, speed, updateArr }) {

  const value = useContext(counterContext)
  const arrc = arr.slice()
  const animation = insertionSort(arrc, arrc.length)
  const arrbars = document.getElementsByClassName("arrbar")
  const [myInterval, setMyInterval] = useState(0);
  const n = animation.length
  var inter = 0;
  var i = 0;



  function startI() {
    console.log(arr)
    if (value.count === 0) {
      inter = setInterval(InsertionAnimation, speed);
      setMyInterval(inter)
    }
    else {
      alert("Generate New Array First !!!")
    }
  }



  function InsertionAnimation() {
    value.setCount((count) => count = 1);
    if (i < n) {
      const [one, two] = animation[i];
      if (one === 'r') {
        arrbars[two].style.backgroundColor = 'red'
      }
      else if (one === 'x') {
        arrbars[two].style.backgroundColor = 'red'
        arrbars[two - 1].style.backgroundColor = 'red'
      }
      else if (one === 'y') {
        const oneS = arrbars[two - 1].style
        const twoS = arrbars[two].style
        let temp2 = parseInt(twoS.height);
        let temp = parseInt(oneS.height);
        twoS.backgroundColor = 'rgb(0, 189, 252)'
        oneS.backgroundColor = 'white'
        oneS.height = `${temp2}px`
        twoS.height = `${temp}px`
        // oneS.transition = '.3s'
        // twoS.transition = '.3s'

      }
      else if (one === 'b') {
        arrbars[two].style.backgroundColor = 'white'
      }
      else if (one === 'blue') {
        arrbars[two].style.backgroundColor = 'rgb(0, 189, 252)'
      }


    }
    i += 1
    if (i === n) {
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
        algo === "insertion" && <div className='flex flex-col justify-between'>
          <button className='rounded-3xl w-48 p-2 px-5 my-5 btnn bg-green-500' onClick={() => startI()}>Start Insertion Sort !</button>
          <button className='flex rounded-3xl w-48 p-2 px-12 btnn bg-red-500 border' onClick={() => stopI()}>
            <img className='mt-1 mr-2' src={stop} alt="" />
            Stop</button>
        </div>
      }
    </div>
  )
}

export default Insertion


function insertionSort(arr, n) {
  const animation = []
  let i, key, j;
  animation.push(['r', 0])
  animation.push(['b', 0])
  for (i = 1; i < n; i++) {
    key = arr[i];
    animation.push(['r', i])
    animation.push(['b', i])
    j = i - 1;
    while (j >= 0 && arr[j] > key) {
      animation.push(['x', j + 1]) //red
      animation.push(['y', j + 1]) //swap
      animation.push(['z', j + 1]) //black
      arr[j + 1] = arr[j];

      j = j - 1;
    }
    animation.push(['blue', j + 1])
    arr[j + 1] = key;
  }
  return animation
}  