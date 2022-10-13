# Form

一个小程序表单组件，用来辅助填写简单表单。

## 简介

### 基本步骤

#### 1、构建表单

从表单模板数据到表单模板：

    FormTemplateJSON -(parse)-> FormMap -(render)-> FormView

#### 2、构建表单项

从表单项数据到表单项：

    FormItemJSON -(parse)-> FormMap -(render)-> FormItemView

#### 3、收集表单数据项

从表单项到表单项数据：

    FormItemView -(collect)-> FormMap -(stringify)-> FormItemJSON

#### 4、汇总表单项数据

    FormItemJSON -(collect)-> FormItemJSONList

### 格式定义

使用 JSON 格式进行数据传输以及存储。

#### 表单模板数据

基本要素：
```json5
[
    {
        type: 'input', //textarea, choice, file
        multi: true, // true | false
        valueType: 'number', // boolean, string, object
        placeholder: 'xxx',
        name: 'xxx',
        value: [...],
        choices:[...]
    },
    ...
]
```

示例：

```json5
[
    {
        type: 'input', 
        valueType: 'number', // boolean, string, object
        name: 'age',
        value: [18],
        placeholder: '请输入年龄'
    },
    {
        type: 'textarea', 
        valueType: 'string',
        name: 'rule',
        value: ['xxxxxxx'],
        placeholder: '请输入规则'
    },
    {
        type: 'choice', 
        multi: true, // true | false
        valueType: 'number', 
        name: 'salary',
        value: [1],
        choices:[
          {
            value: 1,
            text: '1个小目标'
          },
          {
            value: 2,
            text: '2-10个小目标'
          }
        ]
    },
    {
        type: 'file', 
        multi: true, // true | false
        name: 'images',
        value:[
          {
            value: 'http://xxxx/aaaa.png',
            text: '说明一'
          },
          {
            value: 'http://xxxx/bbbb.png',
            text: '说明二'
          }
        ]
    },
    ...
]
```

#### 表单项数据

```json5
{
    name: 'age',
    value: [18]
}
```

### FormMap 格式定义

TODO

### FormView 使用

type 与 组件的对应关系：

|  type   | 组件  |
|  ----  | ----  |
| input  | input |
| textarea  | textarea |
| choice  | radio，checkbox，picker |
| file  | file |


#### 安装

```shell script
npm install @mini-dev/form
```

#### 页面引用

```html
    <form-view model="{{viewModel}}" bindchange="onFormChanged" bindsubmit="onFormSubmit">
        <form-plain model-name="type"/>
        <form-input model-name="age" disabled="{{!formEnable}}" type="number"/>
        <form-radio model-name="contract" disabled="{{!formEnable}}"/>
        <form-submit/>
    </form-view>
```

#### FormView 原理简述

form-view 监测到 model 属性发生改变之后，会将改变同步到所有表单字段组件。
字段组件根据 model-name 属性，获取属于当前组件的属性值，然后根据定义，展示结果。

同时，字段属性会把字段的修改，同步给 form-view，form-view 会收集所有的变更，及时更新 model。

#### model 的基本配置

model 的基本格式如下：

```javascript

viewModel = {
            name: {
                name: '姓名',
                value: 'xpy',
                placeholder: '请输入姓名'
            },
            age: {
                name: '年龄',
                value: 22,
                valueType: Number,
            },
            type: {
                name: '职位',
                value: 1,
                getValueView(modelItem) {
                    return modelItem.value === 0 ? '管理员' : '普通员工';
                }
            }}
```

一个 key 对应一个字段，对于每个字段 name 和 value 是**必须**的，getValueView 是可选的。

getValueView 的作用是将 value 映射为可读性更好的描述文本，当然，如果在 model 字段中没有配置此方法，会使用字段组件默认的 getValueView。
通常都是直接显示 value，不同的字段组件会定义不同的默认 getValueView。

如上面的例子：type 字段的 value 是 1，如果没有 getValueView 方法，页面就会显示 1，加上了 getValueView 方法之后，页面就显示为 *普通员工*。

如果配置了 valueType，则在 value 发生变化的时候，会先进行 value 的类型转换，再进行后续的处理。
当前支持的 valueType 包括：Number、Boolean。

## 组件列表

    plain
    input
    textarea
    radio
    checkbox
    picker
    file
    submit