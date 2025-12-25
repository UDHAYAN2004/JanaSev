import React from 'react'
import { useRef,useState,useEffect } from 'react'
interface countingNumber{
    start:number,
    end:number
}
const CountingNumbers:React.FC<countingNumber> = ({start=0,end}) => {
  const[value,setValue]=useState(start);
  const ref=useRef<number>(start)
  const counter=end/200;
  const formatNumber=(num:number)=>{
    if(num >= 1000 && num<=100000){
        return (num/1000).toFixed(1)+ "K+";
    }
    else if(num > 100000 && num<=1000000){
        return (num/100000).toFixed(1)+ "M+";
    }
    else{
        return num.toString();
    }
  }
  const Count=()=>{
    if(ref.current < end){
        const result=Math.ceil(ref.current+counter)
        if(result > end) return setValue(result)
        setValue(result)
        ref.current=result
    }
    setTimeout(Count,70)
  }
  useEffect(()=>{
    let isMount:boolean=true;
    if(isMount){
        Count()
    }
    return ()=> {isMount=false}
  },[end])
  return (
    <div>{formatNumber(value)}</div>
  )
}

export default CountingNumbers