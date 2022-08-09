import {FormButton} from "../index";

FormButton({
    properties: {},
    data: {},
    methods: {
        onTap(e) {
            this.getMiniRelative().handleSubmit()
        }
    }
});
