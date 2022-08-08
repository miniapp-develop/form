import {FormAction} from "../relations";

FormAction({
    properties: {},
    data: {},
    methods: {
        onTap(e) {
            this.getMiniRelative().handleSubmit()
        }
    }
});
