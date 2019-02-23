$(function(){

//初始化echarts实例】
    var echarts_left = echarts.init(document.querySelector(".echarts_left"));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '2019年注册人数'
            },
            tooltip: {},
            legend: {
                data:['人数']
            },
            xAxis: {
                data: ["1月","2月","3月","4月","5月","6月"]
            },
            yAxis: {},
            series: [{
                name: '人数',
                type: 'bar',
                data: [1000, 1500, 1800, 1200, 1000, 500]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        echarts_left.setOption(option);

    var echarts_right = echarts.init(document.querySelector(".echarts_right"));
    option2 = {
        title : {
            // 标题文本
            text: '热门品牌销售',
            //副文本标题
            subtext: '2019年2月',
            //控制水平方向位置
            x:'center',
            //控制主体文本样式
            textStyle: {
                color: "red",
                fontSize: 25
            }
        },
        //提示框组件
        tooltip : {
            trigger: 'item',
            // {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        //图例
        legend: {
            //配置图例的对齐方式，vertical: 垂直排列  horizontal: 水平排布
            orient: 'vertical',
            left: 'left',
            data: ['耐克','阿迪','新百伦','AJ','匡威']
        },
        series : [
            {
                name: '品牌热销',   //系列名称
                type: 'pie',      //饼图
                radius : '55%',     //控制圆的大小
                center: ['50%', '60%'],    //控制圆心的坐标
                
                //数据项名称
                data:[
                    {value:335, name:'耐克'},
                    {value:310, name:'阿迪'},
                    {value:234, name:'新百伦'},
                    {value:135, name:'AJ'},
                    {value:1548, name:'匡威'}
                ],

                //额外的效果
                itemStyle: {
                    emphasis: {
                        //设置一些阴影
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    echarts_right.setOption(option2);

})