/*
 * @Description: 给定三个字符串 s1、s2、s3，请你帮忙验证 s3 是否是由 s1 和 s2 交错 组成的。
 * @Author: JunLiangWang
 * @Date: 2023-08-02 10:19:13
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-08-02 10:34:48
 */


/**
 * @description: 动态规划  TC:O(n^2)  SC:O(n^2)
 * @author: JunLiangWang
 * @param {*} s1  给定字符串s1
 * @param {*} s2  给定字符串s2
 * @param {*} s3  给定字符串s3
 * @return {*}
 */
function dp(s1,s2,s3){
    /**
     * 该方案使用动态规划的方式，首先有如果s1与s2的长度不等于s3
     * 证明无法组成，直接返回false。
     * 其次我们定义f(i,j)表示s1的前i个元素和s2的前j个元素能否交
     * 错组成s3的前i+j个元素。
     * 如果s1的第i个元素等于s3的第i+j个元素，证明需要交错，此时
     * 问题就被缩小至s1的前i-1个元素是否和s2的前j个元素能否交
     * 错组成s3的前i+j-1个元素，即：
     *        f(i,j)=f(i-1,j)
     * 如果s2的第j个元素等于s3的第i+j个元素，证明需要无需交错，
     * 此时问题就被缩小至s2的前i个元素是否和s2的前j-1个元素能否交
     * 错组成s3的前i+j-1个元素，即：
     *        f(i,j)=f(i,j-1)
     * 
     * 对此我们可以得出动态规划的转移方程：
     * 
     *  if(s1[i]==s3[i+j]) f(i,j)=f(i-1,j)
     *  if(s2[j]==s3[i+j]) f(i,j)=f(i,j-1)
     */

    // 首先有如果s1与s2的长度不等于s3证明无法组成，直接返回false。
    if(s1.length+s2.length!=s3.length)return false
    // 定义DP矩阵数组
    let DPArray=new Array(s1.length+1).fill(false).map(()=>new Array(s2.length+1).fill(false))
    // 初始化[0][0]为false
    DPArray[0][0]=true

    // 遍历元素
    for(let i=0;i<=s1.length;i++)
    {
        for(let j=0;j<=s2.length;j++){
            /**
             * 如果s2的第j个元素等于s3的第i+j个元素，证明需要无需交错， 
             * 此时问题就被缩小至s2的前i个元素是否和s2的前j-1个元素能否交
             * 错组成s3的前i+j-1个元素，即：f(i,j)=f(i,j-1)
             */
            if(j>0&&s2[j-1]==s3[i+j-1]){
                DPArray[i][j]=DPArray[i][j-1]
            }
            /**
             * 如果s1的第i个元素等于s3的第i+j个元素，证明需要交错，此时
             * 问题就被缩小至s1的前i-1个元素是否和s2的前j个元素能否交
             * 错组成s3的前i+j-1个元素，即：
             *        f(i,j)=f(i-1,j)
             */
            if(i>0&&s1[i-1]==s3[i+j-1]){
                // 为什么会使用|=，由于s2[j-1],s1[i-1],s3[i+j-1]
                // 可能存在3者都相等的情况，此时任意为真都应该为真
                DPArray[i][j]|=DPArray[i-1][j]
            }
        }
    }
    // 返回结果
    return DPArray[s1.length][s2.length]
}