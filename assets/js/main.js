(function() {
  "use strict";

  // Some people block Google Analytics (e.g. with AdBlock), so we need to check if it's working, or our links will
  // be broken.
  var isGoogleAnalyticsWorking = function() {
    return typeof ga == 'function' && ga.hasOwnProperty('loaded') && ga.loaded === true;
  };

  var trackOutboundLink = function(event) {
    if (!isGoogleAnalyticsWorking()) {
      return true;
    }

    var anchor = $(event.currentTarget);
    var url = anchor.attr('href');
    var trk = anchor.attr('data-trk');
    var target = anchor.attr('target');
    var valueString = anchor.attr('data-value');
    var value = valueString ? parseInt(valueString, 10) : 0;

    var props = {
      'hitType': 'event',
      'eventCategory': 'outbound',
      'eventAction': 'click-' + trk,
      'eventLabel': url,
      'eventValue': value
    };

    if (target !== "_blank") {
      event.preventDefault();
      props['hitCallback'] = function() {
        window.location = url;
      };
    }

    ga('send', props);
  };

  $('.tracked').on('click', trackOutboundLink);
})();