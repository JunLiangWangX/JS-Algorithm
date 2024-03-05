/*
 * @Description: 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。
                 计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成
                 总金额，返回 -1 。你可以认为每种硬币的数量是无限的。
 * @Author: JunLiangWang
 * @Date: 2024-03-01 16:39:30
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2024-03-01 17:23:29
 */


/**
 * @description: 深度优先  TC:O(n^3)  SC:O(n)
 * @param {*} coins  给定整数数组
 * @param {*} amount 给定整数
 */
function dfs(coins, amount) {
    /**
     * 本方案使用深度优先，利用递归不断对amount
     * 减去所有硬币面额，直到amount小于等于0结束
     * 递归，等于0证明硬币能够组成总金额，然后记
     * 录比较最小硬币数即可，小于0证明硬币无法组
     * 成总金额无需处理
     */

    // 记录组成总金额的最小硬币数
    let minCount = Infinity
    /**
     * @description: 递归实现深度优先
     * @param {*} diff 当前剩余总金额
     * @param {*} count 已组合的硬币数量
     */
    function recursion(diff, count) {
        // 如果当前剩余总金额等于0，证明硬币能够
        // 组成总金额，然后记录比较最小硬币数，
        // 结束递归
        if (diff == 0) {
            minCount = Math.min(minCount, count)
            return
        }
        // 如果当前剩余总金额小于0证明硬币无法组
        // 成总金额无需处理结束递归
        if (diff < 0) return
        // 否则，不断对amount减去所有硬币面额，继续递归
        for (let coin of coins) dfs(diff - coin, count + 1)
    }
    // 执行递归
    recursion(amount, 0)
    // 返回结果
    return minCount == Infinity ? -1 : minCount;
}

/**
 * @description: 深度优先+剪枝  TC:O(n^2)  SC:O(n)
 * @param {*} coins  给定整数数组
 * @param {*} amount 给定整数
 */
function DFSAndPruningWay(coins, amount) {
    /**
     * 上述方案是会超时的，这是因为递归过程中会进行大
     * 量的重复计算，我们可以利用map记录下已经计算过
     * 的金额的最小组成硬币数，后续递归就无需再次计算
     * 以此优化时间复杂度
     */

    // 利用map记录已经计算过的金额的最小组成硬币数
    let cache = new Map()

    /**
     * @description: 递归实现深度优先
     * @param {*} diff 当前剩余总金额
     */    
    function recurison(diff) {
        // 如果当前剩余总金额等于0，证明硬币能够
        // 组成总金额，结束递归返回0
        if (diff == 0) return 0;
        // 如果当前剩余总金额小于0证明硬币无法组
        // 成总金额，结束递归返回-1
        if (diff < 0) return -1;
        // 如果当前剩余总金额已经计算过，
        // 则返回已经计算过的金额的最小
        // 组成硬币数
        if (cache.has(diff)) return cache.get(diff);

        let minCount = Infinity;
        
        // 否则，不断对amount减去所有硬币面额，继续递归
        for (let coin of coins) {
            subCount = recurison(diff - coin)
            // 如果返回不等于-1，证明硬币能够
            // 组成总金额，记录比较最小硬币数
            if (subCount != -1) minCount = Math.min(minCount, subCount + 1)
            // 否则则无法组成总金额，无需处理
        }
        // 如果minCount还是等于Infinity，证明
        // 无法组成总金额，将minCount置为-1
        if (minCount == Infinity) minCount = -1
        // 存储当前总金额的计算结果
        cache.set(diff, minCount)
        // 返回结果
        return minCount
    }
    // 执行递归，返回结果
    return recurison(amount);
}

/**
 * @description: 动态规划  TC:O(n^2)  SC:O(n)
 * @param {*} coins  给定整数数组
 * @param {*} amount 给定整数
 */
function dp(coins, amount) {
    /**
     * 本方案使用DP，DP通常就是剪枝的回溯过程，DFS是
     * 自顶向下，然DP则是自底向上，因此如果理解了上述
     * 两种方案，DP自然是很好理解的
     */
    let DPArray = new Array(amount + 1).fill(amount + 1)
    DPArray[0] = 0
    for (let i = 1; i < DPArray.length; i++) {
        for (let coin of coins) {
            if (i - coin < 0) continue;
            DPArray[i] = Math.min(DPArray[i], 1 + DPArray[i - coin])
        }
    }
    return DPArray[amount] == amount + 1 ? -1 : DPArray[amount]
};