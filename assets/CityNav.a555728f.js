import{d as m,h as C,s as g,f as n,a as u,c as i,b as t,t as a,q as d,G as p,H as y,F as f,x as h,e as _,j as v}from"./index.b6f8b307.js";import{I as b}from"./IconInfo.c7dd6a84.js";import{u as w}from"./bus.5eea2a3f.js";const x={key:0,class:"flex-c absolute top-0 left-0 z-[1000] h-full w-full bg-[#00000050]"},k={class:"rounded bg-white p-8"},T=["value"],F={key:1,class:"flex h-full items-center justify-between px-4"},N=["value"],V={href:"https://www.taiwanbus.tw/",target:"_blank",class:"flex-c hover:underline"},A=m({__name:"CityNav",setup(B){const{t:o}=C(),r=w(),{currentCity:s}=g(r),c=["Taipei","Taoyuan","Taichung","Tainan","Kaohsiung","Hsinchu","MiaoliCounty","ChanghuaCounty","NantouCounty","YunlinCounty","Chiayi","PingtungCounty","YilanCounty","HualienCounty","TaitungCounty","PenghuCounty","KinmenCounty"];return(I,l)=>n(r).currentCity===""?(u(),i("div",x,[t("div",k,[t("span",null,a(n(o)("select.City"))+"\uFF1A",1),d(t("select",{id:"city","onUpdate:modelValue":l[0]||(l[0]=e=>y(s)?s.value=e:null),name:"city",class:"rounded-lg border-none bg-transparent"},[(u(),i(f,null,h(c,e=>t("option",{key:e,value:e},a(n(o)(`select.${e}`)),9,T)),64))],512),[[p,n(s)]])])])):(u(),i("section",F,[t("div",null,[t("span",null,a(n(o)("select.City"))+"\uFF1A",1),d(t("select",{id:"city","onUpdate:modelValue":l[1]||(l[1]=e=>y(s)?s.value=e:null),name:"city",class:"rounded-lg border-none bg-transparent text-center focus:ring-0"},[(u(),i(f,null,h(c,e=>t("option",{key:e,value:e},a(n(o)(`select.${e}`)),9,N)),64))],512),[[p,n(s)]])]),t("div",null,[t("a",V,[_(b,{class:"mr-2 h-6 w-6"}),v(" "+a(n(o)("schedule")),1)])])]))}});export{A as default};