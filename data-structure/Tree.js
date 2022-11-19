class BinarySearchTreeNode {

    constructor ( value ) {

        this.value = value;
        this.left = undefined;
        this.right = undefined;

    }

}

class BinarySearchTree {

    constructor () {

        this.root = undefined;

    }

    /**
     * 插入节点。
     * @param { number } value - 节点的值。
     * @returns { Object } - 更新后的BinarySearchTree实例。
     */
    insert ( value ) {

        this.root = core( this.root, value );

        return this;

        function core ( root, value ) {

            /* 基线条件 */
            if ( root === undefined ) return new BinarySearchTreeNode( value );
            if ( root.value === value ) throw new Error( "This value already exists." );

            /* 递归 */
            if ( root.value > value ) root.left = core( root.left, value );
            if ( root.value < value ) root.right = core( root.right, value );

            return root;

        }

    }

    /**
     * 删除节点。
     * @param { number } value - 节点的值。
     * @returns { Object } - 更新后的BinarySearchTree实例。
     */
    remove ( value ) {

        this.root = core( this.root, value );

        return this;

        function core ( root, value ) {

            /* 基线条件 */
            if ( root === undefined ) return;
            if ( root.value === value ) {

                if ( root.left === undefined && root.right === undefined ) return;
                if ( root.left === undefined ) return root.right;
                if ( root.right === undefined ) return root.left;

                const new_root = new BinarySearchTreeNode( findMaxValue( root.left ) );
                const new_left = core( root.left, new_root.value );
                const new_right = root.right;

                new_root.left = new_left;
                new_root.right = new_right;

                return new_root;

            }

            /* 递归 */
            if ( root.value > value ) root.left = core( root.left, value );
            if ( root.value < value ) root.right = core( root.right, value );

            return root;

        }

        function findMaxValue ( root ) {

            if ( root.right === undefined ) return root.value;

            return findMaxValue( root.right );

        }

    }

    /**
     * 搜索节点。
     * @param { number } value - 节点的值。
     * @returns { boolean } - 如果存在值为value的节点，则返回true，否则返回false。
     */
    search ( value ) {

        return core( this.root, value );

        function core ( root, value ) {

            /* 基线条件 */
            if ( root === undefined ) return false;
            if ( root.value === value ) return true;

            /* 递归 */
            if ( root.value > value ) return core( root.left, value );
            if ( root.value < value ) return core( root.right, value );

        }

    }

    /**
     * 中序遍历树，并对每个遍历到的节点执行一次回调函数，回调函数会接收节点的值来作为入参。
     * @param { Function } - 回调函数。
     */
    inorderTraverse ( callback ) {

        core( this.root );

        function core ( root ) {

            if ( root === undefined ) return;

            core( root.left );
            callback( root.value );
            core( root.right );

        }

    }

    /**
     * 先序遍历树，并对每个遍历到的节点执行一次回调函数，回调函数会接收节点的值来作为入参。
     * @param { Function } - 回调函数。
     */
    preorderTraverse ( callback ) {

        core( this.root );

        function core ( root ) {

            if ( root === undefined ) return;

            callback( root.value );
            core( root.left );
            core( root.right );

        }

    }

    /**
     * 后序遍历树，并对每个遍历到的节点执行一次回调函数，回调函数会接收节点的值来作为入参。
     * @param { Function } - 回调函数。
     */
    postorderTraverse ( callback ) {

        core( this.root );

        function core ( root ) {

            if ( root === undefined ) return;

            core( root.left );
            core( root.right );
            callback( root.value );

        }

    }

}

class AdelsonVelskiiLandiTree extends BinarySearchTree {

    constructor () {

        super();

    }

    /**
     * 插入节点，并对树进行平衡处理。
     * @param { number } value - 节点的值。
     * @returns { Object } - 更新后的BinarySearchTree实例。
     */
    insert ( value ) {

        const balance = this._balance;

        this.root = core( this.root, value );

        return this;

        function core ( root, value ) {

            /* 基线条件 */
            if ( root === undefined ) return new BinarySearchTreeNode( value );
            if ( root.value === value ) throw new Error( "This value already exists." );

            /* 递归 */
            if ( root.value > value ) root.left = core( root.left, value );
            if ( root.value < value ) root.right = core( root.right, value );

            /* 平衡化 */
            const balance_root = balance( root );

            /*  */
            return balance_root;

        }

    }

    /**
     * 删除节点，并对树进行平衡处理。
     * @param { number } value - 节点的值。
     * @returns { Object } - 更新后的BinarySearchTree实例。
     */
    remove ( value ) {

        const balance = this._balance;

        this.root = core( this.root, value );

        return this;

        function core ( root, value ) {

            /* 基线条件 */
            if ( root === undefined ) return;
            if ( root.value === value ) {

                if ( root.left === undefined && root.right === undefined ) return;
                if ( root.left === undefined ) return root.right;
                if ( root.right === undefined ) return root.left;

                const new_root = new BinarySearchTreeNode( findMaxValue( root.left ) );
                const new_left = core( root.left, new_root.value );
                const new_right = root.right;

                new_root.left = new_left;
                new_root.right = new_right;

                const balance_root = balance( new_root );

                return balance_root;

            }

            /* 递归 */
            if ( root.value > value ) root.left = core( root.left, value );
            if ( root.value < value ) root.right = core( root.right, value );

            const balance_root = balance( root );

            return balance_root;

        }

        function findMaxValue ( root ) {

            if ( root.right === undefined ) return root.value;

            return findMaxValue( root.right );

        }

    }

    /**
     * （内部方法）对树进行平衡处理。
     * @param { Object } root - 树的根节点。
     * @returns { Object } - 处理后的新树的根节点。
     */
    _balance ( root ) {

        const root_balance_factor = calculateBalanceFactor( root );

        /* 树已平衡，无需处理。 */
        if ( root_balance_factor === 0 ) return root;
        if ( root_balance_factor === 1 ) return root;
        if ( root_balance_factor === - 1 ) return root;

        /* 树非平衡，需要处理。 */
        if ( root_balance_factor === 2 ) {

            const left_balance_factor = calculateBalanceFactor( root.left );

            switch ( left_balance_factor ) {

                case 0: return rotateRight( root );       // 处理左-左形态。

                case 1: return rotateRight( root );       // 处理左-左形态。

                case - 1: return rotateLeftRight( root ); // 处理左-右形态。

            }

        }

        if ( root_balance_factor === - 2 ) {

            const right_balance_factor = calculateBalanceFactor( root.right );

            switch ( right_balance_factor ) {

                case 0: return rotateLeft( root );      // 处理右-右形态。

                case 1: return rotateRightLeft( root ); // 处理右-左形态。

                case - 1: return rotateLeft( root );    // 处理右-右形态。

            }

        }

        /**
         * 计算根节点的高度。
         * @param { Object } root - 树的根节点。
         * @returns { number } - 高度。
         */
        function calculateHeight ( root ) {

            if ( root === undefined ) return - 1;

            return Math.max( calculateHeight( root.left ), calculateHeight( root.right ) ) + 1;

        }

        /**
         * 计算根节点的平衡因子（左子树高度-右子树高度）。
         * @param { Object } root - 树的根节点。
         * @returns { number } - 平衡因子。
         */
        function calculateBalanceFactor ( root ) {

            if ( root === undefined ) return;
            if ( root.left === undefined && root.right === undefined ) return 0;
            if ( root.left === undefined ) return - calculateHeight( root.right ) - 1;
            if ( root.right === undefined ) return calculateHeight( root.left ) + 1;

            return calculateHeight( root.left ) - calculateHeight( root.right );

        }

        /**
         * 向左旋转树，用于处理左-左形态的非平衡树。
         * @param { Object } root - 树的根节点。
         * @returns { Object } - 旋转后的新树的根节点。
         */
        function rotateLeft ( root ) {

            const new_root = root.right;

            root.right = new_root.left;
            new_root.left = root;

            return new_root;

        }

        /**
         * 向右旋转树，用于处理右-右形态的非平衡树。
         * @param { Object } root - 树的根节点。
         * @returns { Object } - 旋转后的新树的根节点。
         */
        function rotateRight ( root ) {

            const new_root = root.left;

            root.left = new_root.right;
            new_root.right = root;

            return new_root;

        }

        /**
         * 先向左旋转树的左子树，再向右旋转树，用于处理左-右形态的非平衡树。
         * @param { Object } root - 树的根节点。
         * @returns { Object } - 旋转后的新树的根节点。
         */
        function rotateLeftRight ( root ) {

            root.left = rotateLeft( root.left );

            return rotateRight( root );

        }

        /**
         * 先向右旋转树的右子树，再向左旋转树，用于处理右-左形态的非平衡树。
         * @param { Object } root - 树的根节点。
         * @returns { Object } - 旋转后的新树的根节点。
         */
        function rotateRightLeft ( root ) {

            root.right = rotateRight( root.right );

            return rotateLeft( root );

        }

    }

}
