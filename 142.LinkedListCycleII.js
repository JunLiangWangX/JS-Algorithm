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
     * 
     * 如果有环的情况下，我们如果确定入环节点呢？答案
     * 就是slow与fast指针相遇时，我们再额外使用一个指
     * 针ptr。起始，它指向链表头部；随后，它和slow每
     * 次向后移动一个位置。最终，它们会在入环点相遇。
     * 
     * 你可以通过slow=2fast，然后通过设环外与环内变量
     * 得出该结论
     */
    if(!head)return null
    let slow=head,fast=head
    while(fast&&fast.next)
    {
        slow=slow.next;
        fast=fast.next.next
        if(slow==fast){
            while(slow!==head){
                slow=slow.next
                head=head.next
            }
            return head
        }
    }
    return null
}