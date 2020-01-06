const app = require('../app');
var request = require( 'request' );
var btoa = require( "btoa" );

exports.watson_machine_learning = function(req, res){
  res.render('top/wml.ejs');
}

exports.calculator = function(req, res){
    var wml_credentials = {
      "apikey": "",
      "instance_id": ""
    };
    var function_deployment_endpoint_url = "";

    res.render('top/calc.ejs');

    var io = require( 'socket.io' )( app.server );
    io.on( 'connection', function( socket ){
  	  console.log( 'io: connection...' );

    	socket.on( 'sendtofunction', function( data ){
    		console.log( 'io: sendtofunction...' );
        processdata( function_deployment_endpoint_url, data )
          .then( function( result ){
            console.log( "Result:\n" + JSON.stringify( result, null, 3 ) );
            socket.emit( 'processresult', result );
          })
          .catch( function( error ){
            console.log( "Error:\n" + error );
            socket.emit( 'processresult', { "error" : error } );
          });
    	  });
    });
    function processdata( endpoint_url, payload ){
      return new Promise( function( resolve, reject ){
          if( "" == endpoint_url ){
              reject( "Endpoint URL not set in 'server.js'" );
          }else{
              getAuthToken( wml_credentials["apikey"] ).then( function( iam_token ){
                  sendtodeployment( endpoint_url, iam_token, wml_credentials["instance_id"], payload ).then( function( result ){
                      resolve( result );

                  } ).catch( function( processing_error ){
                      reject( "Send to deployment error: " + processing_error );
                  } );
              } ).catch( function( token_error ){
                  reject( "Generate token: " + token_error );
              } );
          }
      } );
    }

    function getAuthToken( apikey ){
        // Use the IBM Cloud REST API to get an access token
        //
        var IBM_Cloud_IAM_uid = "bx";
        var IBM_Cloud_IAM_pwd = "bx";

        return new Promise( function( resolve, reject ){
            var options = { url     : "https://iam.bluemix.net/oidc/token",
                            headers : { "Content-Type"  : "application/x-www-form-urlencoded",
                                        "Authorization" : "Basic " + btoa( IBM_Cloud_IAM_uid + ":" + IBM_Cloud_IAM_pwd ) },
                            body    : "apikey=" + apikey + "&grant_type=urn:ibm:params:oauth:grant-type:apikey" };

            request.post( options, function( error, response, body ){
                if( error || ( 200 != response.statusCode ) ){
                    console.log( "getAuthToken:\n" + JSON.parse( body )["errorCode"] + "\n" + JSON.parse( body )["errorMessage"] + "\n" + JSON.parse( body )["errorDetails"] )
                    reject( "Status code: " + response.statusCode + "  Error: " + error );
                }else{
                    try{
                        resolve( JSON.parse( body )["access_token"] );
                    }catch( e ){
                        reject( 'JSON.parse failed.' );
                    }
                }
            } );
        } );
    }

    function sendtodeployment( endpoint_url, iam_token, instance_id, payload ){
        // Use the IBM Watson Machine Learning REST API to send the payload to the deployment
        // https://watson-ml-api.mybluemix.net/
        //
        return new Promise( function( resolve, reject ){
            var options = { url     : endpoint_url,
                            headers : { "Content-type"   : "application/json",
                                        "Authorization"  : "Bearer " + iam_token,
                                        "ML-Instance-ID" : instance_id },
                            body    : JSON.stringify( payload ) };

            request.post( options, function( error, response, body ){
                if( error ){
                    reject( error );
                }else{
                    try{
                        resolve( JSON.parse( body ) );
                    }catch( e ){
                        reject( 'JSON.parse failed.' );
                    }
                }
            } );
        } );
    }
}
