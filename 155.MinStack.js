/*
 * @Description: 设计一个支持 push ，pop ，top 操作，
                 并能在常数时间内检索到最小元素的栈。
 * @Author: JunLiangWang
 * @Date: 2023-11-06 09:25:38
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-11-06 09:35:12
 */

/**
 * 本方案采用栈的方法，每当向栈中push元
 * 素时，一并加入当前元素中的最小元素，
 * 即： {
 *          val: 当前值,
 *          min: min(当前值, 栈顶的.min)
 *      }
 *  
 *  那么栈中的每个元素都对应了相应的最小值      
 */

var MinStack = function () {
    this.stack = []
};
MinStack.prototype.push = function (val) {
    let length = this.stack.length
    this.stack.push({
        val: val,
        min: length == 0 ? val : Math.min(val, this.stack[length - 1].min)
    })
};
MinStack.prototype.pop = function () {
    this.stack.pop();
};
MinStack.prototype.top = function () {
    return this.stack[this.stack.length - 1].val;
};
MinStack.prototype.getMin = function () {
    return this.stack[this.stack.length - 1].min;
};