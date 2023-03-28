/*
 * @Description: 合并K个升序链表
 * @Author: JunLiangWang
 * @Date: 2023-03-28 11:06:06
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-03-28 14:50:50
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

/**
 * @description: 横向比对法   TC:O(n^2)   SC:O(n)
 * @author: JunLiangWang
 * @param {*} lists
 * @return {*}
 */
function horizontalCompare(lists){
    /**
     * 该方案使用横向比对的方式，将链表逐条比对合并，定义一条新的链表，
     * 先将新链表与第一条链表比对合并(将第一条链表赋值给新链表)，然后
     * 将合并的链表与第二条链表比对并合并，而后再将合并的链表与第三条
     * 链表比对合并，以此类推直至比对完成所有链表
     */
    
    // 没有需要比对的链表，直接返回null
    if(lists.length==0)return null;
    /**
     * @description: 合并两条升序链表为一条升序链表
     * @author: JunLiangWang
     * @param {*} list1 升序链表1
     * @param {*} list2 升序链表2
     * @return {*}
     */    
    function mergeTwoList(list1,list2)
    {
        // 定义一个新链表
        const PRE_HEAD=new ListNode();
        let head=PRE_HEAD;
        // 如果list1或list2为空，则证明比对完成，
        // 剩余链表元素直接赋值给新链表后续节点即可
        while(list1&&list2)
        {
            // 如果链表1当前元素小于链表2当前元素
            if(list1.val<list2.val)
            {
                // 将链表1的该元素添加到下一个节点
                head.next=list1;
                // 将链表1该元素删除，并将当前节点
                // 变为下一个节点
                list1=list1.next;
            }
            // 反之操作链表2该元素
            else
            {
                head.next=list2;
                list2=list2.next;
            }
            // 将新链表的当前节点变为下一个节点
            head=head.next;
        }
        // 将剩余链表元素赋值给新链表的下一个节点
        // 如果是list1不为空，证明list2是为空的
        // 此时将list1后续节点赋值给新链表即可
        // 反之亦然。
        head.next=list1?list1:list2;
        // 返回新链表
        return PRE_HEAD.next;
    }
    // 定义一个新的链表
    let outList=null;
    // 遍历比对合并链表
    for(let i=0;i<lists.length;i++)
    {
        outList=mergeTwoList(outList,lists[i]);
    }
    //返回结果
    return outList;
}