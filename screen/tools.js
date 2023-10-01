function to_ar(c, j)
{
    console.log("kkkkk");
    var ar = 'أبحدرسصطعقكلمنهوى'.split('');
    var en = "ABJDRSXTEGKLZNHUV";
    if(c != "")
    {
        for(var i = 0; i < 17; i++)
        {
            if (en[i] == c)
            {
                console.log(ar[i]);
                if(j == 1 && c != "")
                {
                    setEngfirstletter(en[i]);
                    setArfirstletter(ar[i]);
                    console.log("-------1");
                }
                else if(j == 2)
                {
                    setEngsecondletter(en[i]);
                    setArsecondletter(ar[i]);
                    console.log("2");
                }
                else if(j == 3)
                {
                    setEngthirdletter(en[i]);
                    setArthirdletter(ar[i]);
                    console.log("3");
                }
            }
        }
    }
    else
    {
        if(j == 1)
        {
            setEngfirstletter("");
            setArfirstletter("");
        }
        else if(j == 2)
        {
            setEngsecondletter("");
            setArsecondletter("");
        }
        else if(j == 3)
        {
            setEngthirdletter("");
            setArthirdletter("");
        }
    }
}

function to_ar_num(c, j)
{
    console.log("kkkkkg");
    var ar = '٠١٢٣٤٥٦٧٨٩'.split('');
    var en = '0123456789'.split('');
    if(c != "")
    {
        for(var i = 0; i < 17; i++)
        {
            if (en[i] == c)
            {
                console.log(ar[i]);
                if(j == 1 && c != "")
                {
                    setEngfirstnumber(en[i]);
                    setArfirstnumber(ar[i]);
                    console.log("-------1");
                }
                else if(j == 2)
                {
                    setEngsecondnumber(en[i]);
                    setArsecondnumber(ar[i]);
                    console.log("2");
                }
                else if(j == 3)
                {
                    setEngthirdnumber(en[i]);
                    setArthirdnumber(ar[i]);
                    console.log("3");
                }
                else if(j == 4)
                {
                    setEngfourthnumber(en[i]);
                    setArfourthnumber(ar[i]);
                    console.log("4");
                }
            }
        }
    }
    else
    {
        if(j == 1)
        {
            setEngfirstnumber("");
            setArfirstnumber("");
        }
        else if(j == 2)
        {
            setEngsecondnumber("");
            setArsecondnumber("");
        }
        else if(j == 3)
        {
            setEngthirdnumber("");
            setArthirdnumber("");
        }
        else if(j == 4)
        {
            setEngfourthnumber("");
            setArfourthnumber("");
        }
    }
}

export default {to_ar, to_ar_num}