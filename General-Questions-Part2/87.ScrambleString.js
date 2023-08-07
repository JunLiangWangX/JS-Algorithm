/*
 * @Description: 你两个 长度相等 的字符串 s1 和 s2，判断 s2 是否是 s1 的扰乱字符串。如果是，返回 true ；否则，返回 false 。
 * @Author: JunLiangWang
 * @Date: 2023-07-18 08:49:26
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-07-18 09:31:04
 */


/**
 * @description: 递归回溯   TC:O(2^n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} s1  给定字符串s1
 * @param {*} s2  给定字符串s2
 * @return {*}
 */
function recursionBacktracking(s1, s2) {
    /**
     * 该方案使用递归回溯模拟生成扰乱字符串过程
     */

    // 如果两字符串相等，s2则为s1的扰乱字符串
    if (s1 == s2) return true;
    // 如果两字符串长度不相等，s2则不为s1的扰乱字符串
    if (s1.length != s2.length) return false;

    // 从索引1(由于索引0的情况s1==s2已判断)遍历两字符
    // 串(s1,s2长度相等，因此使用s1的长度即可)
    for (let i = 1; i < s1.length; i++) {
        // 从i处分割字符串s1，preString为前缀
        // lastString为后缀
        const preString = s1.substr(0, i),
            lastString = s1.substr(i),
            // 从i处分割字符串s2，comparePreString为前缀
            // compareLastString为后缀
            comparePreString = s2.substr(0, i),
            compareLastString = s2.substr(i);
        // 判断无交换的情况，即:s2=preString+lastString，继续
        // 递归判断preString是否comparePreString的扰乱字符串
        // lastString是否compareLastString的扰乱字符串，如果是
        // 证明s2为s1的扰乱字符串，此时返回true
        if (recursionBacktracking(preString, comparePreString) && recursionBacktracking(lastString, compareLastString)) return true;
        // 否则判断有交换的情况，即:s2=lastString+preString,

        // 从后到前以i位置分割字符串，获得交换后的preString，lastString
        const exchangeComparePreString = s2.substr(0, s2.length - i),
            exchangeCompareLastString = s2.substr(s2.length - i);
        // 继续递归判断preString是否exchangeCompareLastString的扰乱字符串
        // lastString是否exchangeComparePreString的扰乱字符串，如果是
        // 证明s2为s1的扰乱字符串，此时返回true
        if (recursionBacktracking(preString, exchangeCompareLastString) && recursionBacktracking(lastString, exchangeComparePreString)) return true
    }
    // 如果遍历完成仍无，则返回false
    return false;
}


/**
 * @description: 记忆搜索  TC:O(2^n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} s1  给定字符串s1
 * @param {*} s2  给定字符串s2
 * @return {*}
 */
function memorySearch(s1, s2) {
    /**
     * 我们可以对上述递归回溯方式进行优化，加入记忆搜索。
     * 对于每次递归回溯我们将其结果添加到map中，到后面
     * 有重复递归内容，我们可直接查询map获取结果，而无
     * 需递归，从而优化时间复杂度。
     */

    // 定义记录递归结果的map
    let cache = new Map();
    /**
     * @description: 递归回溯   TC:O(2^n)  SC:O(1)
     * @author: JunLiangWang
     * @param {*} str1 给定字符串str1
     * @param {*} str2 给定字符串str2
     * @return {*}
     */
    function recursionBacktracking(str1, str2) {
        // 生成map中的key
        let key = str1 + '+' + str2;

        // 如果两字符串相等，str2则为str1的扰乱字符串
        // 并向map添加递归结果
        if (str1 == str2) {
            cache.set(key, true);
            return true;
        }
        // 如果两字符串长度不相等，s2则不为s1的扰乱字符串
        // 并向map添加递归结果
        if (str1.length != str2.length) {
            cache.set(key, false);
            return false;
        }
        // 查询map中有无记录的结果，有则直接返回其递归结果。
        let result = cache.get(key)
        if (result != undefined) return result;

        // 从索引1(由于索引0的情况s1==s2已判断)遍历两字符
        // 串(s1,s2长度相等，因此使用s1的长度即可)
        for (let i = 1; i < str1.length; i++) {
            // 从i处分割字符串s1，preString为前缀
            // lastString为后缀
            const preString = str1.substr(0, i),
                lastString = str1.substr(i),
                // 从i处分割字符串s2，comparePreString为前缀
                // compareLastString为后缀
                comparePreString = str2.substr(0, i),
                compareLastString = str2.substr(i);
            // 判断无交换的情况，即:s2=preString+lastString，继续
            // 递归判断preString是否comparePreString的扰乱字符串
            // lastString是否compareLastString的扰乱字符串，如果是
            // 证明s2为s1的扰乱字符串，此时返回true,并向map添加递归结果
            if (recursionBacktracking(preString, comparePreString) && recursionBacktracking(lastString, compareLastString)) {
                cache.set(key, true);
                return true;
            }
            // 否则判断有交换的情况，即:s2=lastString+preString,

            // 从后到前以i位置分割字符串，获得交换后的preString，lastString
            const exchangeComparePreString = str2.substr(0, str2.length - i),
                exchangeCompareLastString = str2.substr(str2.length - i);
            // 继续递归判断preString是否exchangeCompareLastString的扰乱字符串
            // lastString是否exchangeComparePreString的扰乱字符串，如果是
            // 证明s2为s1的扰乱字符串，此时返回true,并向map添加递归结果
            if (recursionBacktracking(preString, exchangeCompareLastString) && recursionBacktracking(lastString, exchangeComparePreString)) {
                cache.set(key, true);
                return true;
            }
        }
        // 如果遍历完成仍无，则返回false,并向map添加递归结果
        cache.set(key, false);
        return false;
    }

    // 执行递归，返回结果
    return recursionBacktracking(s1, s2);
}


/**
 * @description: 动态规划  TC:O(n^4)  SC:O(n^3)
 * @author: JunLiangWang
 * @param {*} s1  给定字符串s1
 * @param {*} s2  给定字符串s2
 * @return {*}
 */
function dp(s1,s2){
    /**
     * 该方式使用动态规划的方式，给定两字符串S与T，
     * 假设T是S的扰乱字符串则有以下情况：
     *  
     *  1.T==S
     *  2.S能够分割字符串为S1，S2;T同样能够分割字符串为T1，T2，
     *    此时会出现两种情况：
     *      情况一：无需交换，S1==T1,S2==T2
     *      情况二：需要交换，S1==T2,S2==T1
     * 
     * 此时即可将一个复杂问题划分若干子问题，因此我们可以定义一个
     * 三维数组(DPArray),第一个维度索引代表S的起点位置，第二个维
     * 度索引代表T的起点位置，第三个维度代表长度，DPArray[i][j][k]
     * 则表示了S从i开始k长度字符串是否为T从j开始k长度字符串的扰乱字符
     * 
     */
    // 如果两字符串相等，s2则为s1的扰乱字符串
    if(s1===s2)return true;

    // 定义DP数组
    let DPArray=new Array(s1.length).fill(0)
    .map(()=>new Array(s1.length).fill(0)
    .map(()=>new Array(s1.length+1).fill(false)))

    // 初始化单个字符的情况
    for(let i=0;i<DPArray.length;i++){
        for(let j=0;j<DPArray.length;j++){
            DPArray[i][j][1]=s1[i]==s2[j]
        }
    }

    // 枚举区间长度 2～字符串长度
    for(let len=2;len<=s1.length;len++){
        
         // 枚举 s1 中的起点位置
        for(let i=0;i<=s1.length-len;i++){
            // 枚举 s2 中的起点位置
            for(let j=0;j<=s1.length-len;j++){
                // 枚举划分位置
                for(let k=1;k<len;k++){
                    // 第一种情况：S1 ==  T1, S2 == T2
                    if(DPArray[i][j][k]&&DPArray[i + k][j + k][len - k]){
                        DPArray[i][j][len]=true
                        break;
                    }
                    // 第一种情况：S1 ==  T2, S2 == T1
                    // S1 起点 i，T2 起点 j + 前面那段长度 len-k ，S2 起点 i + 前面长度k
                    if(DPArray[i][j+len-k][k]&&DPArray[i+k][j][len-k]){
                        DPArray[i][j][len]=true
                        break;
                    }
                }
            }
        }
    }
    // 返回结果
    return DPArray[0][0][s1.length];
}