class SinglyNode {

    constructor ( data ) {

        this.data = data;
        this.next = undefined;

    }

}

class DoublyNode extends SinglyNode {

    constructor ( data ) {

        super( data );

        this.prev = undefined;

    }

}

class SinglyLinkedList {

    /**
     * @returns { Object } - SinglyLinkedList实例。
     */
    constructor() {

        this.size = 0;
        this.head = undefined;

    }

    /**
     * 获取序号为index的节点。
     * @param { number } index - 节点的序号，从零起算。
     * @returns { Object } - {success, data}格式的对象，仅当success为true时，才代表执行成功，此时data为节点对象，即SinglyNode实例。
     */
    getNodeByIndex ( index ) {

        if ( this.size === 0 ) return { success: false };                 // 链表无节点可查
        if ( index < 0 || index >= this.size ) return { success: false }; // index不合理

        let node = this.head;

        for ( let i = 0; i < index; i ++ ) node = node.next;

        return { success: true, data: node };

    }

    /**
     * 获取第一个值为data的节点。
     * @param { * } data - 节点的data属性的值。
     * @returns { Object } - {success, data}格式的对象，仅当success为true时，才代表执行成功，此时data为节点对象，即SinglyNode实例。
     */
    getNodeByData( data ) {

        if ( this.size === 0 ) return { success: false }; // 链表无节点可查

        let node = this.head;

        do {

            if ( node.data === data ) return { success: true, data: node };

        } while ( node = node.next );

        return { success: false };

    }

    /**
     * 获取第一个值为data的节点的序号。
     * @param { * } data - 节点的data属性的值。
     * @returns { Object } - {success, data}格式的对象，仅当success为true时，才代表执行成功，此时data为节点对象，即SinglyNode实例。
     */
    getIndexByData ( data ) {

        if ( this.size === 0 ) return { success: false }; // 链表无节点可查

        let index = 0;
        let node = this.head;

        do {

            if ( node.data === data ) return { success: true, data: index };

            index ++;

        } while ( node = node.next );

        return { success: false };

    }

    /**
     * 移除index号节点，然后返回这个被移除的节点。
     * @param { number } index - 节点的序号，从零起算。
     * @returns { Object } - {success, data}格式的对象，仅当success为true时，才代表执行成功，此时data为被移除的节点，即SinglyNode实例。
     */
    remove ( index ) {

        const { success: has_target_node, data: target_node } = this.getNodeByIndex( index );

        if ( ! has_target_node ) return { success: false };          // 目标位置无节点可删

        const { success: has_previous_node, data: previous_node } = this.getNodeByIndex( index - 1 );
        const { success: has_next_node, data: next_node } = this.getNodeByIndex( index + 1 );

        if ( has_target_node && has_previous_node && has_next_node ) // 有前有后
            previous_node.next = next_node;
        else if ( has_target_node && has_previous_node )             // 有前无后
            previous_node.next = undefined;
        else if ( has_target_node && has_next_node )                 // 无前有后
            this.head = next_node;
        else                                                         // 无前无后
            this.head = undefined;

        this.size --;

        return { success: true, data: target_node };

    }

    /**
     * 在index位置插入一个值为data的新节点，然后返回更新后的链表。
     * @param { number } index - 节点的序号，从零起算。
     * @param { * } data - 新节点的data属性的值。
     * @returns { Object } - {success, data}格式的对象，仅当success为true时，才代表执行成功，此时data为调用该方法的SinglyLinkedList实例。
     */
    insert ( index, data ) {

        if ( index < 0 || index > this.size ) return { success: false }; // index不合理

        const node = new SinglyNode( data );
        const { success: has_current_node, data: current_node } = this.getNodeByIndex( index );
        const { success: has_previous_node, data: previous_node } = this.getNodeByIndex( index - 1 );

        if ( has_current_node && has_previous_node ) {                   // 有前有后

            previous_node.next = node;
            node.next = current_node;

        } else if ( has_current_node && ! has_previous_node ) {          // 无前有后

            this.head = node;
            this.head.next = current_node;

        } else if ( ! has_current_node && has_previous_node ) {          // 有前无后

            previous_node.next = node;

        } else {                                                         // 无前无后

            this.head = node;

        }

        this.size ++;

        return { success: true, data: this };

    }

    /**
     * 在链表的末尾插入一个值为data的新节点，然后返回更新后的链表。
     * @param { * } data - 新节点的data属性的值。
     * @returns { Object } - {success, data}格式的对象，仅当success为true时，才代表执行成功，此时data为调用该方法的SinglyLinkedList实例。
     */
    push ( data ) {

        const response = this.insert( this.size, data );

        if ( ! response.success ) return { success: false };

        return { success: true, data: this };

    }

    /**
     * 移除链表末尾的节点，然后返回这个被移除的节点。
     * @returns { Object } - {success, data}格式的对象，仅当success为true时，才代表执行成功，此时data为被移除的节点，即SinglyNode实例。
     */
    pop () {

        const response = this.remove( this.size - 1 );

        if ( ! response.success ) return { success: false };

        return { success: true, data: response.data };

    }

    /**
     * 在链表的头部插入一个值为data的新节点，然后返回更新后的链表。
     * @param { * } data - 新节点的data属性的值。
     * @returns { Object }  - {success, data}格式的对象，仅当success为true时，才代表执行成功，此时data为调用该方法的SinglyLinkedList实例。
     */
    unshift ( data ) {

        const response = this.insert( 0, data );

        if ( ! response.success ) return { success: false };

        return { success: true, data: this };

    }

    /**
     * 移除链表头部的节点，然后返回这个被移除的节点。
     * @returns { Object } - {success, data}格式的对象，仅当success为true时，才代表执行成功，此时data为被移除的节点，即SinglyNode实例。
     */
    shift () {

        const response = this.remove( 0 );

        if ( ! response.success ) return { success: false };

        return { success: true, data: response.data };

    }

    /**
     * 沿着从头到尾的方向来将节点的值存入一个数组，然后返回这个数组。
     * @returns { Object } - {success, data}格式的对象，仅当success为true时，才代表执行成功，此时data为有序的存储了所有节点的值的数组。
     */
    toArray () {

		let node = this.head;
		const result = { success: true, data: [] };

        while ( node ) {

            result.data.push( node.data );
            node = node.next;

        }

		return result;

    }

    /**
     * 清空链表，然后返回更新后的链表。
     * @returns { Object }  - {success, data}格式的对象，仅当success为true时，才代表执行成功，此时data为调用该方法的SinglyLinkedList实例。
     */
    clear () {

        this.size = 0;
        this.head = undefined;

        return { success: true, data: this };

    }

}

class DoublyLinkedList extends SinglyLinkedList {

    /**
     * @returns { Object } - SinglyLinkedList实例。
     */
    constructor () {

        super();

        this.tail = undefined;

    }

    /**
     * 获取序号为index的节点。
     * @param { number } index - 节点的序号，从零起算。
     * @returns { Object } - {success, data}格式的对象，仅当success为true时，才代表执行成功，此时data为节点对象，即SinglyNode实例。
     */
    getNodeByIndex ( index ) {

        if ( this.size === 0 ) return { success: false };                 // 链表无节点可查
        if ( index < 0 || index >= this.size ) return { success: false }; // index不合理

        let node, count, pointer;

        if ( index < this.size / 2 ) {

            node = this.head;
            count = index;
            pointer = "next";

        } else {

            node = this.tail;
            count = this.size - 1 - index;
            pointer = "prev";

        }

        while ( count -- ) node = node[ pointer ];

        return { success: true, data: node };

    }

    /**
     * 移除index号节点，然后返回这个被移除的节点。
     * @param { number } index - 节点的序号，从零起算。
     * @returns { Object } - {success, data}格式的对象，仅当success为true时，才代表执行成功，此时data为被移除的节点，即SinglyNode实例。
     */
    remove ( index ) {

        const { success: has_target_node, data: target_node } = this.getNodeByIndex( index );

        if ( ! has_target_node ) return { success: false };            // 目标位置无节点可删

        const { success: has_previous_node, data: previous_node } = this.getNodeByIndex( index - 1 );
        const { success: has_next_node, data: next_node } = this.getNodeByIndex( index + 1 );

        if ( has_target_node && has_previous_node && has_next_node ) { // 有前有后

            previous_node.next = next_node;
            next_node.prev = previous_node;

        } else if ( has_target_node && has_previous_node ) {           // 有前无后

            this.tail = previous_node;
            this.tail.next = undefined;

        } else if ( has_target_node && has_next_node ) {               // 无前有后

            this.head = next_node;
            this.head.prev = undefined;

        } else {                                                       // 无前无后

            this.head = this.tail = undefined;

        }

        this.size --;

        return { success: true, data: target_node };

    }

    /**
     * 在index位置插入一个值为data的新节点，然后返回更新后的链表。
     * @param { number } index - 节点的序号，从零起算。
     * @param { * } data - 新节点的data属性的值。
     * @returns { Object } - {success, data}格式的对象，仅当success为true时，才代表执行成功，此时data为调用该方法的SinglyLinkedList实例。
     */
    insert ( index, data ) {

        if ( index < 0 || index > this.size ) return { success: false }; // index不合理

        const node = new DoublyNode( data );
        const { success: has_current_node, data: current_node } = this.getNodeByIndex( index );
        const { success: has_previous_node, data: previous_node } = this.getNodeByIndex( index - 1 );

        if ( has_current_node && has_previous_node ) {                   // 有前有后

            previous_node.next = node;
            node.prev = previous_node;

            node.next = current_node;
            current_node.prev = node;

        } else if ( has_current_node && ! has_previous_node ) {          // 无前有后

            node.next = current_node;
            current_node.prev = node;

            this.head = node;

        } else if ( ! has_current_node && has_previous_node ) {          // 有前无后

            previous_node.next = node;
            node.prev = previous_node;

            this.tail = node;

        } else {                                                          // 无前无后

            this.head = node;
            this.tail = node;

        }

        this.size ++;

        return { success: true, data: this };

    }

    /**
     * 清空链表，然后返回更新后的链表。
     * @returns { Object }  - {success, data}格式的对象，仅当success为true时，才代表执行成功，此时data为调用该方法的SinglyLinkedList实例。
     */
    clear () {

        this.size = 0;
        this.head = undefined;
        this.tail = undefined;

        return { success: true, data: this };

    }

}

class CircularLinkedList extends DoublyLinkedList {

    /**
     * @returns { Object } - SinglyLinkedList实例。
     */
    constructor () {

        super();

    }

    /**
     * 移除index号节点，然后返回这个被移除的节点。
     * @param { number } index - 节点的序号，从零起算。
     * @returns { Object } - {success, data}格式的对象，仅当success为true时，才代表执行成功，此时data为被移除的节点，即SinglyNode实例。
     */
    remove ( index ) {

        const { success: has_target_node, data: target_node } = this.getNodeByIndex( index );

        if ( ! has_target_node ) return { success: false };            // 目标位置无节点可删

        const { success: has_previous_node, data: previous_node } = this.getNodeByIndex( index - 1 );
        const { success: has_next_node, data: next_node } = this.getNodeByIndex( index + 1 );

        if ( has_target_node && has_previous_node && has_next_node ) { // 有前有后

            previous_node.next = next_node;
            next_node.prev = previous_node;

        } else if ( has_target_node && has_previous_node ) {           // 有前无后

            this.tail = previous_node;
            this.tail.next = this.head;
            this.head.prev = this.tail;

        } else if ( has_target_node && has_next_node ) {               // 无前有后

            this.head = next_node;
            this.head.prev = this.tail;
            this.tail.next = this.head;

        } else {                                                       // 无前无后

            this.head = this.tail = undefined;

        }

        this.size --;

        return { success: true, data: target_node };

    }

    /**
     * 在index位置插入一个值为data的新节点，然后返回更新后的链表。
     * @param { number } index - 节点的序号，从零起算。
     * @param { * } data - 新节点的data属性的值。
     * @returns { Object } - {success, data}格式的对象，仅当success为true时，才代表执行成功，此时data为调用该方法的SinglyLinkedList实例。
     */
    insert ( index, data ) {

        if ( index < 0 || index > this.size ) return { success: false }; // index不合理

        const node = new DoublyNode( data );
        const { success: has_current_node, data: current_node } = this.getNodeByIndex( index );
        const { success: has_previous_node, data: previous_node } = this.getNodeByIndex( index - 1 );

        if ( has_current_node && has_previous_node ) {                   // 有前有后

            previous_node.next = node;
            node.prev = previous_node;

            node.next = current_node;
            current_node.prev = node;

        } else if ( has_current_node && ! has_previous_node ) {          // 无前有后

            node.next = current_node;
            current_node.prev = node;

            this.head = node;
            this.head.prev = this.tail;
            this.tail.next = this.head;

        } else if ( ! has_current_node && has_previous_node ) {          // 有前无后

            previous_node.next = node;
            node.prev = previous_node;

            this.tail = node;
            this.tail.next = this.head;
            this.head.prev = this.tail;

        } else {                                                          // 无前无后

            this.head = node;
            this.tail = node;
            this.head.prev = this.tail;
            this.tail.next = this.head;

        }

        this.size ++;

        return { success: true, data: this };

    }

}

class SortedLinkedList extends DoublyLinkedList {

    constructor () {

        super();

    }

    /**
     * 在index位置插入一个值为data的新节点，然后返回更新后的链表。
     * @param { number } number - 新节点的data属性的值。
     * @returns { Object } - {success, data}格式的对象，仅当success为true时，才代表执行成功，此时data为调用该方法的SinglyLinkedList实例。
     */
    insert ( number ) {

        if ( typeof( number ) !== "number" ) return { success: false }; // data不合理

        const insert_node = new DoublyNode( number );

        if ( this.size === 0 ) {

            this.head = this.tail = insert_node;
            this.size ++;

            return { success: true, data: this };

        }

        if ( number <= this.head.data ) {

            const first_node = insert_node;
            const second_node = this.head;

            first_node.next = second_node;
            second_node.prev = first_node;

            this.head = first_node;
            this.size ++;

            return { success: true, data: this };

        }

        if ( number > this.tail.data ) {

            const first_to_last_node = insert_node;
            const second_to_last_node = this.tail;

            second_to_last_node.next = first_to_last_node;
            first_to_last_node.prev = second_to_last_node;

            this.tail = first_to_last_node;
            this.size ++;

            return { success: true, data: this };

        }

        let current_node = this.head.next;

        while ( current_node ) {

            if ( number > current_node.data ) {

                current_node = current_node.next;

                continue;

            }

            const previous_node = current_node.prev;

            previous_node.next = insert_node;
            insert_node.prev = previous_node;

            insert_node.next = current_node;
            current_node.prev = insert_node;

            this.size ++;

            return { success: true, data: this };

        }

        return { success: false };

    }

}

SortedLinkedList.prototype.push = undefined;
SortedLinkedList.prototype.unshift = undefined;
