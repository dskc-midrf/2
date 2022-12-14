var analyticsParams = {};

var ANALYTICSLIBRARY = ANALYTICSLIBRARY || (function () {
    var _args = {}; // private

    return {
        init: function (Args) {
            _args = Args;
        },
        loadAnalyticsParam: function () {
            var id = _args[0];
            var unitId = _args[1];

            analyticsParams = {
                domain: window.location.hostname,
                type_id: parseInt(id),
                type: 'video',
                original_referrer: window.location.href
            };

            var unitIdToken = unitId;
            if (unitIdToken && unitIdToken.length > 0) {
                analyticsParams.unit = parseInt(unitId);
            }

            console.debug('analyticsParams', analyticsParams);

            DVIDSVideoAnalytics.track('loaded', analyticsParams);
            console.debug('DVIDSVideoAnalytics LOAD EVENT');
        },
        playAnalyticsParam: function () {
            var id = _args[0];
            var unitId = _args[1];

            analyticsParams = {
                domain: window.location.hostname,
                type_id: parseInt(id),
                type: 'video',
                original_referrer: window.location.href
            };

            var unitIdToken = unitId;
            if (unitIdToken && unitIdToken.length > 0) {
                analyticsParams.unit = parseInt(unitId);
            }

            console.debug('analyticsParams', analyticsParams);

            DVIDSVideoAnalytics.track('play', analyticsParams);
            console.debug('DVIDSVideoAnalytics Play EVENT');
        },
        endAnalyticsParam: function () {
            var id = _args[0];
            var unitId = _args[1];

            analyticsParams = {
                domain: window.location.hostname,
                type_id: parseInt(id),
                type: 'video',
                original_referrer: window.location.href
            };

            var unitIdToken = unitId;
            if (unitIdToken && unitIdToken.length > 0) {
                analyticsParams.unit = parseInt(unitId);
            }

            console.debug('analyticsParams', analyticsParams);

            DVIDSVideoAnalytics.track('ended', analyticsParams);
            console.debug('DVIDSVideoAnalytics Play EVENT');
        }
    };
}());