/*
 * @Description: 给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是
                 回文串 。返回 s 所有可能的分割方案。
 * @Author: JunLiangWang
 * @Date: 2023-09-27 15:37:49
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-09-27 16:00:00
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
        // 存储分割的字符串
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

 /**
  * @description: 递归回溯+记忆化搜索   TC:O(2^n)  SC:O(n^2)
  * @author: JunLiangWang
  * @param {*} s  给定字符串S
  * @return {*}
  */
function memoizedSearch(s){
    // 输出数组
    let outArray=[],
    // 存储[i,j]是否回文字符串
    record = new Array(s.length).fill(0).map(() => new Array(s.length).fill(0));
    
    /**
     * @description: 判断是否回文串，上述递归回溯中，每次
     *               判断是否回文串都会重新遍历整个字符串
     *               来判断，因此我们可以使用矩阵存储索引
     *               i到j是否为回文字符串，下次无需再次遍
     *               历, 0为未搜索，1为是回文串，-1为不是
     *               回文串
     * @author: JunLiangWang
     * @param {*} i  开始索引
     * @param {*} j  结束索引
     * @return {*}
     */   
   function isPalindrome (i, j) {
        if (record[i][j] !== 0) {
            return record[i][j];
        }
        if (i >= j) {
            record[i][j] = 1;
        } else if (s[i] === s[j]) {
            record[i][j] = isPalindrome(i + 1, j - 1);
        } else {
            record[i][j] = -1;
        }
        return record[i][j];
    }
    /**
     * @description: 递归分割字符串
     * @author: JunLiangWang
     * @param {*} index  开始索引
     * @param {*} array  已分割的字符数组
     * @return {*}
     */    
    function recursion(index,array){
        // 如果超出数组索引证明分割结束，直接添加
        if(s.length==index)outArray.push(array);
        // 存储分割的字符串
        let tempStr=''
        for(let i=index;i<s.length;i++){
            tempStr+=s[i]
            // 判断是否回文串，是的话分割剩下的字符串
            if(isPalindrome(index,i)==1){
                recursion(i+1,[...array,tempStr])
            }
        }
    }
    // 执行递归
    recursion(0,[])
    // 返回结果
    return outArray
}