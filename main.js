var console = {
    log:function(){},
    info:function(a,decorator){
        
       var c = document.createTextNode(a),
           d = document.createElement("p");    
       d.appendChild(c);
       d.style.color="9a9aaa";
      
       document.getElementById("output").appendChild(d);
    },
    error:function(a){
        this.info(a);
    },
    
    post:function(e,callback){
        callback(e);
    }
};

window.addEventListener('load',function(){
   
    
    document.getElementById("parserStarter").addEventListener('focus', function (e) {
        
        var s = document.getElementById("editor").value; 
       
        var exp = s.replace(/[\r\n\s]+/g,"");
       
        var i = new Interpreter(exp);
        var builder = new NodeBuilder(i);
        builder.buildTree();


    
    
},false);
}, false);


    function parseKathy(exp) {
       
    }
