/*
 * @Description: 给你一个链表的头节点 head 和一个特定值 x ，请你对链表进行分隔，使得所有 小于 x 的节点都出现在
                 大于或等于 x 的节点之前。你应当 保留 两个分区中每个节点的初始相对位置。
 * @Author: JunLiangWang
 * @Date: 2023-07-12 09:28:23
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-07-12 09:40:59
 */


/**
 * @description: 双指针   TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} head  给定链表头节点
 * @param {*} x     给定特定值X
 * @return {*}
 */
function doublePoint(head, x) {
    /**
     * 该方案使用双指针的方式，先遍历链表获得链表的长度，
     * 并将lastNode指针指向链表最后一个节点。因为首个节
     * 点有可能被移动到尾部，因此我们需要向链表头部添加
     * 一个哨兵节点。然后在使用一个指针currentNode指向
     * 头节点，利用该指针逐个遍历链表节点，当节点值大于
     * 给定值x，则将该节点移动到lastNode指针所指的节点
     * 的下一个节点，然后将lastNode指针指向下一个节点，
     * 该节点则被移动到了尾部。
     */

    //向链表头部添加一个哨兵节点，因为首个节点有可能被移动到尾部
    const HEAD = new ListNode(0, head);
    // 指向最后一个节点的指针
    let lastNode = HEAD,
    // 指向当前节点的指针
     currentNode = HEAD,
     // 链表长度
      length = 0;

    // 遍历链表获得链表的长度，并将lastNode
    // 指针指向链表最后一个节点
    while (lastNode.next) {
        lastNode = lastNode.next;
        length++;
    }
    // 遍历链表
    while (length > 0) {
        // 获得当前指针的下一个节点
        let nextNode = currentNode.next
        // 如果该节点值大于给定值x，需要移动该节点到链表尾部
        // 如果此时该节点等于链表尾部节点则无需移动
        if (nextNode.val >= x && nextNode != lastNode) {
            currentNode.next = nextNode.next;
            nextNode.next = null;
            lastNode.next = nextNode;
            lastNode = lastNode.next;
        }
        // 否则继续遍历下一个节点
        else {
            currentNode = currentNode.next;
        }
        length--;
    }
    // 返回结果
    return HEAD.next;
}