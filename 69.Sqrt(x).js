/*
 * @Description: 给你一个非负整数 x ，计算并返回 x 的 算术平方根 ,结果只保留 整数部分。
 * @Author: JunLiangWang
 * @Date: 2023-06-14 09:04:08
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-06-14 09:08:49
 */



function simulation(x){
    /**
     * 本方案使用模拟的方式，由于仅需要返回算术平方
     * 根整数部分，因此我们只需要从1开始逐步递增找
     * 到第一个其平方大于x的数，然后将该数-1即为答
     * 案
     */

    let root=1;
    // 从1开始逐步递增，找到第一个其平方大于x的数
    while(root*root<=x)root++;
    // 将该数-1即为答案
    return root-1;
}