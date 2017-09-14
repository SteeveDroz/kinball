const config = {}
const loadConfig = new Promise(function(resolve, reject) {
    $.getJSON('../config/config.json', function(configData) {
        const lang = configData.lang
        $.getJSON(`../config/i18n/${lang}.json`, function(langData) {
            config.trans = langData
            resolve()
        })
    })
})
