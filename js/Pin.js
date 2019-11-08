var num = 5;
var pin = ["&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"];
var curr = 0;

function updateDisplay()
{
    var txt = "&nbsp;";
    for(i = 0; i < num; i++)
    {
        txt += "<u>"
        if(pin[i] != "&nbsp;")
        {
            txt+="&bull;";
            //txt+="&#128514;";
        }
        else
        {
            txt+="&nbsp;";
        }
        txt +="</u>&nbsp;";
    }
    $("#PIN").html(txt);
}

function numClick(id)
{
    if(curr < num)
    {
        pin[curr] = id;
        curr++;
        updateDisplay();
    }
    //TODO: if(curr >= num) blah blah
}

function reset()
{
    pin = ["&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"];
    curr = 0;
    updateDisplay();
}

function backspace()
{
    if(curr != 0)
    {
        curr--;
        pin[curr] = "&nbsp;";
        updateDisplay(); 
    }
}