function MyCustomAction(executionContext){//scriptcallmyacton
    var globalContext = Xrm.Utility.getGlobalContext();
    var clientUrl = globalContext.getClientURL();

    var req = new XMLHttpRequest();
    req.open("POST", clientUrl+'/api/data/v9.2/new_MinhaPrimeiraAction',true);
    req.setRequestHeader('Accept', 'application/json')
    req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    req.setRequestHeader('OData-MaxVersion', '4.0');
    req.setRequestHeader('OData-Version', '4.0');
    req.onreadystatechange = function(){
        if(this.readyState == 4 /*Complete*/){
            req.onreadystatechange = null;
            if(this.status == 200 || this.status == 204){
                Xrm.Utility.alertDialog("Minha primeira Action Executada com sucesso");
            }
            else{
                var error = JSON.parse(this.response).error;
                Xrm.Utility.alertDialog("Error in Action: "+error.message);
            }
        }
    };
    req.send(JSON.stringify());

}