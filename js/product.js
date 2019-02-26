$(function(){
    //1进入页面完成一次渲染
    var currentPage = 1; //当前页
    var pageSize = 3;   //当前页的条数
    var picArr = [];    //存放所用用于提交的图片
    render();

    function render(){
        $.ajax({
            type:'get',
            url:'/product/queryProductDetailList',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType:'json',
            success:function(res) {
                console.log(res);
                var htmlStr = template("productTpl",res);
                $("tbody").html(htmlStr);


                //完成分页初始化
                $('#paginator').bootstrapPaginator({
                    //版本号
                    bootstrapMajorVersion: 3,
                    //当前页
                    currentPage: res.page,
                    //总页
                    totalPages: Math.ceil(res.total/res.size),
                    //给页码添加点击事件
                    onPageClicked:function(a,b,c,page) {
                        //更新当前页
                        currentPage = page;
                        //重新渲染
                        render();
                    }
                })
            }
        })
    }


    //2 点击添加按钮  显示添加模态框
    $("#addBtn").click(function(){
        //显示模态框
        $("#addModal").modal("show");

        //发送ajax  徐然下拉列表  获取全部的二级分类数据
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            dataType:'json',
            success:function(res) {
                console.log(res);
                var htmlStr = template("dropdownTpl",res);
                $(".dropdown-menu").html(htmlStr);
            }
        })
    });


    //3 给下拉菜单下面的a添加点击事件（事件委托）
    $(".dropdown-menu").on("click",'a',function(){
        //获取文本，设置给按钮
        var txt = $(this).text();
        $("#dropdownText").text(txt);
        //获取id设置给隐藏域
        var id = $(this).data('id');
        $('[name="brandId"]').val(id);
        //将隐藏域校验状态更新成VALID 成功状态
        $("#form").data('bootstrapValidator').updateStatus('brandId','VALID');
    });

    //4进行文件上传初始化
    $("#fileupload").fileupload({
        dataType:'json',
        //图片上传完成的回调函数
        done:function(e,data) {
            console.log(data);
            var picObj = data.result;   //接收结果
            var picUrl = picObj.picAddr;  //获取图片的路径

            //将后台返回的图片对象，追加到数组的最前面
            picArr.unshift(picObj);

            //追加到imgBox最前面
            $("#imgBox").prepend('<img style="height: 100px;" src="'+ picUrl +'" alt="">');

            if(picArr.length > 3 ) {
                //删除最后一个。数组的最后一项，图片的结构最后一张图也要移除
                picArr.pop();
                //找打最后一张图。让他自杀。找最后一个img类型的元素
                $("#imgBox img:last-of-type").remove();
            }
            if(picArr.length === 3) {
                //图片校验的状态。更新成 成功
                $("#form").data('bootstrapValidator').updateStatus('picStatus','VALID');
            }
        }
    });

    // 5. 添加表单校验功能
  $('#form').bootstrapValidator({
    // 配置 excluded 排除项, 对隐藏域完成校验
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 配置字段列表
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: '请输入商品名称'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '请输入商品描述'
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: '请输入商品库存'
          },
          // 1  10  111  1111
          // 正则校验, 必须非零开头的数字
          // \d  0-9 数字
          // ?   表示 0 次 或 1 次
          // +   表示 1 次 或 多次
          // *   表示 0 次 或 多次
          // {n} 表示 出现 n 次
          // {n, m}  表示 出现 n ~ m 次
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存必须是非零开头的数字'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '请输入商品尺码'
          },
          // 尺码格式, 必须是 xx-xx 格式,  xx 是两位的数字
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式, 必须是 xx-xx 格式,  xx 是两位数字, 例如: 32-40 '
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '请输入商品原价'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '请输入商品现价'
          }
        }
      },
      // 标记图片是否上传满三张的
      picStatus: {
        validators: {
          notEmpty: {
            message: '请上传三张图片'
          }
        }
      }
    }
  });

  //6 注册表单校验成功事件，阻止默认的提交。通过ajax提交
  $("#form").on('success.form.bv',function(e) {
      e.preventDefault();

      var paramsStr = $('#form').serialize();  //获取基础的表单数据
      
      //拼接上图片数据  picArr
      //key=value&key1=value1&key2=value2
      paramsStr += '&picArr=' + JSON.stringify(picArr);

      $.ajax({
          type:'post',
          url:'/product/addProduct',
          data:paramsStr,
          dataType:'json',
          success:function(res) {
              console.log(res);
              if(res.success) {
                  //关闭模态框
                  $("#addModal").modal('hide');
                  //重新渲染第一页
                  currentPage = 1;
                  render();

                  //重置表单元素的状态和内容
                  $("#form").data('bootstrapValidator').resetForm(true);
                  //重置按钮文本，图片
                  $('#dropdownText').text('请选择二级分类');
                  $("#imgBox img").remove();
                  picArr = [];
              }
          }
      })


  })


})