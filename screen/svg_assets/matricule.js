import React from "react";
import { View, Text, Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');
import Basic_00 from "./basic-00"
import Basic from "./basic"
import Basic_06 from "./basic-06"
import Public_00 from "./public-00"
import Public_01 from "./public-01"
import Motor from "./motor"

let w = 0

export default function Matricule({style, alpha, number, type}) {
    if (style == 'basic-00')
    {
        if (type == 'listing')
            w = 32
        else if(type == 'detail')
            w = 75
        return (<Basic_00 alpha={alpha} number={number} w={w}/>)
    }
    else if (style == 'basic-01')
    {
        if (type == 'listing')
            w = 32
        else if(type == 'detail')
            w = 75
        return (<Basic style="01" alpha={alpha} number={number} w={w}/>)
    }
    else if (style == 'basic-02')
    {
        if (type == 'listing')
            w = 32
        else if(type == 'detail')
            w = 75
        return (<Basic style="02" alpha={alpha} number={number} w={w}/>)
    }
    else if (style == 'basic-03')
    {
        if (type == 'listing')
            w = 32
        else if(type == 'detail')
            w = 75
        return (<Basic style="03" alpha={alpha} number={number} w={w}/>)
    }
    else if (style == 'basic-04')
    {
        if (type == 'listing')
            w = 32
        else if(type == 'detail')
            w = 75
        return (<Basic style="04" alpha={alpha} number={number} w={w}/>)
    }
    else if (style == 'basic-05')
    {
        if (type == 'listing')
            w = 32
        else if(type == 'detail')
            w = 75
        return (<Basic style="05" alpha={alpha} number={number} w={w}/>)
    }
    else if (style == 'basic-06')
    {
        if (type == 'listing')
            w = 28
        else if(type == 'detail')
            w = 50
        return (<Basic_06 alpha={alpha} number={number} w={w}/>)
    }
    else if (style == 'public-00')
    {
        if (type == 'listing')
            w = 32
        else if(type == 'detail')
            w = 75
        return (<Public_00 alpha={alpha} number={number} w={w}/>)
    }
    else if (style == 'public-01')
    {
        if (type == 'listing')
            w = 28
        else if(type == 'detail')
            w = 50
        return (<Public_01 alpha={alpha} number={number} w={w}/>)
    }
    else if (style == 'motor')
    {
        if (type == 'listing')
            w = 28
        else if(type == 'detail')
            w = 50
        return (<Motor alpha={alpha} number={number} w={w}/>)
    }
    
}