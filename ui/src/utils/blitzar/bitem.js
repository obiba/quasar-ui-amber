class BItem {

    constructor(tr) {
        this.tr = tr
    }

    // rewrites $('VAR') to formData.VAR
    static variableRefRewrite = (script) => {
        const doRewrite = (match, p1, offset, string) => {
            // console.log([match, p1, offset, string].join(', '))
            return 'formData.' + p1;
        }
        return script ? script.replace(/\$\('([\w\.]+)'\)/g, doRewrite) : script
    }

}

export default BItem