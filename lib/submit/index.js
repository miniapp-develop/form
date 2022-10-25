import {Button} from "../index";

Button({
    properties: {},
    data: {},
    methods: {
        onTap(e) {
            this.getRelationParent().handleSubmit()
        }
    }
});
