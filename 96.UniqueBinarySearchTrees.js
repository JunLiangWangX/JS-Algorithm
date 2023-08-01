/*
 * @Description: 给你一个整数 n ，求恰由 n 个节点组成且节点值从 1 到 n 互不相同的
                 二叉搜索树 有多少种？返回满足题意的二叉搜索树的种数。
 * @Author: JunLiangWang
 * @Date: 2023-08-01 09:20:04
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-08-01 10:19:40
 */


/**
 * @description: 递归回溯   TC:O(2^n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} n 给定整数n
 * @return {*}
 */                 
function recursionBackTracking(n){

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
     * @param {*} end 节点值的结束范围
     * @return {*}
     */    
    function recursion(start,end)
    {
        // 当开始范围大于结束范围证明无已法生成节点，此时直接返回1
        if(start>end)return 1
        // 记录当前节点生成二叉搜索树的个数
        let count=0;
        // 从[star,end]遍历选择头节点的值
        for(let i=start;i<=end;i++){
            // 以i作为头节点，其能生成二叉树的个数就等于它的左树
            // 的个数乘以它的右树的个数，左树选择范围为[start,i-1]
            // 右树选择范围为[i+1,end]
            count+=(recursion(start,i-1)*recursion(i+1,end))
        }
        // 返回结果
        return count;
    }
    // 执行递归
   return recursion(1,n)
}


/**
 * @description: 动态规划   TC:O(n^2)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} n 给定整数n
 * @return {*}
 */
function dp(n){
    /**
     * 大家考虑一个问题同样是3个值的范围，例如
     * [1,2,3]与[6,7,8]能生成二叉搜索树的数量
     * 是一致的吗？答案是一致的
     * 
     * 从上述递归回溯中我们可以看出，对于以i作为头节点
     * 其能生成二叉树的个数就等于它的左树的个数乘以它的
     * 右树的个数，即：
     * F(i)=G(start,i-1)*G(i+1,end)
     * 由于只要范围一样，其能生成的二叉搜索树数量也是一
     * 样的，因此我们不用再关心谁作为头节点，关心左右
     * 两边的节点数量即可，即
     * 
     * // 左边节点数量为i-1,右边节点数量为n-i
     * F(i)=G(i-1)*G(n-i)
     * 
     * 对于求解[1:n]能生成二叉搜索的个数为：
     * G(n)=F(1)+F(2)+....+F(n)
     * 
     * 
     */
    
    const G = new Array(n + 1).fill(0);
    // n=0时为1
    G[0] = 1;
    // n=1时为1
    G[1] = 1;

    // 模拟G(n)=F(1)+F(2)+....+F(n)，
    // 此处从2开始
    for(let i=2;i<=n;i++){
        // 以j作为头节点
        for(let j=1;j<=i;j++){
            // 左边节点数量为j-1,右边节点数量为i-j
            G[i]+=G[j-1]*G[i-j]
        }
    }
    // 返回结果
    return G[n]
}


/**
 * @description: 数学公式   TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} n 给定整数n
 * @return {*}
 */
function mathFormula(n){
    /**
     * 对于一个有序数组，其可生成不同二叉搜索树的数量可用
     * 以下公式计算：
     *              C(n+1)=2(2n+1)/(n+2)*C(n) 
     */
    let C=1;
    for(let i=1;i<n;i++)C=(2*i+1)/(i+2)*2*C
    return C
}