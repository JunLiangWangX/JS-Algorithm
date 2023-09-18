/*
 * @Description: 给你两个单词 beginWord 和 endWord ，以及一个字典 wordList 。
                 请你找出并返回所有从 beginWord 到 endWord 的 最短转换序列 ，
                 如果不存在这样的转换序列，返回一个空列表。
 * @Author: JunLiangWang
 * @Date: 2023-09-18 09:43:33
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-09-18 09:45:39
 */


/**
 * @description: 广度优先+深度优先
 * 引用leetcode：笨猪爆破组
 * @author: JunLiangWang
 * @param {*} beginWord  开始单词
 * @param {*} endWord    结束单词
 * @param {*} wordList   单词列表
 * @return {*}
 */
function BFSAndDFS (beginWord, endWord, wordList)  {
    const wordSet = new Set(wordList);
    wordSet.add(beginWord);               // 这个其实要不要都行
    if (!wordSet.has(endWord)) return []; // 单词表中没有终点词，无法变到终点词
  
    const levelMap = new Map();           // 存放图中的单词所在的层
    const wordMap = new Map();            // 存放图中的单词的邻接单词
    const visited = new Set();            // 记录访问过的节点
    const queue = [beginWord];            // 维护一个队列，初始放入起点词
    visited.add(beginWord);               // 入列即访问，存入visited
  
    let finished = false;             // 是否存在变化到终点词的路径
    let level = 0;             
    levelMap.set(beginWord, 0);       // 起始词的level为0
  
    while (queue.length) {            // 队列空了，所有邻接节点就遍历完了
      const levelSize = queue.length; // 当前level的单词个数
      level++;                        // 遍历当前层的单词，level+1
      for (let i = 0; i < levelSize; i++) { // 当前层的单词逐个出列考察
        const word = queue.shift();   // 当前出列的单词
  
        for (let i = 0; i < word.length; i++) {  // 遍历单词的所有字符
          for (let c = 97; c <= 122; c++) {      // 遍历26个字母字符
            const newWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
            if (!wordSet.has(newWord)) continue; // 不是单词表中的单词就忽略
            if (wordMap.has(newWord))            // 已经存在于wordMap
              wordMap.get(newWord).push(word);   // 对应的数组推入出列的单词
            else                                 // 初始化一个数组
              wordMap.set(newWord, [word]);      // 并放入“父单词”
  
            if (visited.has(newWord)) continue; // 该新单词已经访问过就忽略
            if (newWord == endWord)             // 遇到了终点词
              finished = true;                  // 存在抵达终点词的路径
  
            levelMap.set(newWord, level);       // 记录这个单词的level
            queue.push(newWord);                // 该新单词是下一层的，入列
            visited.add(newWord);               // 入列即访问，记录一下
          }
        }
      }
    }
    if (!finished) return []; // 无法到达终点词，返回[]
  
    const res = [];
    const dfs = (path, beginWord, word) => {
      if (word == beginWord) {          // 当前遍历的word，和起始词相同
        res.push([beginWord, ...path]); // 将当前路径推入res数组，加上起始词
        return;                        
      }
      path.unshift(word);        // 将当前单词加入到path数组的开头
      if (wordMap.get(word)) {   // 当前单词有对应的“父单词”们
        for (const parent of wordMap.get(word)) { // 遍历“父单词”们
          if (levelMap.get(parent) + 1 == levelMap.get(word)) { // 满足要求的
            dfs(path, beginWord, parent);                       // 递归dfs
          }
        }
      }
      path.shift(); // 回溯，撤销选择，将path数组开头的单词弹出
    }
    dfs([], beginWord, endWord); // dfs的入口
    return res;
  };