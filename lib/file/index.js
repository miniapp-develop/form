import {FormItem} from "../index";

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
        onTapAdd(e) {
            this.triggerEvent('add', {
                sendMessage: data => {
                    if (data.type === 'flying') {
                        this.setData({
                            flying: {
                                src: data.flying
                            }
                        });
                    } else if (data.type === 'done') {
                        this.setData({
                            flying: null
                        });
                        if (!data.success) {
                            return;
                        }
                        this.data.item.value.push({
                            src: data.file
                        });
                        this.onChanged({
                            detail: {
                                value: this.data.item.value
                            }
                        })
                    }
                }
            });
        }
    }
});
