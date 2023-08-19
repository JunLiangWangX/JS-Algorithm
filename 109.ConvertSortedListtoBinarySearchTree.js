/*
 * @Description: 给定一个单链表的头节点  head ，其中的元素 按升序排序 ，将其转换为高度平衡的二叉搜索树。
                 本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差不超过 1。
 * @Author: JunLiangWang
 * @Date: 2023-08-19 08:59:05
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-08-19 09:02:45
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