/*
 * @Description: K个一组翻转链表
 * @Author: JunLiangWang
 * @Date: 2023-03-31 14:09:36
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-03-31 14:55:41
 */


/**
 * @description: 栈方法     TC:O(2n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} head  输入链表头部元素
 * @param {*} k     翻转K个元素
 * @return {*}
 */
function stack(head,k)
{
    /**
     * 该方案利用栈先进后出的特点，每次遍历链表的k个元素入栈，然后将元素依次出栈添加到新的
     * 链表中，直到遍历完成链表所有元素或剩余元素不足k个。剩余元素不足k个则直接将剩余元素
     * 加入新链表中直接返回新链表
     */
    // 如果k小于等于1，证明无需翻转，直接返回原链表即可
    if(k<=1)return head;
    // 定义新链表
    const HEAD=new ListNode();
    let node=HEAD;
    // 遍历原链表
    while(head)
    {
        // 利用数组模拟栈
        let stackArray=[];
        let cuNode=head
        // 遍历K次，将前K个元素压入栈中
        for(i=0;i<k;i++)
        {
            // 如果当前元素为null，证明剩余元素不足k个
            // 将原链表剩余元素加入到新链表即可
            if(!cuNode)
            {
                node.next=head;
                return HEAD.next;
            }
            stackArray.push(cuNode);
            cuNode=cuNode.next;
        }
        // 退出栈中元素，将元素加入到新链表
        for(let i=k-1;i>=0;i--)
        {
            node.next=stackArray[i];
            node=node.next;
        }
    }
    // 当链表元素刚好为k个元素，第一个元素变为最后一个
    // 元素后其next指向的是第二个元素，将其重置为null
    node.next=null;
    return HEAD.next;
}
