/*
 * @Description: 给定一个已排序的链表的头 head ， 删除所有重复的元素，使每个元素只出现一次 。返回 已排序的链表 。
 * @Author: JunLiangWang
 * @Date: 2023-07-07 09:06:30
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-07-07 09:11:48
 */



/**
 * @description: 迭代法   TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} head 给定链表头节点
 * @return {*}
 */
function iterate(head) {
    /**
     * 由于给定的链表是排好序的，因此重复的元素在链表中出现的位置是连续的，
     * 因此我们只需要对链表进行一次遍历，就可以删除重复的元素。
     */

    // 如果链表为空直接返回
    if (!head) return head

    // 记录头节点，方便后续返回
    const HEAD = head

    // 如果当前节点不存在下一个节点，
    // 证明以遍历完成所有节点
    while (head.next) {
        // 如果当前节点的值等于下一个节点的值
        if (head.val == head.next.val)
            // 则删除下一个节点，具体为将当前节点
            // 的下一个节点赋值为下一个节点的下一个节点
            head.next = head.next.next
        // 不等于，则将当前节点后移一位
        else
            head = head.next
    }
    return HEAD;
}