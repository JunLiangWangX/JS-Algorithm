/*
 * @Description: 实现RandomizedSet 类：
                 1.RandomizedSet() 初始化 RandomizedSet 对象
                 2.bool insert(int val) 当元素 val 不存在时，向集合中插入该项，并返回 true ；否则，返回 false 。
                 3.bool remove(int val) 当元素 val 存在时，从集合中移除该项，并返回 true ；否则，返回 false 。
                 4.int getRandom() 随机返回现有集合中的一项（测试用例保证调用此方法时集合中至少存在一个元素）。每个元素应该有 相同的概率 被返回。
                 你必须实现类的所有函数，并满足每个函数的 平均 时间复杂度为 O(1) 。
 * @Author: JunLiangWang
 * @Date: 2023-11-10 10:13:45
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-11-10 10:18:44
 */

/**
 * 本方案使用map+array的方式，利用map实现插入/删除，并且
 * 满足O(1)的时间复杂度。而getRandom则利用数组，在插入元
 * 素时，同样在数组中插入相应的元素，并在map中记录插入的
 * 元素的索引。删除元素时，将数组尾部元素移动到删除的元素
 * 的位置，并改变该元素在map中的记录的索引，然后删除数组与
 * map中的元素
 */
var RandomizedSet = function () {
    this.list = [];
    this.map = new Map();
};
RandomizedSet.prototype.insert = function (val) {
    if (this.map.has(val)) return false
    this.map.set(val, this.list.length)
    this.list.push(val)
    return true
};
RandomizedSet.prototype.remove = function (val) {
    let index = this.map.get(val)
    if (index == undefined) return false
    this.list[index] = this.list[this.list.length - 1]
    this.map.set(this.list[index], index);
    this.list.pop();
    this.map.delete(val)
    return true
};
RandomizedSet.prototype.getRandom = function () {
    return this.list[Math.floor(Math.random() * this.list.length)];
};