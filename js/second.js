$(function(){
    //进入页面发送ajax
    var currentPage = 1;  //当前页
    var pageSize = 5;       //每页条数
    render();

    function render(){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:'json',
            success:function(res) {
                console.log(res);
                var htmlStr = template("secondTpl",res);
                $("tbody").html(htmlStr);

                //完成分页初始化
                $("#paginator").bootstrapPaginator({
                    //版本号
                    bootstrapMajorVersion:3,
                    //当前页 currentPage
                    currentPage: res.page,
                    //总页数  totalPages
                    totalPages: Math.ceil(res.total/res.size),
                    //给页码添加点击事件
                    onPageClicked:function(a,b,c,page) {
                        //更新当前页
                        currentPage = page;
                        //重新渲染页面
                        render();
                    }
                })
            }
        })
    }


    //点击添加分类按钮。显示添加模态框
    $("#addBtn").click(function(){
        $("#addModal").modal("show");

        //发送ajax请求。获取一级分类的数据。用于渲染
        $.ajax({
            type:'get',
            url:"/category/queryTopCategoryPaging",
            data:{
                page:1,
                pageSize:100
            },
            dataType:"json",
            success:function(res) {
                console.log(res);
                var htmlStr = template("dropdownTpl",res);
                $(".dropdown-menu").html(htmlStr);
            }
        })
    })


    //给下拉菜单.添加可选功能
    $(".dropdown-menu").on("click",'a',function(){
        //获取a的文本
        var txt = $(this).text();
        //设置给button按钮
        $("#dropdownText").text(txt);
    })



})