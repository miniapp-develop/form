import {connectAncestorDescendant, createPresetComponent, MiniComponent} from '@mini-dev/view-support';

const {ancestor, descendant} = connectAncestorDescendant('model');

export const FromComponent = createPresetComponent({
    options: {virtualHost: true},
    behaviors: [Behavior({
        methods: {
            commitModelChange(name, value) {
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
    })]
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
            valueType: {
                type: String,
                value: 'text'
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
                const valueView = format.getValueView.apply(modelValue, [modelValue.value]);
                this.setData({
                    item: modelValue,
                    valueView
                });
            },
            onChanged(e) {
                console.log(e);
                const value = e.detail.value;
                const format = this.data.item.format ? this.data.item.format : this.data.format;
                const viewValue = format.getViewValue.apply(this.data.item, [value]);
                this.getMiniRelative().commitModelChange(this.data.modelName, viewValue);
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