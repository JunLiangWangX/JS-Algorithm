/*
 * @Description: 给你一个链表的头节点 head ，旋转链表，将链表每个节点向右移动 k 个位置。
 * @Author: JunLiangWang
 * @Date: 2023-06-06 09:36:12
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-06-06 10:06:13
 */



/**
 * @description: 循环链表   TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} head   给定链表头节点
 * @param {*} k      每个节点向右移动 k 个位置
 * @return {*}
 */
function circularLinkedList(head, k){
    /**
     * 该方案使用循环链表的方式，将链表首尾相连，然后
     * 找到移动后的头节点的上一个节点，将头节点保存，
     * 然后将该节点与头节点断开 ，最后返回头节点即可
     */

    // 如果没有节点或仅有一个节点，直接返回即可
    if(!head||!head.next)return head;
    let node=head,size=1;
    // 找到最后一个节点，并计算链表长度
    while(node.next){
        node=node.next;
        size++;
    }
    // 当k等于size的倍数时，移动过后的链表与
    // 原链表并无差异
    k=k%size;
    if(k===0)return head;
    // 将链表首尾相连，组成循环链表
    node.next=head;
    // 找到移动后的头节点的上一个节点
    node=head
    while(size-k>1){
        node=node.next;
        k++;
    }
    // 将头节点保存
    head=node.next
    // 将循环链表断开
    node.next=null;
    // 返回头节点
    return head;
}
