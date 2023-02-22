//console.log($(".card").children().html());
// Extend jQuery.fn with our new method
jQuery.extend(jQuery.fn, {
    // Name of our method & one argument (the parent selector)
    within: function (pSelector) {
        // Returns a subset of items using jQuery.filter
        return this.filter(function () {
            // Return truthy/falsey based on presence in parent
            return $(this).closest(pSelector).length;
        });
    }
});

randomNumbers();

//random number generator for cards
function randomNumbers() {
    numList = randFour();
    cardSuit = randCardSuit();
    $(".card-number").each(function (index) {
        suits(numList[index], index + 1, cardSuit[index])
        $(this).text(numList[index])
    })
    $(".card-number2").each(function (index) {
        $(this).text(numList[index])
    })
}

function randCardSuit() {
    x = Array.from({
        length: 4
    }, () => Math.floor(Math.random() * 4) + 1)
    let cardSuitArray = []
    for (let i = 0; i < x.length; i++) {
        switch (x[i]) {
            case (1):
                cardSuitArray[i] = "club";
                break;
            case (2):
                cardSuitArray[i] = "diamond";
                break;
            case (3):
                cardSuitArray[i] = "heart";
                break;
            case (4):
                cardSuitArray[i] = "spade";
                break;
        }
    }
    return cardSuitArray;
}
$("button").on("keydown click", function () {
    $(this).toggleClass("pressed").delay(100).queue(function () {
        $(this).toggleClass("pressed").dequeue();
    });
});

$("button:not(.submit)").on("keydown", function (e) {
    if (e.keyCode === 13) {
        e.preventDefault();
    }
});

$(".card").draggable({
    cursor: 'move',
    revert: true,
    //drag: handleCardDrag

}).droppable({
    accept: '.card',
    hoverClass: 'hovered',
    drop: handleCardDrop
});

function handleCardDrag(event) {

    ev.dataTransfer.setData($(this), id);
}

function handleCardDrop(event, ui) {
    let cardInitial = $(this).contents();
    let cardDrag = ui.draggable.contents();
    $(this).empty();
    cardDrag.appendTo($(this));
    ui.draggable.empty();
    cardInitial.appendTo($(ui.draggable));

    /*     $( ".1" ).empty();
        $(".2").contents().clone().appendTo($(".1")); */
}

$(".parenthesis").on("click", function () {
    $(this).toggleClass("clickedParen");
})

function randFour() {
    numList = Array.from({
        length: 4
    }, () => (Math.floor(Math.random() * 10) + 1));
    while (!check24(numList)) {

        numList = Array.from({
            length: 4
        }, () => (Math.floor(Math.random() * 10) + 1));
    }
    return numList;
}

//the arithmetic operation
$(".arith").on("click", function () {
    mathing(this);
});

$(".submit").on("click", function () {
    if ($(".isItCorrect").hasClass("correct")) {
        $(".isItCorrect").removeClass("correct").text("HI");
        $(".parenthesis").removeClass("clickedParen");
        $(".submit").text("Enter");
        $(".operation").text("");
        $('img').attr('src', '');
        randomNumbers();
    } else {
        correctOrNot();
    }
})

//keydown
addEventListener("keydown", function (event) {
    switch (event.key) {
        case ("a"):
            mathing($(".arith:nth-child(1)"));
            break;

        case ("s"):
            mathing($(".arith:nth-child(2)"));
            break;

        case ("d"):
            mathing($(".arith:nth-child(3)"));
            break;

        case ("f"):
            mathing($(".arith:nth-child(4)"));
            break;

        case ("Enter"):
            if ($(".isItCorrect").hasClass("correct")) {
                $(".isItCorrect").removeClass("correct").text("HI");
                $(".parenthesis").removeClass("clickedParen");
                $(".submit").text("Enter");
                $(".operation").text("");
                $('img').attr('src', '');
                randomNumbers();

            } else {
                correctOrNot();
            }
            break;
    }
})



//selecting which box
$(".operation").on("click", function () {
    $(".operation").removeClass("isSelected");
    $(this).addClass("isSelected");
})

//move on and adding aritmatic operation
function mathing(key) {
    arithText = $(key).text();
    $(".isSelected").text(arithText);
    if ($(".operation:last").hasClass("isSelected")) {
        $(".operation").removeClass("isSelected");
        $(".operation:first").addClass("isSelected");
    } else {
        $(".isSelected").nextAll('.operation:first').addClass("isSelected");
        $(".isSelected").first().removeClass("isSelected");
    }
}


function correctOrNot() {

    equation = $(".card-number, .operation, .clickedParen").text();
    try {
        if (eval(equation) === 24) {
            $(".isItCorrect").show().addClass("correct").text("CORRECT!!!").removeClass("incorrect");
            $(".submit").text("Next");
            return true;
        } else {
            $(".isItCorrect").show().addClass("incorrect shake").text("WRONG!!!").removeClass("correct");
            $(".isItCorrect").delay(300).queue(function () {
                $(".isItCorrect").removeClass("shake").dequeue();
            });
            return false;
        }
    } catch (err) {
        $(".isItCorrect").show().addClass("incorrect shake").text("ERROR: Parentheses don't match!!!").removeClass("correct");
        $(".isItCorrect").delay(300).queue(function () {
            $(".isItCorrect").removeClass("shake").dequeue();
        });

    }
}




//24 checker function
function check24(num_list) {
    let op = ['+', '-', '*', '/'];
    let count = 0;
    let total = '';

    perm = permutator(num_list)
    for (const x of perm) {
        let num_list = x;
        for (const i of Array(4).keys()) {
            for (const j of Array(4).keys()) {
                for (const k of Array(4).keys()) {
                    total = num_list[0] + op[i] + num_list[1] + op[j] + num_list[2] + op[k] + num_list[3];
                    count += evaluation(total);
                    total = '(' + num_list[0] + op[i] + num_list[1] + ')' + op[j] + '(' + num_list[2] + op[k] + num_list[3] + ')';
                    count += evaluation(total);
                    total = '(' + '(' + num_list[0] + op[i] + num_list[1] + ')' + op[j] + num_list[2] + ')' + op[k] + num_list[3];
                    count += evaluation(total);
                    total = '(' + num_list[0] + op[i] + '(' + num_list[1] + op[j] + num_list[2] + ')' + ')' + op[k] + num_list[3];
                    count += evaluation(total);
                    total = num_list[0] + op[i] + '(' + num_list[1] + op[j] + num_list[2] + op[k] + num_list[3] + ')';
                    count += evaluation(total);
                    total = num_list[0] + op[i] + '(' + '(' + num_list[1] + op[j] + num_list[2] + ')' + op[k] + num_list[3] + ')';
                    count += evaluation(total);
                    total = num_list[0] + op[i] + '(' + num_list[1] + op[j] + '(' + num_list[2] + op[k] + num_list[3] + ')' + ')';
                    count += evaluation(total);

                }
            }
        }
    }

    if (count > 0) {
        return true;
    } else {
        return false;
    }

}

//eval
function evaluation(equation) {
    try {
        if (eval(equation) === 24) {
            return 1;
        } else {
            return 0;
        }
    } catch {
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


function suits(number, cardOrder, cardSuit) {

    let suit = "images/" + cardSuit + ".png";
    $(".grid-item:nth-child(n+6):nth-child(-n+6)").within("." + cardOrder).attr("src", suit).addClass("mini");
    $(".grid-item:nth-child(n+30):nth-child(-n+30)").within("." + cardOrder).attr("src", suit).addClass("mini backwards");

    switch (number) {
        case (1):
            $(".grid-item:nth-child(n+18):nth-child(-n+18)").within("." + cardOrder).attr("src", suit);
            break;

        case (2):
            $(".grid-item:nth-child(n+8):nth-child(-n+8)").within("." + cardOrder).attr("src", suit);
            $(".grid-item:nth-child(n+28):nth-child(-n+28)").within("." + cardOrder).attr("src", suit).addClass("backwards");
            break;
        case (3):
            $(".grid-item:nth-child(n+18):nth-child(-n+18)").within("." + cardOrder).attr("src", suit);
            $(".grid-item:nth-child(n+8):nth-child(-n+8)").within("." + cardOrder).attr("src", suit);
            $(".grid-item:nth-child(n+28):nth-child(-n+28)").within("." + cardOrder).attr("src", suit).addClass("backwards");
            break;

        case (4):
            $(".grid-item:nth-child(n+7):nth-child(-n+7)").within("." + cardOrder).attr("src", suit);
            $(".grid-item:nth-child(n+9):nth-child(-n+9)").within("." + cardOrder).attr("src", suit);
            $(".grid-item:nth-child(n+27):nth-child(-n+27)").within("." + cardOrder).attr("src", suit).addClass("backwards");
            $(".grid-item:nth-child(n+29):nth-child(-n+29)").within("." + cardOrder).attr("src", suit).addClass("backwards");
            break;

        case (5):
            $(".grid-item:nth-child(n+18):nth-child(-n+18)").within("." + cardOrder).attr("src", suit);
            $(".grid-item:nth-child(n+7):nth-child(-n+7)").within("." + cardOrder).attr("src", suit);
            $(".grid-item:nth-child(n+9):nth-child(-n+9)").within("." + cardOrder).attr("src", suit);
            $(".grid-item:nth-child(n+27):nth-child(-n+27)").within("." + cardOrder).attr("src", suit).addClass("backwards");
            $(".grid-item:nth-child(n+29):nth-child(-n+29)").within("." + cardOrder).attr("src", suit).addClass("backwards");
            break;

        case (6):
            $(".grid-item:nth-child(n+7):nth-child(-n+7)").within("." + cardOrder).attr("src", suit);
            $(".grid-item:nth-child(n+9):nth-child(-n+9)").within("." + cardOrder).attr("src", suit);
            $(".grid-item:nth-child(n+17):nth-child(-n+17)").within("." + cardOrder).attr("src", suit);
            $(".grid-item:nth-child(n+19):nth-child(-n+19)").within("." + cardOrder).attr("src", suit);
            $(".grid-item:nth-child(n+27):nth-child(-n+27)").within("." + cardOrder).attr("src", suit).addClass("backwards");
            $(".grid-item:nth-child(n+29):nth-child(-n+29)").within("." + cardOrder).attr("src", suit).addClass("backwards");
            break;

        case (7):
            $(".grid-item:nth-child(n+7):nth-child(-n+7)").within("." + cardOrder).attr("src", suit);
            $(".grid-item:nth-child(n+9):nth-child(-n+9)").within("." + cardOrder).attr("src", suit);
            $(".grid-item:nth-child(n+17):nth-child(-n+17)").within("." + cardOrder).attr("src", suit);
            $(".grid-item:nth-child(n+13):nth-child(-n+13)").within("." + cardOrder).attr("src", suit);
            $(".grid-item:nth-child(n+19):nth-child(-n+19)").within("." + cardOrder).attr("src", suit);
            $(".grid-item:nth-child(n+27):nth-child(-n+27)").within("." + cardOrder).attr("src", suit).addClass("backwards");
            $(".grid-item:nth-child(n+29):nth-child(-n+29)").within("." + cardOrder).attr("src", suit).addClass("backwards");
            break;

        case (8):
            $(".grid-item:nth-child(n+7):nth-child(-n+7)").within("." + cardOrder).attr("src", suit);
            $(".grid-item:nth-child(n+9):nth-child(-n+9)").within("." + cardOrder).attr("src", suit);
            $(".grid-item:nth-child(n+17):nth-child(-n+17)").within("." + cardOrder).attr("src", suit);
            $(".grid-item:nth-child(n+13):nth-child(-n+13)").within("." + cardOrder).attr("src", suit);
            $(".grid-item:nth-child(n+19):nth-child(-n+19)").within("." + cardOrder).attr("src", suit);
            $(".grid-item:nth-child(n+23):nth-child(-n+23)").within("." + cardOrder).attr("src", suit).addClass("backwards");
            $(".grid-item:nth-child(n+27):nth-child(-n+27)").within("." + cardOrder).attr("src", suit).addClass("backwards");
            $(".grid-item:nth-child(n+29):nth-child(-n+29)").within("." + cardOrder).attr("src", suit).addClass("backwards");
            break;

        case (9):
            $(".grid-item:nth-child(n+18):nth-child(-n+18)").within("." + cardOrder).attr("src", suit);
            $(".grid-item:nth-child(n+7):nth-child(-n+7)").within("." + cardOrder).attr("src", suit);
            $(".grid-item:nth-child(n+9):nth-child(-n+9)").within("." + cardOrder).attr("src", suit);
            $(".grid-item:nth-child(n+27):nth-child(-n+27)").within("." + cardOrder).attr("src", suit).addClass("backwards");
            $(".grid-item:nth-child(n+29):nth-child(-n+29)").within("." + cardOrder).attr("src", suit).addClass("backwards");
            $(".grid-item:nth-child(n+12):nth-child(-n+12)").within("." + cardOrder).attr("src", suit);
            $(".grid-item:nth-child(n+14):nth-child(-n+14)").within("." + cardOrder).attr("src", suit);
            $(".grid-item:nth-child(n+22):nth-child(-n+22)").within("." + cardOrder).attr("src", suit).addClass("backwards");
            $(".grid-item:nth-child(n+24):nth-child(-n+24)").within("." + cardOrder).attr("src", suit).addClass("backwards");

            break;
        case (10):
            $(".grid-item:nth-child(n+7):nth-child(-n+7)").within("." + cardOrder).attr("src", suit);
            $(".grid-item:nth-child(n+9):nth-child(-n+9)").within("." + cardOrder).attr("src", suit);
            $(".grid-item:nth-child(n+27):nth-child(-n+27)").within("." + cardOrder).attr("src", suit).addClass("backwards");
            $(".grid-item:nth-child(n+29):nth-child(-n+29)").within("." + cardOrder).attr("src", suit).addClass("backwards");
            $(".grid-item:nth-child(n+12):nth-child(-n+12)").within("." + cardOrder).attr("src", suit);
            $(".grid-item:nth-child(n+14):nth-child(-n+14)").within("." + cardOrder).attr("src", suit);
            $(".grid-item:nth-child(n+22):nth-child(-n+22)").within("." + cardOrder).attr("src", suit).addClass("backwards");
            $(".grid-item:nth-child(n+24):nth-child(-n+24)").within("." + cardOrder).attr("src", suit).addClass("backwards");
            $(".grid-item:nth-child(n+13):nth-child(-n+13)").within("." + cardOrder).attr("src", suit);
            $(".grid-item:nth-child(n+23):nth-child(-n+23)").within("." + cardOrder).attr("src", suit).addClass("backwards");
            break;

    }
}

//$( ".1" ).replaceWith( $(".2") );

/* function cloneAttributes(target, source) {
    [...source.attributes].forEach( attr => { target.setAttribute(attr.nodeName ,attr.nodeValue) });
  } */
/*   function cloneAttributes(element, sourceNode) {
    let attr;
    let attributes = Array.prototype.slice.call(sourceNode.attributes);
    while(attr = attributes.pop()) {
      element.setAttribute(attr.nodeName, attr.nodeValue);
    }
  }
cloneAttributes($(".class:first"),$(".class:last"));

$( ".1" ).empty();
$(".2").contents().clone().appendTo($(".1"));

*/