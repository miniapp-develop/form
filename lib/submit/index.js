import {Button} from "../index";

Button({
    properties: {},
    data: {},
    methods: {
        onTap(e) {
            this.getMiniRelative().handleSubmit()
        }
    }
});
