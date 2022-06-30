import{_ as A,b as a,c as i,f,d as D,j as b,s as N,r as p,k as C,o as $,w as M,e as T,l as V,h as c,g as B,F as v,m as I,p as g,u as P,q as E,t as k}from"./index.b846f11e.js";import{I as U}from"./IconSearch.49c2b6ef.js";import{_ as Z,a as j}from"./NearbyStationsDetail.7fe0b490.js";import{u as G,b as x}from"./IconRefresh.c547c4d7.js";import{u as F}from"./map.361c4b82.js";const O={},q={xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},z=f("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"},null,-1),H=[z];function K(w,d){return a(),i("svg",q,H)}var R=A(O,[["render",K]]);const W={class:"flex-c h-[3rem] flex-grow bg-white px-4"},J={class:"relative w-full rounded-lg bg-gray-300"},Q=["placeholder"],X={class:"h-[calc(100%-3rem)] overflow-y-scroll bg-white px-4 pb-4"},Y=D({__name:"NearbyStations",emits:["showDetail"],setup(w,{emit:d}){const{t:_}=b(),m=G(),h=F(),{userPosition:s,nearbyStationsData:n}=N(h),l=p(""),r=C(()=>n.value?n.value.filter(e=>{if(e.StationName.Zh_tw.indexOf(l.value)>=0||e.StationName.En&&e.StationName.En.indexOf(l.value)>=0)return e}):[]);function u(e){h.selectedStationData=e,d("showDetail")}return $(async()=>{if(s.value){const e=s.value[0],o=s.value[1];if(e&&o){const t=await x.getNearbyStation(e,o);t&&(n.value=t)}}}),M(s,async e=>{if(e&&e.length>1){const o=await x.getNearbyStation(e[0],e[1]);o&&(n.value=o)}}),(e,o)=>(a(),i(v,null,[f("section",W,[f("div",J,[T(f("input",{"onUpdate:modelValue":o[0]||(o[0]=t=>l.value=t),type:"search",placeholder:c(_)("typeKeyword"),class:"peer w-full border-0 bg-transparent py-1 focus:ring-0"},null,8,Q),[[V,l.value]]),B(U,{class:"absolute right-3 top-[50%] h-4 w-4 -translate-y-[50%] peer-hover:hidden peer-focus:hidden"})])]),f("div",X,[(a(!0),i(v,null,I(c(r),(t,S)=>{var y;return a(),g(Z,{key:S,index:S,uid:t.StationUID,name:t.StationName.Zh_tw,"name-en":(y=t.StationName.En)!=null?y:t.StationName.Zh_tw,lat:t.StationPosition.PositionLat,lng:t.StationPosition.PositionLon,"stops-num":t.StopsNum,onShowDetail:L=>u(t),onToggleLike:L=>c(m).toggleLikeStations(t)},null,8,["index","uid","name","name-en","lat","lng","stops-num","onShowDetail","onToggleLike"])}),128))])],64))}}),ee={key:0,class:"flex-c h-full w-full text-gray-400"},te={key:1,class:"h-full w-full"},oe={key:0,class:"flex-c h-full w-full text-secondary"},ie=D({__name:"NearbyBoard",setup(w){const{t:d}=b(),_=P(),m=F(),{userPosition:h}=N(m),s=p(!0),n=p(!1);return $(()=>{if(!navigator.geolocation)return _.error("\u60A8\u7684\u700F\u89BD\u5668\u672A\u63D0\u4F9B\u5B9A\u4F4D\u529F\u80FD");function l(u){const e=u.coords.latitude,o=u.coords.longitude;m.changeUserPosition(e,o),s.value=!1}function r(){_.error("\u7121\u6CD5\u53D6\u5F97\u60A8\u7684\u5B9A\u4F4D\u8CC7\u8A0A"),s.value=!1}navigator.geolocation.getCurrentPosition(l,r)}),(l,r)=>s.value?(a(),i("div",ee,[B(R,{class:"mr-2 h-6 w-6 animate-spin"}),E(" "+k(c(d)("getLocation")),1)])):(a(),i("div",te,[c(h)?(a(),i(v,{key:1},[n.value?(a(),g(j,{key:1,onCloseDetail:r[1]||(r[1]=u=>n.value=!1)})):(a(),g(Y,{key:0,onShowDetail:r[0]||(r[0]=u=>n.value=!0)}))],64)):(a(),i("div",oe,k(c(d)("getLocationFailed")),1))]))}});export{ie as default};