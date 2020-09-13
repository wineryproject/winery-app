import { helper } from '@ember/component/helper';

export function cond(params/*, hash*/) {
    let [v1, operator, v2] = params;
    if (v2 == undefined) 
        return params;
    switch (operator) {
        case '==':
            return (v1 == v2);
        case '===':
            return (v1 === v2);
        case '<':
            return (v1 < v2);
        case '<=':
            return (v1 <= v2);
        case '>':
            return (v1 > v2);
        case '>=':
            return (v1 >= v2);
        case '&&':
            return (v1 && v2);
        case '||':
            return (v1 || v2);
        case '!=':
            return (v1 != v2);
        case '%':
            return (v1 % v2 === 0);
        case 'in':
            return (v2.split(",").indexOf(v1)>=0);
        case 'not_in':
            return (v2.split(",").indexOf(v1)<0);
        default:
            return params;
    }

}

export default helper(cond);
