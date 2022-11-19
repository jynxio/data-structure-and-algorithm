## 概述

本项目用于存储数据结构与算法的实现代码。

<br />

## 目录
#### 数据结构
- [链表](https://github.com/jynxio/data-structure-and-algorithm/blob/main/data-structure/LinkedList.js)
  - 单向链表
  - 双向链表
  - 循环链表
  - 有序链表
- [树](https://github.com/jynxio/data-structure-and-algorithm/blob/main/data-structure/Tree.js)
  - 二叉搜索树
  - AVL树
- [堆](https://github.com/jynxio/data-structure-and-algorithm/blob/main/data-structure/Heap.js)
  - 最小堆
  - 最大堆

#### 算法
- [中位数算法（基于二叉堆）](https://github.com/jynxio/data-structure-and-algorithm/blob/main/algorithm/DynamicMedian.js)：

  该算法可用于计算动态的无序数组的中位数，该算法的冷启动效率较低，热更新效率较高。具体来说就是当你第一次获取一个无序数组的中位数时，该操作的时间复杂度为 `O(nlogn)`，而当你向该无序数组新增一个数字值，并再次获取该无序数组的中位数时，该操作的时间复杂度为 `O(logn)`。

<br />

## 许可

本项目遵循 [MIT](https://github.com/jynxio/leetcode-everyday/blob/main/LICENSE) 协议。

<br />
