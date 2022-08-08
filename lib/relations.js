import {connectAncestorDescendant, createPresetComponent, MiniComponent} from '@mini-dev/view-support';

const {ancestor, descendant} = connectAncestorDescendant('model');

export const FromComponent = createPresetComponent({
    options: {virtualHost: true},
    behaviors: [Behavior({
        methods: {
            commitModelChange(name, value) {
                this.data.model[name].value = value;
                this.setData({
                    model: this.data.model
                });
                this.triggerEvent('change', this.data.model);
            },
            handleSubmit(e) {
                this.triggerEvent('submit', this.data.model);
            }
        }
    })]
});

export const Form = function (option, factory = MiniComponent) {
    return FromComponent(option, ancestor, factory);
}

const FormItemBehavior = Behavior({
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
        commitChange(value) {
            const format = this.data.item.format ? this.data.item.format : this.data.format;
            const viewValue = format.getViewValue.apply(this.data.item, [value]);
            this.getMiniRelative().commitModelChange(this.data.modelName, viewValue);
        },
        onChanged(e) {
            const value = e.detail.value;
            this.commitChange(value);
        },
        onTriggerAction() {
            this.triggerEvent('tapped', {
                callback: value => {
                    this.commitChange(value);
                }
            });
        }
    }
});

const FormInputComponent = createPresetComponent({
    options: {virtualHost: true},
    behaviors: [FormItemBehavior]
});

const FormPickerComponent = createPresetComponent({
    options: {virtualHost: true},
    behaviors: [FormItemBehavior]
});

const FormItemComponent = createPresetComponent({
    options: {virtualHost: true},
    behaviors: [FormItemBehavior]
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