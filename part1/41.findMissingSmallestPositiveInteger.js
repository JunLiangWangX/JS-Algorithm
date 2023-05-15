/*
 * @Description: 给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。
                 请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。
 * @Author: JunLiangWang
 * @Date: 2023-04-28 09:27:19
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-04-28 12:21:20
 */


/**
 * @description: hashMap方式   TC:O(n)  SC:O(n)空间复杂度不满足要求
 * @author: JunLiangWang
 * @param {*} nums
 * @return {*}
 */
function hashMap(nums) {
    /**
     *  该方案利用hashMap记录数组中出现过的数字(key为数组中的元素，value为true)
     *  然后从1(最小正整数)开始迭代递增，如果当前数字为key未获取到hashMap中的值
     *  证明该数字并未在数组中出现过，则为数组未出现的最小正整数。
     * 
     *  由于使用了hashMap,因此空间规模不满足题意
     */

    // 利用map记录数组中已经出现过的数字
    let recordNumberInArray = new Map(),
        // 初始化最小正整数为1(此处虽说赋值为0
        // 但后面遍历时是从smallestPositiveInteger+1开始的)
        smallestPositiveInteger = 0;
    // 遍历数组元素，记录出现过的数字
    for (let item of nums) recordNumberInArray.set(item, true);
    // 从1(1为最小正整数)开始迭代递增，当当前数字为key未获取到hashMap中的值则
    // 为数组中未出现过的最小正整数
    while (++smallestPositiveInteger)
        if (!recordNumberInArray.get(smallestPositiveInteger))
            return smallestPositiveInteger;
}


/**
 * @description: 二分查找方式   TC:O(nLogn)时间复杂度不满足要求  SC:O(1)
 * @author: JunLiangWang
 * @param {*} nums
 * @return {*}
 */
function binarySearchMethod(nums) {

    /**
     * 该方案利用二分查找的方式，先对数组进行排序， 然后从1(最小正整数)开始迭代递增，
     * 利用二分查找数组中是否存在该数字，如果不存在则为数组未出现的最小正整数。
     * 
     * 由于对数组排序需要O(nLogn)的时间复杂度，因此不满足题目要求
     */

    // 对数组进行排序
    nums.sort((a, b) => a - b);
    /**
     * @description: 定义二分查找函数
     * @author: JunLiangWang
     * @param {*} target 目标值
     * @return {*}
     */
    function binarySearch(target) {
        // 初始化左右指针
        let left = 0,
            right = nums.length - 1;
        // 当左指针超过右指针，证明遍历完成
        while (left <= right) {
            // 计算中间指针
            let middle = Math.floor((left + right) / 2);
            // 如果中值指针所指值等于目标值，直接返回结果
            if (nums[middle] == target) return middle;
            // 否则如果中值指针所指值大于目标值，由于数组
            // 为升序，证明区间[middle,right]区间值都大于
            // 目标值，因此从区间[left,middle-1]继续遍历
            else if (nums[middle] > target) right = middle - 1;
            // 否则如果中值指针所指值小于目标值，由于数组
            // 为升序，证明区间[left,middle]区间值都小于
            // 目标值，因此从区间[middle+1,right]继续遍历
            else left = middle + 1;
        }
        // 遍历完成未找到目标值，直接返回-1
        return -1;
    }
    // 初始化最小正整数为1(此处虽说赋值为0
    // 但后面遍历时是从smallestPositiveInteger+1开始的)
    let smallestPositiveInteger = 0;
    // 从1(1为最小正整数)开始迭代递增，利用二分查找该数字是否在数组出现
    // 如果未出现则为结果
    while (++smallestPositiveInteger)
        if (binarySearch(smallestPositiveInteger) == -1) return smallestPositiveInteger;
}


/**
 * @description: 置换法   TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} nums
 * @return {*}
 */
function swapMethod(nums){
    /**
     * 该方案使用置换的方式，考虑nums数组长度为N，缺失的最小正整数范围必然在[1,N+1]的区间内，
     * 我们假定数组元素是从1(最小正整数)开始连续递增的，例：[1,2,3.....N]，此时缺失的最小正
     * 整数则为N+1，可以见得此时数组元素值=index(其索引)+1，可得出index(索引值)=元素值-1。
     * 因此，我们可以根据index(索引值)=元素值-1，将无序的数组将其元素对号入座，构造为一个
     * 从1(最小正整数)开始连续递增的数组，当我们从0遍历数组元素，发现其元素值不等于index(其索引)+1
     * 则为缺失的最小正整数。
     * 
     * 对号入座过程：当前元素小于1此时元素不为正整数，无需置换
     *              当前元素大于数组长度，此时元素计算出索引值已超出数组范围，也无需置换
     *              当前元素等于index+1，此时元素位置正确，也无需置换
     *              当前元素等于需要置换的元素，即nums[当前元素值-1]==当前元素，也无需置换，
     *              否则，将当前元素放入正确位置(即index=元素值-1)，把当前元素与nums[元素值-1]元素交换位置
     * 
     * 例子：nums=[3,4,12,3,5,6]
     *      对号入座： [3,6,12,3,4,5]
     */

    /**
     * @description: 交换数组两个元素
     * @author: JunLiangWang
     * @param {*} index1  元素1索引
     * @param {*} index2  元素2索引
     * @return {*}
     */    
    function swap(index1,index2)
    {
        let temp=nums[index1];
        nums[index1]=nums[index2];
        nums[index2]=temp;
    }

    let i=0;
    // 从0开始遍历数组，对号入座，置换元素
    while(i<nums.length)
    {
        /**
         * 对号入座过程：当前元素小于1此时元素不为正整数，无需置换
         *              当前元素大于数组长度，此时元素计算出索引值已超出数组范围，也无需置换
         *              当前元素等于index+1，此时元素位置正确，也无需置换
         *              当前元素等于需要置换的元素，即nums[当前元素值-1]==当前元素，也无需置换，
         *              否则，将当前元素放入正确位置(即index=元素值-1)，把当前元素与nums[元素值-1]元素交换位置
         */
        if(nums[i]<=0||nums[i]>nums.length||nums[i]-1==i||nums[nums[i]-1]==nums[i])i++;
        else swap(i,nums[i]-1)
    }
    i=0;
    //从0遍历数组元素，发现其元素值不等于index(其索引)+1， 则为缺失的最小正整数。
    for(;i<nums.length;i++)
    {
        if(nums[i]!=i+1)return i+1;
    }
    // 没有元素值不等于index(其索引)+1，证明数组元素是从1(最小正整数)开始连续递增的
    // 此时缺失的最小正整数则为数组长度+1
    return nums.length+1
}