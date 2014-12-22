this.nodeState = [
    "created", // 0 - for freshly created nodes
    "startTerminal", // 1 - '
    "endTerminal", // 2 - '
    "startDefinition", // 3 - {
    "endDefinition", // 4 - }
    "startParamList", // 5 - (
    "endParamList", // 6 - )
    "lineEnd", // 7 - ; 
    "assign", // 8 - =   
    "literal", // 9 - [\w]{1,}
    "startAllocation", // 10 - : //unused
    "listElementSeparator", //11 - ,
    "error", //12
    "parseTerminal" //13 - state for parsing terminal value
    


];
var stateMatrix={
    9:{
        "=":8,
        "(":5,
        ")":6,
        "{":3,
        "}":4,
        ",":11,
        "control":12,
        "literal":9
        
    },
    0:{
       ";":7,
       "control":12,
       "literal":9
    },
    8:{
        "'":1,
        "literal":9,
        "control":12
    },
    1:{
        "'":2,
        "literal":1,
        "control":1
    },
    2:{
        ";":7,
        ",":11,
        ")":6,
        "}":4,
        "literal":12,
        "control":12
    },
    3:{
        "literal":9,
        "'":1,
        "control":12
    },
    4:{
        "=":8,
        "literal":12,
        "control":12
    },
    5:{
        "literal":9,
        "'":1,
        "control":12
    },
    6:{
       ")":6,
       ";":7,
       ",":11,
       "literal":12,
       "control":12
    },
    7:{
        "literal":9,
        "control":12
    },
    11:{
        "'":1,
        "literal":9,
        "control":12
    }
    
}