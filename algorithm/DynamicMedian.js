// ===================================================================================
// 说明:
//     该算法可用于计算动态的无序数组的中位数，该算法的冷启动效率较低，热更新效率较高。具体来说
//     就是当你第一次获取一个无序数组的中位数时，该操作的时间复杂度为O(nlogn)，而当你向该无序数
//     组新增一个数字值，并再次获取该无序数组的中位数时，该操作的时间复杂度为O(logn)。
// 示例:
//     const dynamic_median = new DynamicMedian();
//     dynamic_median.setData( [ 3, 1, 5 ] ); // retutn dynamic_median - O(nlogn)
//     dynamic_median.getMedian();            // return 3              - O(1)
//     dynamic_median.insertNumber( 4 );      // return dynamic_median - O(logn)
//     dynamic_median.getMedian();            // return 3.5            - O(1)
// 参考:
//   - https://www.cnblogs.com/shizhh/p/5746151.html
//   - http://www.moye.me/2018/06/29/dynamic-median-in-golang/
// ===================================================================================

import { MinHeap, MaxHeap } from "../data-structure/Heap.js";

export default class DynamicMedian {

    #data;
    #min_heap;
    #max_heap;

    /**
     * 动态中位数的类，用于计算动态无序数组的中位数，该算法不会改变原始数据。
     */
    constructor () {}

    /**
     * 设置无序数组。
     * @param { number[] } data - 无序数组，即一组无序的数字值，比如[3, 1, 2]。
     * @returns { Object } - 实例本身。
     */
    setData ( data ) {

        if ( data.length === 0 ) throw new Error( "计算失败：因为入参不合法。" );

        this.#data = [ ... data ];
        this.#min_heap = new MinHeap();
        this.#max_heap = new MaxHeap();

        const data_count = this.#data.length;
        const min_heap_count = Math.ceil( data_count / 2 );
        const max_heap_count = data_count - min_heap_count;

        /* 初始化最小堆 */
        for ( let i = 0; i < min_heap_count; i ++ ) this.#min_heap.insert( this.#data[ i ] );

        for ( let i = min_heap_count; i < data_count; i ++ ) {

            const minimum = this.#min_heap.getMinimum();

            if ( minimum >= this.#data[ i ] ) continue;

            this.#min_heap.shift();
            this.#min_heap.insert( this.#data[ i ] );

        }

        /* 初始化最大堆 */
        for ( let i = 0; i < max_heap_count; i ++ ) this.#max_heap.insert( this.#data[ i ] );

        for ( let i = max_heap_count; i < data_count; i ++ ) {

            const maximum = this.#max_heap.getMaximum();

            if ( maximum <= this.#data[ i ] ) continue;

            this.#max_heap.shift();
            this.#max_heap.insert( this.#data[ i ] );

        }

        return this;

    }

    /**
     * 获取无序数组。
     * @returns { number[] } - 无序数组。
     */
    getData () {

        if ( ! this.#data ) throw new Error( "执行失败：因为没有设置无序数组。" );

        return this.#data;

    }

    /**
     * 获取无序数组的中位数。
     * @returns { number } - 无序数组的中位数。
     */
    getMedian () {

        if ( ! this.#data ) throw new Error( "执行失败：因为没有设置无序数组。" );

        /* 如果无序数组有奇数个数字值 */
        if ( this.#data.length % 2 === 1 ) return this.#min_heap.getMinimum();

        /* 如果无序数字有偶数个数字值 */
        return ( this.#min_heap.getMinimum() + this.#max_heap.getMaximum() ) / 2;

    }

    /**
     * 插入一个数字值。
     * @param { number } number - 一个数字值。
     * @returns { Object } - 实例本身。
     */
    insertNumber ( number ) {

        if ( ! this.#data ) throw new Error( "执行失败：因为没有设置无序数组。" );

        this.#data.push( number );

        /* 如果无序数组有奇数个数字值 */
        if ( this.#data.length % 2 === 1 ) {

            if ( number >= this.#max_heap.getMaximum() ) {

                this.#min_heap.insert( number );

                return this;

            }

            this.#max_heap.insert( number );
            this.#min_heap.insert( this.#max_heap.getMaximum() );
            this.#max_heap.shift();

            return this;

        }

        /* 如果无序数字有偶数个数字值 */
        if ( number <= this.#min_heap.getMinimum() ) {

            this.#max_heap.insert( number );

            return this;

        }

        this.#min_heap.insert( number );
        this.#max_heap.insert( this.#min_heap.getMinimum() );
        this.#min_heap.shift();

        return this;

    }

}
