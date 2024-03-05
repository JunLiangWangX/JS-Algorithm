/*
 * @Description: 给定两个以 非递减顺序排列 的整数数组 nums1 和 nums2 , 以及一个整数 k 。
                 定义一对值 (u,v)，其中第一个元素来自 nums1，第二个元素来自 nums2 。
                 请找到和最小的 k 个数对 (u1,v1),  (u2,v2)  ...  (uk,vk) 。
 * @Author: JunLiangWang
 * @Date: 2024-02-19 14:37:24
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2024-02-19 14:37:37
 */
/**
 * 为了描述方便：nums1记作a，nums2记作b
 * 由于数组是有序的，(a[0],b[0]) 是和最小的数对，计入答案。并且次小的只能是 (a[0],b[1])
 * 或 (a[1],b[0])，因为其它没有计入答案的数对和不会比这两个更小。(a[0],b[1]) 和 
 * (a[1],b[0])这两个数对和的大小还好比较，但如果要求第 k 小，就要涉及到更多的数对，
 * 那样就更加复杂了。如何按从小到大的顺序快速地求出这些数对呢？

 * 为了更高效地比大小，我们可以借助最小堆来优化。堆中保存下标对 (i,j)，即可能成为下一个数
 * 对的 a 的下标 i 和 b 的下标 j。堆顶是最小的 a[i]+b[j]。初始把 (0,0)入堆。每次出堆时，
 * 可能成为下一个数对的是 (i+1,j)和 (i,j+1)，这俩入堆。（和「初步思路」中的讨论一样，其它的不会比这两个更小。）
 * 但这会导致一个问题：例如当 (1,0) 出堆时，会把 (1,1) 入堆；当 (0,1) 出堆时，也会把 (1,1) 入堆，
 * 这样堆中会有重复元素。为了避免有重复元素，还需要额外用一个哈希表记录在堆中的下标对。只有当下标对
 * 不在堆中时，才能入堆。能否不用哈希表呢？

 * 换个角度，如果要把 (i,j) 入堆，那么出堆的下标对是什么？
 * 根据上面的讨论，出堆的下标对只能是 (i−1,j) 和 (i,j−1)。
 * 只要保证 (i−1,j) 和 (i,j−1) 的其中一个会将 (i,j) 入堆，而另一个什么也不做，就不会出现重复了！
 * 不妨规定 (i,j−1) 出堆时，将 (i,j) 入堆；而 (i−1,j)  出堆时只计入答案，其它什么也不做。
 * 换句话说，在 (i,j) 出堆时，只需将 (i,j+1) 入堆，无需将 (i+1,j) 入堆。
 * 但若按照该规则，初始仅把 (0,0) 入堆的话，只会得到 (0,1),(0,2),⋯ 这些下标对。
 * 所以初始不仅要把 (0,0) 入堆，(1,0),(2,0),⋯ 这些都要入堆。

 上述参考：灵茶山艾府

 * 
 * 小顶堆由于是一颗完全二叉树，因此可以使用数组存放，并且可以根据数组索引计算出其父元素/
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
 * 根据上述特性，我们即可开始构建小 顶堆
 */
 class MinHeap {
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
     * @description: 出队（获取堆中最小元素） TC:O(logn)  SC:O(1)
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
         * 堆中父元素不再小于等于子元素，因此需要将其放入合适的
         * 位置，使得堆满足特性，该过程则为向上堆化。
         * 
         * 向上堆化的过程其实就是不断与父元素比大小，如果比父元素小
         * 则与父元素交换位置，直到大于父元素或成为了堆顶的元素
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
            if (this.heap[index].priority < this.heap[rootIndex].priority) {
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
         * 将堆中最小元素弹出后，堆底元素会放入堆顶，并且数组长度会-1，此时
         * 堆顶不再是最小元素，因此需要执行向下堆化。
         * 向下堆化就是不断将左右子节点较小的且小于其父节点的节点与其父节点交换
         * 位置，直至到数组最后一个元素或不满足条件
         * 
         */

        // 当前元素的左子节点存在
        while (index * 2 + 1 < this.heap.length) {
            // 假设左子节点即为最小节点，计算其索引
            let minChildIndex = index * 2 + 1,
            // 获取其右子节点索引
                rightChildIndex = index * 2 + 2
            // 如果右子节点存在，并且其值大于左子节点，将较大的节点赋值为右子节点
            if (this.heap[rightChildIndex] != undefined && this.heap[rightChildIndex].priority < this.heap[minChildIndex].priority) {
                minChildIndex = rightChildIndex
            }
            // 比较较大的子节点是否小于父节点，如果是则交换位置，继续迭代
            if (this.heap[index].priority > this.heap[minChildIndex].priority) {
                this.swap(index, minChildIndex)
                index = minChildIndex
            }
            // 否则跳出循环，结束堆化
            else {
                break;
            }
        }
    }

}

var kSmallestPairs = function(nums1, nums2, k) {
    let minHeap=new MinHeap(),result=[];
    for(let i=0;i<Math.min(nums1.length,k);i++){
        minHeap.enquene([i,0],nums1[i]+nums2[0])
    }
    while(result.length<k&&!minHeap.isEmpty()){
        let node=minHeap.dequene().element
        result.push([nums1[node[0]],nums2[node[1]]])
        if(node[1]<nums2.length-1)
        minHeap.enquene([node[0],node[1]+1],nums1[node[0]]+nums2[node[1]+1])
    }
    return result
};