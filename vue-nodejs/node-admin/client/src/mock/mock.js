import Mock from 'mockjs'
import homeApi from "./home";
//设置延时，模拟数据 200-1000
Mock.setup({
    timeout:'200-2000'
});

//首页相关
//拦截/home/getData
Mock.mock(/\/volume\/getData/, 'get', homeApi.getStatisticalData);
