function makeSchemaFormTr(schema, options) {
    const locale = (options.locale && schema.i18n) ? 
      (schema.i18n[options.locale] ? 
        options.locale : 
        (schema.i18n['en'] ? 
          'en' : 
          undefined)) : 
      undefined;
    
    console.log('Translating to ' + locale);
  
    return (key) => {
      let rval = key
      if (locale) {
        if (schema.i18n[locale][key]) {
          rval = schema.i18n[locale][key]
        } else if (schema.i18n['en'][key]) {
          rval = schema.i18n['en'][key]
        }
      }
      return rval
    }
}

export default makeSchemaFormTr