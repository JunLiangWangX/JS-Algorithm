/*
 * @Description: 给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。
                  求在该柱状图中，能够勾勒出来的矩形的最大面积。
 * @Author: JunLiangWang
 * @Date: 2023-07-08 10:08:28
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-07-10 09:01:38
 */


/**
 * @description: 暴力破解   TC:O(n^2)   SC:O(1)
 * @author: JunLiangWang
 * @param {*} heights 给定高度数组
 * @return {*}
 */                  
function bruteForce(heights) {
    /**
     * 本方案采用暴力破解的方式，遍历数组每个元素，并将该元素作为
     * 它组成矩形的最高高度，由此以它为中心向左右扩散(遍历)，当遇
     * 到小于它的元素或到达边界则停止遍历，当遍历完成则计算出面积，
     * 该面积则为以它为最高高度组成的矩形面积，然后与当前记录最大
     * 面积比较，得出最大面积。
     */

    // 记录最大面积
    let maxArea = 0;
    // 遍历数组每个元素，并将该元素作为它组成矩形的最高高度
    for (let i = 0; i < heights.length; i++) {
        // 向左遍历指针
        let left = i - 1,
        // 向右遍历指针
            right = i + 1,
        // 宽度
            count = 1;
        // 向左扩散，当遇到小于当前元素的元素或到达边界则停止遍历
        while (left >= 0 && heights[left] >= heights[i]) {
            left--;
            count++;
        }
        // 向右扩散，当遇到小于当前元素的元素或到达边界则停止遍历
        while (right < heights.length && heights[right] >= heights[i]) {
            right++;
            count++;
        }
        // 计算面积与当前记录最大面积比较，得出最大面积。
        if (maxArea < count * heights[i]) maxArea = count * heights[i];
    }
    // 返回最大面积
    return maxArea;
}


/**
 * @description: 单调栈   TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} heights 给定高度数组
 * @return {*}
 */
function monotonicStack(heights){
    /**
     * 上述暴力破解，当我们找某一高度的边界时，存在多次重复扫描
     * 上次已扫描过的元素，因此我们可以通过优化寻找边界的过程来
     * 优化时间复杂度
     * 
     * 我们可以定义两数组(leftBorder,rightBorder)，heights[i]
     * 的左边界为leftBorer[i],右边界为rightBorder[i]。
     * 
     * 如何获得所有元素的左/右边界呢？此处我们以左边界举例子
     * 某一元素的左边界则为左边离它最近的小于它的元素，因此
     * 我们可以利用栈，从左到右遍历数组元素，不断将元素入栈，栈顶元素
     * 为当前元素的上一个元素，当栈顶元素大于等于当前元素证明
     * 上一个元素不是当前元素的左边界，将元素出栈，继续比较栈
     * 顶元素(此时栈顶元素则为上一个元素的左边界，即为小于的它
     * 元素，那些上次被出栈的元素肯定是大于等于上一个元素的，因此无需
     * 再次比较)，直到栈为空或者找到了小于当前元素的栈顶元素，
     * 如果栈为空证明当前元素的左边界超过了数组范围为-1，如果栈
     * 不为空，证明当前元素的左边界为栈顶元素，最后我们把当前元素
     * 入栈，继续遍历数组下一个元素
     * 
     * 右边界呢？我们重复上述过程，从右到左遍历数组即可，超出数组范围
     * 不再赋值为-1，而是赋值为数组长度
     * 
     * 最后我们通过(rightBorder[i]-leftBorder[i]-1)*heights[i]计算出
     * 每个元素作为最大高度的矩形的面积，比较出最大的面积即可获取答案
     */

    // 左边界数组
    let leftBorder=new Array(heights.length),
    // 右边界数组
    rightBorder=new Array(heights.length), 
    // 栈
    stack=[],
    // 最大面积
    maxArea=0;
    // 从左到右遍历高度，获取左边界
    for(let i=0;i<heights.length;i++){
        // 当栈顶元素大于等于当前元素，证明不是当前元素的左边界，此时出栈
        while(stack.length>0&&heights[stack[stack.length - 1]]>=heights[i])stack.pop()
        // 当栈为空，证明当前左边界超出数组范围，置为-1
        if(stack.length==0)leftBorder[i]=-1;
        // 不为空，则此时栈顶元素是小于当前元素的，为当前元素的左边界
        else leftBorder[i]=stack[stack.length - 1];
        // 给栈添加当前元素
        stack.push(i);
    }
    // 将栈置为空
    stack=[];
    // 从右到左遍历高度，获取右边界(与上述获取左边界同理，只不过超过范围置为数组长度)
    for(let i=heights.length-1;i>=0;i--){
        while(stack.length>0&&heights[stack[stack.length - 1]]>=heights[i])stack.pop()
        if(stack.length==0)rightBorder[i]=heights.length;
        else rightBorder[i]=stack[stack.length - 1];
        stack.push(i);
    }
    // 遍历左右边界，计算面积，获取最大面积
    for(let i=0;i<heights.length;i++){
        let area=(rightBorder[i]-leftBorder[i]-1)*heights[i]
        if(area>maxArea)maxArea=area;
    }
    // 返回结果
    return maxArea
}
