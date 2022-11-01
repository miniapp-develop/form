import {defaults, presets, relations} from '@mini-dev/view-support';

const {parent: BaseForm, children: [BaseFormItem, BaseFormAction]} = relations.PresetAncestorDescendant(
    {name: 'Form'},
    [{name: 'FormItem'}, {name: 'FormAction'}]
);

export const Form = presets.extendComponent(
    BaseForm,
    defaults.MiniComponent,
    {
        options: {
            virtualHost: true
        },
        properties: {
            model: {
                type: Object,
                value: {}
            }
        },
        observers: {
            model(newModel) {
                const children = this.getRelationChildren();
                for (const child of children) {
                    this.__notify__children(child, newModel);
                }
            }
        },
        methods: {
            onRelationChanged(event, child) {
                if (event === 'linked') {
                    this.__notify__children(child, this.data.model);
                }
            },
            __notify__children(child, value) {
                if (child.onModelChanged) {
                    child.onModelChanged(value);
                }
            },
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
    }
);

export const FormItem = presets.extendComponent(
    BaseFormItem,
    defaults.MiniComponent,
    {
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
                if (type === Number) {
                    return value ? Number(value) : value;
                } else if (type === Boolean) {
                    return value !== 'false'; //组件的问题，value 没法直接转成 bool
                }
                return value;
            },
            onModelChanged(model) {
                const modelItem = model[this.data.modelName];
                const getValueView = modelItem.getValueView ? modelItem.getValueView : this.getValueView;
                const valueView = getValueView.call(this, modelItem, this);
                this.setData({
                    item: modelItem,
                    valueView
                });
            },
            commitChange(value) {
                this.getRelationParent().commitModelChange(this.data.modelName, value);
            },
            onChanged(e) {
                const value = e.detail.value;
                const typedValue = this.getTypedValue(value, this.data.item.valueType);
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
    }
);
export const Plain = presets.extendComponent(FormItem);

export const Input = presets.extendComponent(FormItem, {
    properties: {
        type: {
            type: String,
            value: 'text'
        }
    }
});

export const Textarea = presets.extendComponent(FormItem);

const SingleChoice = presets.extendComponent(FormItem, {
    methods: {
        getValueView(modelItem) {
            const choice = modelItem.choices.find(ele => ele.value === modelItem.value);
            if (choice) {
                return choice.text;
            } else {
                return modelItem.placeholder || '';
            }
        }
    }
});

export const Radio = presets.extendComponent(SingleChoice);
export const Picker = presets.extendComponent(SingleChoice, {
    methods: {
        onChanged(e) {
            const pickValue = e.detail.value;
            const choice = this.data.item.choices[parseInt(pickValue)];
            this.commitChange(choice.value);
        }
    }
});

export const Checkbox = presets.extendComponent(FormItem, {
    methods: {
        getValueView(modelItem) {
            const views = [];
            for (const selected of modelItem.value) {
                const found = modelItem.choices.find(ele => ele.value === selected);
                views.push(found.text);
            }
            if (views.length) {
                return views.join('、');
            } else {
                return modelItem.placeholder || '';
            }
        },
        onChanged(e) {
            const value = e.detail.value;
            const valueType = this.data.item.valueType;
            const typedValue = value.map(ele => {
                return this.getTypedValue(ele, valueType);
            });
            this.commitChange(typedValue);
        }
    }
});

export const Files = presets.extendComponent(FormItem, {
    data: {
        flying: null
    },
    methods: {
        onPreview(e) {
            const index = e.currentTarget.dataset.index;
            const img = this.data.item.value[index];
            wx.previewImage({
                current: img.src,
                urls: [img.src]
            });
        },
        onTapDelete(e) {
            const delIndex = e.currentTarget.dataset.index;
            this.data.item.value.splice(delIndex, 1);
            this.onChanged({
                detail: {
                    value: this.data.item.value
                }
            })
        },
        onTapAdd(e) {
            this.triggerEvent('add', {
                sendMessage: data => {
                    if (data.type === 'flying') {
                        this.setData({
                            flying: {
                                src: data.flying
                            }
                        });
                    } else if (data.type === 'done') {
                        this.setData({
                            flying: null
                        });
                        if (!data.success) {
                            return;
                        }
                        this.data.item.value.push({
                            src: data.file
                        });
                        this.onChanged({
                            detail: {
                                value: this.data.item.value
                            }
                        })
                    }
                }
            });
        }
    }
});

export const Button = presets.extendComponent(BaseFormAction, defaults.MiniComponent);