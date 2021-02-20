import Mock from 'mockjs'
let List = [];
export default {
    getStatisticalData: () => {
        for (let i = 0; i < 7; i++) {
            List.push(
                Mock.mock({
                    奔驰: Mock.Random.float(1000000, 10000000, 0, 2),
                    宝马: Mock.Random.float(1000000, 10000000, 0, 2),
                    奥迪: Mock.Random.float(1000000, 10000000, 0, 2),
                    本田: Mock.Random.float(1000000, 10000000, 0, 2),
                    丰田: Mock.Random.float(1000000, 10000000, 0, 2),
                    凯迪拉克: Mock.Random.float(1000000, 10000000, 0, 2),
                    红旗: Mock.Random.float(1000000, 10000000, 0, 2)
                })
            )
        }
        return {
            code:20000,
            data: {
                //饼图
                videoData: [
                    {
                        name: '奔驰',
                        value: Mock.Random.float(10000, 100000, 0, 2)
                    },
                    {
                        name: '宝马',
                        value: Mock.Random.float(10000, 100000, 0, 2)
                    },
                    {
                        name: '奥迪',
                        value: Mock.Random.float(10000, 100000, 0, 2)
                    },
                    {
                        name: '本田',
                        value: Mock.Random.float(10000, 100000, 0, 2)
                    },
                    {
                        name: '丰田',
                        value: Mock.Random.float(10000, 100000, 0, 2)
                    },
                    {
                        name: '凯迪拉克',
                        value: Mock.Random.float(10000, 100000, 0, 2)
                    },
                    {
                        name: '红旗',
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
                        name: '奔驰',
                        todayBuy: Mock.Random.float(100, 1000, 0, 0),
                        monthBuy: Mock.Random.float(3000, 5000, 0, 0),
                        totalBuy: Mock.Random.float(40000, 1000000, 0, 0)
                    },
                    {
                        name: '宝马',
                        todayBuy: Mock.Random.float(100, 1000, 0, 0),
                        monthBuy: Mock.Random.float(3000, 5000, 0, 0),
                        totalBuy: Mock.Random.float(40000, 1000000, 0, 0)
                    },
                    {
                        name: '奥迪',
                        todayBuy: Mock.Random.float(100, 1000, 0, 0),
                        monthBuy: Mock.Random.float(3000, 5000, 0, 0),
                        totalBuy: Mock.Random.float(40000, 1000000, 0, 0)
                    },
                    {
                        name: '本田',
                        todayBuy: Mock.Random.float(100, 1000, 0, 0),
                        monthBuy: Mock.Random.float(3000, 5000, 0, 0),
                        totalBuy: Mock.Random.float(40000, 1000000, 0, 0)
                    },
                    {
                        name: '丰田',
                        todayBuy: Mock.Random.float(100, 1000, 0, 0),
                        monthBuy: Mock.Random.float(3000, 5000, 0, 0),
                        totalBuy: Mock.Random.float(40000, 1000000, 0, 0)
                    },
                    {
                        name: '凯迪拉克',
                        todayBuy: Mock.Random.float(100, 1000, 0, 0),
                        monthBuy: Mock.Random.float(3000, 5000, 0, 0),
                        totalBuy: Mock.Random.float(40000, 1000000, 0, 0)
                    },
                    {
                        name: '红旗',
                        todayBuy: Mock.Random.float(100, 1000, 0, 0),
                        monthBuy: Mock.Random.float(3000, 5000, 0, 0),
                        totalBuy: Mock.Random.float(40000, 1000000, 0, 0)
                    },
                    {
                        name: '沃尔沃',
                        todayBuy: Mock.Random.float(100, 1000, 0, 0),
                        monthBuy: Mock.Random.float(3000, 5000, 0, 0),
                        totalBuy: Mock.Random.float(40000, 1000000, 0, 0)
                    },
                    {
                        name: '保时捷',
                        todayBuy: Mock.Random.float(100, 1000, 0, 0),
                        monthBuy: Mock.Random.float(3000, 5000, 0, 0),
                        totalBuy: Mock.Random.float(40000, 1000000, 0, 0)
                    }
                ]
            }
       }
    }
}
