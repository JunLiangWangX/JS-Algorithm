/*
 * @Description: 给你一个整数 n ，请你生成并返回所有由 n 个节点组成且节点值从 1 到 n 互不相同的不同 二叉搜索树 。
                 可以按 任意顺序 返回答案。
 * @Author: JunLiangWang
 * @Date: 2023-07-30 15:04:05
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-07-30 15:20:31
 */


/**
 * @description: 递归回溯   TC:O(n^2)   SC:O(n^2)
 * @author: JunLiangWang
 * @param {*} n  给定整数n
 * @return {*}
 */
function recursionBacktracking(n){
    /**
     * 对于一棵二叉搜索树而言有以下规则：
     *   1.根节点的值大于左子树所有节点的值
     *   2.根节点的值小于右子树所有节点的值
     *   3.且左子树和右子树也同样为二叉搜索树
     * 因此对于二叉搜索树的任何一个子树有：leftNode<rootNode<rightNode，
     * 如果rootNode=i,leftNode的范围则为[1,i-1],rightNode的范围为[i+1,n]
     * 根据以上特性，我们即可使用递归回溯的方式生成所有可能的二叉搜索树
     */

    
    /**
     * @description: 递归
     * @author: JunLiangWang
     * @param {*} start 节点值的开始范围
     * @param {*} end   节点值的结束范围
     * @return {*}
     */    
    function recursion(start,end){
        // 当开始范围大于结束范围证明无已法生成节点，此时直接返回null
        if(start>end)return [null]
        // 记录当前节点生成二叉搜索树的所有可能
        let nodeList=[]
        // 从[star,end]遍历选择头节点的值
        for(let i=start;i<=end;i++){
            // 以i为头节点，那么左树选择范围为[start,i-1]
            let leftNodes=recursion(start,i-1),
            // 以i为头节点，那么右树选择范围为[i+1,end]
            rightNodes=recursion(i+1,end);
            // 遍历所有左右节点，构造以i为头节点的二叉搜索树，
            // 并记录到nodeList
            for(let left of leftNodes)
            {
                for(let right of rightNodes){
                    nodeList.push(new TreeNode(i,left,right))
                }
            }
        }
        // 返回当前字节的二叉搜索树所有组合
        return nodeList;
    }

    // 执行递归
    return recursion(1,n)
}