var SalesforceChromeOAuth = function(clientId, clientSecret) {
    var redirectUri = 'https://' + chrome.runtime.id + '.chromiumapp.org/provider_cb';
    var redirectRe = new RegExp(redirectUri + '[#\?](.*)');

    this.authenticate = function(callback) {
        var host = "https://na15.salesforce.com"

        var options = {
            "interactive": true,
            "url": host + "/services/oauth2/authorize?client_id=" + clientId +
                "&response_type=code" +
                "&display=touch" +
                "&redirect_uri=" + encodeURIComponent(redirectUri)
        };

        chrome.identity.launchWebAuthFlow(options, function(redirectUri) {
            if (chrome.runtime.lastError) {
                callback(new Error(chrome.runtime.lastError));
                return;
            }

            // Upon success the response is appended to redirectUri, e.g.
            // https://{app_id}.chromiumapp.org/provider_cb#access_token={value}&refresh_token={value}
            var matches = redirectUri.match(redirectRe);
            if (matches && matches.length > 1) {
                handleProviderCodeResponse(parseRedirectFragment(matches[1]));
            } else {
                callback(new Error('Invalid redirect URI'));
            }
        });

        function parseRedirectFragment(fragment) {
            var pairs = fragment.split(/&/);
            var values = {};

            pairs.forEach(function(pair) {
                var nameval = pair.split(/=/);
                values[nameval[0]] = nameval[1];
            });

            return values;
        }

        function handleProviderCodeResponse(values) {
            if (values.hasOwnProperty("code")) {
                var url = host + '/services/oauth2/token' +
                    '?client_id=' + clientId +
                    '&client_secret=' + clientSecret +
                    '&grant_type=authorization_code' +
                    '&code=' + values.code +
                    '&redirect_uri=' + encodeURIComponent(redirectUri);

                var xhr = new XMLHttpRequest();
                xhr.open("POST", url, true);
                xhr.onload = function() {
                    if (this.status < 200 || this.status >=300) {
                        callback(new Error('error in handleCodeResponse.'));
                    } else {
                        handleProviderTokensResponse(JSON.parse(this.response));
                    }
                };
                xhr.send();
            } else {
                callback(new Error('error in handleProviderCodeResponse.'));
            }
        }

        function handleProviderTokensResponse(values) {
            if (values.hasOwnProperty('access_token') && values.hasOwnProperty('refresh_token')) {
                var newConnection = {
                    host: values.instance_url,
                    access_token: values.access_token,
                    refresh_token: values.refresh_token
                };
                callback(null, newConnection);
            } else {
                callback(new Error('error in handleProviderTokensResponse.'));
            }
        }
    }
}

module.exports = SalesforceChromeOAuth;