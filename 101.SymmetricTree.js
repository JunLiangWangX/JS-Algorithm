/*
 * @Description: 给你一个二叉树的根节点 root ， 检查它是否轴对称。
 * @Author: JunLiangWang
 * @Date: 2023-08-08 08:59:12
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-08-08 09:04:05
 */



/**
 * @description: 递归回溯  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} root  给定树头节点
 * @return {*}
 */
function recursionBackTracking(root) {
    /**
     * 该方案采用递归回溯的方式，我们将树的左子树/右子树
     * 看作两个独立的树，该题就与判断两棵树是否相同是一致
     * 的，只不过判断两棵树是否相同是左节点与左节点比较
     * 而此处是左节点与右节点比较
     */

    function recursion(p, q) {
        if (p == null && q == null) return true
        else if (p == null || q == null) return false
        else if (p.val != q.val) return false
        else return recursion(p.left, q.right) && recursion(p.right, q.left)
    }

    return recursion(root.left, root.right)
}