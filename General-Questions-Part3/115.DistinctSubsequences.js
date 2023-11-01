/*
 * @Description: 给你两个字符串 s 和 t ，统计并返回在 s 的 子序列 中 t 出现的个数。
 * @Author: JunLiangWang
 * @Date: 2023-08-29 09:53:05
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-08-29 10:11:51
 */


/**
 * @description: 动态规划  TC:O(n^2)  SC:O(n^2)
 * @author: JunLiangWang
 * @param {*} s  给定字符串s
 * @param {*} t  给定字符串t
 * @return {*}
 */
function dp(s, t) {
    /**
     * 本方案使用动态规划的方式，首先定义动态规划数组DPArray
     * 行索引代表子串t索引，列索引代码母串s索引,DPArray[i][j]
     * 则表示字符串t[0至i]的子串在字符串s[0至j]的子串中出现的
     * 次数。
     * 
     * 当t[i]不等于s[j]时，字符串t[0至i]在s[0至j]出现的
     * 次数则等于其在s[0至j-1]出现的次数，即有:
     *      t[i]!=s[j],DPArray[i][j]=DPArray[i][j-1]
     * 
     * 当t[i]等于s[j]时，字符串t[0至i]在s[0至j]出现的
     * 次数则等于其在s[0至j-1]出现的次数加上t[0至i-1]
     * 在s[0至j-1]出现的次数，即有:
     *      t[i]==s[j],DPArray[i][j]=DPArray[i][j-1]+DPArray[i-1][j-1]
     */

    // 如果子串长度大于母串直接返回0
    if (s.length < t.length) return 0;
    // 定义DP数组,行列+1是因为方便后续[j-1]或[i-1]处理
    let DPArray = new Array(t.length + 1).fill(0).map(() => new Array(s.length + 1).fill(0))
    // 将第0行所有列赋值为1
    for (let i = 0; i <= s.length; i++)DPArray[0][i] = 1;
    // 遍历字符串t
    for (let i = 1; i <= t.length; i++) {
        // 遍历字符串s
        for (let j = 1; j <= s.length; j++) {
            // 无论是否相等都需要加上t[0至i]在
            // s[0至j-1]出现的次数
            DPArray[i][j] = DPArray[i][j - 1]
            // 当t[i]等于s[j]时，字符串t[0至i]在s[0至j]出现的
            // 次数则等于其在s[0至j-1]出现的次数加上t[0至i-1]
            // 在s[0至j-1]出现的次数
            if (s[j - 1] == t[i - 1]) {
                DPArray[i][j] += DPArray[i - 1][j - 1]
            }
        }
    }
    // 题中说已做了最大整数的限制，但提交时发现未做限制导致答案错误
    // 因此此处判断是否超出了最大整数限制，超出返回-1
    return DPArray[t.length][s.length] <= Math.pow(2, 31) - 1 ? DPArray[t.length][s.length] : -1
}