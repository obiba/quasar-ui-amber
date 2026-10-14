// translations of an Amber form: `i18n` (legacy format) or `translations` (JSON Forms format)
function makeSchemaFormTr(form, options) {
    const schema = { i18n: form ? (form.i18n || form.translations) : undefined }
    const locale = (options.locale && schema.i18n) ? 
      (schema.i18n[options.locale] ? 
        options.locale : 
        (schema.i18n['en'] ? 
          'en' : 
          undefined)) : 
      undefined;
    
    if (options.debug) console.debug('Translating to ' + locale);
  
    return (key) => {
      let rval = key
      if (locale) {
        if (schema.i18n[locale][key] !== undefined) {
          rval = schema.i18n[locale][key]
        } else if (schema.i18n['en'] && schema.i18n['en'][key] !== undefined) {
          rval = schema.i18n['en'][key]
        }
      }
      return rval
    }
}

export default makeSchemaFormTr