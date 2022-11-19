// ==================================================================================
// 子类可以拥有父类的私有属性/方法，但是却不能使用它们。我认为这是一个糟糕的设计，因为它导致了：
// 1.子类的内部结构中会出现不可用的父类的私有属性/方法，这污染了子类的内部结构。
// 2.子类需要使用额外的内存空间来存储这些不可用的父类的私有属性/方法。
//
// 另外，如果想要理解上面这两点，我就必须向你阐述“子类是如何继承自父类的”：引擎先创建父类实例，
// 然后再把子类的属性和方法添加到父类实例上，最后再返回这个父类实例来作为你所创建的子类实例。
//
// 如果你要编写的类不会涉及到继承，那么我推荐你使用#来标识一个私有方法。如果你要编写的类会涉及
// 到继承，那么我推荐你使用_来标识一个私有方法，虽然这种方法不太安全，但是它可以避免开头所述的
// 2个问题。
// ==================================================================================

class BaseHeap {

    /**
     * 最小堆类和最大堆类的基类，该类仅用于实现最小堆类和最大堆类，你不应该直接使用该类。
     * @param { string } - 比较的模式，仅接受"MinHeap"或"MaxHeap"。
     * @returns { Object } - 基类的实例。
     */
    constructor ( comparative_mode ) {

        if ( comparative_mode !== "MinHeap" && comparative_mode !== "MaxHeap" ) throw new Error( "实例化失败，因为入参不合法。" );

        this._heap = [];
        this._comparativeMode = comparative_mode;

    }

    /**
     * 向堆插入一个值。
     * @param { number } value - 待插入的值。
     * @returns { Object } - 实例本身。
     */
    insert ( value ) {

        this._heap.push( value );
        this._shiftUp( this.getCount() - 1 );

        return this;

    }

    /**
     * 移除堆的第一个节点（即极值节点）。
     * @returns { Object } - 实例本身。
     */
    shift () {

        if ( this.getCount() === 0 ) return this;
        if ( this.getCount() === 1 ) {

            this._heap.length --;

            return this;

        }

        this._swap( 0, this.getCount() - 1 );
        this._heap.length --;
        this._shiftDown( 0 );

        return this;

    }

    /**
     * 获取堆的节点数。
     * @returns { number } - 堆的节点数。
     */
    getCount () {

        return this._heap.length;

    }

    /**
     * 获取堆的极值（即第一个节点的值）。
     * @returns { number } - 对于最小堆而言，是最小值。对于最大堆而言，是最大值。
     */
    getExtremum () {

        if ( this.getCount() === 0 ) throw new Error( "获取失败：因为该堆为空。" );

        return this._heap[ 0 ];

    }

    /**
     * 获取完全二叉树格式的堆。
     */
    getTree () {

        const core = index => {

            /* 基线条件 */
            if ( index === - 1 ) return;

            const node = {};

            node.value = this._heap[ index ];
            node.leftChild = core( this._getLeftChildIndex( index ) );
            node.rightChild = core( this._getRightChildIndex( index ) );

            return node;

        };

        return core( 0 );

    }

    /**
     * （内部方法）获取父节点的index。
     * @param { number } index - 当前节点的index。
     * @returns { number } - 父节点的index（如果当前节点没有父节点，那么就会返回-1）。
     */
    _getParentIndex ( index ) {

        if ( index >= this.getCount() ) throw new Error( "获取失败：因为入参不合法。" );

        return Math.floor( ( index - 1 ) / 2 );

    }

    /**
     * （内部方法）获取左子节点的index。
     * @param { number } index - 当前节点的index。
     * @returns { number } - 左子节点的index（如果当前节点没有左子节点，那么就会返回-1）。
     */
    _getLeftChildIndex ( index ) {

        if ( index >= this.getCount() ) throw new Error( "获取失败：因为入参不合法。" );

        const left_child_index = index * 2 + 1;

        if ( left_child_index >= this.getCount() ) return - 1;

        return left_child_index;

    }

    /**
     * （内部方法）获取右子节点的index。
     * @param { number } index - 当前节点的index。
     * @returns { number } - 右子节点的index（如果当前节点没有右子节点，那么就会返回-1）。
     */
    _getRightChildIndex ( index ) {

        if ( index >= this.getCount() ) throw new Error( "获取失败：因为入参不合法。" );

        const right_child_index = index * 2 + 2;

        if ( right_child_index >= this.getCount() ) return - 1;

        return right_child_index;

    }

    /**
     * （内部方法）比较第一个值是否不大于第二个值，或第二个值是否不大于第一个值。
     * @param { number } value_1 - 第一个值。
     * @param { number } value_2 - 第二个值。
     * @returns { boolean } - 如果是最小堆的实例调用该方法，那么就会返回value_1 <= value_2的结果。如果是最大堆的实例调用该方法，那么就会返回value_1 >= value_2的结果。
     */
    _compare ( value_1, value_2 ) {

        if ( this._comparativeMode === "MinHeap" ) return value_1 < value_2;
        if ( this._comparativeMode === "MaxHeap" ) return value_1 > value_2;

        throw new Error( "比较失败：因为发生了意外的情况。" );

    }

    /**
     * （内部方法）交换两个节点的值。
     * @param { number } index_1 - 第一个节点的index。
     * @param { number } index_2 - 第二个节点的index。
     */
    _swap ( index_1, index_2 ) {

        if ( index_1 >= this.getCount() ) throw new Error( "交换失败：因为入参不合法。" );
        if ( index_2 >= this.getCount() ) throw new Error( "交换失败：因为入参不合法。" );

        [ this._heap[ index_1 ], this._heap[ index_2 ] ] = [ this._heap[ index_2 ], this._heap[ index_1 ] ];

    }

    /**
     * （内部方法）上移节点，通过向上移动节点来使堆保持正确。
     * @param { number } index - 待上移的节点的index。
     */
    _shiftUp ( index ) {

        const parent_index = this._getParentIndex( index );

        /* 基线条件 */
        if ( parent_index === - 1 ) return;
        if ( ! this._compare( this._heap[ index ], this._heap[ parent_index ] ) ) return;

        this._swap( index, parent_index );
        this._shiftUp( parent_index );

    }

    /**
     * （内部方法）下移节点，通过向下移动节点来使堆保持正确。
     * @param { number } index - 待下移的节点的index。
     */
    _shiftDown( index ) {

        let largest_node_index = index;

        const left_child_index = this._getLeftChildIndex( index );
        const right_child_index = this._getRightChildIndex( index );

        left_child_index !== - 1
        &&
        this._compare( this._heap[ left_child_index ], this._heap[ largest_node_index ] )
        &&
        ( largest_node_index = left_child_index );

        right_child_index !== - 1
        &&
        this._compare( this._heap[ right_child_index ], this._heap[ largest_node_index ] )
        &&
        ( largest_node_index = right_child_index );

        /* 基线条件 */
        if ( largest_node_index === index ) return;

        this._swap( index, largest_node_index );
        this._shiftDown( largest_node_index );

    }

}

export class MinHeap extends BaseHeap {

    /**
     * 最小堆类。
     * @returns { Object } - 最小堆类的实例。
     */
    constructor () {

        super( "MinHeap" );

    }

    /**
     * 获取堆的最小值。
     * @returns { number } - 堆的最小值。
     */
    getMinimum () {

        return this.getExtremum();

    }

}

export class MaxHeap extends BaseHeap {

    /**
     * 最大堆类。
     * @returns { Object } - 最大堆的实例。
     */
    constructor () {

        super( "MaxHeap" );

    }

    /**
     * 获取堆的最大值。
     * @returns { number } - 堆的最大值。
     */
    getMaximum () {

        return this.getExtremum();

    }

}
