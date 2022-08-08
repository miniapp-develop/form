import {connectAncestorDescendant, createPresetComponent, MiniComponent} from '@mini-dev/view-support';

const {ancestor, descendant} = connectAncestorDescendant('model');

export const FromComponent = createPresetComponent({
    options: {virtualHost: true}
});

export const Form = function (option, factory = MiniComponent) {
    return FromComponent(option, ancestor, factory);
}

const FormItemComponent = createPresetComponent({
    options: {virtualHost: true},
    behaviors: [Behavior({
        properties: {
            modelName: {
                type: String,
                value: ''
            },
            format: {
                type: Object,
                value: {
                    getViewValue(modelValue) {
                        return modelValue;
                    },
                    getValueView(modelValue) {
                        return modelValue;
                    }
                }
            }
        },
        data: {
            item: {}
        },
        methods: {
            onMiniChanged(model) {
                const modelValue = model[this.data.modelName];
                const format = modelValue.format ? modelValue.format : this.data.format;
                const valueView = format.getValueView.apply(format, [modelValue.value]);
                this.setData({
                    item: modelValue,
                    valueView
                });
            },
            onChanged(e) {
                console.log(e);
                const value = e.detail.value;
                const format = this.item.format ? this.item.format : this.data.format;
                const viewValue = format.getViewValue.apply(format, [value]);
                this.getMiniRelative().handleModelChange(this.data.modelName, viewValue);
            }
        }
    })]
});

export const FormItem = function (option, factory = MiniComponent) {
    return FormItemComponent(option, descendant, factory);
}

const FormActionComponent = createPresetComponent({
    options: {virtualHost: true}
});

export const FormAction = function (option, factory = MiniComponent) {
    return FormActionComponent(option, descendant, factory);
}