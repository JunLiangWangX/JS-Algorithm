/*
 * @Description: 给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。
                 你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。
 * @Author: JunLiangWang
 * @Date: 2023-03-29 10:54:43
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-03-29 11:12:16
 */


/**
 * @description: 递归回溯方法   TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} head
 * @return {*}
 */
function recursionBacktracking(head)
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
    if(head&&head.next)
    {
        // 先保存当前节点的下一个节点(nextNode)
        let nextNode=head.next;
        // 将当前节点的下一个节点更新为nextNode后续节点继续递归的结果
        head.next=recursionBacktracking(nextNode.next);
        // 将nextNode的下一个节点更新为当前节点
        nextNode.next=head;
        // 此时nextNode已为当前节点的前一个节点，返回nextNode即可
        return nextNode;
    }
    // 不存在证明已无可交换节点，直接返回即可当前节点即可
    else
    {
        return head;
    }
}