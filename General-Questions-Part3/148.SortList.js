/*
 * @Description: 给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。
 * @Author: JunLiangWang
 * @Date: 2023-10-27 14:29:49
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-10-27 14:42:12
 */



/**
 * @description: 插入排序  TC:O(n^2)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} head 给定链表头节点
 * @return {*}
 */
function insertSort(head) {

    /**
     * 本方案采用插入排序的方式，与上一题一致，较为简单，但是在
     * 具体写得时候有很多需要注意得地方，比对交换两节点指针不能
     * 指向当前需要交换的两节点，而是指向其上一个节点通过next来
     * 访问，因为移动节点需要改变其上一个节点的next值
     */
    if (!head) return head
    const HEAD = new ListNode(0, head)
    let selectNode = HEAD;

    while (selectNode.next) {
        let compareNode = HEAD, isChange = false;
        // 遍历比对节点
        while (compareNode.next && compareNode.next != selectNode.next) {
            // 如果大于则需要移动节点
            if (compareNode.next.val > selectNode.next.val) {
                let nextNode = selectNode.next.next
                selectNode.next.next = compareNode.next
                compareNode.next = selectNode.next
                selectNode.next = nextNode
                isChange = true;
                break;
            }
            compareNode = compareNode.next
        }
        if (!isChange) selectNode = selectNode.next
    }
    return HEAD.next
}


/**
 * @description: 归并排序  TC:O(nlogn)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} head 给定链表头节点
 * @return {*}
 */
function mergeSort(head) {
    /* 对链表自顶向下归并排序的过程如下:
         1.找到链表的中点，以中点为分界，将链表拆分成两个子链表。
           寻找链表的中点可以使用快慢指针的做法，快指针每次移动 
           2 步，慢指针每次移动1步，当快指针到达链表末尾时，慢指
           针指向的链表节点即为链表的中点。
         2.对两个子链表分别排序。
         3.将两个排序后的子链表合并，得到完整的排序后的链表。
     */

    /**
     * @description: 两链表排序
     * @author: JunLiangWang
     * @param {*} list1 链表1
     * @param {*} list2 链表2
     * @return {*}
     */         
    function sort(list1, list2) {
        const newList = new ListNode(0);
        let newHead = newList, head1 = list1, head2 = list2;
        while (head1 !== null && head2 !== null) {
            if (head1.val < head2.val) {
                newHead.next = head1
                head1 = head1.next
            }
            else {
                newHead.next = head2
                head2 = head2.next
            }
            newHead = newHead.next
        }
        if (head1) newHead.next = head1
        else newHead.next = head2
        return newList.next;
    }
    /**
     * @description: 归并排序
     * @author: JunLiangWang
     * @param {*} head 开始节点
     * @param {*} tail 结束节点
     * @return {*}
     */    
    function mergeSort(head, tail) {
        if (head == null) return head
        if (head.next == tail) {
            head.next = null
            return head
        }
        let slowPoint = head, fastPoint = head
        while (fastPoint !== tail) {
            slowPoint = slowPoint.next;
            fastPoint = fastPoint.next;
            if (fastPoint !== tail) fastPoint = fastPoint.next;
        }
        let list1 = mergeSort(head, slowPoint),
            list2 = mergeSort(slowPoint, tail)
        return sort(list1, list2)
    }
    // 执行排序
    return mergeSort(head, null)
}