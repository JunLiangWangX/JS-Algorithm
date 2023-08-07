/*
 * @Description: 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以
                 爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 * @Author: JunLiangWang
 * @Date: 2023-06-16 08:55:17
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-06-16 10:10:50
 */


/**
 * @description: dfs   TC:O(2^n)   SC:O(1)
 * @author: JunLiangWang
 * @param {*} n  需要 n 阶你才能到达楼顶
 * @return {*}
 */
function dfs(n) {
    /**
     * 该方案使用深度优先遍历的方式，模拟爬楼梯过程
     */

    // 记录爬到楼顶的方法数量
    let methodCount = 0;

    /**
     * @description: 递归回溯，模拟爬楼梯过程
     * @author: JunLiangWang
     * @param {*} position 当前位置
     * @return {*}
     */
    function recursionBackTrakcing(position) {
        // 当前位置等于0，证明达到楼顶，爬到楼顶的方法数量+1
        if (position == 0) {
            methodCount++;
            return;
        }
        // 当前位置小于0，证明爬过了楼顶，并不能达到楼顶，此时
        // 直接返回即可
        if (position < 0) return;
        // 当前位置往上爬一步
        recursionBackTrakcing(position - 1);
        // 当前位置往上爬两步
        recursionBackTrakcing(position - 2);
    }

    //执行递归
    recursionBackTrakcing(n);
    // 返回结果
    return methodCount;
}


/**
 * @description: 动态规划   TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} n 需要 n 阶你才能到达楼顶
 * @return {*}
 */
function dp(n) {
    /**
     * 该方案是用动态规划的方式，不难发现其实到达当前步数的方法是等于
     * 到达前一步的方法加上到达前两步的方法，即：
     * 
     *          f[x]=f[x-1]+f[x-2]
     * 
     * 然后每移动一步：当前f[x-1]即等于上一次f[x]
     *                当前f[x-2]即等于上一次f[x-1]
     *                本次f[x]即通过公式即可计算得出
     * 
     * 因此我们定义三个遍历，模拟这个过程即可
     */

    // 到达前两步有多少种方法
    let reachFirstTwoStepsWays = 0,
        // 到达前一步有多少种方法
        reachPreviousStepWays = 0,
        // 到达现在有多少种方法
        reachPresentWays = 1;
    // 遍历步数
    for (let i = 1; i < n; i++) {
        // 当前f[x-2]即等于上一次f[x-1]
        reachFirstTwoStepsWays = reachPreviousStepWays;
        // 当前f[x-1]即等于上一次f[x]
        reachPreviousStepWays = reachPresentWays;
        //  当前f[x]=f[x-1]+f[x-2]
        reachPresentWays = reachFirstTwoStepsWays + reachPreviousStepWays;
    }
    // 返回结果
    return reachPresentWays;
}

/**
 * @description: 矩阵快速幂  TC:O(logn)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} n 需要 n 阶你才能到达楼顶
 * @return {*}
 */
function matrixFastExponentiation(n) {
    /**
     *  上述DP方法中，我们得出到达当前步数的方法是等于到达前
     *  一步的方法加上到达前两步的方法，即：
     * 
     *          f[x]=f[x-1]+f[x-2]
     * 
     *  我们可将其转换为矩阵的运算，即：
     * 
     *            1   1
     *         (  1   0  ) 的n次方获得答案
     *  
     *  幂运算我们可使用快速幂的方式从而降低时间复杂度
     * 
     */

    /**
     * @description: 快速幂运算
     * @author: JunLiangWang
     * @param {*} a 底数
     * @param {*} n 指数
     * @return {*}
     */    
    function fastPower(a, n) {
        let ret = [[1, 0], [0, 1]];
        while (n > 0) {
            if ((n & 1) === 1) {
                ret = multiply(ret, a);
            }
            n >>= 1;
            a = multiply(a, a);
        }
        return ret;
    }
    /**
     * @description: 矩阵相乘
     * @author: JunLiangWang
     * @param {*} a 矩阵1
     * @param {*} b 矩阵2
     * @return {*}
     */    
    function multiply(a, b) {
        const c = new Array(2).fill(0).map(() => new Array(2).fill(0));
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                c[i][j] = a[i][0] * b[0][j] + a[i][1] * b[1][j];
            }
        }
        return c;
    }

    const q = [[1, 1], [1, 0]];
    const res = fastPower(q, n);
    return res[0][0];
}


/**
 * @description: 斐波那契数列  TC:O(1)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} n 需要 n 阶你才能到达楼顶
 * @return {*}
 */
function FibonacciSequence(n){
    /**
     * 其实不难发现，该题答案数列其实为斐波那契数列，因此我们使用斐波那契数列的
     * 公式，即可直接计算出答案
     */
    const sqrt5 = Math.sqrt(5);
    const fibn = Math.pow((1 + sqrt5) / 2, n + 1) - Math.pow((1 - sqrt5) / 2, n + 1);
    return Math.round(fibn / sqrt5);
}
