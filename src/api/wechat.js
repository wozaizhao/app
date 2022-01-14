import { wx } from '../plugins/jweixin-1.6.0';
import { endpointFetch } from './endpoint';

export const isWeixin = () => {
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    }
    return false;
};

export const getJsConfig = async (params) => {
    const endpoint = '/api/wechat/getConfig';
    const r = await endpointFetch(endpoint, null, { method: 'get', params });
    return r.data;
};

export const useWx = () => {
    const initSDK = () => {
        return new Promise((resolve, reject) => {
            if (!isWeixin()) {
                reject('not in weixin');
            }
            const params = {
                url: window.location.href.split('#')[0],
            };
            const jsApiList = [
                'scanQRCode',
                'openLocation',
                'getLocation',
                'chooseImage',
                'getLocalImgData',
                'updateAppMessageShareData',
                'updateTimelineShareData',
                'onMenuShareAppMessage',
                'onMenuShareTimeline',
            ];
            getJsConfig(params).then((res) => {
                console.log('getJsConfig res', res);
                wx.config({
                    debug: false,
                    appId: res.app_id,
                    timestamp: res.timestamp,
                    nonceStr: res.nonce_str,
                    signature: res.signature,
                    jsApiList,
                });
                wx.ready(() => {
                    resolve();
                });
                wx.error((err) => {
                    reject(err);
                });
            });
        });
    };

    const getEnv = () => {
        return new Promise((resolve, reject) => {
            if (!isWeixin()) {
                reject('not in weixin');
            }
            wx.miniProgram.getEnv(function (res) {
                resolve(res);
            });
        });
    };

    const wxChooseImage = () => {
        return new Promise((resolve, reject) => {
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    resolve(localIds);
                },
                fail: function (err) {
                    reject(err);
                },
            });
        });
    };

    const wxGetLocalImgData = (localId) => {
        return new Promise((resolve, reject) => {
            wx.getLocalImgData({
                localId, // 图片的localID
                success: function (res) {
                    resolve(res.localData); // localData是图片的base64数据，可以用img标签显示
                },
                fail: function (err) {
                    reject(err);
                },
            });
        });
    };

    const scanQrcode = () => {
        return new Promise((resolve, reject) => {
            wx.scanQRCode({
                needResult: 1,
                scanType: ['qrCode'],
                success(res) {
                    console.log(res.resultStr);
                    resolve(res.resultStr);
                },
                fail(err) {
                    reject(err);
                },
            });
        });
    };
    // const postMessage = (message) => {
    //   wx.miniProgram.postMessage({
    //     data: message
    //   })
    // },
    const openLocation = (params) => {
        if (!isWeixin()) {
            return;
        }
        wx.openLocation({
            latitude: params.latitude, // 纬度，浮点数，范围为90 ~ -90
            longitude: params.longitude, // 经度，浮点数，范围为180 ~ -180。
            name: params.name, // 位置名
            address: params.address, // 地址详情说明
            scale: 10, // 地图缩放级别,整形值,范围从1~28。默认为最大
            infoUrl: '', // 在查看位置界面底部显示的超链接,可点击跳转
        });
    };
    const getLocation = () => {
        return new Promise((resolve, reject) => {
            if (!isWeixin()) {
                reject('not in weixin');
            }
            wx.getLocation({
                type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    resolve(res);
                    // var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    // var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    // var speed = res.speed; // 速度，以米/每秒计
                    // var accuracy = res.accuracy; // 位置精度
                },
                fail: function (err) {
                    reject(err);
                },
            });
        });
    };

    const setAppMessageShareData = (params) => {
        return new Promise((resolve, reject) => {
            wx.updateAppMessageShareData({
                title: params.title, // 分享标题
                desc: params.desc, // 分享描述
                link: params.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: params.imgUrl, // 分享图标
                success: function () {
                    resolve('updateAppMessageShareData ok');
                },
                fail: function (err) {
                    reject(err);
                },
            });
        });
    };

    const setTimelineShareData = (params) => {
        return new Promise((resolve, reject) => {
            wx.updateTimelineShareData({
                title: params.title, // 分享标题
                link: params.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: params.imgUrl, // 分享图标
                success: function () {
                    resolve('updateTimelineShareData ok');
                },
                fail: function (err) {
                    reject(err);
                },
            });
        });
    };

    const setMenuShareAppMessage = (params) => {
        return new Promise((resolve, reject) => {
            wx.onMenuShareAppMessage({
                title: params.title, // 分享标题
                desc: params.desc, // 分享描述
                link: params.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: params.imgUrl, // 分享图标
                success: function () {
                    resolve('onMenuShareAppMessage ok');
                },
                fail: function (err) {
                    reject(err);
                },
            });
        });
    };

    const setMenuShareTimeline = (params) => {
        return new Promise((resolve, reject) => {
            wx.onMenuShareTimeline({
                title: params.title, // 分享标题
                link: params.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: params.imgUrl, // 分享图标
                success: function () {
                    resolve('onMenuShareTimeline ok');
                },
                fail: function (err) {
                    reject(err);
                },
            });
        });
    };

    return {
        initSDK,
        getEnv,
        wxChooseImage,
        wxGetLocalImgData,
        scanQrcode,
        // postMessage,
        getLocation,
        openLocation,
        setAppMessageShareData,
        setTimelineShareData,
        setMenuShareAppMessage,
        setMenuShareTimeline,
    };
};
