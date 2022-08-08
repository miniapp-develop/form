import {FormItem} from "../relations";

FormItem({
    properties: {
        format: {
            type: Object,
            value: {
                getValueView(value) {
                    const v = this.choices.find(ele => ele.value === value);
                    return v.text;
                },
                getViewValue(value) {
                    return value === 'true';
                }
            }
        }
    },
    data: {},
    methods: {}
});
