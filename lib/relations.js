import {connectAncestorDescendant} from '@mini-dev/connect';

const {ancestor, descendant} = connectAncestorDescendant('model');

export default {
    Form: ancestor,
    FormItem: descendant
}