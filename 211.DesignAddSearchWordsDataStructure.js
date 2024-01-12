/*
 * @Description: 请你设计一个数据结构，支持 添加新单词 和 
                 查找字符串是否与任何先前添加的字符串匹配 。
 * @Author: JunLiangWang
 * @Date: 2024-01-10 09:20:22
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2024-01-10 09:28:26
 */


/**
 * 本题与208题相似，也是使用字典树即可，不过
 * 需要注意的是，插入的字符可能为'.',因此需
 * 要在插入'.'字符时将其替换为另一个不会重复
 * 的key。
 * 其次由于'.'字符在搜索时是通配的意思，因此
 * 当遇到'.'字符时，需要查询该层所有节点。
 */
var WordDictionary = function () {
    this.tree = {

    }
};
WordDictionary.prototype.addWord = function (word) {
    function recursion(node, index) {
        if (index == word.length) {
            node.end = true
            return
        }
        let name = word[index]
        // 插入的字符可能为'.',因此需
        // 要在插入'.'字符时将其替换为
        // 另一个不会重复的key。
        if (name == '.') name = 'point'
        if (node[name] == undefined) node[name] = {}
        recursion(node[name], index + 1)
    }
    recursion(this.tree, 0)
};
WordDictionary.prototype.search = function (word) {
    function recursion(node, index) {
        if (index == word.length) return node.end == true
        // 由于'.'字符在搜索时是通配的意思，因此
        // 当遇到'.'字符时，需要查询该层所有节点。
        // 所有节点任一为true，则证明满足条件
        if (word[index] == '.') {
            let keys = Object.keys(node);
            for (let i = 0; i < keys.length; i++) {
                if (recursion(node[keys[i]], index + 1)) return true
            }
            return false
        } 
        // 否则查询当前字符，以及本层的'.'字符即可
        else {
            return (node['point'] != undefined && recursion(node['point'], index + 1)) || (node[word[index]] != undefined && recursion(node[word[index]], index + 1))
        }
    }
    return recursion(this.tree, 0)
};