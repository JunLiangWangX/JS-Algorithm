/*
 * @Description: 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以
                 爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 * @Author: JunLiangWang
 * @Date: 2023-06-16 08:55:17
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-06-16 09:03:48
 */


/**
 * @description: dfs   TC:O(2^n)   SC:O(1)
 * @author: JunLiangWang
 * @param {*} n  需要 n 阶你才能到达楼顶
 * @return {*}
 */
function dfs(n){
    /**
     * 该方案使用深度优先遍历的方式，模拟爬楼梯过程
     */

    // 记录爬到楼顶的方法数量
    let methodCount=0;

    /**
     * @description: 递归回溯，模拟爬楼梯过程
     * @author: JunLiangWang
     * @param {*} position 当前位置
     * @return {*}
     */    
    function recursionBackTrakcing(position){
        // 当前位置等于0，证明达到楼顶，爬到楼顶的方法数量+1
        if(position==0){
            methodCount++;
            return ;
        }
        // 当前位置小于0，证明爬过了楼顶，并不能达到楼顶，此时
        // 直接返回即可
        if(position<0)return ;
        // 当前位置往上爬一步
        recursionBackTrakcing(position-1);
        // 当前位置往上爬两步
        recursionBackTrakcing(position-2);
    }

    //执行递归
    recursionBackTrakcing(n);
    // 返回结果
    return methodCount;
}