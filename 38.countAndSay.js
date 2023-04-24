/*
 * @Description: 给定一个正整数 n ，输出外观数列的第 n 项。
 * @Author: JunLiangWang
 * @Date: 2023-04-24 09:46:54
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-04-24 10:01:25
 */


/**
 * @description: 迭代法   TC:O(n^2)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} n   获取第n项外观数列
 * @return {*}
 */
function iteration(n){
    /**
     * 该方案使用迭代模拟外观数列生成的过程
     */

    // 初始化[外观数列]为1
    let str='1';
    // 循环次数n-1次，由于str初始化为[外观数列]的第一项，所以
    // 此处循环n-1次获得第n项[外观数列]
    while(--n>0)
    {
        // 统计相邻的相同数字出现次数，初始化为1
        // 因为每个字符至少出现1次
        let count=1,
        // 当前项[外观数列]
            tempStr='';
        // 遍历上次[外观数列]以生成本次外观数列
        for(let i=0;i<str.length;i++)
        {
            // 如果相邻的字符相同，则count+1，
            if(str[i]==str[i+1]) count++;
            // 否则不同，则将(统计次数+当前字符)追加到本次[外观数列]中
            // 并将统计次数重置为1
            else
            {
                tempStr+=(count+str[i]);
                count=1;
            }
        }
        // 将str赋值为当前项[外观数列]
        str=tempStr;
    }
    // 返回结果
    return str;
}