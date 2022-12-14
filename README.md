# Form

一个小程序表单组件，用来辅助填写简单表单。

## 安装

```shell script
npm install @mini-dev/form
```

## Usage

```html
    <form-view model="{{viewModel}}" bindchange="onFormChanged" bindsubmit="onFormSubmit">
        <form-plain model-name="type"/>
        <form-input model-name="age" disabled="{{!formEnable}}" type="number"/>
        <form-radio model-name="contract" disabled="{{!formEnable}}"/>
        <form-submit/>
    </form-view>
```

## 工作原理

form-view 监测到 model 属性发生改变之后，会将改变同步到所有表单字段组件。
字段组件根据 model-name 属性，获取属于当前组件的属性值，然后根据定义，展示结果。

同时，字段属性会把字段的修改，同步给 form-view，form-view 会收集所有的变更，及时更新 model。

## model 的基本配置

model 的基本格式如下：

```javascript

viewModel = {
            name: {
                name: '姓名',
                value: 'xpy'
            },
            age: {
                name: '年龄',
                value: 22
            },
            type: {
                name: '职位',
                value: 1,
                getValueView(value) {
                    return value === 0 ? '管理员' : '普通员工';
                }
            }}
```

一个 key 对应一个字段，对于每个字段 name 和 value 是**必须**的，getValueView 是可选的。

getValueView 的作用是将 value 映射为可读性更好的描述文本，当然，如果在 model 字段中没有配置此方法，会使用字段组件默认的 getValueView。
通常都是直接显示 value，不同的字段组件会定义不同的默认 getValueView。

如上面的例子：type 字段的 value 是 1，如果没有 getValueView 方法，页面就会显示 1，加上了 getValueView 方法之后，页面就显示为 *普通员工*。

## 组件列表

    plain
    input
    radio
    checkbox
    picker
    file
    submit