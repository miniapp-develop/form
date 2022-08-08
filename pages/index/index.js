Page({
    data: {
        viewModel: {
            name: {
                name: '姓名',
                value: 'xpy',
                format: {
                    getValueView(value) {
                        return value;
                    },
                    getViewValue(value) {
                        return value;
                    }
                }
            },
            age: {
                name: '年龄',
                value: 22,
                format: {
                    getValueView(value) {
                        return value;
                    },
                    getViewValue(value) {
                        return Number(value);
                    }
                }
            },
            type: {
                name: '职位',
                value: 1,
                format: {
                    getValueView(value) {
                        return value === 0 ? '管理员' : '普通员工';
                    },
                    getViewValue(value) {
                        return value;
                    }
                }
            },
            married: {
                name: '婚姻状况',
                value: true,
                choices: [
                    {
                        value: true,
                        text: '已婚'
                    },
                    {
                        value: false,
                        text: '未婚'
                    }
                ]
            },
            workingYears: {
                name: '工作年限',
                value: 1,
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
                ],
                format: {
                    getValueView(value) {
                        return value;
                    },
                    getViewValue(value) {
                        return Number(value);
                    }
                }
            },
        },
        format: {
            getValue(value) {
                return value;
            }
        }
    },

})
