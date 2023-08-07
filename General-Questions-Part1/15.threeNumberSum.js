/*
 * @Description: 给你一个整数数组nums,判断是否存在三元组[nums[i], nums[j], nums[k]]满足
                 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0，
                 请你返回所有和为 0 且不重复的三元组。
 * @Author: JunLiangWang
 * @Date: 2023-03-11 15:32:41
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-03-11 16:52:58
 */


/**
 * @description: 暴力破解   TC:O(n^3)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} nums  输入的数组
 * @return {*}
 */
function bruteForce(nums) {
    // 将数组进行排序
    nums.sort((a, b) => a - b)
    let outArray = []
    for (let i = 0; i < inArray.length; i++) {
        // 当i不等于0且当前数字等于上一个数字时，该数字在上轮循环中已得出结果，为避免重复则跳过
        if (i != 0 && inArray[i] == inArray[i - 1]) continue
        for (let j = i + 1; j < inArray.length; j++) {
            // 同上
            if (j != i + 1 && inArray[j] == inArray[j - 1]) continue
            for (let k = j + 1; k < inArray.length; k++) {
                //同上
                if (k != j + 1 && inArray[k] == inArray[k - 1]) continue
                //当三数字结果相加等于0，添加到输出数组
                if (inArray[i] + inArray[j] + inArray[k] == 0)
                    outArray.push([inArray[i], inArray[j], inArray[k]])
            }
        }
    }
    return outArray
}

/**
 * @description: 双指针  TC:O(n^2)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} nums  输入的数组
 * @return {*}
 */
function doublePoint(nums) {
    // 双指针方法是在暴力破解的基础进行改造的，第一层与第二层循环与暴力破解没什么区别，
    // 而第三层循环则利用了升序数组的特点，如果我们固定了前两重循环枚举到的元素a和b，
    // 那么只有唯一的c满足a+b+c=0,当第二重循环往后枚举一个元素b'时，由于数组升序，则
    // nums[b']>nums[b],那么满足a+b'+c'=0,则肯定c'<c,也就是说，我们可以从小到大枚举 
    // b，同时从大到小枚举c。
    
    // 将数组排序(升序)
    nums.sort((a, b) => a - b)
    // 定义输出的变量
    let outArray = []
    // 第一层循环，从小到大遍历nums数组，确定第一个数
    for (let firstIndex = 0; firstIndex < nums.length; firstIndex++) {
        // 当该数不为数组的第一个元素且等于上一个数时，证明该数在上轮循环中已得出结果，为避免重复则直接跳过
        if (firstIndex != 0 && nums[firstIndex] == nums[firstIndex - 1]) continue
        // 第三个数应该从大到小遍历，初值为nums最后一个数(也是最大的数)
        let thirdIndex = nums.length - 1
        // 第二层循环，从第一层循环中确定的第一个数的下一个数开始遍历（由于题中不能重复），确定第二个数
        for (let secondIndex = firstIndex + 1; secondIndex < nums.length; secondIndex++) {
            // 同上
            if (secondIndex != firstIndex + 1 && nums[secondIndex] == nums[secondIndex - 1]) continue
            // 确定第三个数，当三者和不大于0，则为此时第三个数的位置，当第二层循环往后枚举，第二个数不断增大，
            // 第三个数则不断向前，不断减小来满足三者和不大于0，直到第二个数的位置超过了第三个数的位置，证明
            // 已遍历完成
            while (secondIndex < thirdIndex && nums[firstIndex] + nums[secondIndex] + nums[thirdIndex] > 0)
                thirdIndex--
            // 当第二个数的位置与第三个数重合，证明遍历完成，跳出循环，重新确定第一个数
            if (secondIndex == thirdIndex) break;
            // 如果第二个数的位置与第三个数并未重合，且和为0，则添加
            if (nums[firstIndex] + nums[secondIndex] + nums[thirdIndex] == 0)
                outArray.push([nums[firstIndex], nums[secondIndex], nums[thirdIndex]])
        }
    }
    return outArray
}