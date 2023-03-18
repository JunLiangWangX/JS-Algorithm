/*
 * @Description: 
 * @Author: JunLiangWang
 * @Date: 2023-03-18 15:05:33
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-03-18 15:21:48
 */


/**
 * @description: 递归法  TC:O(m+n)  SC:O(n)
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