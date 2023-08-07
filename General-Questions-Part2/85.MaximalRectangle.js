/*
 * @Description: 给定一个仅包含 0 和 1 、大小为 rows x cols 的二维二进制矩阵，
                 找出只包含 1 的最大矩形，并返回其面积。
 * @Author: JunLiangWang
 * @Date: 2023-07-11 14:11:49
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-07-11 14:56:01
 */


/**
 * @description: 暴力破解   TC:O(n^3)  SC:O(n^2)
 * @author: JunLiangWang
 * @param {*} matrix  给定矩阵
 * @return {*}
 */
function bruteForce(matrix) {
    /**
     * 该方案使用暴力破解，我们首先计算出矩阵的每个元素的上边连续 1 的数量
     * 例如:
     *     matrix=  1 0 1 0 0
     *              1 0 1 1 1
     *              1 1 1 1 1 
     *              1 0 0 1 0
     * 
     * 计算矩阵每个元素的上边连续1的数量
     * 
     *    rect=  1 0 1 0 0
     *           2 0 2 1 1
     *           3 1 3 2 2
     *           4 0 0 3 0
     * 
     * 我们可以通过遍历rect中的每个元素，将每个元素都假设为矩阵的右下角端点，
     * 我们已经知道该行左边所有元素的高度，我们即可向左遍历元素获得所有高度，
     * 然后以最小的高度计算出该元素作为矩阵右下角端点能获得的最大面积
     * 
     */

    // 原矩阵高度
    let m = matrix.length,
        // 原矩阵长度
        n = matrix[0].length,
        // 定义新的矩阵，记录每个元素的上边连续的1的数量
        rect = new Array(m).fill(0).map(() => new Array(n).fill(0)),
        // 记录最大面积
        maxArea = 0;

    // 遍历原有矩阵，计算矩阵每个元素的上边连续1的数量
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            // 如果当前元素等于1，其上边连续1的数量等于
            // 上一个元素上边连续1的数量+1
            if (matrix[i][j] == 1) {
                rect[i][j] = (i > 0 ? rect[i - 1][j] : 0) + 1
            }
            // 当前元素等于0则不连续，默认为0
        }
    }
    // 遍历新的矩阵所有元素
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            // 如果当前元素等于0，证明其高度为0，
            // 以它为矩阵右下角端点面积为0，跳过
            if (rect[i][j] == 0) {
                continue;
            }
            // 否则其高度不为0

            // 将高度赋值为当前元素值
            let height = rect[i][j];
            // 向左遍历所有元素，获得每个元素的高度，以最小高度计算
            // 该元素作为矩阵右下角端点能获得的最大面积
            for (let k = j; k >= 0; k--) {
                height = Math.min(height, rect[i][k]);
                maxArea = Math.max(maxArea, (j - k + 1) * height);
            }
        }
    }
    // 返回结果
    return maxArea;
}


/**
 * @description: 单调栈   TC:O(n^2)   SC:O(n^2)
 * @author: JunLiangWang
 * @param {*} matrix 给定矩阵
 * @return {*}
 */
function monotonicStack(matrix) {
    /**
     * 该方案使用单调栈，上述暴力破解法中我们首先计算出矩阵的每个元素的上边连续 1 的数量
     * 例如:
     *     matrix=  1 0 1 0 0
     *              1 0 1 1 1
     *              1 1 1 1 1 
     *              1 0 0 1 0
     * 
     * 计算矩阵每个元素的上边连续1的数量
     * 
     *    rect=  1 0 1 0 0
     *           2 0 2 1 1
     *           3 1 3 2 2
     *           4 0 0 3 0
     * 
     * 我们将行分割，即可发现，这与84题中获取柱状图最大矩形的输入数据是一样的
     * 
     *    rect=  1 0 1 0 0      [ 1,0,1,0,0 ]
     *         --------------
     *           2 0 2 1 1      [ 2,0,2,1,1 ]
     *         --------------
     *           3 1 3 2 2      [ 3,1,3,2,2 ]
     *         --------------
     *           4 0 0 3 0      [ 4,0,0,3,0 ]
     *         --------------
     * 
     * 因此该题可通过将行分割，然后使用84题获取柱状图最大矩形中的单调栈的方式
     * 求得每行中最大的矩形面积，然后比较每行的最大矩形，即可获得答案
     */

    // 原矩阵高度
    let m = matrix.length,
        // 原矩阵长度
        n = matrix[0].length,
        // 定义新的矩阵，记录每个元素的上边连续的1的数量
        rect = new Array(m).fill(0).map(() => new Array(n).fill(0)),
        // 记录最大面积
        maxArea = 0;

    // 遍历原有矩阵，计算矩阵每个元素的上边连续1的数量
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            // 如果当前元素等于1，其上边连续1的数量等于
            // 上一个元素上边连续1的数量+1
            if (matrix[i][j] == 1) {
                rect[i][j] = (i > 0 ? rect[i - 1][j] : 0) + 1
            }
            // 当前元素等于0则不连续，默认为0
        }
    }

    // 遍历逐行遍历新数组
    for (let row = 0; row < m; row++) {
        // 左边界数组
        let leftBorder = new Array(n).fill(-1),
            // 右边界数组
            rightBorder = new Array(n).fill(n);
        // 栈
        let stack = [];

        // 从左到右遍历高度，获取左边界
        for (let col = 0; col < n; col++) {
            // 当栈顶元素大于等于当前元素，证明不是当前元素的左边界，此时出栈
            while (stack.length > 0 && rect[row][stack[stack.length - 1]] >= rect[row][col]) stack.pop();
            // 当栈不为空，则此时栈顶元素是小于当前元素的，为当前元素的左边界
            if (stack.length > 0) leftBorder[col] = stack[stack.length - 1];
            // 否则栈为空，证明当前元素左边界超出数组范围，需要置为-1，
            // 由于默认值为-1，因此无需重新赋值

            // 给栈添加当前元素
            stack.push(col);
        }
        // 将栈置为空
        stack = [];
        // 从右到左遍历高度，获取右边界(与上述获取左边界同理，只不过超过范围置为数组长度)
        for (let col = n - 1; col >= 0; col--) {
            while (stack.length > 0 && rect[row][stack[stack.length - 1]] >= rect[row][col]) stack.pop();
            if (stack.length > 0) rightBorder[col] = stack[stack.length - 1];
            stack.push(col);
        }
        // 遍历左右边界，计算面积，获取最大面积
        for (let col = 0; col < n; col++) {
            maxArea = Math.max(maxArea, (rightBorder[col] - leftBorder[col] - 1) * rect[row][col])
        }
    }
    // 返回结果
    return maxArea;
}



/**
 * @description: 单调栈优化  TC:O(n^2)  SC:O(n^2)
 * @author: JunLiangWang
 * @param {*} matrix 给定矩阵
 * @return {*}
 */
function monotonicStackOptimization(matrix) {
    /**
     * 同样的，我们能够使用84题中的单调栈方式解决该题，依然
     * 可以像84题中那样对单调栈进行优化
     * 
     * 上述单调栈通过两个循环获取了所有元素的左/右边界，
     * 其实我们可以通过一个循环即可获取所有元素的左/右
     * 边界，在上述单调栈方法中在我们获取元素左边界时
     * 当栈顶元素大于等于当前元素时会弹出栈顶元素，试想
     * 此时当前元素不就是小于等于了栈顶元素吗？栈顶元素的右
     * 边界不就是当前元素了吗。
     * 
     * 通过该思路我们可以继续常级优化获取所有元素左/右边界
     * 的过程。
     */

    // 原矩阵高度
    let m = matrix.length,
        // 原矩阵长度
        n = matrix[0].length,
        // 定义新的矩阵，记录每个元素的上边连续的1的数量
        rect = new Array(m).fill(0).map(() => new Array(n).fill(0)),
        // 记录最大面积
        maxArea = 0;

    // 遍历原有矩阵，计算矩阵每个元素的上边连续1的数量
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            // 如果当前元素等于1，其上边连续1的数量等于
            // 上一个元素上边连续1的数量+1
            if (matrix[i][j] == 1) {
                rect[i][j] = (i > 0 ? rect[i - 1][j] : 0) + 1
            }
            // 当前元素等于0则不连续，默认为0
        }
    }

    // 遍历逐行遍历新数组
    for (let row = 0; row < m; row++) {
        // 左边界数组
        let leftBorder = new Array(n).fill(-1),
            // 右边界数组
            rightBorder = new Array(n).fill(n);
        // 栈
        let stack = [];
        // 从左到右遍历高度，获取左/右边界
        for (let col = 0; col < n; col++) {
            // 当栈顶元素大于等于当前元素，证明栈顶元素不是当前元素的左边界，
            // 而当前元素则是栈顶元素的右边界，记录栈顶元素右边界，然后出栈
            while (stack.length > 0 && rect[row][stack[stack.length - 1]] >= rect[row][col]) {
                rightBorder[stack[stack.length - 1]] = col;
                stack.pop();
            }
            // 当栈不为空，则此时栈顶元素是小于当前元素的，为当前元素的左边界
            if (stack.length > 0) leftBorder[col] = stack[stack.length - 1];
            // 否则栈为空，证明当前元素左边界超出数组范围，需要置为-1，
            // 由于默认值为-1，因此无需重新赋值
            
            // 给栈添加当前元素
            stack.push(col);
        }
        // 遍历左右边界，计算面积，获取最大面积
        for (let col = 0; col < n; col++) {
            maxArea = Math.max(maxArea, (rightBorder[col] - leftBorder[col] - 1) * rect[row][col])
        }
    }
    // 返回结果
    return maxArea;
}