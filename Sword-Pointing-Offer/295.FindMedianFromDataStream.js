/*
 * @Description: 实现 MedianFinder 类:
                 1.MedianFinder() 初始化 MedianFinder 对象。
                 2.void addNum(int num) 将数据流中的整数 num 添加到数据结构中。
                 3.double findMedian() 返回到目前为止所有元素的中位数。与实际答案相差 10-5 以内的答案将被接受。
 * @Author: JunLiangWang
 * @Date: 2024-02-22 10:42:27
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2024-02-22 11:12:43
 */

/**
 * 本方案使用两个优先级队列实现，其中一个为降序优先级队列（即小顶堆，记作A，其长度为m），
 * 另一个为升序优先级队列（即大顶堆，记作B，其长度为n）。两队列各保存列表的一半元素，
 * 且规定：A保存较大的一半，B保存较小的一半。
 * 
 * 那么中位数即为：
 * 当m=n：则中位数为(A的堆顶元素 + B的堆顶元素)/2。
 * 当m≠n：则中位数为A的堆顶元素。
 * 
 * 在添加数字时：
 * 当 m=n（即 N 为 偶数）：需向A添加一个元素。实现方法：将新元素 num 插入至B，再将B堆顶元素插入至A。
 * 当 m≠n（即 N 为 奇数）：需向B添加一个元素。实现方法：将新元素 num 插入至A，再将A堆顶元素插入至B。
 */
var MedianFinder = function () {
    //降序优先级队列，即小顶堆
    this.minHeap = new CustomPriorityQueue(true)
    //升序优先级队列，即大顶堆
    this.maxHeap = new CustomPriorityQueue()
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {

    // 在添加数字时：
    // 当 m=n（即 N 为 偶数）：需向A添加一个元素。实现方法：将新元素 num 插入至B，再将B堆顶元素插入至A。
    // 当 m≠n（即 N 为 奇数）：需向B添加一个元素。实现方法：将新元素 num 插入至A，再将A堆顶元素插入至B。
    if (this.minHeap.length !== this.maxHeap.length) {
        this.minHeap.enqueue(num, num);
        let el = this.minHeap.dequeue()
        this.maxHeap.enqueue(el.element, el.element)
    } else {
        this.maxHeap.enqueue(num, num)
        let el = this.maxHeap.dequeue()
        this.minHeap.enqueue(el.element, el.element)
    }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {

    //中位数即为：
    //当m=n：则中位数为(A的堆顶元素 + B的堆顶元素)/2。
    // 当m≠n：则中位数为A的堆顶元素。
    if (this.minHeap.length == this.maxHeap.length)
        return (this.minHeap.top.element + this.maxHeap.top.element) / 2.0
    else return this.minHeap.top.element
};



/**
 * 
 * 大顶堆是实现优先级队列的数据结构，其为一颗完全二叉树，其特性为父节点大于等于子节点，
 * 由于其天生二分的结构，因此插入元素，删除最大元素都只需要logN的时间复杂度！
 * PS：小顶堆则是其特性为父节点小于等于子节点
 * 
* 大/小顶堆由于是一颗完全二叉树，因此可以使用数组存放，并且可以根据数组索引计算出其父元素/
* 左子节点/右子节点索引
* 对于索引index有：
*     父节点索引：Math.floor((index-1)/2)
*   左子节点索引：index*2+1
*   右子节点索引：index*2+2
* 
* 为什么会这样呢？大家不妨将二叉树映射为一个N行两列的矩阵，如下所示：
* 
* 有树：         转为矩阵：           父节点
*     0                   1   2        0
*     /\                  3   4        1
*    1  2                 5   6        2
*   /\  /\     
*  3 4 5  6     我想很容易就能得出结果了
* 
* 
* 根据上述特性，我们即可开始构建大/小顶堆
*/
class CustomPriorityQueue {
    /**
     * @description: 构造函数
     * @param {*} isAscOrder 是否升序排序,默认降序
     */
    constructor(isAscOrder = false) {
        // 大顶堆还是小顶堆
        this.isAsc = isAscOrder;
        // 初始化存放元素的数组
        this.heap = [];
    }
    /**
     * @description: 当前队列元素数量
     */
    get length() {
        return this.heap.length;
    }
    /**
     * @description:当前队列是否为空
     */
    get isEmpty() {
        return this.length === 0;
    }
    /**
     * @description: 获取队顶元素
     */
    get top() {
        return this.heap[0];
    }
    /**
     * @description: 将元素添加到队列中并根据优先级排序
     * @param {*} element   元素
     * @param {*} priority  优先级
     */
    enqueue(element, priority) {
        // 将元素以及优先级存入数组中
        this.heap.push({
            element: element,
            priority: priority,
        });
        // 向上堆化
        this.heapifyUp();
    }
    /**
     * @description: 出队（获取堆中最大/小元素）
     * @author: JunLiangWang
     * @return {*}
     */
    dequeue() {
        // 如果当前数组为空返回null
        if (this.isEmpty) return undefined
        // 如果数组只有一个元素，直接出队该元素即可
        if (this.heap.length === 1) return this.heap.pop()
        // 否则拿到队列顶部元素
        let node = this.heap[0]
        // 将队列顶部/底部元素交换位置，并把数组长度-1
        this.heap[0] = this.heap.pop()
        // 向下堆化
        this.heapifyDown()
        // 返回队顶元素也就是堆中最大元素
        return node
    }
    /**
     * @description: 向上堆化  TC:O(logn)  SC:O(1)
     * @author: JunLiangWang
     * @return {*}
     */
    heapifyUp() {
        /**
         * 插入新元素后需要执行向上堆化，因为插入的元素可能使得
         * 堆中父元素不再大于(小于)等于子元素，因此需要将其放入合适的
         * 位置，使得堆满足特性，该过程则为向上堆化。
         * 
         * 向上堆化的过程其实就是不断与父元素比大小，如果比父元素大（小）
         * 则与父元素交换位置，直到小于（大于）等于父元素或成为了堆顶的元素
         * 
         * 父元素上述说过，可通过当前元素索引Math.floor((index-1)/2)
         * 获取
         */

        // 获取当前元素索引
        let index = this.heap.length - 1;
        // 如果索引大于0，证明当前元素不在堆顶，此时执行向上堆化
        while (index > 0) {
            // 获取父元素索引
            let rootIndex = Math.floor((index - 1) / 2);
            // 比较两值，如是大顶堆，则当前元素值比父元素大则与父元素交换位置
            // 如是小顶堆，则当前元素值比父元素小则与父元素交换位置
            if (
                (this.isAsc &&
                    this.heap[index].priority < this.heap[rootIndex].priority) ||
                (!this.isAsc &&
                    this.heap[index].priority > this.heap[rootIndex].priority)
            ) {
                this.swap(index, rootIndex);
                index = rootIndex;
            }
            // 否则直接跳出元素，结束堆化
            else break;
        }
    }
    /**
     * @description: 向下堆化  TC:O(logn)  SC:O(1)
     * @author: JunLiangWang
     * @return {*}
     */
    heapifyDown() {
        /**
         * 将堆中最大元素弹出后，堆底元素会放入堆顶，并且数组长度会-1，此时
         * 堆顶不再是最大元素，因此需要执行向下堆化。
         * 向下堆化就是不断将左右子节点较大的且大于其父节点的节点与其父节点交换
         * 位置，直至到数组最后一个元素或不满足条件
         * 
         */
        let index = 0;
        // 当前元素的左子节点存在
        while (index * 2 + 1 < this.heap.length) {
            // 假设左子节点即为最大节点，计算其索引
            let minChildIndex = index * 2 + 1,
                // 获取其右子节点索引
                rightChildIndex = index * 2 + 2;
            // 如果右子节点存在，并且如是大顶堆，则其值大于左子节点，将较大的节点赋值为右子节点
            // 并且如是小顶堆，则其值小于左子节点，将较小的节点赋值为右子节点
            if (
                this.heap[rightChildIndex] != undefined &&
                ((this.isAsc &&
                    this.heap[rightChildIndex].priority <
                    this.heap[minChildIndex].priority) ||
                    (!this.isAsc &&
                        this.heap[rightChildIndex].priority >
                        this.heap[minChildIndex].priority))
            ) {
                minChildIndex = rightChildIndex;
            }
            // 如是大顶堆，比较较大的子节点是否大于父节点，如果是则交换位置，继续迭代
            // 如是小顶堆，比较较小的子节点是否小于父节点，如果是则交换位置，继续迭代
            if (
                (this.isAsc &&
                    this.heap[index].priority > this.heap[minChildIndex].priority) ||
                (!this.isAsc &&
                    this.heap[index].priority < this.heap[minChildIndex].priority)
            ) {
                this.swap(index, minChildIndex);
                index = minChildIndex;
            }
            // 否则跳出循环，结束堆化
            else break;
        }
    }
    /**
     * @description: 交换数组两元素位置  TC:O(1)  SC:O(1)
     * @author: JunLiangWang
     * @param {*} i  元素1索引
     * @param {*} j  元素2索引
     * @return {*}
     */
    swap(i, j) {
        let temp = this.heap[i]
        this.heap[i] = this.heap[j]
        this.heap[j] = temp
    }

}