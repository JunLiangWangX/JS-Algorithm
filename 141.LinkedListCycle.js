/*
 * @Description: 给你一个链表的头节点 head ，判断链表中是否有环。
 * @Author: JunLiangWang
 * @Date: 2023-10-18 09:19:17
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-10-18 09:24:29
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

