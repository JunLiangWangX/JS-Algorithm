/*
 * @Description: 删除有序数组中的重复项
 * @Author: JunLiangWang
 * @Date: 2023-04-03 10:38:26
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-04-03 10:55:20
 */


/**
 * @description: 双指针   TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} nums 输入数组
 * @return {*}
 */
function doublePoint(nums){
    /**
     * 该方案利用双指针的方式，定义两个指针(low初值0,fast初值1)，当两指针所指元素相同时，将fast指针继
     * 续向右移动直至遇到不同元素时(此时low与fast则会拉开一个区间，该区间的元素则为需要删除的相同的元
     * 素)，将low指针向右移动一位，并将其赋值为fast指针所指元素(此时0到low指针所在区间的元素则是不重
     * 复的元素)，当fast指针超出数组范围则终止循环，此时low位置+1则为去重后数组长度。
     */

    // 如果数组长度不大于1，无需去重直接返回即可
    if(nums.length<=1)return nums.length;
    // 定义两个指针
    let fastPoint=1,lowPoint=0;
    // 当fast指针超出数组范围则终止循环
    while(fastPoint<nums.length)
    {
        // 当两指针所指元素不同
        if(nums[lowPoint]!=nums[fastPoint])
        {
            // 将low指针向右移动一位
            lowPoint++;
            // 并将其赋值为fast指针所指元素
            nums[lowPoint]=nums[fastPoint];
        }
        // 继续移动fast指针
        fastPoint++;
    }
    return lowPoint+1;
}