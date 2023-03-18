/*
 * @Description:将两个升序链表合并为一个新的升序链表并返回。
 * @Author: JunLiangWang
 * @Date: 2023-03-18 15:05:33
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-03-18 15:31:11
 */


/**
 * @description: 递归法  TC:O(m+n)  SC:O(m+n)
 * @author: JunLiangWang
 * @param {*} list1  有序链表1
 * @param {*} list2  有序链表2
 * @return {*}
 */
function recursion(list1,list2)
{
    if(!list1)return list2
    if(!list2)return list1
    if(list1.val<list2.val)
    {
        list1.next=recursion(list1.next,list2)
        return list1
    }
    else
    {
        list2.next=recursion(list1,list2.next)
        return list2
    }
}


/**
 * @description: 迭代法   TC:O(m+n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} list1  有序链表1
 * @param {*} list2  有序链表2
 * @return {*}
 */
function iteration(list1,list2)
{
    const head=new ListNode(-1)
    let prev=head
    while(list1&&list2)
    {
        if(list1.val<list2.val)
        {
            prev.next=list1
            list1=list1.next
        }
        else
        {
            prev.next=list2
            list2=list2.next
        }
        prev=prev.next
    }
    prev.next=list1?list1:list2
    return head.next
}