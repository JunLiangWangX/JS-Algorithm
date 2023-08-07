/*
 * @Description: 给定一个已排序的链表的头 head ， 删除原始链表中所有重复数字的节点，
                 只留下不同的数字 。返回 已排序的链表 。
 * @Author: JunLiangWang
 * @Date: 2023-07-06 10:14:56
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-07-06 11:42:04
 */


/**
 * @description: 迭代法   TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} head 给定链表头节点
 * @return {*}
 */
function iterate(head) {
    /**
     * 由于给定的链表是排好序的，因此重复的元
     * 素在链表中出现的位置是连续的，因此我们
     * 只需要对链表进行一次遍历，就可以删除重
     * 复的元素。由于链表的头节点可能会被删除，
     * 因此我们需要额外使用一个哑节点(HEAD)指
     * 向链表的头节点。
     */

    // 添加哑节点
    const HEAD = new ListNode(null, head);
    // 定义上一个节点(已经确定不重复的节点)
    let lastNode = HEAD;
    // head为当前节点，当当前节点不存在
    // 证明链表无节点，此时结束遍历，或
    // 其下一个节点不存在证明已遍历完成
    // 所有节点，且当前节点是不重复的，
    // 此时结束遍历
    while (head && head.next) {
        // 当前节点与下一个节点不重复
        if (head.val != head.next.val) {

            // 当前节点已经确认不重复，将
            // 上一个节点(已经确定不重复
            // 的节点)向后移动一位
            
            // 注意head始终是等于last.next的
            // 因此当head不重复时，我们操作
            // lastNode即可
            lastNode = lastNode.next;
        }
        // 当前节点与下一个节点重复
        else {
            // 遍历找到与当前节点不重复的点
            while (head.next && head.val == head.next.val)
                head = head.next;
            // 将 上一个节点(已经确定不重复
            // 的节点)的下一个节点赋值为不重
            // 复的节点
            lastNode.next = head.next;
        }
        // 将当前节点后移一位
        head = lastNode.next
    }
    // 返回结果
    return HEAD.next
}               
