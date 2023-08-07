/*
 * @Description: 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
                 你可以按 任何顺序 返回答案。
 * @Author: JunLiangWang
 * @Date: 2023-06-29 09:06:49
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-06-29 09:26:02
 */



/**
 * @description: 递归+减枝   TC:O(2^n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} n  给定范围[1,n]
 * @param {*} k  给定k个数
 * @return {*}
 */
function recursionPruning(n, k) {
    /**
     * 该方案使用递归+减枝枚举所有组合
     */

    // 输出数组
    let outArray=[];

    /**
     * @description: 递归回溯枚举所有组合
     * @author: JunLiangWang
     * @param {*} currentNum  当前选中的数
     * @param {*} selectNum   已选中的数字数组
     * @return {*}
     */    
    function recursionBackTracking(currentNum, selectNum){
        // 当已选中的数的长度等于k，满足要求
        if (selectNum.length == k) {
            // 向输出数组添加该数组
            outArray.push(selectNum);
            // 直接返回
            return;
        }
        // 否则长度不等于k，继续递归

        // 由于currentNum之前都是已选中的数，
        // 因此直接从currentNum遍历到n继续递归
        for (let i = currentNum; i <= n; i++) {
            // 减枝：当已选择的数加上后续的数长度不能
            // 大于等于k，后续无论如何追加都已
            // 无法满足要求，因此要继续递归应当
            // 满足已选择的数加上后续的数长度大于等于k
            if(selectNum.length+n-i+1>=k)
            recursionBackTracking(i + 1, [...selectNum, i]);
        }
    }
    // 执行递归
    recursionBackTracking(1,[]);
    // 返回结果
    return outArray;
}