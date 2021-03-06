import { useEffect, useState } from "react"

export const isFalsy = (value: unknown) => value === 0 ? false : !value

//在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: object) => {
    //等价于Object.assgin({},object)
    const result = { ...object }
    Object.keys(result).forEach(key => {
        //@ts-ignore
        const value = object[key]
        if (isFalsy(value)) {
            //@ts-ignore
            delete result[key]
        }
    })
    return result
}
//void 不返回任何值
export const useMount = (callback:()=>void) => {
    useEffect(() => {
        callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
}
// delay?number 要么不传 要么传number
export const useDebounce = (value:unknown,delay?:number) =>{
    const [debouncedValue,setDebouncedValue] = useState(value);

useEffect(()=>{
    //每次在value变化以后，设置一个定时器
    const timeout = setTimeout(()=> setDebouncedValue(value),delay);
    //每次在上一个useEffect处理完以后再运行
    return()=>{clearTimeout(timeout)};
},[value,delay]);

return debouncedValue;
}
