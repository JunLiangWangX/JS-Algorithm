/*
 * @Description: 给你一个长度为 n 的链表，每个节点包含一个额外增加的随机指针 random ，
                 该指针可以指向链表中的任何节点或空节点。构造这个链表的 深拷贝。 深拷
                 贝应该正好由 n 个 全新 节点组成，其中每个新节点的值都设为其对应的原节
                 点的值。新节点的 next 指针和 random 指针也都应指向复制链表中的新节点，
                 并使原链表和复制链表中的这些指针能够表示相同的链表状态
 * @Author: JunLiangWang
 * @Date: 2023-10-13 09:47:13
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-10-13 09:55:25
 */


/**
 * @description: 哈希表  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} head 给定链表头节点
 * @return {*}
 */
function hashMap(head) {
    /**
     * 本方案采用哈希表的方式，首先遍历原链表，
     * 并根据原链表构建新链表，并利用哈希表将
     * 原链表节点与新链表节点作映射。然后再次
     * 遍历新链表，根据新链表节点的random属性
     * 可以获得原链表节点，然后通过hashMap找
     * 到对应的新链表节点并将random属性更新为
     * 该节点即可
     */

    // 新链表头
    const HEAD = new Node(0, null, null);
    // 定义哈希表，记录原链表节点与新链
    // 表节点的映射关系
    const recordMap = new Map();
    let node = HEAD;
    // 遍历原链表，并构建新链表
    while (head) {
        node.next = new Node(head.val, null, head.random);
        recordMap.set(head, node.next);

        node = node.next;
        head = head.next;
    }
    node = HEAD.next;
    // 遍历新链表
    while (node) {
        // 根据新链表节点的random属性可以获
        // 得原链表节点，然后通过hashMap找到
        // 对应的新链表节点
        if (node.random != null)
            node.random = recordMap.get(node.random)
        // 将该节点random属性更新为新链表的节点
        node = node.next;
    }
    // 返回结果
    return HEAD.next;
}