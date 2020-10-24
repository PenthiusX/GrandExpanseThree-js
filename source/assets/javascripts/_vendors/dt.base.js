/**
 * dt
 * @author Diego Tres http://diegotres.com
 */
(function() {




// ============================================================================
// Creates namespace
// ============================================================================
self.dt = self.dt || {};

// ============================================================================
// Creates empty function to avoid undefined console.
// ============================================================================
self.console = self.console || {
  info: function () {},
  log: function () {},
  debug: function () {},
  warn: function () {},
  error: function () {}
};

dt.isMobile = function() {
  var isIt = false;
  if(  navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)) {
    isIt = true;
  }
  return isIt;
};

// ============================================================================
// Utils
// ============================================================================
dt.$ = function(selectors)  { return document.querySelectorAll(selectors); };
dt.$$ = function(selectors) { return document.querySelector(selectors);    };
dt.extendClass =  function(proto) {
    function F() {}
    F.prototype = proto;
    return new F;
};


// ============================================================================
// requestAnimationFrame polyfill - Erik Möller, fixes Paul Irish & Tino Zijdel
// ============================================================================
(function() {
  var lastTime = 0;
  var vendors = [ 'ms', 'moz', 'webkit', 'o' ];
  for ( var x = 0; x < vendors.length && !self.requestAnimationFrame; ++ x ) {
    self.requestAnimationFrame = self[ vendors[ x ] + 'RequestAnimationFrame' ];
    self.cancelAnimationFrame = self[ vendors[ x ] + 'CancelAnimationFrame' ] || self[ vendors[ x ] + 'CancelRequestAnimationFrame' ];
  }
  if ( self.requestAnimationFrame === undefined && self['setTimeout'] !== undefined ) {
    self.requestAnimationFrame = function ( callback ) {
      var currTime = Date.now(), timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
      var id = self.setTimeout( function() { callback( currTime + timeToCall ); }, timeToCall );
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  if( self.cancelAnimationFrame === undefined && self['clearTimeout'] !== undefined ) {
    self.cancelAnimationFrame = function ( id ) { self.clearTimeout( id ) };
  }
}());

// ============================================================================
// Observer (PubSub) based on amplify 1.1.2 (http://amplifyjs.com)
// ============================================================================
(function() {
var slice = [].slice, subscriptions = {};

dt.publish = function( topic ) {
  if ( typeof topic !== "string" ) {
    throw new Error( "You must provide a valid topic to publish." );
  }
  var args = slice.call( arguments, 1 ),
    topicSubscriptions,
    subscription,
    length,
    i = 0,
    ret;
  if ( !subscriptions[ topic ] ) {
    return true;
  }
  topicSubscriptions = subscriptions[ topic ].slice();
  for ( length = topicSubscriptions.length; i < length; i++ ) {
    subscription = topicSubscriptions[ i ];
    ret = subscription.callback.apply( subscription.context, args );
    if ( ret === false ) {
      break;
    }
  }
  return ret !== false;
};

dt.subscribe = function( topic, context, callback, priority ) {
  if ( typeof topic !== "string" ) {
    throw new Error( "You must provide a valid topic to create a subscription." );
  }
  if ( arguments.length === 3 && typeof callback === "number" ) {
    priority = callback;
    callback = context;
    context = null;
  }
  if ( arguments.length === 2 ) {
    callback = context;
    context = null;
  }
  priority = priority || 10;
  var topicIndex = 0,
    topics = topic.split( /\s/ ),
    topicLength = topics.length,
    added;
  for ( ; topicIndex < topicLength; topicIndex++ ) {
    topic = topics[ topicIndex ];
    added = false;
    if ( !subscriptions[ topic ] ) {
      subscriptions[ topic ] = [];
    }
    var i = subscriptions[ topic ].length - 1,
      subscriptionInfo = {
        callback: callback,
        context: context,
        priority: priority
      };
    for ( ; i >= 0; i-- ) {
      if ( subscriptions[ topic ][ i ].priority <= priority ) {
        subscriptions[ topic ].splice( i + 1, 0, subscriptionInfo );
        added = true;
        break;
      }
    }
    if ( !added ) {
      subscriptions[ topic ].unshift( subscriptionInfo );
    }
  }
  return callback;
}

dt.unsubscribe = function( topic, context, callback ) {
  if ( typeof topic !== "string" ) {
    throw new Error( "You must provide a valid topic to remove a subscription." );
  }
  if ( arguments.length === 2 ) {
    callback = context;
    context = null;
  }
  if ( !subscriptions[ topic ] ) {
    return;
  }
  var length = subscriptions[ topic ].length, i = 0;
  for ( ; i < length; i++ ) {
    if ( subscriptions[ topic ][ i ].callback === callback ) {
      if ( !context || subscriptions[ topic ][ i ].context === context ) {
        subscriptions[ topic ].splice( i, 1 );
        i--;
        length--;
      }
    }
  }
}

}());



}());