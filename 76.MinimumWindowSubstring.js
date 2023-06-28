/*
 * @Description: 给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。
                 如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。
 * @Author: JunLiangWang
 * @Date: 2023-06-28 08:57:15
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-06-28 09:35:43
 */


/**
 * @description: 滑动窗口   TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} s 给定字符串
 * @param {*} t 匹配字符串
 * @return {*}
 */
function slideWindow(s, t) {
    /**
     * 该方案使用滑动窗体的方式，首先遍历匹配字符串t，使用hashMap记录
     * 匹配字符串t中的所有单词的数量，然后使用遍历wordCount记录匹配字
     * 符串t中不重复的单词数量。
     * 
     * 然后定义左右两指针初始化指向首个元素，右指针不断向右移动，直至
     * 找到了匹配字符串t中的所有字符（如果遍历完仍无直接返回空即可）
     * 并记录该字符串(长度最小)，然后将左指针也向右移动，直至无法满足
     * 找到匹配字符串t中的所有字符时，此时又移动右指针，如此往复直到右
     * 指针超过了字符串s的长度
     */

    // 记录字符串t中所有单词的数量
    let recordMap = new Map(),
        // 记录字符串t中不重复的单词数量
        wordCount = 0;
    // 遍历字符串t，记录数据
    for (let i = 0; i < t.length; i++) {
        let val = recordMap.get(t[i])
        if (val) {
            recordMap.set(t[i], val + 1);
        }
        else {
            recordMap.set(t[i], 1);
            wordCount++;
        }
    }
    // 定义左指针指向首个元素
    let left = 0,
    // 定义右指针指向首个元素
        right = 0,
    // 记录最小的字符串
        result = '',
    // 记录临时满足条件的字符串
        tempResult = '';
    // 遍历字符串s，直至右指针超出字符串长度
    while (right <= s.length) {
        // 如果单词数量大于0，证明未找到t中的所有字符，
        // 此时不断移动右指针，直到找到所有t中字符
        if (wordCount > 0) {
            // 向临时满足条件的字符串追加字符
            tempResult += s[right];
            // 查看是否添加了t中的字符，如果是则需要做相应的记录
            let temp = recordMap.get(s[right])
            if (temp != undefined) {
                recordMap.set(s[right], temp - 1);
                if (temp - 1 == 0) wordCount--;
            }
            // 移动右指针
            right++;
        }
        // 反之，证明已找到t中的所有字符，这时候我们需要
        // 记录满足条件的最小子串，并且不断向右移动左指针
        // ，缩小满足条件的子串长度，当我们删除了t中的字符
        // ，子串无法满足找到字符串t中的所有字符，此时再去
        // 移动右指针    
        else {
            // 记录满足条件的最小子串
            if (result == '' || tempResult.length < result.length)
                result = tempResult  
            // 查看是否删除了t中的字符，如果是则需要做相应的记录
            let temp = recordMap.get(s[left])
            if (temp != undefined) {
                recordMap.set(s[left], temp + 1)
                if (temp == 0) wordCount++;
            }
            tempResult = tempResult.slice(1)
            // 移动左指针
            left++;
        }
    }
    // 返回结果
    return result;
}