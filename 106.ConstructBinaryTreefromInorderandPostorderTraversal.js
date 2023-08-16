/*
 * @Description: 给定两个整数数组 inorder 和 postorder ，其中 inorder 
                 是二叉树的中序遍历， postorder 是同一棵树的后序遍历，
                 请你构造并返回这颗 二叉树 。
 * @Author: JunLiangWang
 * @Date: 2023-08-14 10:59:14
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-08-16 09:10:16
 */


/**
 * @description: 递归回溯  TC:O(n^2)  SC:O(n^2)
 * @author: JunLiangWang
 * @param {*} inorder   给定树的中序遍历
 * @param {*} postorder 给定树的后序遍历
 * @return {*}
 */
function recursionBackTracking(inorder, postorder) {

    /**
     * 本方案使用递归回溯的方式，该题与按照
     * 前序、中序遍历数组生成二叉树类似，只
     * 不过前序数组为[根、左子树、右子树]，
     * 而后序遍历为[左子树，右子树，根]，因
     * 此我们只需要改变遍历顺序，从后往前遍历
     * 后序数组即可找到根，其次前序数组根后面
     * 跟的是左子树，而后序数组根前面是右子树
     * 因此我们将递归改为先遍历右子树再遍历左
    *  子树即可。
     * 
     * 已知中序遍历有：[左子树，根，右子树]
     * 已知后序遍历有：[左子树，右子树，根]
     * 
     * 后序遍历数组中的最后一个元素肯定是根元素，
     * 因此我们可找到根元素在中序遍历中的位置
     * 然后根元素的左边则是左子树，右边则是右
     * 子树，然后我们删除后序遍历中的根元素，
     * 此时下一个元素则为右子树(如果右子树不为空)/
     * 左子树(如果右子树为空)的根节点，因此我们
     * 继续按照上述规则递归中序遍历中已经找到的
     * [右子树]，[左子树]，然后以此类推，直到递归
     * 完所有节点
     */

    // 如果节点为空，直接返回null
    if (postorder.length == 0 || inorder.length == 0) return null
    // 获得后序遍历数组中的最后一个元素，即为根元素，并删除
    let rootValue = postorder.pop(),
        // 找到根元素在中序遍历数组中的位置
        rootIndex = inorder.indexOf(rootValue),
        // 在中序遍历的数组中根元素的右边则为右子树
        rightArray = inorder.slice(rootIndex + 1, inorder.length),
        // 在中序遍历的数组中根元素的左边则为左子树
        leftArray = inorder.slice(0, rootIndex),
        // 构造一棵新的树，其根值为找到的根节点值
        node = new TreeNode(rootValue, null, null);
    // 根的右子树为按照上述方式继续递归的结果，左子树同理
    node.right = recursionBackTracking(rightArray, postorder);
    node.left = recursionBackTracking(leftArray, postorder);
    // 返回树
    return node;
};
