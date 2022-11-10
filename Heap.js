// TODO 未完成
// TODO 未完成
// TODO 未完成

class MinHeap {

    #heap = [];

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
     * （私有方法）上移节点：通过向上移动指定的节点来使最小堆保持正确性。
     * @param { number } index - 待上移的节点的index。
     * @exmaple
     * f( this.#heap.length - 1 ); // return undefined
     */
    #shiftUp ( index ) {

        const parent_index = this.#getParentIndex( index );

        /* 基线条件 */
        if ( parent_index === undefined ) return;
        if ( this.#heap[ index ] >= this.#heap[ parent_index ] ) return;

        /*  */
        [ this.#heap[ index ], this.#heap[ parent_index ] ] = [ this.#heap[ parent_index ], this.#heap[ index ] ];

        this.#shiftUp( parent_index );

    }

    /**
     * （私有方法）获取指定节点的父节点的index。
     * @param { number } index - 指定节点的index，index从0起计。
     * @returns { number | undefined } - 若指定节点存在父节点，则返回父节点的index，否则返回undefined。
     * @example
     * f( 0 ); // return undefined
     * f( 1 ); // return 0
     */
    #getParentIndex ( index ) {

        if ( index === 0 ) return;

        return Math.floor( ( index - 1 ) / 2 );

    }

    /**
     * （私有方法）获取指定节点的左子节点的index。
     * @param { number } index - 指定节点的index，index从0起计。
     * @returns { number | undefined } - 若指定节点存在左子节点，则返回左子节点的index，否则返回undefined。
     * @example
     * f( 0 ); // return 1
     */
    #getLeftChildIndex ( index ) {

        const left_child_index = index * 2 + 1;

        if ( left_child_index < this.#heap.length ) return left_child_index;

    }

    /**
     * （私有方法）获取指定节点的右子节点的index。
     * @param { number } index - 指定节点的index，index从0起计。
     * @returns { number | undefined } - 若指定节点存在右子节点，则返回右子节点的index，否则返回undefined。
     * @example
     * f( 0 ); // return 2
     */
    #getRightChildIndex ( index ) {

        const right_child_index = index * 2 + 2;

        if ( right_child_index < this.#heap.length ) return right_child_index;

    }

}
