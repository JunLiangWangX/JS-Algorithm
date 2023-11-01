/*
 * @Description: 重排链表
 * @Author: JunLiangWang
 * @Date: 2023-10-20 10:04:29
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-10-20 10:17:26
 */


/**
 * @description: 递归回溯  TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} head 给定链表头节点
 * @return {*}
 */
function recursionBacktracking(head) {
    /**
     * 本方案采用递归回溯的方式，先使用递归
     * 遍历链表，直至最后一个节点，然后利用
     * 回溯来改变链表顺序
     */

    // 临时头节点
    let tempNode = head,
    // 是否完成顺序变更
        isSuccess = false

    /**
     * @description: 递归回溯
     * @author: JunLiangWang
     * @param {*} node 当前节点
     * @return {*}
     */        
    function recursion(node) {
        // 如果节点为空，直接return
        if (!node) return
        // 继续递归
        recursion(node.next)
        // 直到到达链表最后一个节点，开始回溯

        // 如果链表已经完成了顺序变更，直接return
        if (isSuccess) return
        // 当临时头节点等于当前节点 或者 其下一个节点
        // 等于当前节点，证明链表顺序重新排列完成
        if (tempNode == node || tempNode.next == node) {
            node.next = null
            isSuccess = true
            return
        }
        // 变更节点顺序

        node.next = tempNode.next;
        tempNode.next = node;
        tempNode = node.next;
    }
    // 执行递归回溯
    recursion(head)
    // 返回结果
    return head
}
