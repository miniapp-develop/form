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
            this.onTriggerAction();
            // this.triggerEvent('tapped', {
            //     commit: value => {
            //         this.commitChange(value);
            //     }
            // });
        }
    }
});
