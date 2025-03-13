
function SortedSignal(arrbars) {

    for (let i = 0; i < arrbars.length; i++) {
        const e = arrbars[i];
        setTimeout(() => {
            e.style.backgroundColor = 'rgb(114, 244, 105)'            
        }, i*10);
    }


    setTimeout(() => {
        for (let i = 0; i < arrbars.length; i++) {
            const e = arrbars[i];
            e.style.backgroundColor = 'white'
        }
    }, 1000);
}

export default SortedSignal