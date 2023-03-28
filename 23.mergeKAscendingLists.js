/*
 * @Description: 合并K个升序链表
 * @Author: JunLiangWang
 * @Date: 2023-03-28 11:06:06
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-03-28 11:37:34
 */


/**
 * @description: 纵向比较法   TC:O(n^2)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} lists 输入数组
 * @return {*}
 */
function longitudinalCompare(lists) {
    /* 该方案利用纵向比较法，从K个升序链表的首个元素开始
       比较，找到最小的元素添加到新链表中，并将其在原链表
       中删除，当原链表中没有待比较的元素，则删除该链表，
       直至删除到还剩一个链表时证明所有元素比较完成，将剩
       余链表中元素添加到新链表即可
    */
    // 删除为空的链表
    for(let i=0;i<lists.length;i++)
    {
        if(!lists[i])
        {
            lists.splice(i,1);
            i--;
        }
    }
    // 如果没有链表需要比较直接返回null
    if(lists.length==0)return null;
    // 定义新的链表
    const PRE_HEAD = new ListNode();
    let head = PRE_HEAD;
    // 如果原链表数量还大于1，证明仍有需要比较的元素，反之则证明
    // 比较完成，此时跳出循环，将剩余元素添加到新链表即可
    while (lists.length > 1) {
        // 当前最小的元素初始化为第0条链表的首元素
        let minIndex = 0;
        // 遍历第1条到第n条链表的首元素，找出最小的元素
        for (let i = 1; i < lists.length; i++) {
            if (lists[minIndex].val > lists[i].val)
                minIndex = i;
        }
        // 将最小元素赋值给新链表
        head.next = lists[minIndex];
        head = head.next;
        // 如果最小元素的原链表后还存在元素，则将首元素赋值为下一个元素
        if (lists[minIndex].next) lists[minIndex] = lists[minIndex].next;
        // 如果不存在，则删除该链表
        else lists.splice(minIndex, 1);
    }
    // 将剩余元素添加到新链表
    head.next=lists[0];
    // 返回结果
    return PRE_HEAD.next;
}