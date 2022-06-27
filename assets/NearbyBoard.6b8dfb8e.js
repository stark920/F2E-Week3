import{_ as I,b as c,c as p,f as t,d as $,a as P,s as M,t as u,h as l,g as x,j as E,u as L,r as T,k as z,l as k,o as V,w as j,m as W,F as C,e as N,n as Z,p as A,q as R,v as G,x as F}from"./index.1fde3d96.js";import{I as O}from"./IconSearch.11597886.js";import{b as D,I as U,a as q}from"./api.89715e17.js";import{u as B}from"./map.cb522d94.js";import{_ as H}from"./NearbyDetail.efbfd86b.js";const K={},J={xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},Q=t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"},null,-1),X=[Q];function Y(i,d){return c(),p("svg",J,X)}var tt=I(K,[["render",Y]]);const et={},at={xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},ot=t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"},null,-1),st=t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M15 11a3 3 0 11-6 0 3 3 0 016 0z"},null,-1),nt=[ot,st];function it(i,d){return c(),p("svg",at,nt)}var rt=I(et,[["render",it]]);const lt={class:"mb-2 flex items-center justify-between"},ct={class:"text-lg font-bold"},ut={class:"flex-c text-gray-600"},dt={class:"whitespace-pre"},ht=$({__name:"NearbyCard",props:{index:null,data:null},emits:["displayDetail"],setup(i,{emit:d}){const h=i,v=B(),b=P(),{lang:y}=M(b),w=(f,_)=>{const s=v.userPosition;if(!s)return"";const n=s[0],a=s[1];if(f==n&&_==a)return 0;{const o=Math.PI*f/180,e=Math.PI*n/180,m=_-a,g=Math.PI*m/180;let r=Math.sin(o)*Math.sin(e)+Math.cos(o)*Math.cos(e)*Math.cos(g);return r>1&&(r=1),r=Math.acos(r),r=r*180/Math.PI,r=r*60*1.1515*1609.344,r.toFixed(0)}},S=(f,_)=>{var s;v.changeViewPosition(f,_),v.focusStopIndex=h.index,d("displayDetail",h.data.StationID,h.data.City,h.data.StationName.Zh_tw,(s=h.data.StationName.En)!=null?s:h.data.StationName.Zh_tw)};return(f,_)=>{var s;return c(),p("div",{class:"cursor-pointer rounded-t-lg border-b-[1px] border-gray-300 p-4 pb-2 hover:bg-gray-100",onClick:_[0]||(_[0]=n=>S(i.data.StationPosition.PositionLat,i.data.StationPosition.PositionLon))},[t("div",lt,[t("div",null,[t("div",ct,u(l(y)==="zh-TW"?i.data.StationName.Zh_tw:(s=i.data.StationName.En)!=null?s:i.data.StationName.Zh_tw),1),t("small",null,u(l(y)==="zh-TW"?`${i.data.StopsNum} \u500B\u7AD9\u724C`:`${i.data.StopsNum} stops`),1)]),t("div",ut,[x(rt,{class:"m-5 mr-1 h-5"}),t("span",dt,u(`${w(i.data.StationPosition.PositionLat,i.data.StationPosition.PositionLon)} m`),1)])])])}}}),ft={key:0,class:"flex-c h-full text-gray-400"},mt={key:1,class:"flex h-full w-full flex-col"},_t={class:"flex-c h-[4rem] flex-grow bg-white px-4"},pt={class:"relative w-full rounded-lg bg-gray-300"},vt=["placeholder"],gt={class:"h-[calc(100%-4rem)] overflow-y-scroll bg-white px-4 pb-4"},wt={key:1,class:"h-full bg-white"},xt={class:"flex h-[2rem] items-center justify-between px-2"},yt={class:"ml-1"},St={class:"flex-c h-[6rem] px-4 text-2xl font-bold"},bt={class:"flex h-[calc(100%-11rem)] flex-col overflow-y-auto px-4"},Ct={class:"relative mx-4 flex h-[3rem] items-center justify-between"},Dt={class:"absolute top-0 h-[2px] w-full bg-gray-300"},Mt={class:"flex-c mt-[1px]"},kt=["checked"],Nt={class:"ml-1"},At={class:"ml-1"},Et=$({__name:"NearbyBoard",setup(i){const{t:d}=E(),h=L(),v=B(),b=P(),{userPosition:y,nearbyStation:w}=M(v),{lang:S}=M(b),f=T(""),_=z(()=>w.value?w.value.filter(a=>{if(a.StationName.Zh_tw.indexOf(f.value)>=0||a.StationName.En&&a.StationName.En.indexOf(f.value)>=0)return a}):[]),s=k({isShow:!1,name:"",nameEn:"",data:[],async show(a,o,e,m){const g=await D.getNearbyStationWithArrival(a,o);g?(n.currentID=a,n.currenCity=o,this.name=e,this.nameEn=m,this.data=g,this.isShow=!0):h.error("\u7121\u6CD5\u53D6\u5F97\u8CC7\u6599\uFF0C\u8ACB\u7A0D\u5F8C\u518D\u8A66")},closeShow(){n.intervalContainer&&clearInterval(n.intervalContainer),this.isShow=!1}}),n=k({currentID:"",currenCity:"",timer:30,intervalContainer:void 0,autoMode:!1,toggleAutoMode(){this.autoMode=!this.autoMode,this.autoMode?this.intervalContainer=setInterval(()=>{this.timer-=1,this.timer<0&&(this.timer=30,this.updateData())},1e3):(clearInterval(this.intervalContainer),this.timer=30)},async updateData(){if(!this.currentID||!this.currenCity)return;const a=await D.getNearbyStationWithArrival(this.currentID,this.currenCity);a&&(s.data=a)}});return V(()=>{if(!navigator.geolocation)return h.error("\u60A8\u7684\u700F\u89BD\u5668\u672A\u652F\u63F4\u5B9A\u4F4D\u529F\u80FD");function a(e){const m=e.coords.latitude,g=e.coords.longitude;v.changeUserPosition(m,g)}function o(){v.updateNearByStation([]),h.error("\u7121\u6CD5\u53D6\u5F97\u60A8\u7684\u5B9A\u4F4D\u8CC7\u8A0A")}navigator.geolocation.getCurrentPosition(a,o)}),j(y,async a=>{if(a){const o=await D.getNearbyStation(a[0],a[1]);o&&v.updateNearByStation(o)}}),(a,o)=>l(w)?(c(),p("section",mt,[s.isShow?(c(),p("section",wt,[t("div",xt,[t("button",{type:"button",class:"flex-c",onClick:o[1]||(o[1]=(...e)=>s.closeShow&&s.closeShow(...e))},[x(U),t("span",yt,u(l(d)("back")),1)])]),t("h3",St,u(l(S)==="zh-TW"?s.name:s.nameEn),1),t("div",bt,[(c(!0),p(C,null,A(s.data,(e,m)=>(c(),F(H,{key:m,data:e},null,8,["data"]))),128))]),t("div",Ct,[t("div",Dt,[t("div",{class:R(["absolute left-0 h-[2px] bg-primary",{"process-line":n.autoMode}])},null,2)]),t("div",Mt,[t("input",{type:"checkbox",checked:n.autoMode,onChange:o[2]||(o[2]=(...e)=>n.toggleAutoMode&&n.toggleAutoMode(...e))},null,40,kt),t("span",Nt,u(l(d)("refreshAuto")),1),N(t("span",null,"\uFF08"+u(l(d)("afterTime"))+" "+u(n.timer)+" "+u(l(d)("second"))+"\uFF09",513),[[G,n.autoMode]])]),t("div",{class:"flex-c cursor-pointer",onClick:o[3]||(o[3]=(...e)=>n.updateData&&n.updateData(...e))},[x(q),t("span",At,u(l(d)("refreshNow")),1)])])])):(c(),p(C,{key:0},[t("div",_t,[t("div",pt,[N(t("input",{"onUpdate:modelValue":o[0]||(o[0]=e=>f.value=e),type:"search",placeholder:l(d)("typeKeyword"),class:"peer w-full border-0 bg-transparent focus:ring-0"},null,8,vt),[[Z,f.value]]),x(O,{class:"absolute right-3 top-[50%] h-4 w-4 -translate-y-[50%] peer-hover:hidden peer-focus:hidden"})])]),t("div",gt,[(c(!0),p(C,null,A(l(_),(e,m)=>(c(),F(ht,{key:m,data:e,index:m,onDisplayDetail:g=>{var r;return s.show(e.StationID,e.City,e.StationName.Zh_tw,(r=e.StationName.En)!=null?r:e.StationName.Zh_tw)}},null,8,["data","index","onDisplayDetail"]))),128))])],64))])):(c(),p("section",ft,[x(tt,{class:"mr-2 h-6 w-6 animate-spin"}),W(" "+u(l(S)==="zh-TW"?"\u6B63\u5728\u53D6\u5F97\u60A8\u7684\u4F4D\u7F6E\u8CC7\u8A0A...":"Getting your location..."),1)]))}});export{Et as default};
