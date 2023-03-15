/*
 * @Description:给你一个整数组成的数组和一个目标值，请你找出数组中所有和为目标值的不重复的四个元素
 * @Author: JunLiangWang
 * @Date: 2023-03-15 23:41:36
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-03-16 00:33:03
 */


/**
 * @description: 暴力破解   TC:O(n^4)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} nums    输入的数组
 * @param {*} target  输入的目标
 * @return {*}
 */
function bruteForce(nums, target) {
    // 对数组排序(升序)
    nums.sort((a, b) => a - b)
    let outArray = []
    // 从0开始遍历数组，确定第一位数的位置
    for (let firstIndex = 0; firstIndex < nums.length; firstIndex++) {
        // 如果该数位置不为首位，并且该数等于上一位数，证明该数上次已计算，避免重复本次直接跳过
        if (firstIndex != 0 && nums[firstIndex - 1] == nums[firstIndex]) continue
        // 从第一位数的后一位数开始遍历数组，确定第二位数
        for (let secondIndex = firstIndex + 1; secondIndex < nums.length; secondIndex++) {
            // 同上
            if (secondIndex != firstIndex + 1 && nums[secondIndex - 1] == nums[secondIndex]) continue
            // 从第二位数的后一位数开始遍历数组，确定第三位数
            for (let thirdIndex = secondIndex + 1; thirdIndex < nums.length; thirdIndex++) {
                // 同上
                if (thirdIndex != secondIndex + 1 && nums[thirdIndex - 1] == nums[thirdIndex]) continue
                // 从第三位数的后一位数开始遍历数组，确定第四位数
                for (let forthIndex = thirdIndex + 1; forthIndex < nums.length; forthIndex++) {
                    // 同上
                    if (forthIndex != thirdIndex + 1 && nums[forthIndex - 1] == nums[forthIndex]) continue
                    if (nums[firstIndex] + nums[secondIndex] + nums[thirdIndex] + nums[forthIndex] == target)
                        outArray.push([nums[firstIndex], nums[secondIndex], nums[thirdIndex], nums[forthIndex]])
                }
            }
        }
    }
    return outArray
}


/**
 * @description: 双指针   TC:O(n^3)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} nums    输入的数组
 * @param {*} target  输入的目标
 * @return {*}
 */
function doublePoint(nums, target) {
    // 先对数组进行排序(升序)
    nums.sort((a, b) => a - b)
    // 定义输出数组
    let outArray = []
    // 从首位元素遍历数组，确定第一位数
    for (let firstIndex = 0; firstIndex < nums.length; firstIndex++) {
        // 如果该数不为首位元素，且该数等于上一位数，则证明该数在上一次已被计算，避免重复本次则跳过
        // 由于是升序数组，每次仅需与上一数字比较是否相等即可
        if (firstIndex != 0 && nums[firstIndex - 1] == nums[firstIndex]) continue
        // 从第一位数的下一位数开始遍历，确定第二位书
        for (let secondIndex = firstIndex + 1; secondIndex < nums.length; secondIndex++) {
            // 同上判断是否重复
            if (secondIndex != firstIndex + 1 && nums[secondIndex - 1] == nums[secondIndex]) continue
            // 第三位从第二位数的下一位数开始遍历
            let thirdIndex = secondIndex + 1
            // 第四位数从最后一位元素开始遍历
            let forthIndex = nums.length - 1
            // 当第三位数的位置超过了第四位数，证明已遍历完成所有元素
            while (thirdIndex < forthIndex) {
                // 同上判断是否重复，重复则将位置向后移动一位，跳过本次计算
                if (thirdIndex != secondIndex + 1 && nums[thirdIndex - 1] == nums[thirdIndex]) {
                    thirdIndex++
                    continue
                }
                // 同上判断是否重复，重复则将位置向前移动一位，跳过本次计算
                if (forthIndex != nums.length - 1 && nums[forthIndex + 1] == nums[forthIndex]) {
                    forthIndex--
                    continue
                }
                // 计算差值
                let DValue = target - (nums[firstIndex] + nums[secondIndex] + nums[thirdIndex] + nums[forthIndex])
                // 如果等于0，则证明四个元素和为target，则记录四个元素
                if (DValue == 0) {
                    outArray.push([nums[firstIndex], nums[secondIndex], nums[thirdIndex], nums[forthIndex]])
                    thirdIndex++
                    forthIndex--
                }
                // 如果差值大于零，则证明四数之和小于target，此时应当增大四数之和来接近target，
                // 由于数组是升序的，因此仅需第三位数向后移动即可增大四数之和
                else if (DValue > 0) thirdIndex++
                // 反之则第四数向前移动即可减少四数之和
                else forthIndex--
            }
        }
    }
    return outArray
}