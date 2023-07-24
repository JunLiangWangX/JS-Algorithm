/*
 * @Description: 给你一个只含数字的 非空 字符串 s ，请计算并返回 解码 方法的 总数 
 * @Author: JunLiangWang
 * @Date: 2023-07-24 09:54:50
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-07-24 10:03:04
 */


/**
 * @description: 递归回溯   TC:O(2^n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} s 给定字符串S
 * @return {*}
 */
function recursionBackTracking(s){
    /***
     * 该方案使用递归回溯的方式，逐个以1个/2个字符
     * 组成解码方法递归字符串S。
     */

    // 记录解码方式数量
    let count=0;

    /**
     * @description: 递归
     * @author: JunLiangWang
     * @param {*} index 当前递归到字符串S索引位置
     * @return {*}
     */    
    function cursion(index){
        // 如果索引超出s长度，证明已遍历完字符串所
        // 有字符满足解码要求，此时解码方式+1
        if(index>=s.length){
            count++;
            return ;
        }
        // 如果当前字符等于0，无论是以该字符单独解码
        // 还是以它作为首位，与其他字符组合解码都是
        // 无法解码的，例如：'0'或'02'。此时结束递归
        if(s[index]!=0){
          // 以该字符单独解码的方式，继续递归。
          cursion(index+1)
          // 如果该字符满足与下一个字符组合解码
          if(s[index+1]!=undefined&&s[index]*10+s[index+1]*1<=26)
          // 则与下一个字符组合解码，继续递归。
          cursion(index+2)
        }
    }
    // 执行递归
    cursion(0)
    // 返回结果
    return count;
}