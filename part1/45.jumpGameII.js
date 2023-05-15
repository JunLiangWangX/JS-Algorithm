/*
 * @Description: 给定一个长度为 n 的 0 索引整数数组 nums。初始位置为 nums[0]。每个元素 nums[i] 表示从索引 i 向前跳转的最大长度。
                 换句话说，如果你在 nums[i] 处，你可以跳转到任意 nums[i + j] 处:
                    1. 0 <= j <= nums[i] 
                    2. i + j < n
                 返回到达 nums[n - 1] 的最小跳跃次数。生成的测试用例可以到达 nums[n - 1]。
 * @Author: JunLiangWang
 * @Date: 2023-05-06 11:05:35
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-05-06 11:44:06
 */



/**
 * @description: 贪心   TC:O(n^2)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} nums   给定数组
 * @return {*}
 */
function greedy(nums){
    /**
     * 该方案使用贪心算法，我们的目标是到达数组的最后一个位置，因此我们可以考虑最后一步跳跃前所在的位置，
     * 该位置通过跳跃能够到达最后一个位置。如果有多个位置通过跳跃都能够到达最后一个位置，我们可以「贪心」
     * 地选择距离最后一个位置最远的那个位置，也就是对应下标最小的那个位置。因此，我们可以从左到右遍历数组
     * ，选择第一个满足要求的位置。找到最后一步跳跃前所在的位置之后，我们继续贪心地寻找倒数第二步跳跃前所
     * 在的位置，以此类推，直到找到数组的开始位置。
     */

    // 定义当前所到达的索引为最后一个元素索引
    let currentIndex=nums.length-1,
    // 定义当前步数为0
        step=0;
    
    // 当当前索引等于0时，证明已求得从0位置跳转到最后一个元素位置的步数
    while(currentIndex>0)
    {
        // 左到右遍历数组
        for(let mostLeftIndex=0;mostLeftIndex<currentIndex;mostLeftIndex++)
        {
            //「贪心」选择能跳到当前位置且距离最远的那个位置
            if(nums[mostLeftIndex]+mostLeftIndex>=currentIndex)
            {
                // 重置当前位置为找到的位置，继续遍历
                currentIndex=mostLeftIndex;
                // 增加步数
                step++;
            }
        }
    }
    // 返回结果
    return step;
}

/**
 * @description: 贪心优化  TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} nums  给定数组
 * @return {*}
 */
function greedyOptimization(nums){
    /**
     * 如果我们「贪心」地进行正向查找，每次找到可到达的最远位置，就可以在线性时间内得到最少的跳跃次数。
     * 我们维护当前能够到达的最大下标位置，记为边界。我们从左到右遍历数组，到达边界时，更新边界并将跳
     * 跃次数增加 1。在遍历数组时，我们不访问最后一个元素，这是因为在访问最后一个元素之前，我们的边界
     * 一定大于等于最后一个位置，否则就无法跳到最后一个位置了。如果访问最后一个元素，在边界正好为最后
     * 一个位置的情况下，我们会增加一次「不必要的跳跃次数」，因此我们不必访问最后一个元素。
     */

    // 初始化当前能够到达的最大下标为0
    let maxPosition=0,
    // 初始化边界为0
        end=0,
    // 初始化步数为0    
        step=0;
    // 从左向右遍历数组
    for(let i=0;i<nums.length-1;i++)
    {
        // 重新赋值计算当前能够到达的最大下标
        maxPosition=Math.max(maxPosition,nums[i]+i);
        // 到达边界
        if(i===end)
        {
            // 更新边界为能到达最大下标
            end=maxPosition;
            // 步数增加1
            step++;
        }
    }
    // 返回结果
    return step;
}