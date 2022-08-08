Page({
    data: {
        formEnable: true,
        viewModel: {
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
            },
            contract: {
                name: '协议签署',
                value: true,
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
                value: false,
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
                value: '按照菜单的5折录入'
            }
        }
    },
    onTapEnable(e) {
        this.setData({
            formEnable: true
        });
    },
    onTapDisable(e) {
        this.setData({
            formEnable: false
        });
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
    },
    onFormSubmit(e) {
        console.log(e);
    },
    onFormChanged(e) {
        console.log(e);
    }
})
