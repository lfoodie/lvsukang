$(function(){
    $(".mapHide").click(function(){
        $("div.address").hide();
    })
    /*=========================================购物车交互================================*/


function formatMoney(num){                       //以千进制格式化金额
    num = num.toString().replace(/\$|\,/g,'');  
    if(isNaN(num))  
        num = "0";  
    sign = (num == (num = Math.abs(num)));  
    num = Math.floor(num*100+0.50000000001);  
    cents = num%100;  
    num = Math.floor(num/100).toString();  
    if(cents<10)  
    cents = "0" + cents;  
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)  
    num = num.substring(0,num.length-(4*i+3))+','+  
    num.substring(num.length-(4*i+3));  
    return (((sign)?'':'-') + num + '.' + cents);  
}


function isAny(){
    var isAny=false;
    $("img.radio-check").each(function(){
        if("isselected"==$(this).attr("isselected")){
            isAny=true;
        }
    })
    if(isAny){
        $("button.title-button").css("background-color","#ff9900");
        $("button.title-button").css("border-color","#ff9900");
        $("button.bottom-button").css("background-color","#ff9900");
        $("button.bottom-button").removeAttr("disabled");
    }
    else{
        $("button.title-button").css("border-color","#AAAAAA");
        $("button.title-button").css("background-color","#AAAAAA");
        $("button.bottom-button").css("background-color","#AAAAAA");
        $("button.bottom-button").css("disabled","disabled");
    }
}
function checkIsAll(){
    var isAll=true;
    $("img.radio-check").each(function(){
        if("false"==$(this).attr("isselected")){
            isAll=false;
        }
    });
    if(isAll){
        $("img.radios-check").attr("isselect","isselect");
        $("img.radios-check").attr("src","images/cartSelected.png");
    }
    else{
        $("img.radios-check").attr("isselect","false");
        $("img.radios-check").attr("src","images/cartNotSelected.png");
    }
}
$("img.radio-check").click(function(){
    var isselected=$(this).attr("isselected");
    if(isselected=="isselected"){
        $(this).attr("isselected","false");
        $(this).attr("src","images/cartNotSelected.png");
        $(this).parents("tr.cart-item").css("background-color","#fff");
    }
    else{
        $(this).attr("isselected","isselected");
        $(this).attr("src","images/cartSelected.png");
        $(this).parents("tr.cart-item").css("background-color","#FFF8E1");
    }
    isAny();
    cal();
    checkIsAll();
})  
$("img.radios-check").click(function(){
    var isselect=$(this).attr("isselect");
    if(isselect=="isselect"){
        $(this).attr("isselect","false");
        $(this).attr("src","images/cartNotSelected.png");
        $("img.radio-check").each(function(){
            $(this).attr("isselected","false");
            $(this).attr("src","images/cartNotSelected.png");
            $(this).parents("tr.cart-item").css("background-color","#fff");
        })
    }
    else{
        $(this).attr("isselect","isselect");
        $(this).attr("src","images/cartSelected.png");
        $("img.radio-check").each(function(){
            $(this).attr("isselected","isselected");
            $(this).attr("src","images/cartSelected.png");
            $(this).parents("tr.cart-item").css("background-color","#FFF8E1");
        })
    }
    isAny();
    cal();
    checkIsAll();
})
function cal(){
    var sumPrice=0;
    var totalNumber=0;
    $("img.radio-check[isselected='isselected']").each(function(){
        var oid=$(this).attr("oid");
        var price=$(".nowPrice[oid="+oid+"]").text();
        var num=$("input.text[oid="+oid+"]").val();
        price=price.replace(/￥/g,"");
        price=price*num;
        sumPrice+=new Number(price);
        totalNumber+=new Number(num);
    });
    $("span.bottom-price,span.title-price").html("￥"+sumPrice);
    $("span.total").html(totalNumber);
}
$("a.increase").click(function(){
    var pid=$(this).attr("pid");
    var oid=$(".text[oid="+pid+"]").attr("oid");
    var num=$(".text[oid="+oid+"]").val();
    num++;
    $(".text[oid="+oid+"]").val(num);
    isAny();
    cal();
    checkIsAll();
    var oid_=$("img.radio-check[oid="+oid+"]").attr("oid");
    var num_=$("input.text[oid="+oid_+"]").val();
    var price_=$(".nowPrice[oid="+oid_+"]").text();
    price_=price_.replace(/￥/g,"");
    price_=price_*num_;
    var smallPrice=new Number(price_);
    smallPrice=formatMoney(smallPrice);
    $("span.calPrice[oid="+oid+"]").html("￥"+smallPrice);
});
$("a.decrease").click(function(){
    var pid=$(this).attr("pid");
    var oid=$(".text[oid="+pid+"]").attr("oid");
    var num=$(".text[oid="+oid+"]").val();
    num--;
    $(".text[oid="+oid+"]").val(num);
    isAny();
    cal();
    checkIsAll();
    var oid_=$("img.radio-check[oid="+oid+"]").attr("oid");
    var num_=$("input.text[oid="+oid_+"]").val();
    var price_=$(".nowPrice[oid="+oid_+"]").text();
    price_=price_.replace(/￥/g,"");
    price_=price_*num_;
    var smallPrice=new Number(price_);
    smallPrice=formatMoney(smallPrice);
    $("span.calPrice[oid="+oid+"]").html("￥"+smallPrice);
});
});