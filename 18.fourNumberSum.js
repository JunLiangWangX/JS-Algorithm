
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
                if (thirdIndex != secondIndex + 1 && nums[thirdIndex - 1] == nums[thirdIndex])
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