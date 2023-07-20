/*
 * @Description: 给你一个整数 n ，返回任一有效的 n 位格雷码序列 。
 * @Author: JunLiangWang
 * @Date: 2023-07-20 09:59:53
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-07-20 10:10:57
 */


/**
 * @description: 归纳法   TC:O(2^n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} n  给定整数n
 * @return {*}
 */
function inductionMethod(n){
    /**
     * 该方案使用归纳法，给定以下格雷码序列：
     * 
     * n=   0     1    2     3      4
     *      0     0    0     0      0
     *            1    1     1      1
     *                11    11     11
     *                10    10     10
     *                     110    110
     *                     111    111
     *                     101    101
     *                     100    100
     *                            ...
     * 我们可以找到规律，对于格雷序列n，它的前半部分
     * 是等于n-1的格雷序列，而它的后半部分等于前半部
     * 分倒序，在最高位补1。
     * 根据该规律，我们遍历模拟该过程即可
     */
    let outArray=[0];
    for(let i=1;i<=n;i++){
        let len=outArray.length;
        for(let j=len-1;j>=0;j--){
            outArray.push(outArray[j]|(1<<(i-1)));
        }
    }
    return outArray;
}