
//random number generator for cards
$(".card").each(function(index){
    numList = randFour();
    //$(this).text(6);
    $(this).text(numList[index]);
})

$(".card").draggable({cursor: 'move',
revert: true}).droppable({
    accept: '.card',
    hoverClass: 'hovered',
    drop: handleCardDrop
  } );

  function handleCardDrop( event, ui ) {
    let cardInitial = $(this).text();
    let cardDrag = ui.draggable.text();
    $(this).text(cardDrag);
    ui.draggable.text(cardInitial);


  }
$(".parenthesis").on("click",function(){
    $(this).toggleClass("clickedParen");
})

function randFour(){
    numList = Array.from({length: 4}, () => (Math.floor(Math.random()*10)+1));
    while(! check24(numList)){
        console.log(numList)
        numList = Array.from({length: 4}, () => (Math.floor(Math.random()*10)+1));
    }
    return numList;
}

//the arithmetic operation
$(".arith").on("click",function(){
    mathing(this);
});

//keydown
addEventListener("keydown",function(event){
    switch(event.key){
        case("a"):
            mathing($(".arith:nth-child(1)"));
        break;

        case("s"):
            mathing($(".arith:nth-child(2)"));
        break;

        case("d"):
            mathing($(".arith:nth-child(3)"));
        break;

        case("f"):
            mathing($(".arith:nth-child(4)"));
        break;

        case("Enter"):
            if($(".isItCorrect").hasClass("correct")){
                $(".isItCorrect").removeClass("correct").text("");
                $(".parenthesis").removeClass("clickedParen");
                $(".operation").text("");
                $(".card").each(function(index){
                    numList = randFour();
                    //$(this).text(6);
                    $(this).text(numList[index]);
                })
            }
            else{
                correctOrNot();
            }
        break;
    }
})
    


//selecting which box
$(".operation").on("click",function(){
    $(".operation").removeClass("isSelected");
    $(this).addClass("isSelected");
})

//move on and adding aritmatic operation
function mathing(key){
    arithText = $(key).text();
    $(".isSelected").text(arithText);
    if($(".operation:last").hasClass("isSelected")){
        $(".operation").removeClass("isSelected");
        $(".operation:first").addClass("isSelected");
    }
    else{
        $(".isSelected").nextAll('.operation:first').addClass("isSelected");
        $(".isSelected").first().removeClass("isSelected");
    }
}


function correctOrNot(){

    equation = $(".card, .operation, .clickedParen").text();

    console.log(equation);
    if(eval(equation)===24){
        $(".isItCorrect").show().addClass("correct").text("CORRECT!!!").removeClass("incorrect");     
        return true;   
    }
    else{
        $(".isItCorrect").show().addClass("incorrect").text("WRONG!!!").removeClass("correct");        
        return false;
    }

}



//24 checker function
function check24(num_list){
    let op = ['+','-','*','/'];
    let count = 0;
    let total = '';

    perm = permutator(num_list)
    for (const x of perm){
        let num_list = x;
        for(const i of Array(4).keys()){
            for(const j of Array(4).keys()){
                for(const k of Array(4).keys()){
                    total = num_list[0] + op[i]+ num_list[1] + op[j] + num_list[2] + op[k]+ num_list[3];
                    count += evaluation(total);
                    total = '(' + num_list[0] + op[i]+ num_list[1] + ')' + op[j] + '(' + num_list[2] + op[k]+ num_list[3] + ')';
                    count += evaluation(total);
                    total = '(' +'(' + num_list[0] + op[i]+ num_list[1] + ')' + op[j] + num_list[2] + ')' + op[k]+ num_list[3];
                    count += evaluation(total);
                    total = '(' + num_list[0] + op[i]+ '(' + num_list[1] + op[j] + num_list[2] + ')' + ')' + op[k]+ num_list[3];
                    count += evaluation(total);
                    total = num_list[0] + op[i]+ '(' + num_list[1] + op[j] + num_list[2] + op[k]+ num_list[3] + ')';
                    count += evaluation(total); 
                    total = num_list[0] + op[i]+ '(' +'('+ num_list[1] + op[j] + num_list[2]+')' + op[k]+ num_list[3] + ')';
                    count += evaluation(total);
                    total = num_list[0] + op[i]+ '(' + num_list[1] + op[j] + '(' +num_list[2] + op[k]+ num_list[3] + ')' + ')';
                    count += evaluation(total);

                }
            }
        }
    }

    if(count >0){
        return true;
    }
    else{
        return false;
    }

}

//eval
function evaluation(equation){
    try{
        if (eval(equation)===24){
            return 1;
        }
        else{
            return 0;
        }
    }
    catch{
        return 0;
    }
}
//permutations
function permutator(inputArr) {
    var results = [];
  
    function permute(arr, memo) {
      var cur, memo = memo || [];
  
      for (var i = 0; i < arr.length; i++) {
        cur = arr.splice(i, 1);
        if (arr.length === 0) {
          results.push(memo.concat(cur));
        }
        permute(arr.slice(), memo.concat(cur));
        arr.splice(i, 0, cur[0]);
      }
  
      return results;
    }
  
    return permute(inputArr);
  } 

