import {FormItem} from "../relations";

FormItem({
    data: {
        flying: null
    },
    methods: {
        onTapDelete(e) {
            const delIndex = e.currentTarget.dataset.index;
            this.data.item.value.splice(delIndex, 1);
            this.onChanged({
                detail: {
                    value: this.data.item.value
                }
            })
        },
        onTapChoose(e) {
            this.triggerEvent('choose', {
                choose: value => {
                    this.setData({
                        flying: {
                            src: value
                        }
                    });
                },
                done: ({success, file}) => {
                    this.data.item.value.push({
                        src: file
                    });
                    this.setData({
                        flying: null
                    });
                    this.onChanged({
                        detail: {
                            value: this.data.item.value
                        }
                    })
                }
            });
        }
    }
});
