/*
 * @Description: 编写一个算法来判断一个数 n 是不是快乐数。
 * @Author: JunLiangWang
 * @Date: 2023-11-23 09:25:46
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-11-23 09:38:01
 */



/**
 * @description: 快慢指针  TC:O(logn)   SC:O(1)
 * @author: JunLiangWang
 * @param {*} n 给定整数
 * @return {*}
 */
function fastSlowPoint(n){
    /**
     * 本题使用快慢指针的方式，如果n不是一个快乐数，
     * 意味着无限循环也始终变不到 1。那么其整个过程
     * 不就形成了一个环形链表吗？那么该题则可以使用
     * 快慢指针判断是否环形链表。定义两指针slow，fast。
     * slow每次移动一个节点，fast每次移动两个节点，如
     * 果链表存在环，则在某时刻slow与fast指针将重合，
     * 如何不存在环，则能正常遍历完成链表
     */

    /**
     * @description: 获得下一个数，也就是下一个指针
     * @author: JunLiangWang
     * @param {*} n 给定整数
     * @return {*}
     */    
    function getNextNumber(n){
        // 按照题中快乐数的规则，
        // 计算下一个数
        let sum=0;
        while(n>0){
            sum+=(Math.pow(n%10,2))
            n=Math.trunc(n/10)
        }
        return sum
    }
    // 利用快慢指针判断是否循环列表
    let slow=n,fast=getNextNumber(n);
    while(fast!=1&&slow!=fast){
        slow=getNextNumber(slow)
        fast=getNextNumber(getNextNumber(fast))
    }
    // 返回结果
    return fast==1
}