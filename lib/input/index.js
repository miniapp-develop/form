import relations from '../relations';

relations.FormItem({
    options: {
        virtualHost: true
    },
    properties: {
        modelName: {
            type: String,
            value: ''
        },
        format: {
            type: Object,
            value: {
                getValue(modelValue) {
                    return modelValue;
                }
            }
        }
    },
    data: {
        value: null
    },
    methods: {
        onMiniChanged(model) {
            const modelValue = model[this.data.modelName];
            this.setData({
                value: this.data.format.getValue(modelValue)
            });
        },
        onChanged(e) {
            console.log(e);
            this.getMiniRelative().handleModelChange(this.data.modelName, e.detail.value)
        }
    }
});
