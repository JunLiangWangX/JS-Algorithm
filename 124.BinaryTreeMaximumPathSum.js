/*
 * @Description: 二叉树中的 路径 被定义为一条节点序列，序列中每对相邻节点之间都存在一条边。
                 同一个节点在一条路径序列中 至多出现一次 。该路径 至少包含一个 节点，且不
                 一定经过根节点。路径和 是路径中各节点值的总和。给你一个二叉树的根节点root
                 ，返回其 最大路径和 。
 * @Author: JunLiangWang
 * @Date: 2023-09-12 09:44:15
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-09-12 10:12:39
 */


/**
 * @description: 递归回溯  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} root 给定树的根节点
 * @return {*}
 */
function recursionBacktracking(root) {
    /**
     * 该方案使用递归回溯的方式，试想对于如下的一棵树：
     *            x1
     *          /   \
     *        x2     x3
     *        /\     /\
     *      x4  x5 x6  x7
     * 
     * 对于其子树而言：
     *         ...
     *         /
     *        x2    
     *        /\    
     *      x4  x5
     * 
     * 它只有三种方式通向其他路径：   对应得路径和为:
     *    1. x2-->其他节点             1.x2.val+other
     *    2. x4-->x2-->其他节点        2.x4.val+x2.val+other
     *    3. x5-->x2-->其他节点        3.x5.val+x2.val+other
     * 
     * 该子树通往其他节点的最大路径和就为：
     *    toOtherMaxSum=Max(x2.val , x4.val+x2.val , x5.val+x2.val )
     * 也就是：
     *    toOtherMaxSum=Max(root.val , left.val+root.val , right.val+root.val )
     * 
     * 由于我们并不知道其他节点的值，万一其他节点值全是负数，那么
     * 路径和最大值就在该子树内，因此我们还需要定义一个变量，计算
     * 该子树内的路径最大和，不断根据该子树内的路径最大和更新最大
     * 值
     *  maxSum=Max(maxSum,通往其他路径的最大和, x4.val , x5.val , x4.val+x5.val+x2.val )
     * 也就是：
     *  maxSum=Max(maxSum,toOtherMaxSum, left.val , right.val , left.val+right.val+root.val )
     * 
     * 最终我们利用上述方法，以递归回溯的方式不断遍历子树即可
     * 
     */

    // 记录最大路径和，初值为根的值
    let maxSum = root.val;

    /**
     * @description: 递归回溯遍历树
     * @author: JunLiangWang
     * @param {*} root 当前子树根节点
     * @return {*}
     */    
    function recursion(root) {
        // 无子树，返回路径和为最小值，因为给定题目中
        // 节点最小值为-1000，为了不影响后续比较结果
        // 因此这里返回最小值
        if (!root) return -1001;
        // 继续递归左子树
        let leftSum = recursion(root.left),
        // 继续递归右子树
        rightSum = recursion(root.right),

        /* 对于一棵子树它只有三种方式通向其他路径：     对应得路径和为:
        *    1. 根节点(x2)-->其他节点                    1.x2.val+other
        *    2. 左节点(x4)-->根节点(x2)-->其他节点       2.x4.val+x2.val+other
        *    3. 右节点(x5)-->根节点(x2)-->其他节点       3.x5.val+x2.val+other
        * 
        * 该子树通往其他节点的最大路径和就为：
        *   toOtherMaxSum=Max(root.val , left.val+root.val , right.val+root.val )
        * */
        toOtherMaxSum = Math.max(leftSum + root.val, rightSum + root.val, root.val)

        /* 由于我们并不知道其他节点的值，万一其他节点值全是负数，那么路径和最大值就
        *  在该子树内，因此我们还需要定义一个变量，计算该子树内的路径最大和，不断根
        *  据该子树内的路径最大和更新最大值:
        *    maxSum=Max(maxSum,toOtherMaxSum, left.val , right.val , left.val+right.val+root.val )
        * */
        maxSum = Math.max(maxSum, toOtherMaxSum, leftSum + root.val + rightSum, leftSum, rightSum)
        // 该子树通往其他节点的最大路径和
        return toOtherMaxSum
    }
    // 执行递归
    recursion(root)
    // 返回最大值
    return maxSum
}