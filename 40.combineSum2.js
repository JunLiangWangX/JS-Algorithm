/*
 * @Description: 给你一个无重复元素的整数数组candidates和一个目标整数target，
                  找出candidates中可以使数字和为目标数target的所有不同组合。
                  candidates中的每个数字在每个组合中只能使用一次 
 * @Author: JunLiangWang
 * @Date: 2023-04-27 09:09:57
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-04-27 09:45:28
 */


/**
 * @description: 深度遍历+剪枝   TC:O(2^n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} candidates  给定数组
 * @param {*} target      给定目标值
 * @return {*}
 */
function dfs(candidates,target)
{
    /**
     * 该题采用深度优先+剪枝的方法，它与上一题"组合总和Ⅰ"非常相似，但多加了一个
     * 条件：每个数字不再可以无限制重复被选取，只能使用一次；因此我们对上一个算法
     * 进行改进即可：
     * 1.将递归中跳转到下一个元素变为跳转到下一个不重复的元素
     *    recursion(targetValue,combineed,index+1) => 
     *    recursion(targetValue,combined,notRepeatingIndex);
     * 2.将递归中减去当前值，继续递归本次元素变为继续递归下一个元素
     *    recursion(diff,[...combined,candidates[index]],index) => 
     *    recursion(diff,[...combined,candidates[index],index+1])
     */

    // 对数组进行排序，方便后续去重、剪枝处理
    candidates.sort((a,b)=>a-b);
    // 定义输出数组
    let outArray=[];
    /**
     * @description: 递归遍历，表示当前在candidates数组的第
     *               index位，还剩targetValue要组合
     * @author: JunLiangWang
     * @param {*} targetValue  当前目标值
     * @param {*} combined     已组合的值
     * @param {*} index        当前candidates索引
     * @return {*}
     */    
    function recursion(targetValue,combined,index){ 
        // 如果targetValue等于零，证明当前组合的和
        // 为target，将当前组合(combined)加入输出数组
        if(targetValue===0)
        {
            outArray.push(combined);
            return ;
        }
        // 如果当前索引超出了给定数组范围，直接return
        if(index>=candidates.length)return ;
        // 初始化与当前元素不重复的后一个元素的索引为当前元素+1
        let notRepeatingIndex=index+1;
        // 找到与当前元素不重复的后一个元素的索引，由于candidates
        // 为升序，因此仅需要找到与当前元素不同的元素，即可跳过全部
        // 相同的元素
        while(candidates[notRepeatingIndex]==candidates[index])notRepeatingIndex++;
        // 如果当前目标值减去差值小于0，由于candidates为升序
        // 因此后续元素与当前差值依旧会小于0，因此舍去(剪枝)
        // 如果大于等于0则继续递归
        let diff=targetValue-candidates[index];
        if(diff>=0)
        {
            // 跳到不重复的元素继续递归
            recursion(targetValue,combined,notRepeatingIndex);
            // 减去当前值，继续递归下一个元素
            recursion(diff,[...combined,candidates[index]],index+1);
        }
    }
    // 执行递归
    recursion(target,[],0)
    // 输出结果
    return outArray;
}