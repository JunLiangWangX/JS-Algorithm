/*
 * @Description: 给定一个整数数组，将其按顺序组合为一个整数。如何将这些元素重新排列组合得到下一个更大的整数。
                 例如[1,2,3]下一个更大的数为[1,3,2]，如果无法得到一个更大的整数，则组合为最小的整数。
 * @Author: JunLiangWang
 * @Date: 2023-04-15 10:36:11
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-04-15 11:12:11
 */


/**
 * @description: 快速排序方法   TC:O(n)  SC:O(1)
 * @author: JunLiangWang
 * @param {*} nums
 * @return {*}
 */
function quickSort(nums){
    /**
     * 我们希望下一个数比当前数大，因此只需要将后面的「大数」与前面的「小数」交换，就能得到一个更大的数。
     * 比如123456，将5和6交换就能得到一个更大的数123465。我们还希望下一个数增加的幅度尽可能的小，这样才
     * 满足“比当前数大的下一个数“的要求。为了满足这个要求，我们需要：在尽可能靠右的低位进行交换，需要从后
     * 向前查找将一个尽可能小的「大数」与前面的「小数」交换。比如123465，下一个排列应该把5和4交换而不是把
     * 6和4交换将「大数」换到前面后，需要将「大数」后面的所有数重置为升序，升序排列就是最小的排列。以123465
     * 为例：首先按照上一步，交换 5 和 4，得到 123564；然后需要将 5 之后的数重置为升序，得到 123546。
     * 显然 123546 比 123564 更小，123546 就是 123465 的下一个排列
     */

    // 如果数组元素少于1，则直接返回即可
    if(nums.length<=1)return nums;

    /**
     * @description: 交换数组两个元素位置
     * @author: JunLiangWang
     * @param {*} i   元素1位置
     * @param {*} j   元素2位置
     * @return {*}
     */
    function swap(i,j)
    {
        let temp=nums[i]
        nums[i]=nums[j]
        nums[j]=temp
    }

    // 初始化更小值指针为最后一个元素
    let smallerPoint=nums.length-2;
    // 从右向左遍历数组，并找到违反降序的元素，此元素则为需要交换的元素，
    // 如果数组元素全为降序，则该指针值为-1
    while(smallerPoint>=0&&nums[smallerPoint]>=nums[smallerPoint+1])smallerPoint--;
    // 如果数组元素全为降序，此时将smallerPoint赋值为0
    // 后续需要将数组元素全变为升序
    if(smallerPoint==-1)
    {
        smallerPoint=0;
    }
    // 否则需要在已遍历的元素中找到比该元素大，且最接近该元素的数进行交换，
    // 并将该元素后续所有元素变为升序
    else
    {
        // 初始化更大的元素为数组最后一个元素
        let biggerPoint=nums.length-1;
        // 找到比该元素大的元素，此处之所以不需要判断biggerPoint>smallerPoint
        // 因为进入该条件总会有一个比smallerPoint所指元素大的元素
        while(nums[biggerPoint]<=nums[smallerPoint])biggerPoint--;
        // 进行交换
        swap(smallerPoint,biggerPoint);
        // 将smallerPoint+1，后续需要将该元素后续所有元素变为升序
        smallerPoint++;
    }

    let tempPoint=nums.length-1;
    // 从smallerPoint到nums的最后一个元素，两两交换元素，将
    // 该区间降序变为升序。如果数组全为降序，则smallerPoint
    // 等于0，则是将数组全部元素从降序变为升序
    while(smallerPoint<tempPoint)
    {
        swap(smallerPoint,tempPoint)
        smallerPoint++
        tempPoint--
    }
}
