/*
 * @Description: 给你一个字符串 s 和一个字符串列表 wordDict 作为字典。
                 请你判断是否可以利用字典中出现的单词拼接出 s 。
 * @Author: JunLiangWang
 * @Date: 2023-10-14 09:27:57
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-10-14 09:38:39
 */


/**
 * @description: 动态规划  TC:O(n^2)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} s        给定字符串
 * @param {*} wordDict 给定单词数组
 * @return {*}
 */                 
function DP(s, wordDict){
    /**
     * 本方案使用动态规划的方式，对于字符串S而言其能否
     * 由wordDict单词组成可以将其问题的规模缩小，即为：
     * 对于字符串S[0至i]而言，能否由wordDict单词组成。
     * 
     * 如何判断字符串S[0至i]是否由wordDict组成呢？我们
     * 可以将其切分成两个部分，s[0至j]与s[j至i]，s[0至j]
     * 我们之前是判断过的，因此可以直接得出答案，最终我们
     * 仅需再次判断s[j至i]是否能由wordDict组成即可，最后
     * 我们可以得出转移方程：
     * 
     * dp[i]=dp[j]&&check(s[j至i])，dp[i]表示s[0至i]能否被
     * wordDict单词组成
     * 
     * 根据转移方程我们即可写出代码
     */

    // 定义DP数组
    let dpArray=new Array(s.length+1).fill(false);
    // 初始化0为true
    dpArray[0]=true;

    // 遍历字符串
    for(let i=0;i<=s.length;i++){
        // 选择切割位置
        for(let j=0;j<i;j++){
          // 如果s[0至j]以及s[j至i]能由wordDict组成，那么s[0至i]则
          // 能由wordDict单词组成
          if(dpArray[j]&&wordDict.includes(s.substring(j,i))){
              dpArray[i]=true;
              break;
          }
        }
    }
    // 返回结果
    return dpArray[s.length];
}