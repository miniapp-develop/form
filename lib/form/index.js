import relations from '../relations';

relations.Form({
    options: {
        virtualHost: true
    },
    properties: {},
    data: {},
    methods: {
        handleModelChange(name, value) {
            console.log(name, value);
            this.data.model[name] = value;
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
