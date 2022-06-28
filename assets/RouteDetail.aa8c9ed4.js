import{d as C,a as Z,s as S,j as I,b as d,c as y,f as t,t as o,h as a,x as V,p as N,n as R,y as T,z as L,k as q,o as O,A as G,g as P,e as F,v as W,q as j,F as A,m as J}from"./index.e97ecd69.js";import{u as U,I as B,a as H,c as K,d as Q}from"./IconRefresh.44757ed6.js";import{u as X}from"./map.834fb6e3.js";const Y={class:"mb-2 flex items-center justify-between"},_={class:"text-lg font-bold"},ee={class:"flex items-center justify-between"},te={class:"text-gray-600"},Ze=C({__name:"RouteCard",props:{data:null},emits:["displayDetail"],setup(e){const f=U(),g=Z(),{likeRoutes:l}=S(f),{lang:v}=S(g),{t:D}=I();return(p,u)=>{var s;return d(),y("div",{class:"cursor-pointer rounded-t-lg border-b-[1px] border-gray-300 p-4 pb-2 hover:bg-gray-100",onClick:u[1]||(u[1]=i=>p.$emit("displayDetail",e.data.City,e.data.RouteName.Zh_tw))},[t("div",Y,[t("div",_,o(a(v)==="zh-TW"?e.data.RouteName.Zh_tw:(s=e.data.RouteName.En)!=null?s:e.data.RouteName.Zh_tw),1),t("div",{class:"cursor-pointer",onClick:u[0]||(u[0]=V(i=>a(f).toggleLikeRoutes(e.data),["stop"]))},[a(l).findIndex(i=>i.RouteUID===e.data.RouteUID)>=0?(d(),N(B,{key:0,class:"h-5 w-5 text-secondary"})):(d(),N(H,{key:1,class:"h-5 w-5"}))])]),t("div",ee,[t("div",te,o(a(v)==="zh-TW"?`${e.data.DepartureStopNameZh} - ${e.data.DestinationStopNameZh}`:`${e.data.DepartureStopNameEn} - ${e.data.DestinationStopNameEn}`),1),t("div",null,o(a(D)(`city.${e.data.City}`)),1)])])}}}),ne={class:"relative mx-4 flex items-center justify-between border-b-[1px] border-gray-500 py-4 pr-4 text-center duration-150 hover:bg-gray-300"},ae={class:"flex-c"},oe={key:0,class:"whitespace-nowrap p-1 font-bold text-secondary"},se=t("div",{class:"absolute right-0 top-1/2 h-full w-[2px] bg-gray-500"},null,-1),ie=t("div",{class:"absolute right-[1px] h-3 w-3 translate-x-1/2 rounded-full bg-gray-500 ring-[2px] ring-white"},null,-1),re=C({__name:"StopOfRouteCard",props:{data:null},setup(e){const{t:f}=I(),g=Z(),{lang:l}=S(g);function v(s,i){if(s===-1)return i?D(i):f("noDeparture");if(s<30)return f("arriving");if(s<60)return f("upcoming");{const r=(s/60).toFixed(0);return f("minute",{num:r})}}function D(s){const i=new Date(s),r=i.getHours(),x=i.getMinutes();return`${r<10?"0"+r:r}:${x<10?"0"+x:x}`}function p(s){return s===-1||typeof s=="undefined"?"bg-gray-500":s<60?"bg-secondary":"bg-primary"}const u=s=>s>=0&&s<30;return(s,i)=>{var r,x,$,w;return d(),y("div",ne,[t("div",ae,[t("div",{class:R([p((r=e.data.EstimateTime)!=null?r:-1),"mr-4 w-[5rem] flex-shrink-0 rounded-lg py-1 text-white"])},o(v((x=e.data.EstimateTime)!=null?x:-1,e.data.NextBusTime)),3),t("div",{class:R([{"font-bold":u(($=e.data.EstimateTime)!=null?$:-1)},"whitespace-pre-wrap text-left"])},o(a(l)==="zh-TW"?e.data.StopName.Zh_tw:(w=e.data.StopName.En)!=null?w:e.data.StopName.Zh_tw),3)]),e.data.PlateNumb&&e.data.PlateNumb!=="-1"?(d(),y("div",oe,o(e.data.PlateNumb),1)):T("",!0),se,ie])}}}),le={class:"flex h-[2rem] items-center justify-between px-2"},ce={class:"ml-1"},ue={class:"flex-c h-[6rem] flex-col"},de={class:"text-4xl font-bold"},he={class:"flex h-[4rem]"},me=t("input",{type:"radio",name:"direction",class:"peer hidden",checked:""},null,-1),ge={class:"flex-c h-full cursor-pointer gap-2 rounded-t-md bg-gray-300 px-2 peer-checked:bg-primary peer-checked:text-white"},fe=t("input",{type:"radio",name:"direction",class:"peer hidden"},null,-1),xe={class:"flex-c h-full cursor-pointer gap-2 rounded-t-md bg-gray-300 px-2 peer-checked:bg-primary peer-checked:text-white"},ye=t("input",{type:"radio",name:"direction",class:"peer hidden",checked:""},null,-1),be={class:"flex-c h-full cursor-pointer rounded-t-md bg-gray-300 peer-checked:bg-primary peer-checked:text-white"},ve=t("span",null," | ",-1),De={class:"h-[calc(100%-15rem)] overflow-y-scroll pb-8"},pe={class:"relative mx-4 flex h-[3rem] items-center justify-between"},we={class:"absolute top-0 h-[2px] w-full bg-gray-300"},ke={class:"flex-c mt-[1px]"},Ne=["checked"],Se={class:"ml-1"},$e={class:"ml-1"},Ie=C({__name:"RouteDetail",props:{route:null,data:null},emits:["closeDetail","updateDetail"],setup(e,{emit:f}){const g=e,{t:l}=I(),v=Z(),D=U(),p=X(),{lang:u}=S(v),{likeRoutes:s}=S(D),i=L({timer:30,intervalContainer:void 0,autoMode:!1,toggleAutoMode(){this.autoMode=!this.autoMode,this.autoMode?this.intervalContainer=setInterval(()=>{this.timer-=1,this.timer<0&&(this.timer=30,f("updateDetail",g.route))},1e3):(clearInterval(this.intervalContainer),this.timer=30)}}),r=L({currentDirection:0,data:q(()=>{switch(r.currentDirection){case 0:return g.data.go;case 1:return g.data.back;case 2:return g.data.circle;default:return[]}}),changeDirection(h){this.currentDirection=h,w()}});function x(h,n){if(h===-1)return n?$(n):l("noDeparture");if(h<30)return l("arriving");if(h<60)return l("upcoming");{const c=(h/60).toFixed(0);return l("minute",{num:c})}}function $(h){const n=new Date(h),c=n.getHours(),b=n.getMinutes();return`${c<10?"0"+c:c}:${b<10?"0"+b:b}`}const w=()=>{const n=r.data.map(c=>{var k;return{TimeString:x((k=c.EstimateTime)!=null?k:-1,c.NextBusTime),StopName:c.StopName,StopPosition:{PositionLon:c.StopPosition.PositionLon,PositionLat:c.StopPosition.PositionLat}}});p.routeLine=n};return O(()=>{g.data.go.length>0?r.currentDirection=0:g.data.back.length>0?r.currentDirection=1:r.currentDirection=2,w()}),G(()=>{i.intervalContainer&&clearInterval(i.intervalContainer)}),(h,n)=>{var c,b,k,M,E,z;return d(),y(A,null,[t("section",le,[t("button",{type:"button",class:"flex-c",onClick:n[0]||(n[0]=m=>h.$emit("closeDetail"))},[P(K),t("span",ce,o(a(l)("back")),1)]),t("div",{class:"flex-c h-full cursor-pointer",onClick:n[1]||(n[1]=m=>a(D).toggleLikeRoutes(e.route))},[a(s).findIndex(m=>m.RouteUID===e.route.RouteUID)>=0?(d(),N(B,{key:0,class:"h-5 w-5 text-secondary"})):(d(),N(H,{key:1,class:"h-5 w-5"}))])]),t("section",ue,[t("h3",de,o(a(u)==="zh-TW"?e.route.RouteName.Zh_tw:(c=e.route.RouteName.En)!=null?c:e.route.RouteName.Zh_tw),1),F(t("small",null,o((b=e.route.RouteName.En)!=null?b:e.route.RouteName.Zh_tw),513),[[W,a(u)==="zh-TW"]])]),t("section",he,[e.data.go.length>0?(d(),y("label",{key:0,class:"flex-grow",onChange:n[2]||(n[2]=m=>r.changeDirection(0))},[me,t("div",ge,[t("span",null,o(a(l)("goTo")),1),t("strong",null,o(a(u)==="zh-TW"?e.route.DepartureStopNameZh:(k=e.route.DepartureStopNameEn)!=null?k:e.route.DepartureStopNameZh),1)])],32)):T("",!0),e.data.back.length>0?(d(),y("label",{key:1,class:"flex-grow",onChange:n[3]||(n[3]=m=>r.changeDirection(1))},[fe,t("div",xe,[t("span",null,o(a(l)("goTo")),1),t("strong",null,o(a(u)==="zh-TW"?e.route.DestinationStopNameZh:(M=e.route.DestinationStopNameEn)!=null?M:e.route.DestinationStopNameZh),1)])],32)):T("",!0),e.data.circle.length>0?(d(),y("label",{key:2,class:"flex-grow",onChange:n[4]||(n[4]=m=>r.changeDirection(2))},[ye,t("div",be,[t("strong",null,[j(o(a(u)==="zh-TW"?e.route.DepartureStopNameZh:(E=e.route.DepartureStopNameEn)!=null?E:e.route.DepartureStopNameZh)+" ",1),ve,j(" "+o(a(u)==="zh-TW"?e.route.DestinationStopNameZh:(z=e.route.DestinationStopNameEn)!=null?z:e.route.DestinationStopNameZh),1)])])],32)):T("",!0)]),t("section",De,[(d(!0),y(A,null,J(r.data,m=>(d(),N(re,{key:m.StopUID,data:m},null,8,["data"]))),128))]),t("section",pe,[t("div",we,[t("div",{class:R(["absolute left-0 h-[2px] bg-primary",{"process-line":i.autoMode}])},null,2)]),t("div",ke,[t("input",{type:"checkbox",checked:i.autoMode,onChange:n[5]||(n[5]=(...m)=>i.toggleAutoMode&&i.toggleAutoMode(...m))},null,40,Ne),t("span",Se,o(a(l)("refreshAuto")),1),F(t("span",null,"\uFF08"+o(a(l)("afterTime"))+" "+o(i.timer)+" "+o(a(l)("second"))+"\uFF09",513),[[W,i.autoMode]])]),t("div",{class:"flex-c cursor-pointer",onClick:n[6]||(n[6]=m=>h.$emit("updateDetail",e.route))},[P(Q),t("span",$e,o(a(l)("refreshNow")),1)])])],64)}}});export{Ze as _,Ie as a};
