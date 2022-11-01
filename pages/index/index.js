import {ViewModel} from "./ViewModel";

Page({
    data: {
        formEnable: true,
        viewModel: ViewModel
    },
    onTapEnable(e) {
        this.setData({
            formEnable: true
        });
    }
    ,
    onTapDisable(e) {
        this.setData({
            formEnable: false
        });
    }
    ,
    onTap(e) {
        console.log(e);
        wx.showLoading({
            title: '正在处理...'
        });
        setTimeout(() => {
            e.detail.callback('新的value');
            wx.hideLoading();
        }, 1000);
    }
    ,
    onTapChoose(e) {
        wx.chooseImage({
            success(res) {
                const file = res.tempFilePaths[0];
                e.detail.sendMessage({
                    type: 'flying',
                    flying: file
                });
                wx.showLoading({
                    title: '正在上传...'
                });
                setTimeout(() => {
                    e.detail.sendMessage({
                        type: 'done',
                        success: true,
                        file: file
                    });
                    wx.hideLoading();
                }, 1000);
            }
        });
    }
    ,
    onFormChanged(e) {
        console.log('onFormChanged', e);
    }
    ,
    onFormSubmit(e) {
        console.log('onFormSubmit', e);
    }
})
