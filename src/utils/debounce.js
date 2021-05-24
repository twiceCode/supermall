// 防抖动性能优化
export default function debounce(func, delay){
    let timer = null;
    return function (...rest) {
        // 如果timer不为空，则清除它
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, rest);
        }, delay)
    }
}