/*
 * @Description: 给定一个链表的头节点  head ，返回链表开始入环的第一个节点。 
                 如果链表无环，则返回 null。
 * @Author: JunLiangWang
 * @Date: 2023-10-19 09:27:57
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-10-19 09:33:42
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
     * 中是否存在该节点，如果存在，则证明有环且该节
     * 点即为入环的第一个节点，直接返回该节点即可。
     * 能够遍历完成链表，证明无环，返回null即可
     */
    let map=new Map()
    while(head){
        if(map.get(head))return head
        map.set(head,true)
        head=head.next;
    }
    return null
}
