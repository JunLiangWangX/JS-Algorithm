/*
 * @Description: 在两个有序(降序)数组中寻找k位置大小的数
 * @Author: JunLiangWang
 * @Date: 2023-02-21 17:45:33
 * @LastEditors: JunLiangWang
 * @LastEditTime: 2023-02-22 11:02:44
 */

/**
 * @description: 合并数组方式  TC:O(m+n)  SC:O(m+n)
 * @author: JunLiangWang
 * @param {*} k       查找第k小的数字  
 * @param {*} array1  有序数组1
 * @param {*} array2  有序数组2
 * @return {*}
 */
function mergeArray(k,array1,array2){
   let mergeArray=new Array()
   let array2Index=0
   for(let i=0;i<array1.length;i++)
   {
      if(array2[array2Index]!=undefined&&array1[i]>array2[array2Index])
      {
         mergeArray.push(array2[array2Index])
         array2Index++
         i--
      }
      else
      {
        mergeArray.push(array1[i])
      }
   }
   for(let i=array2Index;i<array2.length;i++)
   {
      mergeArray.push(array2[i])
   }
   return mergeArray[k-1]
}

/**
 * @description: 合并数组(k个元素)  TC:O(k)  SC:O(k)
 * @author: JunLiangWang
 * @param {*} k       查找第k小的数字
 * @param {*} array1  有序数组1
 * @param {*} array2  有序数组2
 * @return {*}
 */
function mergePartOfArray(k,array1,array2){
   let mergeArray=[]
   let array1Index=0
   let array2Index=0
   for(let i=0;i<k;i++)
   {
      if(array1[array1Index]>array2[array2Index])
      {
         mergeArray.push(array2[array2Index])
         array2Index++
      }
      else
      {
        mergeArray.push(array1[array1Index])
        array1Index++
      }
   }
   return mergeArray[k-1]
}


/**
 * @description: 二分查找方式   TC:O(log(k))  SC:O(1)
 * @author: JunLiangWang
 * @param {*} k      查找第k小的数字
 * @param {*} array1 有序数组1
 * @param {*} array2 有序数组2
 * @return {*}
 */
function binarySearch(k,array1,array2){
   let remainder=k        // 剩余需要排除的数量  
   let index1=0,index2=0  //nums1,nums2数组开始排除的索引
   let number=0
   while(remainder)    //当排除的数量还有时
   {
      // 如果任意一个数组已排除完，则返回另一个数组（剩余需要排除的数量作为索引）的位置的值
      if(index1>=array1.length)
      {
        return array2[index2+remainder-1]
      }
      if(index2>=array2.length)
      {
        return array1[index1+remainder-1]
      }
      // 如果remain/2==0则证明0<remainder<2，已存在需要排除的数，此时将其赋值为1，直到remainder为0中止循环
      let excludeCount=Math.floor(remainder/2)?Math.floor(remainder/2):1
      // 当排除数加上当前索引大于了数组长度，证明超出了数组，将excludeCount重置为最大的长度
      if(index1+excludeCount>array1.length)
      {
        excludeCount=array1.length-index1
      }
      if(index2+excludeCount>array2.length)
      {
        excludeCount=array2.length-index2
      }
      // 如果索引以及索引加上排除数未到最大长度，则比较两者大小，并计算剩余需要排除的数量
      remainder-=excludeCount
      let item1=array1[index1+excludeCount-1]
      let item2=array2[index2+excludeCount-1]
      if(item1>item2)
      {
        number=item2
        index2+=excludeCount
      }
      else
      {
        number=item1
        index1+=excludeCount
      }
   }
   return number
}
