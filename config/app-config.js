function getAppConfig() {

    return {
        auth: {
            authority: "https://localhost:5000",
			client_id: "gclib-demo",
			redirect_uri: "https://localhost:5501/oidc-callback.html",
			response_type: "id_token token",
			scope: "openid profile email gclib-demo.user",
			post_logout_redirect_uri: "https://localhost:5501/"
        },
        intl: {
            lang: 'en',
            data: {
                'en': {
                    'goodMorning': 'Good morning'
                },
                'de': {
                    'goodMorning': 'Guten Morgen'
                },
                'fr': {
                    'goodMorning': 'Bonjour'
                }
            }
        }       
    };
}