/*
 * @Description: 给你一个链表的头节点 head ，判断链表中是否有环。
 * @Author: JunLiangWang
 * @Date: 2023-10-18 09:19:17
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-10-18 09:26:16
 */


/**
 * @description: 哈希表  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} head  给定链表头节点
 * @return {*}
 */
function hashMap(head){
    /**
     * 本方案使用hashMap的方式，遍历链表节点并在
     * hashMap记录该节点，当遍历节点时查询hashMap
     * 中是否存在该节点，如果存在，则证明有环。能
     * 够遍历完成链表，证明无环
     */
    let map=new Map();
    while(head){
        if(map.get(head))return true
        map.set(head,true)
        head=head.next;
    }
    return false;
}


/**
 * @description: 双指针  TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} head 给定链表头节点
 * @return {*}
 */
function doublePoint(head){
    /**
     * 本方案采用双指针的方式，定义两指针slow，fast。
     * slow每次移动一个节点，fast每次移动两个节点，如
     * 果链表存在环，则在某时刻slow与fast指针将重合，
     * 如何不存在环，则能正常遍历完成链表
     */
    if(!head)return false
    let slow=head,fast=head.next
    while(fast&&fast.next){
        if(slow==fast)return true
        slow=slow.next;
        fast=fast.next.next;
    }
    return false
}