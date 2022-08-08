import {FormItem} from "../relations";

FormItem({
    properties: {
        type: {
            type: String,
            value: 'text'
        }
    },
    data: {},
    methods: {
        onTap(e) {
            this.triggerEvent('tapped', {
                commit: value => {
                    this.onChanged({detail: {value}});
                }
            });
        }
    }
});
