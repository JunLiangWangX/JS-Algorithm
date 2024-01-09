/*
 * @Description: 实现前缀树
 * @Author: JunLiangWang
 * @Date: 2024-01-09 10:08:51
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2024-01-09 10:13:46
 */

/**
 * 字典前缀树
 */
var Trie = function () {
    this.tree = {

    };
};

/**
 * @description: 插入
 * @author: JunLiangWang
 * @param {*} word
 * @return {*}
 */
Trie.prototype.insert = function (word) {
    function recursion(node, index) {
        if (node[word[index]] == undefined) node[word[index]] = {}
        if (index == word.length - 1) {
            node[word[index]].end = true
            return
        }
        recursion(node[word[index]], index + 1)
    }
    recursion(this.tree, 0)
};

/**
 * @description:搜索固定单词
 * @author: JunLiangWang
 * @param {*} word
 * @return {*}
 */
Trie.prototype.search = function (word) {
    function recursion(node, index) {
        if (index == word.length) return node.end != undefined
        return node[word[index]] != undefined && recursion(node[word[index]], index + 1)
    }
    return recursion(this.tree, 0)
};

/**
 * @description: 查找前缀
 * @author: JunLiangWang
 * @param {*} prefix
 * @return {*}
 */
Trie.prototype.startsWith = function (prefix) {
    function recursion(node, index) {
        if (index == prefix.length) return true
        return node[prefix[index]] != undefined && recursion(node[prefix[index]], index + 1)
    }
    return recursion(this.tree, 0)
};