/*
 * @Description: 给你两个单词 beginWord 和 endWord 和一个字典 wordList ，
                 返回 从 beginWord 到 endWord 的 最短转换序列 中的 单词数
                 目 。如果不存在这样的转换序列，返回 0 。
 * @Author: JunLiangWang
 * @Date: 2023-09-19 11:04:04
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-09-19 11:05:29
 */


/**
 * @description: 广度优先   TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} beginWord 开始单词
 * @param {*} endWord   结束单词
 * @param {*} wordList  单词列表
 * @return {*}
 */
function bfs(beginWord, endWord, wordList){
    const wordSet = new Set(wordList);
    const queue = [];
    queue.push([beginWord, 1]);
  
    while (queue.length) {
      const [word, level] = queue.shift();  // 当前出列的单词
      if (word == endWord) {
        return level;
      }
      for (let i = 0; i < word.length; i++) { // 遍历当前单词的所有字符
        for (let c = 97; c <= 122; c++) { // 对应26个字母
          const newWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1); // 形成新词
          if (wordSet.has(newWord)) { // 单词表里有这个新词
            queue.push([newWord, level + 1]); // 作为下一层的词入列
            wordSet.delete(newWord);  // 避免该词重复入列
          }
        }
      }
    }
    return 0; // bfs结束，始终没有遇到终点
}