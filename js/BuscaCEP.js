function BuscaCep(primaryControl){//scriptcallactioncep
    //dados de navegação
    var globalContext = Xrm.Utility.getGlobalContext();
    var clientUrl = globalContext.getClientURL();
    
    //contexto do formulario
    var formContext = primaryControl;

    var cep = formContext.getControl("address1_postalcode").getAttribute().getValue();

    console.log("address1_postalcode: "+cep);

    if(cep){

        cep = cep.replace(/\D/g,'');
        var parameters = {
            "CepInput" : cep
        };

        req.open("POST", clientUrl+'/api/data/v9.2/new_ActionCEP',true);
        req.setRequestHeader('Accept', 'application/json')
        req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        req.setRequestHeader('OData-MaxVersion', '4.0');
        req.setRequestHeader('OData-Version', '4.0');
        req.onreadystatechange = function(){
            if(this.readyState == 4 /*Complete*/){
                req.onreadystatechange = null;
                if(this.status == 200 || this.status == 204){
                    Xrm.Utility.alertDialog("Action Executada com sucesso");
                    var result = JSON.parse(this.response);
                    const jsonCEP = JSON.parse(result.ResultadoCEP);
                    console.log(jsonCEP);
                    formContext.getAttribute("addres1_line1").setValue(jsonCEP.logradouro);
                    formContext.getAttribute("addres1_line1").setValue(jsonCEP.bairro);
                    formContext.getAttribute("addres1_city").setValue(jsonCEP.localidade);
                    formContext.getAttribute("addres1_stateorprovince").setValue(jsonCEP.uf);
                }
                else{
                    var error = JSON.parse(this.response).error;
                    Xrm.Utility.alertDialog("Error in Action: "+error.message);
                }
            }
        };
        req.send(JSON.stringify(parameters));
    }
}