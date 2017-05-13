const config = {}
const loadConfig = function() {
    $.getJSON('../config/config.json', function(configData) {
        const lang = configData.lang
        $.getJSON(`../config/i18n/${lang}.json`, function(langData) {
            config.trans = langData
        })
    })
}
