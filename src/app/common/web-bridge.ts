import {Injectable} from '@angular/core';

@Injectable()
export class WebBridge {

  constructor() {
    // this.connectWebViewJavascriptBridge(function(bridge) {
    //   bridge.init(function(message, responseCallback) {
    //     console.log('init bridge');
    //     responseCallback( { 'Javascript Responds': 'success'});
    //   });
    //
    // });
  }


  callWebBridge(msg, data, callback) {
    this.connectWebViewJavascriptBridge(function(bridge) {
      bridge.callHandler(msg, data, callback);
    });

  }

  registerHandler(msg, callback) {
    this.connectWebViewJavascriptBridge(function(bridge) {
      bridge.registerHandler(msg, callback);
    });
  }

  connectWebViewJavascriptBridge(callback) {
    // android
    if ((<any>window).WebViewJavascriptBridge) {
      callback((<any>window).WebViewJavascriptBridge);
    } else {
      document.addEventListener('WebViewJavascriptBridgeReady', function() {
        callback((<any>window).WebViewJavascriptBridge);
      }, false);
    }

    // ios
    if ((<any>window).WebViewJavascriptBridge) {
      return callback((<any>window).WebViewJavascriptBridge);
    }
    if ((<any>window).WVJBCallbacks) {
      return (<any>window).WVJBCallbacks.push(callback);
    }
    (<any>window).WVJBCallbacks = [callback];
    const WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() {
      document.documentElement.removeChild(WVJBIframe);
    }, 0);

  }


}
