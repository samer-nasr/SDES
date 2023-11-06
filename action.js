var numb10 = [1,2,3,4,5,6,7,8,9,10];
var numb8 = [1,2,3,4,5,6,7,8];
var p10 = [3,5,2,7,4,10,1,9,8,6];
var p8 = [6,3,7,4,8,5,10,9];
var ip = [2,6,3,1,4,8,5,7];
var ip_1 = [4,1,3,5,7,2,8,6];
var ep = [4,1,2,3,2,3,4,1];
var p4 = [2,4,3,1];
var k1 = "";
var k2 = "";

// $(".calc").click(function(){
//     $(".result").text(p10[9]);
// });

$(document).ready(function() {
    // Attach an event handler to the input element
    $("#key").on("input", function() {
        // Get the current value of the input field
        var keyValue = $(this).val();
 
        $(".calc").click(function(){
           
            // Step 1 P10//
            var afterP10 = P10(keyValue);
            $(".result-p10").text(afterP10);

            // Step 2 Split//
            var leftPart = afterP10.substring(0,5);
            var rightPart = afterP10.substring(5,10);

            $(".split1").text(leftPart +" "+rightPart);

            // Step 3 LS-1//
            var leftAfterLS = LeftShift(leftPart,1);
            var righAfterLS = LeftShift(rightPart,1);
            $(".LS-1").text(leftAfterLS + " " + righAfterLS);

            // Step 4 Joint the 2 sides//
            var joinAfterLS = leftAfterLS + righAfterLS;
            $(".join").text(joinAfterLS);

            // Step 5 P8//
            var afterP8 = P8(joinAfterLS);
           
            $(".p8").text(afterP8);

            // Step 6 LS-2 For the LS-1//
            $(".LS-2").text(LeftShift(leftAfterLS,2) + " " + LeftShift(righAfterLS,2));

            // Step 7 P8 After LS-2//
            var joinAfterLS2 = LeftShift(leftAfterLS,2)+LeftShift(righAfterLS,2);
            var afterLS2P8 = P8(joinAfterLS2);

            $(".p8-after-ls2").text(afterLS2P8);
            // K1 And K2//
            k1 = afterP8;
            k2 = afterLS2P8;
        });
    });


    $("#plain-text").on("input" , function(){
        var plainTextValue = $(this).val();

        $(".calc").click(function(){
            //Step 8 IP for plaintext//
            var afterIp = IP(plainTextValue);
            $(".step8-ip").text(afterIp);

           //Step 9 Split after IP//
           var leftAfterIP = afterIp.substring(0,4);
           var rightAfterIP = afterIp.substring(4,9);
           $(".step9-split").text(leftAfterIP + " " + rightAfterIP);

            var res1 = Round(leftAfterIP,rightAfterIP,k1);
            $(".step10-ep").text(res1[0]);
            $(".step11-xor").text(res1[1]);
            $(".step12-s0s1").text(res1[2].substring(0,2) + " || " + res1[2].substring(2,4));
            $(".step13-p4s0s1").text(res1[3]);
            $(".step14-xorwithleft").text(res1[4]);
            $(".round1-finish").text(res1[5]);

            var leftForRound2 = res1[5].substring(5,9);
            var rightForRound2 = res1[5].substring(0,4);
           

            var res2 = Round(leftForRound2,rightForRound2,k2);
            $(".round2-1").text(res2[0]);
            $(".round2-2").text(res2[1]);
            $(".round2-3").text(res2[2].substring(0,2) + " || " + res2[2].substring(2,4));
            $(".round2-4").text(res2[3]);
            $(".round2-5").text(res2[4]);

            var last = res2[5].substring(0,4)+rightForRound2;
            $(".round2-6").text(IP_1(last));
            $(".round2-7").text(IP_1(last));

        });


    });
  });

  //Full Round Function//
  function Round(leftInput , rightInput , subkey){
        var results = [];
        //Step 10 EP for the right part//
        var afterEP = EP(rightInput);
        results[0] = afterEP;

        //Step 11 Xor with k1//
        var afterXorWithK1 = "";
        for (let i = 0; i < afterEP.length; i++) {
        if(subkey.charAt(i) == afterEP.charAt(i)){
            afterXorWithK1 += "0";
        }else {
            afterXorWithK1 += "1";
        }
        }
        results[1] = afterXorWithK1;

        //Step 12 S0 S1//
        var leftS0 = afterXorWithK1.substring(0,4);
        var rightS1 = afterXorWithK1.substring(4,9);
        var res = S0S1(leftS0,rightS1);

        var s0s1 = res[0] + res[1];
        results[2] = s0s1;

        //Step 13 P4 for S0S4//
        var afterP4 = P4(s0s1);
        results[3] = afterP4;

        //Step 14 Xor with left//
        var afterXorWithLeft = "";
       
        for (let i = 0; i < afterP4.length; i++) {
            if(leftInput.charAt(i) == afterP4.charAt(i)){
                afterXorWithLeft += "0";
            }else {
                afterXorWithLeft += "1";
            }
        }
            results[4] = afterXorWithLeft;

        // Round 1 Finish//
        var last = afterXorWithLeft + " "+ rightInput;
        results[5] = last;

        return results;
  }

  // Function for LEFT SHIFT//

  function LeftShift(input , numberOfShift){
    var res = input.substring(numberOfShift , input.length) + input.substring(0,numberOfShift);
    return res;
  }

  // Function for P10//

  function P10(input){
    var afterP10 = "";
    for (let i = 0; i < numb10.length; i++) {
        afterP10 += input.charAt(p10[i]-1);
    }

    return afterP10;
  }

  // Function for P8//

  function P8(input){
    var afterP8 = "";
    for (let i = 0; i < numb10.length; i++) {
        if(afterP8.length == 8){
            break;
        }
        afterP8 += input.charAt(p8[i]-1);
    }

    return afterP8;

  }

  // Function for IP//

  function IP(input){
    var res = "";
    for (let i = 0; i < numb8.length; i++) {
        res += input.charAt(ip[i]-1);
    }

    return res;
  }

  // Function for EP//

  function EP(input){
    var res = "";
    for (let i = 0; i < numb8.length; i++) {
        res += input.charAt(ep[i]-1);
    }
    return res;
  }

  function S0S1(input1 , input2){
    let s0 = [
        ["01", "00", "11", "10"],
        ["11", "10", "01", "00"],
        ["00", "10", "01", "11"],
        ["11", "01", "11", "10"],
        ];

    let s1 = [
        ["00", "01", "10", "11"],
        ["10", "00", "01", "11"],
        ["11", "00", "01", "00"],
        ["10", "01", "00", "11"],
        ];

    var row1 = input1.charAt(0)+input1.charAt(3);
    row1 = parseInt(toDecimal(row1));
    var col1 = input1.charAt(1)+input1.charAt(2);
    col1 = parseInt(toDecimal(col1));

    var row2 = input2.charAt(0)+input2.charAt(3);
    row2 = parseInt(toDecimal(row2));
    var col2 = input2.charAt(1)+input2.charAt(2);
    col2 = parseInt(toDecimal(col2));

    var res1 = s0[row1][col1];
    var res2 = s1[row2][col2];

    var res = [res1,res2];

    function toDecimal(nbr){
        if (nbr == "00") {
            return "0";
        } else if(nbr == "01") {
            return "1";
        } else if(nbr == "10"){
            return "2";
        } else if(nbr == "11"){
            return "3";
        }
    }

    return res;
  }

  function P4(input){
    var res = "";
    for (let i = 0; i < 4; i++) {
        res += input.charAt(p4[i]-1);
    }
    return res;
  }

  function IP_1(input){
    var res = "";
    for (let i = 0; i < input.length; i++) {
        res += input.charAt(ip_1[i] -1);
    }

    return res;
  }