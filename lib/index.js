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
        disabled: {
            type: Boolean,
            value: false
        }
    },
    data: {
        item: {}
    },
    methods: {
        getValueView(modelItem) {
            return modelItem.value;
        },
        getTypedValue(value, type) {
            if (type === 'number') {
                return Number(value);
            } else if (type === 'boolean') {
                return value === 'true'; //组件的问题，value 没法直接转成 bool
            }
            return value;
        },
        onMiniChanged(model) {
            const modelItem = model[this.data.modelName];
            const getValueView = modelItem.getValueView ? modelItem.getValueView : this.getValueView;
            const valueView = getValueView.call(this, modelItem, this);
            this.setData({
                item: modelItem,
                valueView
            });
        },
        commitChange(value) {
            this.getMiniRelative().commitModelChange(this.data.modelName, value);
        },
        onChanged(e) {
            const value = e.detail.value;
            const typedValue = this.getTypedValue(value, typeof this.data.item.value);
            this.commitChange(typedValue);
        },
        emitAction() {
            this.triggerEvent('emit', {
                callback: value => {
                    this.commitChange(value);
                }
            });
        }
    }
});

const FormInputComponent = createPresetComponent({
    options: {virtualHost: true},
    properties: {
        type: {
            type: String,
            value: 'text'
        }
    },
    behaviors: [FormItemBehavior]
});

export const FormInput = function (option, factory = MiniComponent) {
    return FormInputComponent(option, descendant, factory);
}

const ChoiceBehavior = Behavior({
    methods: {
        getValueView(modelItem) {
            const v = modelItem.choices.find(ele => ele.value === modelItem.value);
            return v.text;
        }
    }
});

const FormRadioComponent = createPresetComponent({
    options: {virtualHost: true},
    behaviors: [FormItemBehavior, ChoiceBehavior]
});

export const FormRadio = function (option, factory = MiniComponent) {
    return FormRadioComponent(option, descendant, factory);
}

const FormPickerComponent = createPresetComponent({
    options: {virtualHost: true},
    behaviors: [FormItemBehavior, ChoiceBehavior, Behavior({
        methods: {
            onChanged(e) {
                const pickValue = e.detail.value;
                const choice = this.data.item.choices[parseInt(pickValue)];
                this.commitChange(choice.value);
            }
        }
    })]
});

export const FormPicker = function (option, factory = MiniComponent) {
    return FormPickerComponent(option, descendant, factory);
}

const MultiChoiceBehavior = Behavior({
    methods: {
        getValueView(modelItem) {
            const views = [];
            for (const v of modelItem.value) {
                const found = modelItem.choices.find(ele => ele.value === v);
                views.push(found.text);
            }
            return views.join('、');
        },
        onChanged(e) {
            const value = e.detail.value;
            const type = typeof this.data.item.choices[0].value;
            const typedValue = value.map(ele => {
                return this.getTypedValue(ele, type);
            });
            this.commitChange(typedValue);
        }
    }
})

const FormCheckboxComponent = createPresetComponent({
    options: {virtualHost: true},
    behaviors: [FormItemBehavior, MultiChoiceBehavior]
});

export const FormCheckbox = function (option, factory = MiniComponent) {
    return FormCheckboxComponent(option, descendant, factory);
}

const FormItemComponent = createPresetComponent({
    options: {virtualHost: true},
    behaviors: [FormItemBehavior]
});

export const FormItem = function (option, factory = MiniComponent) {
    return FormItemComponent(option, descendant, factory);
}

const FormButtonComponent = createPresetComponent({
    options: {virtualHost: true}
});

export const FormButton = function (option, factory = MiniComponent) {
    return FormButtonComponent(option, descendant, factory);
}