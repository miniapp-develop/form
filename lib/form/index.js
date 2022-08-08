import {Form} from '../relations';

Form({
    properties: {},
    data: {},
    methods: {
        handleModelChange(name, value) {
            console.log(name, value);
            this.data.model[name].value = value;
            this.setData({
                model: this.data.model
            });
        },
        handleSubmit(e) {
            console.log('handleSubmit', this.data.model);
            this.triggerEvent('submit', this.data.model);
        }
    }
});
