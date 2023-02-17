$(".card").each(function(){
    $(this).text(Math.floor(Math.random()*10)+1)
})

$(".arith").on("click",function(){
    arithText = $(this).text();
    $(".isSelected").text(arithText)
})

$(".operation").on("click",function(){
    $(".operation").removeClass("isSelected");
    $(this).addClass("isSelected");
})



