/*
 * @Description: 给定两个整数数组 preorder 和 inorder ，其中 preorder 
                 是二叉树的先序遍历， inorder 是同一棵树的中序遍历，请
                 构造二叉树并返回其根节点。
 * @Author: JunLiangWang
 * @Date: 2023-08-14 10:59:14
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-08-14 17:54:33
 */


/**
 * @description: 递归回溯  TC:O(n^2)  SC:O(n^2)
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


/**
 * @description: 递归回溯优化  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} preorder 给定树的前序遍历数组
 * @param {*} inorder  给定树的中序遍历数组
 * @return {*}
 */
function recursionBackTrackingOptimization(preorder,inorder){
    /**
     * 我们可对上述递归回溯方案进一步优化，由于
     * 每次递归中我们都需要遍历中序数组找到根元
     * 素的位置，如下代码：
     * rootIndex = inorder.indexOf(rootValue),
     * 我们可以先利用Map记录节点中序遍历的位置，
     * 后续查找位置则无需多次遍历查找。
     * 
     * 对于递归参数preorder,inorder我们亦可以换成
     * 两个变量记录开始/结束位置索引即可
     * 
     */
    
    // 先利用Map记录节点中序遍历的位置
    // 后续查找位置不用多次遍历
    let inorderMap=new Map(),
    // 遍历到前序数组的位置
    preorderIndex=0;
    // 构造map
    inorder.forEach((value,index)=>{
        inorderMap.set(value,index)
    })
    /**
     * @description: 递归
     * @author: JunLiangWang
     * @param {*} startIndex 开始索引
     * @param {*} endIndex   结束索引
     * @return {*}
     */    
    function recursion(startIndex,endIndex){
        // 获取当前根节点
        let rootValue=preorder[preorderIndex],
        // 获取当前根节点在中序遍历中的位置
        rootIndex=inorderMap.get(rootValue),
        // 构造新的树
        node=new TreeNode(rootValue,null,null);
        // 更新前序数组已遍历的位置
        preorderIndex++   
        // 当根节点的索引等于开始索引，证明
        // 左边已经没有元素，此时左子树为null
        // 否则更新结束位置为根节点位置-1继续
        // 递归
        if(rootIndex>startIndex){
            node.left=recursion(startIndex,rootIndex-1)
        }
        // 当根节点的索引等于结束索引，证明
        // 右边已经没有元素，此时右子树为null
        // 否则更新开始位置为根节点位置+1继续
        // 递归
        if(rootIndex<endIndex){
            node.right=recursion(rootIndex+1,endIndex)
        }
        // 返回树
        return node;
    }
    // 执行递归
    return recursion(0,preorder.length-1)
}