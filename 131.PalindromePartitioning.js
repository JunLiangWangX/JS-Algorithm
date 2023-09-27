/*
 * @Description: 给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是
                 回文串 。返回 s 所有可能的分割方案。
 * @Author: JunLiangWang
 * @Date: 2023-09-27 15:37:49
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-09-27 15:53:12
 */


 /**
  * @description: 递归回溯   TC:O(2^n*n)  SC:O(n^2)
  * @author: JunLiangWang
  * @param {*} s  给定字符串S
  * @return {*}
  */
 function recursionBacktracking (s) {
    // 输出数组
    let outArray=[]
    /**
     * @description: 双指针判断是否回文串
     * @author: JunLiangWang
     * @param {*} start  开始索引
     * @param {*} end    结束索引
     * @return {*}
     */    
    function isPalindrome (start, end) {
        // 回文串左右相同，因此使用双指针从两边向中间靠拢比对
        // 如果出现不同则不是回文串
        while (start < end)
        if (s.charAt(start++) !== s.charAt(end--))
            return false;
        return true;
    }
    /**
     * @description: 递归分割字符串
     * @author: JunLiangWang
     * @param {*} index  开始索引
     * @param {*} array  已分割的字符数组
     * @return {*}
     */    
    function recursion(index,strArray){
        // 如果超出数组索引证明分割结束，直接添加
        if(s.length==index)outArray.push(strArray);
        // 存储临时字符串
        let tempStr=''
        for(let i=index;i<s.length;i++){
            tempStr+=s[i]
            // 判断是否回文串，是的话分割剩下的字符串
            if(isPalindrome(index,i)){
                recursion(i+1,[...strArray,tempStr])
            }
        }
    }
    // 执行递归
    recursion(0,[])
    // 返回结果
    return outArray
};                 