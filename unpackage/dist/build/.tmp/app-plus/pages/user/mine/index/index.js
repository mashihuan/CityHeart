(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/mine/index/index"],{"01a1":function(e,t,n){"use strict";(function(e){n("d50e"),n("921b");a(n("66fd"));var t=a(n("a95a"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},"435d":function(e,t,n){"use strict";n.r(t);var a=n("a68e"),o=n.n(a);for(var r in a)"default"!==r&&function(e){n.d(t,e,function(){return a[e]})}(r);t["default"]=o.a},a68e:function(e,t,n){"use strict";(function(e,a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n("2f62");n("6e09"),n("59c3");function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),a.forEach(function(t){i(e,t,n[t])})}return e}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u=function(){return Promise.all([n.e("common/vendor"),n.e("components/mine-temp")]).then(n.bind(null,"fc64"))},s={name:"",data:function(){return{list:[{text:"我的收藏"},{text:"成为商家"},{text:"我的评价"},{text:"浏览历史"},{text:"清空缓存"},{text:"退出登录"}],id:""}},onPullDownRefresh:function(){var t=e.getStorageSync("user_id");this.reqGetUserInfo({id:t,callback:this._dealApplyStatus})},onReady:function(){var t=e.getStorageSync("user_id");this.reqGetUserInfo({id:t,callback:this._dealApplyStatus})},computed:r({},(0,o.mapState)(["user_info"])),methods:r({},(0,o.mapActions)(["reqGetUserInfo"]),{_dealApplyStatus:function(e){0!=e&&1!=e&&2!=e||this.$set(this.list,1,{text:"成为商家"}),3==e&&this.$set(this.list,1,{text:"切换为商家"})},onSwitchToEvent:function(t){var n=t.text,o=t.index;console.log(a(n," at pages\\user\\mine\\index\\index.vue:42")),-1!=o?("我的收藏"==n&&e.navigateTo({url:"/pages/user/mine/subPages/my-collect/my-collect"}),"我的评价"==n&&e.navigateTo({url:"/pages/user/mine/subPages/my-comment/my-comment"}),"浏览历史"==n&&e.navigateTo({url:"/pages/user/mine/subPages/history/history"}),"成为商家"==n&&e.navigateTo({url:"/pages/user/mine/subPages/apply/apply"}),"切换为商家"==n&&e.navigateTo({url:"/pages/service/home/index/index"}),"清空缓存"==n&&e.showToast({title:"清空成功"}),"退出登录"==n&&e.showModal({content:"确定要退出登录吗？",success:function(t){t.confirm&&(e.clearStorage(),e.reLaunch({url:"/pages/login/login"}))}})):e.navigateTo({url:"/pages/user/mine/subPages/personal-info/personal-info"})}}),components:{mineTemp:u}};t.default=s}).call(this,n("6e42")["default"],n("0de9")["default"])},a95a:function(e,t,n){"use strict";n.r(t);var a=n("c0be"),o=n("435d");for(var r in o)"default"!==r&&function(e){n.d(t,e,function(){return o[e]})}(r);var i=n("2877"),u=Object(i["a"])(o["default"],a["a"],a["b"],!1,null,"475c937e",null);t["default"]=u.exports},c0be:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement;e._self._c},o=[];n.d(t,"a",function(){return a}),n.d(t,"b",function(){return o})}},[["01a1","common/runtime","common/vendor"]]]);