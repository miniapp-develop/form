export const ViewModel = {
    name: {
        name: '姓名',
        value: 'xpy',
        placeholder: '请输入姓名'
    },
    age: {
        name: '年龄',
        value: 22,
        valueType: Number,
        placeholder: '请输入年龄'
    },
    spec: {
        name: '特殊要求',
        value: null,
        placeholder: '空',
        valueType: Number
    },
    type: {
        name: '职位',
        value: 0,
        getValueView(modelItem) {
            const value = modelItem.value;
            return value === 0 ? '管理员' : '普通员工';
        }
    },
    location: {
        name: '坐标',
        value: {longitude: 116, latitude: 33},
        getValueView(modelItem) {
            const value = modelItem.value;
            return `经度：${value.longitude}\n纬度：${value.latitude}`;
        }
    },
    contract: {
        name: '协议签署',
        value: true,
        valueType: Boolean,
        choices: [
            {
                value: true,
                text: '已签'
            },
            {
                value: false,
                text: '未签'
            }
        ]
    },
    waterproof: {
        name: '防水袋',
        value: false,
        valueType: Boolean,
        choices: [
            {
                value: true,
                text: '有'
            },
            {
                value: false,
                text: '没有'
            }
        ]
    },
    keepWarm: {
        name: '保温袋',
        value: null,
        valueType: Boolean,
        choices: [
            {
                value: true,
                text: '有'
            },
            {
                value: false,
                text: '没有'
            }
        ]
    },
    workingYears: {
        name: '工作年限',
        value: 1,
        valueType: Number,
        choices: [
            {
                value: 0,
                text: '0-5年'
            },
            {
                value: 1,
                text: '5-10年'
            },
            {
                value: 2,
                text: '10-15年'
            }
        ]
    },
    skills: {
        name: '工作技能',
        value: [0, 2],
        valueType: Number,
        placeholder: '屁都不会',
        choices: [
            {
                value: 0,
                text: '洗脚'
            },
            {
                value: 1,
                text: '搓背'
            },
            {
                value: 2,
                text: '桑拿'
            }
        ],
    },
    country: {
        name: '国籍',
        value: '2',
        choices: [
            {
                value: '0',
                text: '中国'
            },
            {
                value: '1',
                text: '美国'
            },
            {
                value: '2',
                text: '其他'
            }
        ]
    },
    menus: {
        name: '菜单图片',
        value: [
            {
                value: 1,
                src: '/pages/index/logo.png'
            },
            {
                value: 2,
                src: '/pages/index/logo.png'
            }
        ]
    },
    rule: {
        name: '录入规则',
        value: '按照菜单的5折录入，然后不足5元的，按照5元录入',
        placeholder: '请输入录入规则'
    }
};