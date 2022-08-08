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
                        return value;
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
                format: {
                    getValueView(value) {
                        return value ? '已婚' : '单身';
                    },
                    getViewValue(value) {
                        return value;
                    }
                }
            },
            workingYears: {
                name: '工作年限',
                value: 100,
                choices: [],
                format: {
                    getValueView(value) {
                        return value ? '已婚' : '单身';
                    },
                    getViewValue(value) {
                        return value;
                    }
                }
            },
        },
        format: {
            getValue(value) {
                debugger
                return value;
            }
        }
    },

})
