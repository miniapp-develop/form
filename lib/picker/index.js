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
                    return value;
                }
            }
        }
    },
    data: {
        item: {}
    },
    methods: {
        onPickerChanged(e) {
            const pickValue = e.detail.value;
            const value = this.data.item.choices[parseInt(pickValue)];
            this.onChanged({detail: value});
        }
    }
});