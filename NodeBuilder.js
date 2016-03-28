
/**
 * 
 * @param {Interpreter} interpreter
 * @returns {nodeBuilder}
 */
function NodeBuilder(interpreter) {
    this.program = [];
    this.interpreter = interpreter;
    this.nonTerminals = [];
    this.internalFunctions = ["cout"];
    this.getnonTerminalByTerminal = function(terminal) {
        for (var x in this.program) {
            if (this.program[x].terminal == terminal)
                return this.program[x].nonTerminal;
        }
        return false;
    }
    this.cout = function(args){
        
        console.info("-------------------");
        console.info(args);
        console.info("-------------------");
    }
    
    
    this.processSingleNode = function(nodeStr){
        var terminalPart = nodeStr.split("(")[0].replace(" ","");
        var nonTerminalPart = nodeStr.split("(")[1].replace(")","").split(",");
        
        for (x in nonTerminalPart){
            if (nonTerminalPart[x].indexOf("'")!=-1){
                continue;
            }
            var literal = nonTerminalPart[x];
            nonTerminalPart[x] = this.getnonTerminalByTerminal(literal);
           
        }
        
        /*console.info("Checking node: "+nodeStr+ "Evaluated to:");
        console.info(nonTerminalPart);
        console.info("Searching maches...");*/
        
        
        
        var errorInfo=false;
        for(x in this.program){
            if (this.internalFunctions.indexOf(terminalPart)!=-1){
                
                this[terminalPart](nonTerminalPart[x]);
                return;
            }
            if (this.program[x].terminal==terminalPart && this.program[x].patterns.length>0){
                for(k in this.program[x].patterns){
                    var er=0;
                    for(z in this.program[x].patterns[k]){
                        if (this.program[x].patterns[k][z]!=nonTerminalPart[z]){
                            er++;
                        }
                    }
                    if (er==0){
                        //console.info ("Matched: "+this.program[x].patternResults[k]+" for function:"+this.program[x].terminal);
                        return this.program[x].patternResults[k];
                    }
                }
            }
        }
        console.error("Node: "+nodeStr+"don't match knowledge Base!");
    }
    this.parsenonTerminal = function(nonTerminal){
        if (nonTerminal.match(/\(/)==null){
            return nonTerminal;
        }
        var matchedNode= null;
        console.log(nonTerminal);
        console.log(nonTerminal.match(/\([\s\w\d\',]+\)/));
        while(( matchedNode = nonTerminal.match(/[\w\s]+\([\s\w\d\',]+\)/))!=null){
            matchedNode= matchedNode;
            var terminal = this.processSingleNode(matchedNode[0]);
            nonTerminal  = nonTerminal.replace(matchedNode[0],terminal);
        }
        return nonTerminal;
    }
    this.buildTree = function() {
        var nodes = this.interpreter.expression.split(";");
        var dontPush = false;
       
        for (x in nodes) {
            
            dontPush = false;
            var node = new Node();
            var splitedNode = nodes[x].split("=");
            node.terminal = splitedNode[0].replace(" ","");
            if (typeof splitedNode[1] != "undefined") {
                node.nonTerminal = splitedNode[1];
            }else{
                node.nonTerminal = splitedNode[0];
                node.terminal="";
                
            }
            node.nonTerminal = this.parsenonTerminal(node.nonTerminal,nodes[x]);
            
            if (node.terminal.indexOf("{") != -1) {
                var patternNode = node.terminal.split("{"); // 0 new terminal 1 new result
                var newTerminal = patternNode[0];
                patternNode[1] = patternNode[1].replace("}", "");
                var patternElements = patternNode[1].split(",");
                var patternNode = [];
                for (x in patternElements) {
                    
                    patternNode.push(patternElements[x].match(/[\'\w\s]+/)[0]);
                }
                
                node.patterns.push(patternNode);
               
                var patternResult = node.nonTerminal;
                node.patternResults.push(patternResult);
                node.terminal = newTerminal.replace(" ","");
                node.nonTerminal="<<function>>";
            }
           
            this.program.push(node);
        }
        
    }
};

//var builder = new NodeBuilder(fatKathy);
//builder.buildTree();
