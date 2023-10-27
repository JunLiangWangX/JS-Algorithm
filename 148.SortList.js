/*
 * @Description: 给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。
 * @Author: JunLiangWang
 * @Date: 2023-10-27 14:29:49
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-10-27 14:31:48
 */



/**
 * @description: 插入排序  TC:O(n^2)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} head 给定链表头节点
 * @return {*}
 */
function insertSort(head){

    /**
     * 本方案采用插入排序的方式，与上一题一致，较为简单，但是在
     * 具体写得时候有很多需要注意得地方，比对交换两节点指针不能
     * 指向当前需要交换的两节点，而是指向其上一个节点通过next来
     * 访问，因为移动节点需要改变其上一个节点的next值
     */
    if(!head)return head
     const HEAD=new ListNode(0,head)
     let selectNode=HEAD;

     while(selectNode.next){
         let compareNode=HEAD,isChange=false;
         // 遍历比对节点
         while(compareNode.next&&compareNode.next!=selectNode.next){
            // 如果大于则需要移动节点
             if(compareNode.next.val>selectNode.next.val){
                 let nextNode=selectNode.next.next
                 selectNode.next.next=compareNode.next
                 compareNode.next=selectNode.next
                  selectNode.next=nextNode
                  isChange=true;
                  break;
             }
             compareNode=compareNode.next
         }
         if(!isChange)selectNode=selectNode.next
     }
     return HEAD.next
}