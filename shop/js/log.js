// 登陆页面
//注册
$(".username").blur(function () {
    var text1 = $(".username").val();
    var reg1 = text1.match(/^[a-zA-Z0-9_-]{4,16}$/);
    if (!reg1) {
        $(this).val("");
        $(this).parent().find(".defult").show();
        $(this).parent().find(".success").hide();
    } else {
        $(this).parent().find(".success").show();
        $(this).parent().find(".defult").hide();
    }
})
$(".password").blur(function () {
    var text1 = $(".password").val();
    //以字母开头，长度在6~18之间，只能包含字母、数字和下划线
    var reg1 = text1.match(/^[a-zA-Z]\w{5,17}$/);
    if (!reg1) {
        $(this).val("");
        $(this).parent().find(".defult").show();
        $(this).parent().find(".success").hide();
    } else {
        $(this).parent().find(".success").show();
        $(this).parent().find(".defult").hide();
    }
})
$(".phonenumber").blur(function () {
    var text1 = $(".phonenumber").val();
    var reg1 = text1.match(/^1[^120]{1}[0-9]{9}$/);
    if (!reg1) {
        $(this).val("");
        $(this).parent().find(".defult").show();
        $(this).parent().find(".success").hide();
    } else {
        $(this).parent().find(".success").show();
        $(this).parent().find(".defult").hide();
    }
})
$(".email").blur(function () {
    var text1 = $(".email").val();
    var reg1 = text1.match(/^[A-Za-z0-9]+@[a-z0-9]+\.[com|cn]+$/);
    if (!reg1) {
        $(this).val("");
        $(this).parent().find(".defult").show();
        $(this).parent().find(".success").hide();
    } else {
        $(this).parent().find(".success").show();
        $(this).parent().find(".defult").hide();
    }
})


$(".log-button p").eq(0).click(function () {
    $(".log-with-password").find("a").eq(0).hide();
    $(".log-with-password").find("a").eq(1).show();
    $(".input").find(".input-username").eq(2).show();
    $(".input").find(".input-username").eq(3).show();
    $(".log-button").find(".login-button").eq(0).hide();
    $(".log-button").find(".login-button").eq(1).show();
    $(".log-button").find("p").eq(0).hide();
    $(".log-button").find("p").eq(1).show();
    $("#mpanel3").hide();
})

//登录
$(".log-button p").eq(1).click(function () {
    $(".log-with-password").find("a").eq(1).hide();
    $(".log-with-password").find("a").eq(0).show();
    $(".input").find(".input-username").eq(2).hide();
    $(".input").find(".input-username").eq(3).hide();
    $(".log-button").find(".login-button").eq(1).hide();
    $(".log-button").find(".login-button").eq(0).show();
    $(".log-button").find("p").eq(1).hide();
    $(".log-button").find("p").eq(0).show();
    $("#mpanel3").show();

})


// 验证码
// $('#mpanel4').slideVerify({
//     type: 2, //类型
//     vOffset: 5, //误差量，根据需求自行调整
//     vSpace: 5, //间隔
//     imgName: ['1.jpg', '2.jpg'],
//     imgSize: {
//         width: '350px',
//         height: '200px',
//     },
//     blockSize: {
//         width: '40px',
//         height: '40px',
//     },
//     barSize: {
//         width: '350px',
//         height: '40px',
//     },
//     ready: function () { },
//     success: function () {
//         alert('验证成功，添加你自己的代码！');
//         //......后续操作
//     },
//     error: function () {
//         //		        	alert('验证失败！');
//     }

// });


$(".log-button").find("button").eq(0).click(function () {
    $.ajax({
        url: "http://192.168.1.104:3000/users/login",
        type: "POST",
        data: {
            username: $(".username").val(),
            password: $(".password").val(),
        },
        success: function (data) {
            console.log(data);
            if(data.state === 0){
                $.ajax({
                    url:"http://192.168.1.104:3000/users/userinfo",
                    type:"get",
                    data:{
                        token:data.token,
                        username:$(".username").val()
                    },
                    success:function(data){ 
                        console.log(data);
                            if(data.state === 0){
                                localStorage.setItem("username1",data.userinfo.username);
                                setTimeout(function(){
                                    location.href = "banner.html";
                                })
                            }
                    }
                })
            }
        },
        error: function () {
            alert("验证失败!!!");
        }
    });
})

$(".log-button").find("button").eq(1).click(function () {
    $.ajax({
        url: "http://192.168.1.104:3000/users/register",
        type: "POST",
        data: {
            username: $(".username").val(),
            password: $(".password").val(),
            phone: $(".phonenumber").val(),
            email: $(".email").val()
        },
        success: function (data) {
            console.log(data);
        },
        error: function () {
            alert("验证失败!!!");
        }
    });
})