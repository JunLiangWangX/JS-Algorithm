/*
 * @Description: 给你一个非负整数 x ，计算并返回 x 的 算术平方根 ,结果只保留 整数部分。
 * @Author: JunLiangWang
 * @Date: 2023-06-14 09:04:08
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-06-14 10:13:31
 */


/**
 * @description: 模拟法   TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} x 给定非负整数 x
 * @return {*}
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


/**
 * @description: 二分法  TC:O(logn)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} x 给定非负整数 x
 * @return {*}
 */
function binary(x){
    /**
     * 本方案使用二分法，上述模拟法是通过将根逐步递增1来逼近答案的，
     * 因此存在优化空间，我们可以利用二分法不断在分割区间并做选择，
     * 使其2倍增或2倍减的方式逼近答案
     */

    // 初值化左指针为0
    let left=0,
    // 初值化右指针为x
    right=x,
    // 初始化中间值为0
    middle=0
    // 当左指针超出了右指针，遍历完成
    while(left<=right){
        // 计算中间值
        middle=Math.floor((left+right)/2);
        // 如果中间值的平方等于x，则为答案直接返回
        if(middle*middle==x)return middle;
        // 如果中间值的平方大于x,证明[middle,right]区间
        // 的平方都是大于x的，因此舍去该区间，并重置为
        // [left,middle-1]
        else if(middle*middle>x)right=middle-1
        // 如果中间值的平方小于x,证明[left,middle]区间
        // 的平方都是小于x的，因此舍去该区间，并重置为
        // [middle+1,right]
        else left=middle+1
    }
    // 当遍历完成都未找到平方与x相等的答案，
    // 此时返回left-1即可
    return left-1;
}

/**
 * @description: 牛顿迭代法   TC:O(logn)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} x
 * @return {*}
 */
function newtonIteration(x){
    /**
     * 该方案使用牛顿迭代法,我们不断用(x,f(x))的切线来逼近x^2-a=0的根。
     * 根号a其实就是x^2-a=0的一个正实根，这个函数的导数为2x。也就是说
     * 函数上任意一点(x,f(x))的切线斜率为2x。那么，x-f(x)/(2x)就是一
     * 个比x更接近的近似值。法如f(x)=x^2-a得到x-(x^2-a)/(2x)，也就是
     * (x+a/x)/2。
     *  */ 
    
    if (x == 0) {
        return 0;
    }

    let C = x, x0 = x;
    while (true) {
        let xi = 0.5 * (x0 + C / x0);
        if (Math.abs(x0 - xi) < 1e-7) {
            break;
        }
        x0 = xi;
    }
    return Math.floor(x0);
}