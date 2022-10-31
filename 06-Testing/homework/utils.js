function sumArray(array,num){
    for(let i=0;i<array.length;i++){
        for(let j=i+1;j<array.length;j++){
            if(array[i]+array[j]==num) return true;
        }
    }
    return false
}

function pluck(array,prop){
    return array.map(obj=>obj[prop])
}
module.exports={
    sumArray,
    pluck
}