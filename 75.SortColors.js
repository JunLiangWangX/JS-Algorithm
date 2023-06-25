/*
 * @Description: 给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，
                 原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、
                白色、蓝色顺序排列。我们使用整数 0、 1 和 2 分别表示红色
                、白色和蓝色。
 * @Author: JunLiangWang
 * @Date: 2023-06-25 09:00:06
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-06-25 09:30:03
 */


/**
 * @description: 两次扫描   TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} nums  给定数组
 * @return {*}
 */
function twoScans(nums){
    /**
     * 本方案使用两次扫描的方法，第一次扫描找出数组所有0，
     * 并将其交换至数组前面；第二次扫描找出数组所有1，并
     * 将其交换至0后续的元素，由于数组中仅有0，1，2因此
     * 0，1排序好后2自然排序好了
     */

    // 记录已经排好序的索引
    let last=0;
    // 两次扫描
    for(let i=0;i<2;i++){
        // 从已经排好序的索引开始，遍历数组所有元素
        for(let j=last;j<nums.length;j++){
            // 第一次扫描为0时，第二次扫描为1时
            // 将last位置元素与当前元素交换，并
            // 将已经排好序的索引加1
            if(nums[j]===i){
                // 交换数组两元素
                let temp=nums[last];
                nums[last]=nums[j];
                nums[j]=temp;
                // 将已经排好序的索引加1
                last++;
            }
        }
    }
    // 返回结果
    return nums;
}