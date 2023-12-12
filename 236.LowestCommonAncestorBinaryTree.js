/*
 * @Description: 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。
 * @Author: JunLiangWang
 * @Date: 2023-12-12 09:31:08
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-12-12 09:38:30
 */


/**
 * @description: 深度优先  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} root 给定树的根节点
 * @param {*} p    指定节点p
 * @param {*} q    指定节点q
 * @return {*}
 */
function dfs(root,p,q){
    /**
     * 本方案使用深度优先的方式遍历树的节点，
     * 由于树中节点值是不重复的，因此我们仅需
     * 在遍历中记录已找到的与p/q节点相等的节点
     * 的数量即可，当数量达到2，即证明已找到了
     * p/q节点，然后当前根节点即为其最近的公共
     * 根。
     */

    // 记录公共根节点
    let rootNode=null
    /**
     * @description: 利用递归实现深度优先
     * @author: JunLiangWang
     * @param {*} root 当前子树根节点
     * @return {*}
     */    
    function recursion(root){
        // 如果根节点为空返回0
        if(!root)return 0;
        // 获得左右子树遍历的结果，并相加
        let count=recursion(root.left)+recursion(root.right)
        // 比较当前根节点的值是否与p或q相等，如果相等count+1
        if(root.val==p.val||root.val==q.val)count++;
        // 如果count==2，证明已找到了
        // p/q节点，然后当前根节点即为
        // 其最近的公共根。
        if(count==2){
            // 记录公共节点
            rootNode=root
            // count+1,防止再次进入
            count++;
        }
        return count
    }
    // 执行递归
    recursion(root)
    // 返回结果
    return rootNode
}