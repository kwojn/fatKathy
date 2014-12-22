fatKathy
========

Toy Logic Language interpreter in JS. Don't contribute it's bad.

Howto Use:
Currently You have to open index.html with browser, and go to console (F12)
in console create string using fatKathy syntax. type parseKathy(YourExpressionToParse) and press enter
You can check it out using predefined expressionToParse as argument

#Syntax

#defining variable
variable_name = 'variable_value'; // variable values have to be always wrapped in single quotes

#define logic

logicOperation{'logicValue','logicValue'} = 'logicOperationResult'; // logic operations have to provide all combinations allowed for each operations

#example:
not{'0'}='1'
no{'1'} = '0';

#using logic
operationName(param1,param2,[ further parameters]) //as arguments variables or values can be passed


#assigning function result to variable
variable=function(param1,param2);

# built in functions - there is only one - cout - puts arg to the console
cout(arg);


