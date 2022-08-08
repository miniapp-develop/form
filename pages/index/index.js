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
                        const v = this.choices.find(ele => ele.value === value);
                        return v.text;
                    },
                    getViewValue(value) {
                        return Number(value);
                    }
                }
            },
            skills: {
                name: '工作技能',
                value: [0, 1, 2],
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
                format: {
                    getValueView(value) {
                        const views = [];
                        for (const v of value) {
                            const found = this.choices.find(ele => ele.value === v);
                            views.push(found.text);
                        }
                        return views.join('、');
                    },
                    getViewValue(value) {
                        return value.map(ele => {
                            return Number(ele);
                        })
                    }
                }
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
            images: {
                name: '图片列表',
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
            }
        }
    },
    onTap(e) {
        console.log(e);
        wx.showLoading({
            title: '正在处理...'
        });
        setTimeout(() => {
            e.detail.callback('新的value');
            wx.hideLoading();
        }, 1000);
    },
    onTapChoose(e) {
        wx.chooseImage({
            success(res) {
                console.log(res);
                const file = res.tempFilePaths[0];
                e.detail.choose(file);
                wx.showLoading({
                    title: '正在上传...'
                });
                setTimeout(() => {
                    e.detail.done({success: true, file: file});
                    wx.hideLoading();
                }, 1000);
            }
        });
    }
})
