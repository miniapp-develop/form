import {FormItem} from "../relations";

FormItem({
    properties: {
        format: {
            type: Object,
            value: {
                getValueView(value) {
                    const views = [];
                    for (const v of value) {
                        const found = this.choices.find(ele => ele.value === v);
                        views.push(found.text);
                    }
                    return views.join('、');
                },
                getViewValue(value) {
                    return value;
                }
            }
        }
    },
    data: {},
    methods: {}
});
