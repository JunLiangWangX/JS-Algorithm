/*
 * @Description: K个一组翻转链表
 * @Author: JunLiangWang
 * @Date: 2023-03-31 14:09:36
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-03-31 16:15:39
 */


/**
 * @description: 栈方法     TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} head  输入链表头部元素
 * @param {*} k     翻转K个元素
 * @return {*}
 */
function stack(head, k) {
    /**
     * 该方案利用栈先进后出的特点，每次遍历链表的k个元素入栈，然后将元素依次出栈添加到新的
     * 链表中，直到遍历完成链表所有元素或剩余元素不足k个。剩余元素不足k个则直接将剩余元素
     * 加入新链表中直接返回新链表
     */
    // 如果k小于等于1，证明无需翻转，直接返回原链表即可
    if (k <= 1) return head;
    // 定义新链表
    const HEAD = new ListNode();
    let node = HEAD;
    // 遍历原链表
    while (head) {
        // 利用数组模拟栈
        let stackArray = [];
        let cuNode = head
        // 遍历K次，将前K个元素压入栈中
        for (i = 0; i < k; i++) {
            // 如果当前元素为null，证明剩余元素不足k个
            // 将原链表剩余元素加入到新链表即可
            if (!cuNode) {
                node.next = head;
                return HEAD.next;
            }
            stackArray.push(cuNode);
            cuNode = cuNode.next;
        }
        // 退出栈中元素，将元素加入到新链表
        for (let i = k - 1; i >= 0; i--) {
            node.next = stackArray[i];
            node = node.next;
        }
    }
    // 当链表元素刚好为k个元素，第一个元素变为最后一个
    // 元素后其next指向的是第二个元素，将其重置为null
    node.next = null;
    return HEAD.next;
}


/**
 * @description: 尾插法   TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} head
 * @param {*} k
 * @return {*}
 */
function tailPlugging(head, k) {
    /**
     * 该方案利用尾插法，设翻转0到k个元素，则需要将第0个元素的next赋值为第k+1个元素，
     * 后续第n个元素则将其next取出保存，然后将next赋值第n-1个元素，以此类推即可实现翻转
     */

    // 如果k小于等于1，证明无需翻转，直接返回即可
    if (k <= 1) return head; 

    /**
     * @description: 尾插法
     * @author: JunLiangWang
     * @param {*} firstNode 需要翻转的首元素
     * @param {*} lastNodeNextNode 需要翻转的最后一个元素的下一个元素
     * @return {*}
     */    
    function reverseKNode(firstNode, lastNodeNextNode) {
        // 初始化前一个元素为最后一个元素的下一个元素
        // 因为翻转后第一个元素为最后一个元素，其next为
        // 当前最后一个元素的下一个元素
        let preNode = lastNodeNextNode; 
        // 如果当前节点为需要翻转的最后一个元素的下一个元素，证明
        // 需要翻转的节点已全部翻转，此时跳出循环
        while (firstNode != lastNodeNextNode) {
            // 取出保存当前节点的下一个元素
            let nextNode = firstNode.next;
            // 将当前节点的下一个元素更新为上一个元素
            firstNode.next = preNode;
            // 将上一个元素更新为当前节点
            preNode = firstNode;
            // 将当前节点更新为下一个元素
            firstNode = nextNode;
        }
       // 返回翻转后第一个元素
       return preNode
    }
    // 定义一个新链表
    const HEAD=new ListNode();
    let node=HEAD
    // 以k个为一组遍历原链表
    while(head)
    {
        // 初始化第k+1个元素
        let lastNode=head;
        // 遍历寻找第k+1个元素
        for(let i=0;i<k;i++)
        {
            // 如果当前元素为null，证明剩余元素不足k个
            // 直接返回即可
            if(!lastNode)return HEAD.next;
            lastNode=lastNode.next;
        } 
        // 利用尾插法翻转k个元素，并将翻转后的第一个元素
        // 赋值给新链表当前元素的下一个元素
        node.next=reverseKNode(head,lastNode);
        // 新链表当前元素更新为该组翻转后的最后一个元素
        node=head;
        // 原链表的当前元素更新为该组翻转后最后一个元素的下一个元素
        head=head.next;
    }
    return HEAD.next;
}