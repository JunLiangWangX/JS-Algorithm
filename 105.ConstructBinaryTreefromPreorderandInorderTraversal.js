/*
 * @Description: 给定两个整数数组 preorder 和 inorder ，其中 preorder 
                 是二叉树的先序遍历， inorder 是同一棵树的中序遍历，请
                 构造二叉树并返回其根节点。
 * @Author: JunLiangWang
 * @Date: 2023-08-14 10:59:14
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-08-14 11:14:45
 */


/**
 * @description: 递归回溯  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} preorder 给定树的前序遍历
 * @param {*} inorder  给定树的中序遍历
 * @return {*}
 */
function recursionBackTracking(preorder, inorder) {
    /**
     * 本方案使用递归回溯的方式
     * 已知前序遍历有：[根，左子树，右子树]
     * 已知中序遍历有：[左子树，根，右子树]
     * 
     * 前序遍历数组中的首个元素肯定是根元素，
     * 因此我们可找到根元素在中序遍历中的位置
     * 然后根元素的左边则是左子树，右边则是右
     * 子树，然后我们删除前序遍历中的根元素，
     * 此时下一个元素则为左子树(如果左子树不为空)/
     * 右子树(如果左子树为空)的根节点，因此我们
     * 继续按照上述规则递归中序遍历中已经找到的
     * [左子树]，[右子树]，然后以此类推，直到递归
     * 完所有节点
     */

    // 如果节点为空，直接返回null
    if (preorder.length == 0 || inorder.length == 0) return null
    // 获得前序遍历数组中的首个元素，即为根元素，并删除
    let rootValue = preorder.shift(),
        // 找到根元素在中序遍历数组中的位置
        rootIndex = inorder.indexOf(rootValue),
        // 在中序遍历的数组中根元素的左边则为左子树
        leftArray = inorder.slice(0, rootIndex),
        // 在中序遍历的数组中根元素的右边则为右子树
        rightArray = inorder.slice(rootIndex + 1, inorder.length);
    // 返回构造一棵新的树，其根值为找打的根节点值，左节点为
    // 找到的左子树按照上述方式继续递归的结果，右子树同理
    return new TreeNode(rootValue, recursionBackTracking(preorder, leftArray), recursionBackTracking(preorder, rightArray));
}