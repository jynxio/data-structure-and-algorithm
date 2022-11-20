import { MinHeap } from "../data-structure/Heap.js";

/**
 * 堆排序算法，用于对无序数组进行升序排序和降序排序，该算法不会改变原始数据。
 * @param { number[] } data - 无序数组。
 * @returns { Array } - 一个数组，第一个元素是升序排列数组，第二个元素是降序排列数组。
 * @example
 * f( [ 3, 1, 2 ] ); // return [ [ 1, 2, 3 ], [ 3, 2 ,1 ] ]
 */
export default function heapSort ( data ) {

    /*  */
    const min_heap = new MinHeap();

    data.forEach( number => min_heap.insert( number ) )

    /*  */
    const ascending_order = [];  // 升序排列
    const descending_order = []; // 降序排列

    for ( let i = 0; i < data.length; i ++ ) {

        const minimum = min_heap.getMinimum();

        ascending_order[ i ] = minimum;
        descending_order[ data.length - 1 - i ] = minimum;

        min_heap.shift();

    }

    return [ ascending_order, descending_order ];

}
