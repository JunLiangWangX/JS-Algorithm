/*
 * @Description: 给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。
                 你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。
 * @Author: JunLiangWang
 * @Date: 2023-03-29 10:54:43
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-03-29 14:07:15
 */


/**
 * @description: 递归回溯方法   TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} node
 * @return {*}
 */
function recursionBacktracking(node)
{
    /**
     * 该方案利用递归回溯的方式，递归判断当前节点以及其后一个节点是否存在，
     * 如果不存在，证明已无节点可交换，则直接返回当前节点；否则，则将当前
     * 节点与其下一个节点进行交换。交换过程为：先将当前节点的下一个节点取
     * 出并保存(nextNode)，然后将当前节点的下一个节点更新为nextNode后续
     * 节点继续递归的结果，然后将nextNode的下一个节点更新为当前节点，此时
     * nextNode则变更为当前节点的前一个节点，返回nextNode即可。
     */

    // 判断当前节点与其下一个节点是否存在，如果存在则将两节点位置交换
    if(node&&node.next)
    {
        // 先保存当前节点的下一个节点(nextNode)
        let nextNode=node.next;
        // 将当前节点的下一个节点更新为nextNode后续节点继续递归的结果
        node.next=recursionBacktracking(nextNode.next);
        // 将nextNode的下一个节点更新为当前节点
        nextNode.next=node;
        // 此时nextNode已为当前节点的前一个节点，返回nextNode即可
        return nextNode;
    }
    // 不存在证明已无可交换节点，直接返回即可当前节点即可
    else
    {
        return node;
    }
}

/**
 * @description: 迭代法    TC:O(n)   SC:O(n)
 * @author: JunLiangWang
 * @param {*} head
 * @return {*}
 */
function iteration(head){
    /**
     * 该方案利用迭代，每次遍历链表的两个节点，将其交换，直至遍历结束
     */
    // 如果当前节点为空或其后一个节点为空，证明无需要交换的节点，直接返回当前节点即可
    if(!head||!head.next)return head;
    // 新的头节点为原链表的第二个节点
    const NEW_HEAD=head.next;
    // 上一个节点初值为空
    let lastNode=null;
    // 当前节点初值为原链表第一个节点
    let currentNode=head;
    // 当前节点不为空且其下一个节点也不为空，证明仍存在需要交换的节点
    while(currentNode&&currentNode.next)
    {
        // 将当前节点的下一个节点取出保存(nextNode)
        let nextNode=currentNode.next;
        // 将当前节点的下一个节点更新为nextNode的下一个节点
        currentNode.next=nextNode.next;
        // nextNode的下一个节点更新为当前节点，此时位置已完成交换
        nextNode.next=currentNode;
        // 如果存在上一个节点，则需要将上一个节点的下一个节点更新为
        // 已经交换位置的nextNode
        if(lastNode)lastNode.next=nextNode;
        // 上一个节点更新为当前节点
        lastNode=currentNode;
        // 当前节点更新为其下一个节点
        currentNode=currentNode.next;
    }
    // 返回新链表
    return NEW_HEAD;
}