/**
 * Created by JKJUN on 2017/3/30.
 */
function showhidediv(id) {

    var one = document.getElementsByName('spanone')[0];

    var two = document.getElementsByName('spantwo')[0];

    var lableone = document.getElementById("lable-one");

    var labletwo = document.getElementById("lable-two");
    //alert(id);

    if (id == "one") {
        //alert(one.className);
        if (one.className == "") {
            one.className = 'active';
            two.className = "";
            lableone.style.display = 'block';
            labletwo.style.display = 'none';
        }
    } else {
        if (two.className == "") {
            one.className = "";
            two.className = "active";
            lableone.style.display = 'none';
            labletwo.style.display = 'block';
        }

    }
}