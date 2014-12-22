var expressionToParse = "a='1';b='1';or{'1','1'}='1';and{'1','1'}='1';and{'1','0'}='0';and(a,b);c=and(or(and(a,b),b),or(a,'1'));cout(c); d=and(and('1','1'),or('1','1'))";
function Interpreter(expression) {
    var self = this;
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
        "startAllocation", // 10 - :
        "listElementSeparator", //11 - ,
        "error", //12
        "parseTerminal" //13 - state for parsing terminal value
    ];
    this.stateMatrix = {
        9: {
            "=": 8,
            "(": 5,
            ")": 6,
            "{": 3,
            "}": 4,
            ",": 11,
            "control": 12,
            "literal": 9
        },
        0: {
            ";": 7,
            "control": 12,
            "literal": 9
        },
        8: {
            "'": 1,
            "literal": 9,
            "control": 12
        },
        1: {
            "'": 2,
            "literal": 1,
            "control": 1
        },
        2: {
            ";": 7,
            ",": 11,
            ")": 6,
            "}": 4,
            "literal": 12,
            "control": 12
        },
        3: {
            "literal": 9,
            "'": 1,
            "control": 12
        },
        4: {
            "=": 8,
            "literal": 12,
            "control": 12
        },
        5: {
            "literal": 9,
            "'": 1,
            "control": 12
        },
        6: {
            ")": 6,
            ";": 7,
            ",": 11,
            "literal": 12,
            "control": 12
        },
        7: {
            "literal": 9,
            "control": 12
        },
        11: {
            "'": 1,
            "literal": 9,
            "control": 12
        }

    };
    
    this.getStateAtPointer = function(pointer) {

        var stateObj = this.stateMatrix[this.automataState];
        var exp = this.expression[pointer];
        var exact = "";
        //trim spaces
        if (exp == " " && this.automataState != 1) {
            return;
        }
        if (typeof stateObj[exp] == "undefined") {
            exact = exp;
            exp = this.nonLiterals.indexOf(exp) == -1 ? "literal" : "control";
        }

        this.automataState = stateObj[exp];
        if (this.automataState == 12) {
            console.log("Error at " + pointer + ": Expected" + this.getExpected(stateObj) + " but '" + exact + "' found.");
        }

    }
    this.nonLiterals = "';:(){}=";
    this.nodeEndings = [2, 4, 6, 7];
    this.automataState = 0;
    this.getExpected = function(stateObject) {
        var retStr = ""
        for (x in stateObject) {
            if (x == "control")
                continue;
            retStr += " '" + x + " ',";
        }
        return retStr;
    }
    this.expression = expression;
    this.checkSyntax = function() {
        console.log("Checking syntax");
        var pointer = 0;

        while (pointer < this.expression.length && this.automataState != 12) {
            this.getStateAtPointer(pointer);
            pointer += 1;

        }
        if (this.automataState != 12)
            console.log("Syntax ok!");
    };

};


//var fatKathy = new Interpreter(expressionToParse);
//fatKathy.checkSyntax();
