
// 商品列表
$.ajax({
    url: 'http://127.0.0.1:8080/w/website/bannerList',
    data: {},
    type: 'get',
    success: function (res) {
        // console.log(res);
        var datalist = [];
        datalist = res.data;
        for (var i = 0; i < datalist.length; i++) {
            $(".contentBox").append(
                '<div class="item"><img src="' + datalist[i].img + '" alt="..."></div>'
            )
            $($(".contentBox").children()[0]).addClass("active");
        }
    }
})

$.ajax({
    url: 'http://127.0.0.1:8080/w/website/findGoodsTypeList',
    data: {},
    type: 'get',
    success: function (kind) {
        var commlist = [];
        commlist = kind.data;
        for (var i = 0; i < commlist.length; i++) {
            $(".navgation ul").append(
                '<li>' + commlist[i].name + '</li>'
            )
        }
        $(".navgation ul li").click(function () {
            var name = $(this).html();
            toods(name);
            $(this).addClass("nav-on").siblings().removeClass("nav-on");
        })
    }
})

toods("配饰");

function toods(name) {
    $.ajax({
        url: 'http://127.0.0.1:8080/w/website/findGoodsList',
        data: {
            info: name,
            pageNo: 1,
        },
        type: 'get',
        success: function (haha) {
            var commlist = [];
            commlist = haha.data.tbk_dg_material_optional_response.result_list.map_data;
            // console.log(commlist[5].pict_url);
            $(".commodity").children().remove();
            for (var i = 0; i < commlist.length; i++) {
                $(".commodity").append(
                    '<div class="goods"> <a href="shop.html?sp=' + commlist[i].item_id + '"> <img src="' + commlist[i].pict_url + '" alt=""> <div class="title">' + commlist[i].title + '</div> <div class="price"> ￥ <span class="group-price">' + commlist[i].tk_total_sales + '</span> <span class="market-price" ￥>' + commlist[i].reserve_price + '</span> <span class="count"> 已团' + commlist[i].commission_rate + '件 </span> </div> </a> </div>'
                );
            }
        },
    })
}

// 商品详情
// 放大镜
var tb_img = $(".tb-both");
var shadow = $(".shadow");
var img_right = $(".photo-right");

tb_img.mouseover(function () {
    shadow.show();
    img_right.show();
})
tb_img.mouseout(function () {
    shadow.hide();
    img_right.hide();
})

tb_img.mousemove(function (event) {

    var shadow_left = event.pageX - $(this).offset().left - shadow.width() / 2;
    var shadow_top = event.pageY - $(this).offset().top - shadow.height() / 2;

    if (shadow_left > tb_img.width() - shadow.width()) {
        shadow_left = tb_img.width() - shadow.width();
    }
    if (shadow_top > tb_img.height() - shadow.height()) {
        shadow_top = tb_img.height() - shadow.height();
    }
    if (shadow_left < 0) {
        shadow_left = 0;
    }
    if (shadow_top < 0) {
        shadow_top = 0;
    }

    shadow.css({
        "top": shadow_top + "px",
        "left": shadow_left + "px",
    })

    img_right.children().css({
        "position": "absolute",
        "top": - shadow_top * 2 + "px",
        "left": - shadow_left * 2 + "px",
    })
})

$(".picft").children().click(function(){
    $(".tb-both img")[0].src = this.src;
    $(".photo-right img")[0].src = this.src;
})


// 详情页
var xq = location.search.split("=")[1];
console.log(xq);
        $.ajax({
            url: 'http://127.0.0.1:8080/w/website/findGoodsDetail',
            data: {
                info: xq
            },
            type:'get',
            success: function(lgd) {
                console.log(lgd);
                var dataList = [];
                dataList = lgd.data.detail.tbk_item_info_get_response.results.n_tbk_item;
                $(".buybtn").eq(0).click(function(){
                    var datalist2 = JSON.parse(localStorage.getItem("gwc"))||[];
                    datalist2.push({
                        img:dataList[0].pict_url,
                        name:dataList[0].cat_name,
                        price:dataList[0].zk_final_price,
                        id:xq,
                        num:1,
                        state:false
                    });
                    localStorage.setItem("gwc",JSON.stringify(datalist2));
                })
                for (var i = 0; i < dataList.length; i++) {
                    $(".tb-both img")[0].src=dataList[0].pict_url;
                    $(".photo-right img")[0].src=dataList[0].pict_url;
                    $(".wrap-tit").html('<h1>'+dataList[0].title+'</h1>');
                    $(".tm-price span").eq(2).html(dataList[0].zk_final_price);
//                     $(".postAge span").html(dataList[0].provcity);
                    $(".picft img").eq(0)[0].src=dataList[0].pict_url;
                    $(".picft img").eq(1)[0].src=dataList[0].small_images.string[0];
                    $(".picft img").eq(2)[0].src=dataList[0].small_images.string[1];
                    $(".picft img").eq(3)[0].src=dataList[0].small_images.string[2];
                    $(".picft img").eq(4)[0].src=dataList[0].small_images.string[3];
//                     $(".count span").html(dataList[0].volume);
                }
            }
        })
// 购物车
