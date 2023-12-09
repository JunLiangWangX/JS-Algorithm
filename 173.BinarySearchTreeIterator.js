/*
 * @Description: 实现一个二叉搜索树迭代器类BSTIterator ，表示一个
                 按中序遍历二叉搜索树（BST）的迭代器
 * @Author: JunLiangWang
 * @Date: 2023-12-09 09:20:34
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-12-09 09:28:19
 */


/**
 * 本方案使用深度优先的方式，首先使用递归实现
 * 深度优先中序遍历，然后使用数组记录遍历的树
 * 的节点，最后定义一个索引，表示next()函数已
 * 经调用到的数组索引位置，当索引超出数组大小
 * 即hasNext()函数为false
 */

var BSTIterator = function (root) {
    // 记录中序遍历的节点
    this.searchList = []
    // 记录next()函数已经调用到的数组的索引
    this.index = 0;
    let that = this
    /**
     * 递归回溯实现深度优先中序遍历
     */
    function dfs(root) {
        if (!root) return
        dfs(root.left)
        // 记录遍历的节点
        that.searchList.push(root.val)
        dfs(root.right)
    }
    // 执行深度优先中心遍历
    dfs(root)
};

BSTIterator.prototype.next = function () {
    // 当索引未超过数组大小
    if (this.index < this.searchList.length) {
        // 索引+1
        this.index++;
        // 返回元素
        return this.searchList[this.index - 1];
    }
    return null
};

BSTIterator.prototype.hasNext = function () {
    // 当索引未超过数组大小，证明还有下一个元素，返回true
    if (this.index < this.searchList.length) return true
    // 否则，返回false
    else return false
};