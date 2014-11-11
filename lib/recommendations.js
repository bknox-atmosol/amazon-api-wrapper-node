/**
 * Recommendations API requests and definitions for Amazon's MWS web services.
 * 
 * @author Robert Saunders
 */
 var mws = require('mws-js/lib/mws');

/**
 * Construct a Recommendations API request for using with mws.Client.invoke()
 * 
 * @param {String} action Action parameter of request
 * @param {Object} params Schemas for all supported parameters
 */
function RecommendationsRequest(action, params) {
    var opts = {
        name: 'Recommendations',
        group: 'Recommendations',
        path: '/Recommendations/2013-04-01',
        version: '2013-04-01',
        legacy: false,
        action: action,
        params: params
    };
    return new mws.Request(opts);
}
