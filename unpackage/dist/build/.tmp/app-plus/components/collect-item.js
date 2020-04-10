(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/collect-item"],{8721:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("6e09"),o={props:{list:Array,showFavorite:{type:Boolean,default:!1}},name:"",data:function(){return{}},computed:{BASE_URL:function(){return a.BASE_URL}},onLoad:function(){},methods:{onGoToPage:function(e){t.navigateTo({url:"/pages/user/home/subPages/merchant-detail/merchant-detail?id="+e}),t.setStorage({key:"mer_id",data:e})},delFavorite:function(t){this.$emit("delFavorite",t)}},components:{}};e.default=o}).call(this,n("6e42")["default"])},"93cb":function(t,e,n){"use strict";n.r(e);var a=n("8721"),o=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,function(){return a[t]})}(u);e["default"]=o.a},a342:function(t,e,n){"use strict";var a=n("c504"),o=n.n(a);o.a},c504:function(t,e,n){},d8c3:function(t,e,n){"use strict";n.r(e);var a=n("ff01"),o=n("93cb");for(var u in o)"default"!==u&&function(t){n.d(e,t,function(){return o[t]})}(u);n("a342");var r=n("2877"),c=Object(r["a"])(o["default"],a["a"],a["b"],!1,null,"7a857a2e",null);e["default"]=c.exports},ff01:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return o})}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/collect-item-create-component',
    {
        'components/collect-item-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("d8c3"))
        })
    },
    [['components/collect-item-create-component']]
]);                
