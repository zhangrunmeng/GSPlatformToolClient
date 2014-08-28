'use strict';

/**
 * @ngdoc service
 * @name gsPlatformToolApp.signalRHubProxy
 * @description
 * # signalRHubProxy
 * Service in the gsPlatformToolApp.
 */
angular.module('gsPlatformToolApp')
  .service('signalRHubProxy', function signalRHubProxy($rootScope,serviceUrl,Utility) {
        function signalRHubProxyFactory (serverUrl,hubName,startOptions){
            var connection = $.hubConnection(serverUrl);
            var proxy = connection.createHubProxy(hubName);
            var connectionId='';
            connection.start(startOptions).done(function(){
                Utility.connectionId=connection.id;
                console.log('Now connected, connection ID='+Utility.connectionId);
            }).fail(function(error){console.log('Connection Failed '+error)});
            return {
                on: function(eventName,callback){
                    proxy.on(eventName,function(argu1,argu2){
                       $rootScope.$apply(function(){
                           if(callback){
                               callback(argu1,argu2);
                           }
                       }) ;
                    });
                },
                off: function(eventName,callback){
                    proxy.off(eventName,function(argu1,argu2){
                        $rootScope.$apply(function(){
                            if(callback){
                                callback(argu1,argu2);
                            }
                        });
                    });
                },
                invoke: function(methodName,argument,callback){

                    proxy.invoke(methodName,argument)
                        .done(function(result){
                            $rootScope.$apply(function(){
                                if(callback){
                                    callback(result);
                                }
                            });
                        });
                },
                defaultServer:serviceUrl,
                connectionId:connectionId,
                connection:connection

            }
        };
        return signalRHubProxyFactory;
  });
