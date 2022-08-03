import relations from '../relations';

relations.FormItem({
    options: {
        virtualHost: true
    },
    properties: {},
    data: {},
    methods: {
        onTap(e) {
            this.getMiniRelative().handleSubmit()
        }
    }
});
