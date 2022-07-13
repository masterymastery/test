// 普通递归 求斐波那契数列  1 1 2 3 5 8 13 21 
// 斐波那契数列公式：当n>2时，n的值等于前面两项值相加
// function fb(n) {
//     if (n === 1 || n === 2) {
//         return 1
//     } else {
//         return fb(n - 1) + fb(n - 2)
//     }
// }
// 此方法的时间复杂度为On2，如果n值较大，代码执行次数会呈指数级别上升，测试当n>40以后，执行就会很慢了，超过50等不到结果。
// 因为在使用递归的时候，存在着大量的代码浪费，每一个分支都会有同样的方法去执行。
// 于是乎，我们将已经计算出来的结果存起来，下一次如果遇到直接使用，不用再去递归计算了。


// 带备忘录的递归
// function dicFb(n) {
//     if (n < 1) {
//         return 0
//     }
//     let memo = new Array(n + 1)
//     memo.fill(0)
//     return fb(memo, n)
// }
// function fb(memo, n) {
//     if (n === 1 || n === 2) {
//         return 1
//     }
//     if (memo[n] !== 0) {
//         return memo[n]
//     }
//     return memo[n] = fb(memo, n - 1) + fb(memo, n - 2);
// }


// 动态规划 正向思维求解DP状态转移方程
// function DPfn(n) {
//     let dp = [] // 当前项对应的斐波那契数列的值，同时也是备忘录
//     dp[1] = 1
//     dp[2] = 1
//     // 给每一个备忘录赋值，
//     for (var i = 3; i <= n; i++) {
//         dp[i] = dp[i - 1] + dp[i - 2]
//     }
//     return dp[n]
// }


// 例1：爬楼梯 一步只能迈1个或2个台阶，问上N个台阶有几种上法
// https://leetcode.cn/problems/climbing-stairs/
// function floor(n) {
//     let dp = []
//     dp[1] = dp[2] = 1
//     for (var i = 3; i <= n; i++) {
//         dp[i] = dp[i - 1] + dp[i - 2]
//     }
//     return dp[n]
// }

// 例2：凑零钱 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。
// 计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。
// 你可以认为每种硬币的数量是无限的。
// https://leetcode.cn/problems/coin-change/


// 例3：最长递增子序列


console.time()
console.log(floor(10))
console.timeEnd()