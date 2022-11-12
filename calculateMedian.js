// TODO - 待优化

// ---------------------------------------------------------------------------------------
// 灵感:
//   - https://www.cnblogs.com/shizhh/p/5746151.html
//   - http://www.moye.me/2018/06/29/dynamic-median-in-golang/
// ---------------------------------------------------------------------------------------

/**
 * 计算中位数。
 * @param { Array[number] } data - 存储数字值的一维数组。
 * @returns { number | undefined } - 若data为空，则返回undefined，否则返回中位数。
 * @example
 * f( [ 3, 1, 3 ] );    // return 2
 * f( [ 4, 1, 3, 2 ] ); // return 2.5
 */
export default function ( data ) {

    const data_length = data.length;

    /* 若元素个数为零 */
    if ( data_length === 0 ) return;

    const parity = data_length % 2 === 0 ? "odd" : "even";

    const heap = new MinHeap();
    const heap_count = Math.floor( data_length / 2 ) + 1;

    for ( let i = 0; i < heap_count; i++ ) heap.insert( data[ i ] );
    for ( let i = heap_count; i < data_length; i++ ) {

        const minimum = heap.getMinimum();

        if ( minimum >= data[ i ] ) continue;

        heap.shift();
        heap.insert( data[ i ] );

    }

    /* 若元素个数为奇 */
    if ( parity === "odd" ) return heap.getMinimum();

    /* 若元素个数为偶 */
    const minimum = heap.getMinimum();
    const second_minimum = heap.getSecondMinimum();

    return ( minimum + second_minimum ) / 2;

}

class MinHeap {

    #heap = [];

    /**
     * 最小堆类。
     * @returns { Object } - 最小堆实例。
     * @example
     * new f(); // return 最小堆实例
     */
    constructor () {}

    /**
     * 插入一个值。
     * @param { number } value - 待插入的值。
     * @returns { Object } - 返回实例本身。
     * @example
     * f( 1 ); // return 实例本身
     */
    insert ( value ) {

        this.#heap.push( value );

        this.#shiftUp( this.#heap.length - 1 );

        return this;

    }

    /**
     * 获取堆的最小值（即第一个节点的值）。
     * @returns { number | undefined } - 若堆为空，则返回undefined，否则返回最小值。
     * @example
     * f(); // return 最小值或undefined
     */
    getMinimum () {

        return this.#heap[ 0 ];

    }

    /**
     * 获取堆的次小值。
     * @returns { number | undefined } - 若不存在次小值，则返回undefined，否则返回次小值。
     * @example
     * f(); // return 次小值或undefined
     */
    getSecondMinimum () {

        if ( this.#heap.length === 2 ) return this.#heap[ 1 ];
        if ( this.#heap.length === 3 ) return Math.min( this.#heap[ 1 ], this.#heap[ 2 ] );

    }

    /**
     * 移除堆的第一个节点（即最小值节点）。
     * @returns { Object } - 返回实例本身。
     * @example
     * f(); // return 实例本身
     */
    shift () {

        if ( this.#heap.length === 0 ) return this;
        if ( this.#heap.length === 1 ) {

            this.#heap.length = 0;

            return this;

        }

        this.#swap( 0, this.#heap.length - 1 );
        this.#heap.length--;
        this.#shiftDown( 0 );

        return this;

    }

    printLength () {

        console.log( this.#heap.length );

    }

    /**
     * 用树结构来打印堆实例。
     * @example
     * f(); // return undefined
     */
    print () {

        const core = index => {

            /* 基线条件 */
            if ( index === undefined ) return;

            /*  */
            const node = {};

            node.value = this.#heap[ index ];
            node.leftNode = core( this.#getLeftChildIndex( index ) );
            node.rightNode = core( this.#getRightChildIndex( index ) );

            return node;

        };

        const tree = core( 0 );

        console.log( tree );

    }

    /**
     * 交换两个节点的值。
     * @param { number } index_1 - 第一个节点的index。
     * @param { number } index_2 - 第二个节点的index。
     * @returns { undefined } - undefined。
     * @example
     * f( 0, 1 ); // return 实例本身
     */
    #swap ( index_1, index_2 ) {

        [ this.#heap[ index_1 ], this.#heap[ index_2 ] ] = [ this.#heap[ index_2 ], this.#heap[ index_1 ] ];

        return this;

    }

    /**
     * （私有方法）上移节点，通过向上移动节点来使最小堆保持正确。
     * @param { number } index - 待移动的节点的index。
     * @returns { undefined } - undefined。
     * @exmaple
     * f( 1 ); // return undefined
     */
    #shiftUp ( index ) {

        const parent_index = this.#getParentIndex( index );

        /* 基线条件 */
        if ( parent_index === undefined ) return;
        if ( this.#heap[ index ] >= this.#heap[ parent_index ] ) return;

        /*  */
        this.#swap( index, parent_index );
        this.#shiftUp( parent_index );

    }

    /**
     * （私有方法）下移节点，通过向下移动节点来使最小堆保持正确。
     * @param { number } index - 待移动的节点的index。
     * @returns { undefined } - undefined。
     */
    #shiftDown ( index ) {

        const left_child_index = this.#getLeftChildIndex( index );
        const right_child_index = this.#getRightChildIndex( index );

        /* 情况1: 既没有左子节点，又没有右子节点 */
        if ( left_child_index === undefined && right_child_index === undefined ) return; // 基线条件: 既没有左子节点，又没有右子节点

        /* 情况2: 只有左子节点 */
        if ( right_child_index === undefined ) {

            if ( this.#heap[ index ] <= this.#heap[ left_child_index ] ) return;         // 基线条件: 当前节点的值小于等于左子节点的值

            this.#swap( index, left_child_index );
            this.#shiftDown( left_child_index );

            return;

        }

        /* 情况3：只有右子节点 */
        if ( left_child_index === undefined ) {

            if ( this.#heap[ index ] <= this.#heap[ right_child_index ] ) return;        // 基线条件: 当前节点的值小于等于右子节点的值

            this.#swap( index, right_child_index );
            this.#shiftDown( right_child_index );

            return;

        }

        /* 情况4: 既有左子节点，又有右子节点 */
        if (
            this.#heap[ index ] <= this.#heap[ left_child_index ]
            &&
            this.#heap[ index ] <= this.#heap[ right_child_index ]
        ) return;                                                                        // 基线条件: 当前节点的值既小于等于左子节点的值，又小于等于右子节点的值

        if ( this.#heap[ index ] <= this.#heap[ right_child_index ] ) {

            this.#swap( index, left_child_index );
            this.#shiftDown( left_child_index );

            return;

        }

        if ( this.#heap[ index ] <= this.#heap[ left_child_index ] ) {

            this.#swap( index, right_child_index );
            this.#shiftDown( right_child_index );

            return;

        }

        const smaller_index = this.#heap[ left_child_index ] <= this.#heap[ right_child_index ]
            ? left_child_index
            : right_child_index;

        this.#swap( index, smaller_index );
        this.#shiftDown( smaller_index );

        return;

    }

    /**
     * （私有方法）获取指定节点的父节点的index。
     * @param { number } index - 指定节点的index。
     * @returns { number | undefined } - 若指定节点没有父节点，则返回undefined，否则返回父节点的index（如果index超出了有效返回，那么也会返回undefined）。
     * @example
     * f( 0 ); // return undefined
     * f( 1 ); // return 0
     */
    #getParentIndex ( index ) {

        if ( index >= this.#heap.length ) return;
        if ( index === 0 ) return;

        return Math.floor( ( index - 1 ) / 2 );

    }

    /**
     * （私有方法）获取指定节点的左子节点的index。
     * @param { number } index - 指定节点的index。
     * @returns { number | undefined } - 若指定节点没有左子节点，则返回undefined，否则返回左子节点的index（如果index超出了有效返回，那么也会返回undefined）。
     * @example
     * f( 0 ); // return 1
     */
    #getLeftChildIndex ( index ) {

        if ( index >= this.#heap.length ) return;

        const left_child_index = index * 2 + 1;

        if ( left_child_index >= this.#heap.length ) return;

        return left_child_index;

    }

    /**
     * （私有方法）获取指定节点的右子节点的index。
     * @param { number } index - 指定节点的index。
     * @returns { number | undefined } - 若指定节点没有右子节点，则返回undefined，否则返回右子节点的index（如果index超出了有效返回，那么也会返回undefined）。
     * @example
     * f( 0 ); // return 2
     */
    #getRightChildIndex ( index ) {

        if ( index >= this.#heap.length ) return;

        const right_child_index = index * 2 + 2;

        if ( right_child_index >= this.#heap.length ) return;

        return right_child_index;

    }

}
