/*
 * @Description: 给你二叉搜索树的根节点 root ，该树中的 恰好 两个节点的值被错误地交换。
                 请在不改变其结构的情况下，恢复这棵树 。
 * @Author: JunLiangWang
 * @Date: 2023-08-04 23:39:47
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-08-04 23:53:53
 */


/**
 * @description: 中序遍历  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} root 给定树的根节点
 * @return {*}
 */
function InorderTraversal(root){
    /**
     * 对于一棵二叉搜索而言，其明显特性为中序遍历的元素值
     * 单调递增的，因此我们可以利用该特性，定义一个数组，
     * 中序遍历二叉树将节点存入数组中，如果遇到不满足单调
     * 递增的元素则将其索引记录起来，由于只有两个节点被交换
     * 因此我们只需要记录最后一个不满足单调递增的元素索引
     * 
     * 最后我们遍历数组，然后将不满足单调递增的元素与数组
     * 中第一个大于它的数交换即可
     * 
     */

    //定义一个将树的节点存入数组中
    let recordArray=[],
    // 记录不满足递增的元素索引
     index=0;
    /**
     * @description: 中序遍历
     * @author: JunLiangWang
     * @param {*} root 当前节点
     * @return {*}
     */     
    function recursion(root){
        // 如果已到最后的子节点，则直接返回
        if(!root)return ;
        // 中序遍历——>递归左节点
        recursion(root.left) 
        // 如果遇到不满足单调递增的元素则将其索引记录起来，
        // 由于只有两个节点被交换因此我们只需要记录最后一
        // 个不满足单调递增的元素索引
        if(recordArray.length>0&&recordArray[recordArray.length-1].val>root.val)
        index=recordArray.length;
        // 存入节点
        recordArray.push(root)
        // 中序遍历——>递归右节点
         recursion(root.right)
    }
    // 执行递归
    recursion(root)
    // 最后我们遍历数组，然后将不满足单调递增的元素与数组
    // 中第一个大于它的数交换即可
    for(let i=0;i<recordArray.length;i++)
    {
        if(i!=index&&recordArray[i].val>recordArray[index].val)
        {
            let val=recordArray[index].val
            recordArray[index].val=recordArray[i].val
            recordArray[i].val=val
            return root;
        }
    }
}
