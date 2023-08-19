/*
 * @Description: 给定一个单链表的头节点  head ，其中的元素 按升序排序 ，将其转换为高度平衡的二叉搜索树。
                 本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差不超过 1。
 * @Author: JunLiangWang
 * @Date: 2023-08-19 08:59:05
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-08-19 09:27:38
 */



/**
 * @description: 转换为数组  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} head 给定链表头节点
 * @return {*}
 */                 
function convertToArray(head){
    /**
     * 该题与108题相似，不过该题为链表，因此我们可以通过
     * 将链表转换为数组，此时就与108题一样了，最后使用二
     * 分+递归的方式即可解决该题
     */

    // 定义数组记录链表节点
    let nodeArray=[]
    // 将链表转换为数组
    while(head){
        nodeArray.push(head.val)
        head=head.next
    }
    /**
     * @description: 递归
     * @author: JunLiangWang
     * @param {*} start  开始索引
     * @param {*} end    结束索引
     * @return {*}
     */      
    function recursion(start,end){
        // 如果开始索引大于结束索引证明遍历完成
        if(start>end)return null
        // 取得[start,end]的中间值，作为根元素
        let center=Math.floor((start+end)/2)
        // 构造一棵树，其根节点为中间值，左节点为[start,center-1]区间
        // 继续递归的结果，右节点为[center+1,end]区间继续递归的结果
        return new TreeNode(nodeArray[center],recursion(start,center-1),recursion(center+1,end));
    }

    // 执行递归，返回结果
    return recursion(0,nodeArray.length-1);
}


/**
 * @description: 递归回溯   TC:O(nlogn)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} head 给定链表头节点
 * @return {*}
 */
function recursionBackTracking(head){
    /**
     * 该方案使用递归回溯的方式，从上述方法已知
     * 构造该树的关键问题是如果在给定范围[left,
     * right)找到链表的中间节点。
     * 
     * 找出链表中位数节点的方法多种多样，其中较
     * 为简单的一种是「快慢指针法」。初始时，快
     * 指针fast和慢指针slow均指向链表的左端点即
     * left,我们将快指针fast向右移动两次的同时
     * ，将慢指针slow向右移动一次，直到快指针到
     * 达边界（即快指针到达右端点或快指针的下一
     * 个节点是右端点）。此时，慢指针对应的元素
     * 就是中位数。
     */

    /**
     * @description: 给定范围[left,right)找到链表的中间节点
     * @author: JunLiangWang
     * @param {*} left  左边界节点
     * @param {*} right 右边界节点
     * @return {*}
     */    
    function findListMidNode(left,right){
        //初始时，快指针fast和慢指针slow均指向链表的左端点即left
        let fast=left,slow=left
        // 我们将快指针fast向右移动两次的同时，将慢指针slow向右移
        // 动一次，直到快指针到达边界（即快指针到达右端点或快指针
        // 的下一个节点是右端点）。此时，慢指针对应的元素 就是中
        // 位数。
        while(fast!=right&&fast.next!=right){
            fast=fast.next.next
            slow=slow.next
        }
        return slow;
    }

    /**
     * @description: 递归构造[left,right)范围的高度平衡二叉树树
     * @author: JunLiangWang
     * @param {*} left  左节点
     * @param {*} right 右节点
     * @return {*}
     */    
    function recursion(left,right){
        // 如果左节点等于右节点，证明已经无节点，直接返回null
        if(left==right)return null
        // 找到给定范围，找到链表的中间节点
        let mid=findListMidNode(left,right);
        // 构造一棵树，其根节点为中间值，左节点为[left,mid)区间
        // 继续递归的结果，右节点为[mid+1,end)区间继续递归的结果
        return new TreeNode(mid.val,recursion(left,mid),recursion(mid.next,right))
    }

   // 执行递归，返回结果
   return recursion(head,null);
}