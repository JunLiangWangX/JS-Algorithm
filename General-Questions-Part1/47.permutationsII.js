/*
 * @Description: 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
 * @Author: JunLiangWang
 * @Date: 2023-05-07 13:59:46
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-05-07 15:27:44
 */


/**
 * @description: 递归回溯   TC:O(2^n)   SC:O(n)
 * @author: JunLiangWang
 * @param {*} nums  给定数组
 * @return {*}
 */
function recursionBacktracking(nums){
    /**
     * 该方案使用递归回溯的方式，递归参数为：unusedNums以及usedNums，unusedNums
     * 表示当前未被使用到的数(即未加入到排列的数，已加入到排列的数unusedNums[i]
     * 将会赋值为null)，usedNums表示已加入到排列的数。题中要求我们返回不重复的组合
     * 因此我们需要先对给定数组nums进行排序，确保我们在递归函数中遍历unusedNums时是
     * 有序的，然后我们在递归函数中遍历unusedNums，当其元素不等于null时且不等于前一
     * 个元素时，证明该数未加入到排列且该数形成的排列与上一个排列并不重复，此时我们
     * 将其加入到排列并标识其为已被使用(unusedNums[i]=null)，然后将二者作为新的参数
     * 继续递归，直到已加入到排列的数的数量等于给定数组元素的数量则证明所有数排列完成
     * ，此时添加结果，停止递归。
     */

    // 对给定数组进行排序
    nums.sort((a,b)=>a-b);
    // 定义输出数组
    let outArray=[];
    /**
     * @description: 利用递归遍历未被使用的数，如果当前未被使用的数不等于上一个
     *               未被使用的数则将当前未被使用的数标识为已使用并将该数加入当
     *               前排列继续递归，直到排列元素数量等于给定数组元素数量，证明
     *               排列完成停止递归
     * @author: JunLiangWang
     * @param {*} unusedNums  未被使用的数
     * @param {*} usedNums    已被使用的数(当前排列)
     * @return {*}
     */    
    function recursion(unusedNums,usedNums){
        // 如已使用的数的数量等于给定数组的元素的数量
        // 证明排列完成
        if(usedNums.length==nums.length)
        {
            // 向输出数组添加该排列
            outArray.push(usedNums);
            // 返回
            return ;
        }
        // 否则，遍历未使用的数
        for(let i=0;i<unusedNums.length;i++)
        {
            // 当前未被使用的数不等于null且不等于前一个未被使用的数时，
            // 证明该数未加入到排列且该数形成的排列与上一个排列并不重复
            if(unusedNums[i]!=null&&unusedNums[i]!=unusedNums[i-1])
            {
                // 深拷贝，以免更改原数组值
                let temp=[...unusedNums];
                // 将该数标识为已被使用
                temp[i]=null;
                // 继续递归
                recursion(temp,[...usedNums,unusedNums[i]])
            }
        }
    }
    // 递归获取结果
    recursion(nums,[]);
    // 返回结果
    return outArray;
}