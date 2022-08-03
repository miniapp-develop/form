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
                value: modelValue
            });
        },
        onChanged(e) {
            console.log(e);
            const value = e.detail.value;
            this.getMiniRelative().handleModelChange(this.data.modelName, this.data.format.getValue(value));
        }
    }
});
