/*
 * @Description: 请你设计一个函数，生成n有效的括号组合。
 * @Author: JunLiangWang
 * @Date: 2023-03-27 10:10:36
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-03-27 10:38:06
 */


/**
 * @description: 深度优先+剪枝算法    TC:O(2^n)   SC:O(n)
 * @author: JunLiangWang 
 * @param {*} n  输入括号对数
 * @return {*}
 */
function DFSAndPruningWay(n){
    // 该方案是由深度优先遍历+剪枝的方法实现，利用深度优先算法不断向字符串追加
    // "("以及")"，直至左或右括号数量超出范围，或左右括号数量等于n。当左括号数
    // 量大于右括号数量时，此时不可能形成有效括号组合因此直接舍去(剪枝)，例：)、
    // ())、(()))等。

    // 定义输出数组
    let outArray=[]
    /**
     * @description: 定义深度优先算法
     * @author: JunLiangWang
     * @param {*} str   当前左右括号组合
     * @param {*} left  当前左括号数量
     * @param {*} right 当前右括号数量
     * @return {*}
     */    
    function DFSandPruning(str,left,right)
    {
        // 当左或右括号数量超出范围，以及当左括号数量大于右括号数量时，
        // 此时无论如何追究括号都不可能再形成有效括号组合因此直接舍去(剪枝)
        if(left>n||right>n||left>right)return ;
        // 当左右括号数量等于规定范围，证明此时括号数量达到范围，且组合有效，则直接向输出数组添加结果
        if(left==n&&right==n)
        {
            outArray.push(str)
            return ;
        }
        // 遍历左节点
        DFSandPruning(str+")",left+1,right)
        // 遍历右节点
        DFSandPruning(str+"(",left,right+1)
    }
    //调用深度优先+剪枝算法
    DFSandPruning("",0,0)
    // 返回结果
    return outArray
}