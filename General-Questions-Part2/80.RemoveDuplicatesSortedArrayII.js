/*
 * @Description: 给你一个有序数组 nums ，请你 原地 删除重复出现的元素，
                 使得出现次数超过两次的元素只出现两次 ，返回删除后数组
                 的新长度。不要使用额外的数组空间，你必须在 原地修改输
                 入数组 并在使用 O(1) 额外空间的条件下完成。
 * @Author: JunLiangWang
 * @Date: 2023-07-04 09:32:53
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-07-04 09:59:00
 */


/**
 * @description: 双指针   TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} nums 给定数组
 * @return {*}
 */
function doublePoint(nums) {
    /**
     * 该方案使用双指针的方式，定义两个指针：firstPoint(首指针，初始指向首个元素)
     * 、secondPoint(第二个指针，初始指向第二个元素)。数组区间[0，firstPoint]则
     * 为不超过重复2次满足要求的元素，区间[firstPoint+1,secondPoint]则是需要删除
     * 的元素，最终满足要求的数组长度则为firstPoint+1。
     */

    // 初始化第一个指针指向数组首个元素
    let firstPoint = 0,
    // 初始化第二个指针指向数组第二个元素
        secondPoint = 1,
    // 记录重复元素的数量
        count = 0;

    // 当第二个指针超出数组范围证明已查找完全部元素
    while (secondPoint < nums.length) {
        // 如果两指针所指元素相同，重复元素数量+1
        if (nums[firstPoint] == nums[secondPoint]) count++;
        // 否则，不相同，重复元素数量置为0
        else count = 0;
        
        /**
         *  当有三个元素重复，count等于2，因此，此处不超过2
         *  个元素重复，则count<2。当重复元素不超过2个时，
         *  我们将首指针的下一个元素赋值为第二个指针所指元素，
         *  并且将首指针和第二个指针分别指向下一个元素，如果
         *  数组中没有超过2个元素重复，其实这里就是不断给自身
         *  赋相同的值。当超过了2个重复元素，首指针则停止向前
         *  ，第二个指针不断增加，直到遇到与首指针不同的元素，
         *  其中首指针与第二个指针中间的值则是需要删除的元素
         */
        if (count < 2) {
            nums[firstPoint + 1] = nums[secondPoint];
            firstPoint++;
        }
        secondPoint++;
    }
    // 返回长度
    return firstPoint+1;
}