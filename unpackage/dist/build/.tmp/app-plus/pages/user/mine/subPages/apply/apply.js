(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/mine/subPages/apply/apply"],{"12f6":function(e,t,n){"use strict";(function(e,a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=s(n("a34a")),o=n("6e09"),r=n("2f62");function s(e){return e&&e.__esModule?e:{default:e}}function c(e,t,n,a,i,o,r){try{var s=e[o](r),c=s.value}catch(u){return void n(u)}s.done?t(c):Promise.resolve(c).then(a,i)}function u(e){return function(){var t=this,n=arguments;return new Promise(function(a,i){var o=e.apply(t,n);function r(e){c(o,a,i,r,s,"next",e)}function s(e){c(o,a,i,r,s,"throw",e)}r(void 0)})}}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),a.forEach(function(t){p(e,t,n[t])})}return e}function p(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var f=function(){return n.e("components/mpvue-picker/mpvuePicker").then(n.bind(null,"18a4"))},h={name:"",data:function(){return{pickerValueArray:[],name:"",phone:"",address:"",type:"",typeId:"",merchantName:"",img1:"/static/images/xiangji@2x.png",img2:"/static/images/xiangji@2x.png",img3:"/static/images/xiangji@2x.png",longitude:"",latitude:"",applyInfo1:{}}},computed:l({},(0,r.mapState)(["user_info","home_classify"])),onReady:function(){this._dealApplyStatus(),this._dealMerchantType()},onNavigationBarButtonTap:function(){this._submitApply()},methods:l({},(0,r.mapActions)(["reqGetUserInfo"]),(0,r.mapMutations)(["saveApplyInfo"]),{_dealMerchantType:function(){var e=this;this.home_classify.forEach(function(t,n){var a=t.content,i=t.id;e.pickerValueArray.push({label:a,value:i})})},_dealApplyStatus:function(){1==this.user_info.shenhe&&e.showModal({title:"申请结果",content:"您已提交申请,请耐心等待审核",showCancel:!1,success:function(t){t.confirm&&e.navigateBack()}}),2==this.user_info.shenhe&&e.showModal({title:"申请结果",content:"申请审核失败,请重新提交并确保您的资料真实可靠",showCancel:!1,success:function(e){e.confirm}})},choseLocation:function(){var t=this;e.chooseLocation({success:function(e){console.log(a(e," at pages\\user\\mine\\subPages\\apply\\apply.vue:98")),t.address=e.address,t.longitude=e.longitude,t.latitude=e.latitude}})},showSinglePicker:function(){this.$refs.mpvuePicker.show()},onConfirm:function(e){this.type=e.label,this.typeId=e.value},onUploadPhoto:function(t){var n=this;e.chooseImage({success:function(i){var r=i.tempFilePaths;e.uploadFile({url:o.BASE_URL+"/api/upload/adimage",filePath:r[0],name:"file",success:function(e){console.log(a(e," at pages\\user\\mine\\subPages\\apply\\apply.vue:123")),n["img"+t]=o.BASE_URL+JSON.parse(e.data).data}})}})},_submitApply:function(){var t=u(i.default.mark(function t(){var n,r;return i.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(n=this,""!=this.name){t.next=4;break}return e.showToast({title:"请输入姓名",icon:"none"}),t.abrupt("return");case 4:if(""!=this.phone){t.next=7;break}return e.showToast({title:"请输入电话",icon:"none"}),t.abrupt("return");case 7:if(""!=this.address){t.next=10;break}return e.showToast({title:"请选择地址",icon:"none"}),t.abrupt("return");case 10:if(""!=this.type){t.next=13;break}return e.showToast({title:"请选择分类",icon:"none"}),t.abrupt("return");case 13:if(""!=this.merchantName){t.next=16;break}return e.showToast({title:"请输入商家名称",icon:"none"}),t.abrupt("return");case 16:if("/static/images/xiangji@2x.png"!=this.img1){t.next=19;break}return e.showToast({title:"请上传身份证照正面",icon:"none"}),t.abrupt("return");case 19:if("/static/images/xiangji@2x.png"!=this.img2){t.next=22;break}return e.showToast({title:"请上传身份证照反面",icon:"none"}),t.abrupt("return");case 22:if("/static/images/xiangji@2x.png"!=this.img3){t.next=25;break}return e.showToast({title:"请上传营业执照",icon:"none"}),t.abrupt("return");case 25:return t.next=27,(0,o.applyMerchant)({id:e.getStorageSync("user_id"),username:this.name,mobile:this.phone,jing:this.longitude,wei:this.latitude,content:this.address,cshangclass_id:this.typeId,cshangdetail_name:this.merchantName,shenz_image:this.img1.replace(o.BASE_URL,""),shenf_image:this.img2.replace(o.BASE_URL,""),ying_image:this.img3.replace(o.BASE_URL,"")});case 27:r=t.sent,console.log(a(r," at pages\\user\\mine\\subPages\\apply\\apply.vue:201")),200==r.code&&(n.applyInfo1.name=n.name,n.applyInfo1.phone=n.phone,n.applyInfo1.address=n.address,n.applyInfo1.type=n.type,n.applyInfo1.merchantName=n.merchantName,n.applyInfo1.img1=n.img1,n.applyInfo1.img2=n.img2,n.applyInfo1.img3=n.img3,n.saveApplyInfo(n.applyInfo1),n.reqGetUserInfo({id:n.user_info.id}),e.showModal({title:"申请结果",content:"申请提交成功,请耐心等待审核！",showCancel:!1,success:function(t){t.confirm&&e.navigateBack()}}));case 30:case"end":return t.stop()}},t,this)}));function n(){return t.apply(this,arguments)}return n}()}),components:{mpvuePicker:f}};t.default=h}).call(this,n("6e42")["default"],n("0de9")["default"])},"734e":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement;e._self._c},i=[];n.d(t,"a",function(){return a}),n.d(t,"b",function(){return i})},"9c1c":function(e,t,n){},a56a:function(e,t,n){"use strict";(function(e){n("d50e"),n("921b");a(n("66fd"));var t=a(n("ede6"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},c951:function(e,t,n){"use strict";var a=n("9c1c"),i=n.n(a);i.a},ccc1:function(e,t,n){"use strict";n.r(t);var a=n("12f6"),i=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,function(){return a[e]})}(o);t["default"]=i.a},ede6:function(e,t,n){"use strict";n.r(t);var a=n("734e"),i=n("ccc1");for(var o in i)"default"!==o&&function(e){n.d(t,e,function(){return i[e]})}(o);n("c951");var r=n("2877"),s=Object(r["a"])(i["default"],a["a"],a["b"],!1,null,"2f549bc2",null);t["default"]=s.exports}},[["a56a","common/runtime","common/vendor"]]]);