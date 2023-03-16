/*
 * @Description: 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
 * @Author: JunLiangWang
 * @Date: 2023-03-16 23:01:55
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-03-17 00:13:16
 */


/**
 * @description: 计算长度方式   TC:O(L+n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} head  链表首个元素
 * @param {*} n     删除倒数第n个节点
 * @return {*}
 */
function countLength(head,n)
{
    /**
     *  该方案先遍历列表计算列表长度，而后根据列表长度与要删除的节点的倒数位置，计算出
     *  要删除的节点的正序位置，然后根据正序位置遍历链表，删除节点
     *  */
    // 链表总长度
    let length=0
    // 当前节点
    let node=head
    // 遍历计算总长度，当node为undefined时，证明遍历完成链表
    // 判断当前节点是否为undefined
    while(node)
    {
        // 不是，则赋值为下一个节点
        node=node.next
        // 长度+1
        length++
    }
    // 计算要删除节点正序的位置(总长度：5，删除倒数第3个元素，则为删除正数第3个元素)
    // 也就是说删除节点正序位置=总长度-倒数位置+1，此处未加1是由于后面直接将正序位置遍历到0
    // 也可以达到加1的效果
    let positiveSquence=length-n
    // 如果要删除的节点正序位置为1(此处为0是因为上方未加1)，则证明删除首位节点，直接返回head的
    // 下一个节点即可
    if(positiveSquence==0)return head.next
    //如果不是删除首位节点，则从head开始遍历，直到遍历到要删除的节点
    // 赋值node为首节点
    node=head
    // 上一个节点初值为null
    let lastNode=null
    // 此处positiveSquence遍历到0结束遍历，例positiveSquence=2，其实正序位置应当是3，但由于
    // 上方少+1，因此positiveSquence为2，当positiveSquence遍历到0时，仍能到达正序位置3
    while(positiveSquence--)
    {
        //将当前节点赋值给上一个节点
        lastNode=node
        //将当前节点更新为下一个节点
        node=node.next
    }
    // 赋值上一个节点的下一个节点为当前节点的下一个节点即可删除该节点
    lastNode.next=node.next
    // 返回头
    return head
}

/**
 * @description: 双指针   TC:O(L)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} head  链表首个元素
 * @param {*} n     删除第n个节点
 * @return {*}
 */
function doublePoint(head,n)
{
    /**
     * 双指针，利用左右两个指针构成一个区间，其区间差值则为n-1，不断移动该区间，
     * 当右指针到达链表尾部时，其左指针位置正好为倒数第n个元素
     */
    // 左右两指针初值都为首个元素
    let leftPoint=head
    let rigthPoint=head
    // 将右指针移动n-1个节点，由于初值为首个节点，即移动到位置n的节点，
    while(--n)
    {
        rigthPoint=rigthPoint.next
    }
    // 上一个节点初值为空
    let lastNode=null
    // 不断移动左右两指针，当右指针到达最后一个元素时，左指针所指的元素则为倒数第n个元素
    while(rigthPoint.next)
    {
        rigthPoint=rigthPoint.next
        lastNode=leftPoint
        leftPoint=leftPoint.next
    }
    // 如果上一个节点为初值，则证明并未移动区间则到达了最后一个元素，因此则是删除第一个元素
    // 直接返回head的下一个元素即可
    if(lastNode==null)return head.next
    // 赋值上一个节点的下一个节点为当前节点的下一个节点即可删除该节点
    lastNode.next=leftPoint.next
    // 返回头
    return head
}