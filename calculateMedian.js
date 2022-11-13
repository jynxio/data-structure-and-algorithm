// ==================================================================================
// 灵感:
//   - https://www.cnblogs.com/shizhh/p/5746151.html
//   - http://www.moye.me/2018/06/29/dynamic-median-in-golang/
// ==================================================================================

import { MinHeap } from "./Heap";

/**
 * 计算一组数字值的中位数。
 * @param { Array[number] } number_array - 存储一至多个数字值的一维数组。
 * @returns { number } - 中位数。
 * @example
 * f( [ 3, 1, 2 ] ); // return 2
 * f( [ 3, 1, 2, 0 ] ); // return 1.5
 */
export default function ( number_array ) {

    const number_count = number_array.length;

    if ( number_count === 0 ) throw new Error( "计算失败：因为入参不合法。" );

    const heap = new MinHeap();
    const heap_count = Math.floor( number_count / 2 ) + 1;

    for ( let index = 0; index < heap_count; index ++ ) heap.insert( number_array[ index ] );

    for ( let index = heap_count; index < number_count; index ++ ) {

        const minimum = heap.getMinimum();

        if ( minimum >= number_array[ index ] ) continue;

        heap.shift();
        heap.insert( number_array[ index ] );

    }

    if ( number_count % 2 === 1 ) return heap.getMinimum();

    const first_minimum = heap.getMinimum();

    heap.shift();

    const second_minimum = heap.getMinimum();

    return ( first_minimum + second_minimum ) / 2;

}
