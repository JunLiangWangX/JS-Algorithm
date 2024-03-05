/*
 * @Description: 给你 n 个项目。对于每个项目 i ，它都有一个纯利润 profits[i] ，和启动该项目需要的最小资本 capital[i] 。
                 最初，你的资本为 w 。当你完成一个项目时，你将获得纯利润，且利润将被添加到你的总资本中。总而言之，从给定
                 项目中选择 最多 k 个不同项目的列表，以 最大化最终资本 ，并输出最终可获得的最多资本。
 * @Author: JunLiangWang
 * @Date: 2024-02-02 08:57:25
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2024-02-02 10:00:30
 */

/**
 * 本方案采用优先级队列，将利润作为优先级，不断将满足资本的项目放入优先级队列中，
 * 直到不满足资本，此时队列顶部元素即为能够获取的利润，然后将其出队把利润加入资
 * 本，继续重复上述过程，直到所有项目入队或资本没有满足的项目为止。
 * 
 * 大顶堆是实现优先级队列的数据结构，其为一颗完全二叉树，其特性为父节点大于等于子节点，
 * 由于其天生二分的结构，因此插入元素，删除最大元素都只需要logN的时间复杂度！
 * PS：小顶堆则是其特性为父节点小于等于子节点
 * 
 * 大顶堆由于是一颗完全二叉树，因此可以使用数组存放，并且可以根据数组索引计算出其父元素/
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
 * 根据上述特性，我们即可开始构建大顶堆
 */
class MaxHeap {
    /**
     * @description: 构造函数   TC:O(1)  SC:O(n)
     * @author: JunLiangWang
     * @return {*}
     */    
    constructor() {
        // 初始化存放元素的数组
        this.heap = []
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
    /**
     * @description: 判断数组是否为空  TC:O(1)  SC:O(1)
     * @author: JunLiangWang
     * @return {*}
     */    
    isEmpty() {
        return this.heap.length === 0;
    }
    /**
     * @description: 入队  TC:O(logn)  SC:O(1)
     * @author: JunLiangWang
     * @param {*} element   元素
     * @param {*} priority  优先级
     * @return {*}
     */    
    enquene(element, priority) {
        // 将元素以及优先级存入数组中
        this.heap.push({
            element: element,
            priority: priority
        })
        // 向上堆化
        this.heapifyUp()
    }
    /**
     * @description: 出队（获取堆中最大元素） TC:O(logn)  SC:O(1)
     * @author: JunLiangWang
     * @return {*}
     */    
    dequene() {
        // 如果当前数组为空返回null
        if (this.isEmpty()) return null
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
         * 堆中父元素不再大于等于子元素，因此需要将其放入合适的
         * 位置，使得堆满足特性，该过程则为向上堆化。
         * 
         * 向上堆化的过程其实就是不断与父元素比大小，如果比父元素大
         * 则与父元素交换位置，直到小于等于父元素或成为了堆顶的元素
         * 
         * 父元素上述说过，可通过当前元素索引Math.floor((index-1)/2)
         * 获取
         */

        // 获取当前元素索引
        let index = this.heap.length - 1
        // 如果索引大于0，证明当前元素不在堆顶，此时执行向上堆化
        while (index > 0) {
            // 获取父元素索引
            let rootIndex = Math.floor((index - 1) / 2)
            // 比较两值，如果当前元素值比父元素大则与父元素交换位置
            if (this.heap[index].priority > this.heap[rootIndex].priority) {
                this.swap(index, rootIndex)
                index = rootIndex
            }
            // 否则直接跳出元素，结束堆化
            else {
                break;
            }
        }
    }
    /**
     * @description: 向下堆化  TC:O(logn)  SC:O(1)
     * @author: JunLiangWang
     * @return {*}
     */    
    heapifyDown() {
        let index = 0
        /**
         * 将堆中最大元素弹出后，堆底元素会放入堆顶，并且数组长度会-1，此时
         * 堆顶不再是最大元素，因此需要执行向下堆化。
         * 向下堆化就是不断将左右子节点较大的且大于其父节点的节点与其父节点交换
         * 位置，直至到数组最后一个元素或不满足条件
         * 
         */

        // 当前元素的左子节点存在
        while (index * 2 + 1 < this.heap.length) {
            // 假设左子节点即为最大节点，计算其索引
            let maxChildIndex = index * 2 + 1,
            // 获取其右子节点索引
                rightChildIndex = index * 2 + 2
            // 如果右子节点存在，并且其值大于左子节点，将较大的节点赋值为右子节点
            if (this.heap[rightChildIndex] != undefined && this.heap[rightChildIndex].priority > this.heap[maxChildIndex].priority) {
                maxChildIndex = rightChildIndex
            }
            // 比较较大的子节点是否大于父节点，如果是则交换位置，继续迭代
            if (this.heap[index].priority < this.heap[maxChildIndex].priority) {
                this.swap(index, maxChildIndex)
                index = maxChildIndex
            }
            // 否则跳出循环，结束堆化
            else {
                break;
            }
        }
    }

}


var findMaximizedCapital = function(k, w, profits, capital) {
    // 将项目根据其成本从小到大排序
    let capitalSort=[];
    profits.forEach((el,index)=>{
        capitalSort.push([el,capital[index]])
    })
    capitalSort.sort((a,b)=>a[1]-b[1])
    // 初始化大顶堆
    let maxHeap=new MaxHeap(),
    // 当前资本值
    profit=w;
    let i=0;
    // 拿k个项目，迭代k次
    while(k--){
        // 将满足当前资本的项目，将其利润作为优先级，入队
        while(i<capitalSort.length&&profit>=capitalSort[i][1]){
            maxHeap.enquene(capitalSort[i][0],capitalSort[i][0])
            i++;
        }
        // 如果首次为空，证明没用满足当前资本的项目，直接跳出循环
        if(maxHeap.isEmpty())break;
        // 否则，获取利润最大的项目，加入当前资本中，继续迭代
        profit+=maxHeap.dequene().element
    }
    // 返回资本
    return profit
};