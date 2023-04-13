/*
 * @Description: 不使用乘法、除法和取余运算，实现两数相除，且结果向下取整
 * @Author: JunLiangWang
 * @Date: 2023-04-13 08:55:11
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-04-13 10:23:30
 */


/**
 * @description: 迭代法    TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} dividend
 * @param {*} divisor
 * @return {*}
 */
function iteration(dividend, divisor) {
    /**
     * 本方案使用迭代法，除法:dividend/divisor=quotient我们可以看作为quotient*divisor==dividend，
     * 由于除数/被除数都有正负的情况，我们先将其符号拿掉全部视为正数(符号不影响最终计算结果绝对值的大小)，
     * 且本题为向下取整，因此上述式子则为：quotient*divisor<=dividend，我们取出最大的quotient即为答案。
     * 最终我们利用迭代加法模拟乘法(例如:4*3=12可转换为加法3+3+3+3=12) 来得到quotient。
     */

    // 1.处理一些特殊情况

    // 如果被除数为0，则直接返回0
    if (dividend === 0) return 0
    // 如果除数为0，则直接返回null
    if (divisor === 0) return null
    // 如果除数为1，则直接返回被除数
    if (divisor === 1) return dividend
    // 如果除数为-1，则返回-被除数，当被除数等于负数最大值(-2147483648)时，转为正时
    // 为2147483648数值溢出，此时应该返回正数最大值2147483647，当被除数等于正数最大
    // 值(2147483647)时，转为负数则不存在溢出
    if (divisor === -1) return dividend == -2147483648 ? 2147483647 : -dividend

    // 2.处理符号，且将除数/被除数全转为负数处理

    // 是否为负数，初始化为false
    let isNegativeNumber = false;
    // 将除数/被除数全部转为负数处理(由于正数转负数不存在溢出问题，而负数转正数则存在溢出，
    // 因此才全部将其转换为负数处理)，并用变量(isNegativeNumber)记录最终结果为正or负数。
    if (dividend >= 0) dividend = -dividend;
    else isNegativeNumber = !isNegativeNumber;
    if (divisor >= 0) divisor = -divisor;
    else isNegativeNumber = !isNegativeNumber;

    // 3.迭代模拟乘法

    // 初始化商为0，相加结果为除数
    let quotient = 0,
        sum = divisor;
    // 利用迭代加法模拟乘法，quotient*divisor等于sum，当sum等于dividend，quotient即为
    // 最终答案，但本题为向下取整，且此处全为负数，因此sum>=dividend，取出quotient最大值
    // dividend/divisor向下取整的商
    while (sum >= dividend) {
        sum += divisor
        quotient++;
    }
    // 加上符号返回结果
    return isNegativeNumber ? -quotient : quotient;

}


/**
 * @description: 类二分   TC:(log2n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} dividend
 * @param {*} divisor
 * @return {*}
 */
function similarDichotomy(dividend, divisor) {
    /**
     * 上述迭代方案也有继续优化的地方，上述方案中我们是不断通过叠加divisor来逼近dividend的
     * 例：divisor+divisor+divisor......<=dividend，其实我们可以通过倍增divisor的方式来
     * 更快的逼近dividend，例:divisor*2+divisor*4+divisor*8.......<=dividend。但该题无
     * 法使用乘法，此时我们可以使用左移来达到目的，<<1等于*2,<<2等于*4。该方案则为类二分。
     */

    // 1.处理一些特殊情况

    // 如果被除数为0，则直接返回0
    if (dividend === 0) return 0
    // 如果除数为0，则直接返回null
    if (divisor === 0) return null
    // 如果除数为1，则直接返回被除数
    if (divisor === 1) return dividend
    // 如果除数为-1，则返回-被除数，当被除数等于负数最大值(-2147483648)时，转为正时
    // 为2147483648数值溢出，此时应该返回正数最大值2147483647，当被除数等于正数最大
    // 值(2147483647)时，转为负数则不存在溢出
    if (divisor === -1) return dividend == -2147483648 ? 2147483647 : -dividend

    // 2.处理符号，且将除数/被除数全转为负数处理

    // 是否为负数，初始化为false
    let isNegativeNumber = false;
    // 将除数/被除数全部转为负数处理(由于正数转负数不存在溢出问题，而负数转正数则存在溢出，
    // 因此才全部将其转换为负数处理)，并用变量(isNegativeNumber)记录最终结果为正or负数。
    if (dividend >= 0) dividend = -dividend;
    else isNegativeNumber = !isNegativeNumber;
    if (divisor >= 0) divisor = -divisor;
    else isNegativeNumber = !isNegativeNumber;

    // 3.利用倍增逼近dividend

    // 初始化商为0
    let quotient=0;
    // 此处divisor/dividend为负数，因此dividend>divisor则证明|dividend|<|divisor|
    // 被除数已小于除数，超出了范围，此时跳出循环
    while (divisor>=dividend) {
       let tempSum = divisor,tempQuotient = 1;

       // 使用divisor倍增，找到能逼近dividend的最大数
       // while (tempSum << 1 >= dividend)  倍增除了左移，也可使用+本身来实现
       while(tempSum+tempSum>=dividend)
       {
            // tempSum = tempSum << 1; 倍增除了左移，也可使用+本身来实现
            tempSum+=tempSum
            // tempQuotient= tempQuotient<<1; 倍增除了左移，也可使用+本身来实现
            tempQuotient+=tempQuotient
        }
        // 减去已找到的倍增逼近的最大数
        dividend-=tempSum;
        // 加上倍增的商
        quotient+=tempQuotient;
    }


    // 加上符号返回结果
    return isNegativeNumber ? -quotient : quotient;
}