// $(function(){
//     //已经入页面发送ajax请求
//     var currentPage = 1;  //当前页
//     var pageSize = 5;    // 每页的条数
//     render();

//     function render() {
//         $.ajax({
//             type:'get',
//             url:'/category/querySecondCategoryPaging',
//             data: {
//                 page:currentPage,
//                 pageSize: pageSize
//             },
//             dataType:'json',
//             success:function(res) {
//                 console.log(res);
//                 var htmlStr = template("secondTpl",res);
//                 $("tbody").html(htmlStr);


//                 //分页插件初始化
//                 $("#paginator").bootstrapPaginator({
//                     //版本号
//                     bootstrapMajorVesion:3,
//                     //当前页
//                     currentPage: res.page,
//                     //总页
//                     totalPages: Math.ceil(res.total/res.size),
//                     //给页码添加点击事件
//                     onPageClicked:function(a,b,c,page) {
//                         //更新当前页
//                         currentPage = page;
//                         //重新渲染
//                         render();
//                     }
//                 })
//             }
//         })
//     }

    //点击添加分类按钮。显示添加模态框
    // $("#addBtn").click(function(){
    //     //显示模态框
    //     $("#addModal").modal("show");
    //     //发送ajax请求
    //     $.ajax({
    //         type:'get',
    //         url:'/category/querySecondCategoryPaging',
    //         data: {
    //             page: 1,
    //             pageSize: 100
    //         },
    //         dataType:'json',
    //         success:function(res) {
    //             console.log(res);
    //             var htmlStr = template("dropdownTpl",res);
    //             $(".dropdown-menu").html(htmlStr);
    //         }
    //     })
    // })
// })