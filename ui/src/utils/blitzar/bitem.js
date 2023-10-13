import { marked } from 'marked'

class BItem {

    constructor(tr) {
        this.tr = tr
    }

    trmd(text) {
        return text ? marked.parse(this.tr(text), {headerIds: false, mangle: false}) : text
    }

    // rewrites $('VAR') to formData.VAR
    static variableRefRewrite(script) {
        const doRewrite = (match, p1, offset, string) => {
            // console.log([match, p1, offset, string].join(', '))
            return 'formData.' + p1;
        }
        return script && typeof script === 'string' ? script.replace(/\$\('([\w\.]+)'\)/g, doRewrite) : script
    }

    static stringToArray(value) {
        let rval = []
        const parse = (str) =>
        	str.slice(1, str.length - 1).split(',')
		        .map(v => v.trim())
		        .map(v => (v.startsWith('\'') && v.endsWith('\'')) || (v.startsWith('"') && v.endsWith('"')) ? v.slice(1, v.length - 1) : v)

        if (value) {
            if (value.trim().startsWith('[') && value.trim().endsWith(']')) {
                rval = parse(value.trim())
            } else {
                rval = [value]
            }
        }
        return rval
    }

}

export default BItem