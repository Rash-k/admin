import Mock from 'mockjs'
let List = [];
export default {
    getStatisticalData: () => {
        for (let i = 0; i < 9; i++) {
            List.push(
                Mock.mock({
                    奔驰A级: Mock.Random.float(1000000, 10000000, 0, 2),
                    奔驰C级: Mock.Random.float(1000000, 10000000, 0, 2),
                    奔驰E级: Mock.Random.float(1000000, 10000000, 0, 2),
                    奔驰S级: Mock.Random.float(1000000, 10000000, 0, 2),
                    奔驰GLA: Mock.Random.float(1000000, 10000000, 0, 2),
                    奔驰GLB: Mock.Random.float(1000000, 10000000, 0, 2),
                    奔驰GLC: Mock.Random.float(1000000, 10000000, 0, 2),
                    奔驰CLE: Mock.Random.float(1000000, 10000000, 0, 2),
                    奔驰CLS: Mock.Random.float(1000000, 10000000, 0, 2)
                })
            )
        }
        return {
            code:20000,
            data: {
                //饼图
                videoData: [
                    {
                        name: 'A级',
                        value: Mock.Random.float(10000, 100000, 0, 2)
                    },
                    {
                        name: 'C级',
                        value: Mock.Random.float(10000, 100000, 0, 2)
                    },
                    {
                        name: 'E级',
                        value: Mock.Random.float(10000, 100000, 0, 2)
                    },
                    {
                        name: 'GLA',
                        value: Mock.Random.float(10000, 100000, 0, 2)
                    },
                    {
                        name: 'GLB',
                        value: Mock.Random.float(10000, 100000, 0, 2)
                    },
                    {
                        name: 'GLC',
                        value: Mock.Random.float(10000, 100000, 0, 2)
                    },
                    {
                        name: 'GLE',
                        value: Mock.Random.float(10000, 100000, 0, 2)
                    }
                ],
                // 柱状图
                userData: [
                    {
                        date: '周一',
                        new: Mock.Random.integer(1, 50),
                        active: Mock.Random.integer(50, 200)
                    },
                    {
                        date: '周二',
                        new: Mock.Random.integer(1, 50),
                        active: Mock.Random.integer(50, 200)
                    },
                    {
                        date: '周三',
                        new: Mock.Random.integer(1, 50),
                        active: Mock.Random.integer(50, 200)
                    },
                    {
                        date: '周四',
                        new: Mock.Random.integer(1, 50),
                        active: Mock.Random.integer(50, 200)
                    },
                    {
                        date: '周五',
                        new: Mock.Random.integer(1, 50),
                        active: Mock.Random.integer(50, 200)
                    },
                    {
                        date: '周六',
                        new: Mock.Random.integer(1, 50),
                        active: Mock.Random.integer(50, 200)
                    },
                    {
                        date: '周日',
                        new: Mock.Random.integer(1, 50),
                        active: Mock.Random.integer(50, 200)
                    }
                ],
                // 折线图
                orderData: {
                    date: [
                        '20210131',
                        '20210220',
                        '20210331',
                        '20210430',
                        '20210531',
                        '20210630',
                        '20210731'
                    ],
                    data: List
                },
                tableData: [
                    {
                        name: 'A-class',
                        todayBuy: Mock.Random.float(10, 50, 0, 0),
                        monthBuy: Mock.Random.float(300, 1100, 0, 0),
                        totalBuy: Mock.Random.float(3000, 50000, 0, 0)
                    },
                    {
                        name: 'C-class',
                        todayBuy: Mock.Random.float(10, 50, 0, 0),
                        monthBuy: Mock.Random.float(300, 1100, 0, 0),
                        totalBuy: Mock.Random.float(3000, 50000, 0, 0)
                    },
                    {
                        name: 'E-class',
                        todayBuy: Mock.Random.float(10, 50, 0, 0),
                        monthBuy: Mock.Random.float(300, 1100, 0, 0),
                        totalBuy: Mock.Random.float(3000, 50000, 0, 0)
                    },
                    {
                        name: 'S-class(进口)',
                        todayBuy: Mock.Random.float(10, 50, 0, 0),
                        monthBuy: Mock.Random.float(300, 1100, 0, 0),
                        totalBuy: Mock.Random.float(3000, 50000, 0, 0)
                    },
                    {
                        name: 'GLA',
                        todayBuy: Mock.Random.float(10, 50, 0, 0),
                        monthBuy: Mock.Random.float(300, 1100, 0, 0),
                        totalBuy: Mock.Random.float(3000, 50000, 0, 0)
                    },
                    {
                        name: 'GLB',
                        todayBuy: Mock.Random.float(10, 50, 0, 0),
                        monthBuy: Mock.Random.float(300, 1100, 0, 0),
                        totalBuy: Mock.Random.float(3000, 50000, 0, 0)
                    },
                    {
                        name: 'GLC',
                        todayBuy: Mock.Random.float(10, 50, 0, 0),
                        monthBuy: Mock.Random.float(300, 1100, 0, 0),
                        totalBuy: Mock.Random.float(3000, 50000, 0, 0)
                    },
                    {
                        name: 'GLE',
                        todayBuy: Mock.Random.float(10, 50, 0, 0),
                        monthBuy: Mock.Random.float(300, 1100, 0, 0),
                        totalBuy: Mock.Random.float(3000, 50000, 0, 0)
                    },
                    {
                        name: 'GLS(进口)',
                        todayBuy: Mock.Random.float(10, 50, 0, 0),
                        monthBuy: Mock.Random.float(300, 1100, 0, 0),
                        totalBuy: Mock.Random.float(3000, 50000, 0, 0)
                    }
                ]
            }
       }
    }
}
