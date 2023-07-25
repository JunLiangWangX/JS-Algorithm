/*
 * @Description: 给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。
                 请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。
 * @Author: JunLiangWang
 * @Date: 2023-07-25 09:21:51
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-07-25 09:36:45
 */



/**
 * @description: 头插法   TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} head 给定链表头节点
 * @param {*} left 给定翻转开始节点的位置(从1开始)
 * @param {*} right 给定翻转结束节点的位置(从1开始)
 * @return {*}
 */
function headInsertion(head, left, right) {
    /**
     * 该方案使用头插法，由于头节点也可能被翻转，因此我们一
     * 开始需要向头节点前插入一个虚拟节点。然后遍历链表达到
     * 开始翻转的节点的上一个节点，然后新建一个链表，不断使
     * 用头插，将原链表中需要翻转的节点不断头插到新链表，然后
     * 从原链表中删除该节点，直到到达翻转结束节点。此时新链表
     * 则为翻转后的链表，将新链表插入回原链表即可完成翻转操作
     */

    // 如果翻转开始/结束位置一样，证明无需翻转，直接返回原链表
    if (left == right) return head
    // 由于头节点也可能被翻转，因此我们一开始需要向头节点前插
    // 入一个虚拟节点
    const HEAD = new ListNode(0, head)
    let preNode = HEAD, 
    // 需要翻转的节点数量，加1是因为假设：right=2,left=1
    // 需要翻转的节点数量为2，而right-left=1，此时需要加1
    count = right - left +1;
    // 遍历原链表节点，找到开始翻转的节点的上一个节点
    while (--left > 0)preNode = preNode.next
    // 新链表，记录翻转后的节点
    let reverseNode = new ListNode(0),
    // 此时首个需要翻转的节点，在翻转后是最后一个节点，需要
    // 将其保存起来，或许更改它的next，使其接入原链表
     lastNode = preNode.next;

    // 遍历需要翻转的节点， 不断使用头插，将原链表中需要翻转
    // 的节点不断头插到新链表，然后从原链表中删除该节点，直
    // 到到达翻转结束节点。
    while (count--) {
        let currentNode = preNode.next;
        preNode.next = preNode.next.next
        currentNode.next = reverseNode.next;
        reverseNode.next = currentNode
    }
    // 翻转完成所有节点，需要将新链表插入回原链表

    // 将新链表中最后一个节点的next指向，原链表当前节点的next
    lastNode.next = preNode.next
    // 将原链表当前节点的next指向新链表
    preNode.next = reverseNode.next
    // 返回结果
    return HEAD.next
}
