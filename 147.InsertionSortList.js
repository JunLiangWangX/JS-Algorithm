/*
 * @Description: 给定单个链表的头 head ，使用 插入排序 对链表进行排序，并返回 排序后链表的头 。
 * @Author: JunLiangWang
 * @Date: 2023-10-26 10:39:36
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-10-26 10:43:33
 */


/**
 * @description: 迭代法  TC:O(n^2)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} head 给定链表头节点
 * @return {*}
 */
function iteration(head){
    /**
     * 这题咋看比较简单，但在具体写得时候有很多需要注意得地方，
     * 比对交换两节点指针不能指向当前需要交换的两节点，而是指向
     * 其上一个节点通过next来访问，因为移动节点需要改变其上一个
     * 节点的next值
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