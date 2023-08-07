/*
 * @Description: 给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，
                 原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、
                白色、蓝色顺序排列。我们使用整数 0、 1 和 2 分别表示红色
                、白色和蓝色。
 * @Author: JunLiangWang
 * @Date: 2023-06-25 09:00:06
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-06-25 09:49:02
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


/**
 * @description: 双指针   TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} nums 给定数组
 * @return {*}
 */
function doublePoints(nums){
    /**
     * 本方案使用双指针的方式，使用两个指针(point0,
     * point1)分别用来交换0和1.我们从左向右遍历整
     * 个数组，如果找到了1，那么将其与nums[point1]
     * 进行交换，并将point1向后移动一个位置;如果找
     * 到了0，那么将其与nums[point0]进行交换，并将
     * point0向后移动一个位置，因为连续的0之后是连
     * 续的1，因此如果我们将0与nums[point0]交换可
     * 能会把一个 1 交换出去。当point0<point1时，
     * 证明我们已经将一些 1 连续地放在头部，此时一
     * 定会把一个 1 交换出去，导致答案错误。因此，
     * 如果 point0<point1，那么我们需要再将
     * nums[point1]与已交换的元素nums[i]再次交换，
     * 并将point1向后移动一个位置。
     */

    /**
     * @description: 交换数组两元素
     * @author: JunLiangWang
     * @param {*} i  数组索引1
     * @param {*} j  数组索引2
     * @return {*}
     */    
    function swap(i,j){
        let temp=nums[i];
        nums[i]=nums[j];
        nums[j]=temp;
    }
    // 使用指针point0交换0
    let point0=0,
    // 使用指针point1交换1
    point1=0;
    // 我们从左向右遍历整个数组
    for(let i=0;i<nums.length;i++){
        // 如果找到了0，那么将其与nums[point0]
        // 进行交换，并将point0向后移动一个位置
        // 当point0<point1时，证明我们已经将一
        // 些 1 连续地放在头部，此时将0与nums[point0]
        // 交换一定会把一个 1 交换出去，因此我们需要再将
        // nums[point1]与已交换的元素nums[i]再次交换，
        //  并将point1向后移动一个位置。
        if(nums[i]===0){
            swap(i,point0)
            if(point0<point1)swap(i,point1);
            point0++;
            point1++;
        }
        // 如果找到了1，那么将其与nums[point1]
        // 进行交换，并将point1向后移动一个位置
        else if(nums[i]===1){
            swap(i,point1);
            point1++;
        }
    }
}