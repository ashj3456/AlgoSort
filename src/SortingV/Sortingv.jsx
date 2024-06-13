import React, { useState, useContext } from 'react'
import { counterContext } from './context/context.js'
import './Sortingv.css';
import Quick from './Algorithms/QuickSort.jsx';
import Merge from './Algorithms/MergeSort.jsx';
import Selection from './Algorithms/Selection.jsx';
import Insertion from './Algorithms/Insertion.jsx';
import Bubble from './Algorithms/Bubble.jsx';
import HeapSort from './Algorithms/HeapSort.jsx';
import useMediaQuery from '@mui/material/useMediaQuery';

function randonInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function generatearray(size = 20) {
    const myArray = [];
    for (let i = 0; i < size; i++) {
        myArray.push(randonInt(10, 400))
    }
    return myArray
}



export function Sortingv() {
    const [size, setSize] = useState(50)
    const [arr, setArr] = useState(generatearray(size));
    const [speed, setSpeed] = useState(50)
    const [algo, setAlgo] = useState("merge")
    const [widt, setWidt] = useState(9)
    const value = useContext(counterContext)
    const matches = useMediaQuery('(max-width:1200px)');
    const changesize = (e) => {
        if (value.count === 0 || value.count === 2) {
            setSize(e.target.value)
            let w = (90 / size) * 5
            setWidt(w)
        }
    }


    const changespeed = (e) => {
        setSpeed(e.target.value)
    }


    return (
        <div className='text-white'>
            <div className='flex m-2'>
                <img className='w-10 h-7 rounded-lg invert-1' src="./src/SortingV/logo.svg" alt="sort" />
                <span className='font-bold'>&lt;AlgoSort/&gt;</span>
                <h1 className='text-center w-full p-3 font-bold text-xl'>Welcome To AlgoSort Visualiser</h1>
            </div>
            <div className='flex xl:flex-row flex-col  w-full'>
                <div className='flex flex-col h-full  p-3 items-center'>
                    <div className='p-2  rounded-lg w-64 text-center'>
                        Select The Sorting Algorithm
                    </div>
                    <div className='flex flex-row justify-between mt-7 mb-2 w-[425px]'>
                        <div className=' rounded-lg p-2 w-48 text-center'>
                            Logarithmic Algorithms
                        </div>
                        <div className=' rounded-lg p-2 w-48 text-center'>
                            Quadratic Algorithms
                        </div>
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className='flex flex-col mx-5 justify-center items-center'>
                            <button className='w-48 my-4 rounded-lg p-2 px-10 btnn focus:ring-1 focus:ring-slate-300' onClick={() => setAlgo("merge")}>Merge Sort</button>
                            <button className='w-48 my-4 rounded-lg p-2 px-10 btnn focus:ring-1 focus:ring-slate-300' onClick={() => setAlgo("quick")} >Quick Sort</button>
                            <button className='w-48 my-4 rounded-lg p-2 px-10 btnn focus:ring-1 focus:ring-slate-300' onClick={() => setAlgo("heap")} >Heap Sort</button>
                        </div>
                        <div className='flex flex-col mx-5 justify-center items-center'>

                            <button className='w-48 my-4 rounded-lg p-2 px-10 btnn focus:ring-1 focus:ring-slate-300' onClick={() => setAlgo("selection")} >Selection Sort</button>
                            <button className='w-48 my-4 rounded-lg p-2 px-10 btnn focus:ring-1 focus:ring-slate-300' onClick={() => setAlgo("insertion")} >Insertion Sort</button>
                            <button className='w-48 my-4 rounded-lg p-2 px-10 btnn focus:ring-1 focus:ring-slate-300' onClick={() => setAlgo("bubble")} >Bubble Sort</button>
                        </div>
                    </div>

                    <Merge arr={arr} algo={algo} speed={speed} />
                    <Quick arr={arr} algo={algo} speed={speed} />
                    <Selection arr={arr} algo={algo} speed={speed} />
                    <Insertion arr={arr} algo={algo} speed={speed} />
                    <Bubble arr={arr} algo={algo} speed={speed} />
                    <HeapSort arr={arr} algo={algo} speed={speed} />

                </div>
                <div className='barc xl:overflow-hidden overflow-x-scroll rounded-lg  p-1 xl:w-[63vw] xl:h-[32vw] h-[50vh] text-center mx-3 my-4'>
                    {arr.map((name, index) => (                        
                        <div key={index} className='arrbar'                        
                            style={{
                                height: `${name}px`,
                                "--width": `${90/arr.length*5}px`,                                                        
                            }}>
                        </div>
                    ))}
                </div>

            </div>

            <div className='flex xl:flex-row flex-col xl:ml-[90vh] mb-5'>

                <div className='barc btnn flex flex-row border-white border h-8 rounded-3xl truncate'>
                    <div className='pl-2 w-[115px] '>
                        Speed(ms) {speed}
                    </div>
                    <div className="p-1">
                        <input className='w-30' type="range" min="1" max="100" onChange={changespeed} />
                    </div>
                </div>

                <div className='mx-7 barc btnn flex flex-row border-white border h-8 rounded-3xl truncate'>
                    <div className='pl-2 w-[60px] '>
                        Size {size}
                    </div>
                    <div className="p-1">
                        <input className='w-30 ' type="range" min="10" max="90" onChange={changesize} />
                    </div>
                </div>

                <button className='border border-white rounded-3xl p-2 px-12 barc btnn focus:ring-1 focus:ring-slate-300' onClick={() => {
                    if (value.count == 0 || value.count == 2 || value.count == 3) {
                        setArr(generatearray(size))
                        value.setCount((count) => count = 0);
                    }
                    else {
                        alert("Press Stop First !!!")
                    }

                }}>Generate array </button>
            </div>

        </div>
    )
}

export default Sortingv
