"use strict";(self.webpackChunkbooking=self.webpackChunkbooking||[]).push([[838],{97838:function(t,e,s){s.r(e),s.d(e,{MapModule:function(){return k}});var o=s(16274),n=s(60805),i=s(42741),r=s(10565),a=s(91765),c=s(59618);let l=(()=>{class t{constructor(){this.passPreparedData=new i.vpe,this.eventAndIndex=new i.vpe}setPlacemarks(t){this.passPreparedData.emit(t)}setActiveBalloon(t,e){this.eventAndIndex.emit({e:t,index:e})}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=i.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var p=s(88638),m=s(67617);function u(t,e){if(1&t&&i._UZ(0,"img",7),2&t){const t=i.oxw().$implicit;i.Q6J("src",t.url,i.LSH)("@slideAnimation","scale")}}function d(t,e){if(1&t&&(i.TgZ(0,"div",5),i.YNc(1,u,1,2,"img",6),i.qZA()),2&t){const t=e.index,s=i.oxw();i.xp6(1),i.Q6J("ngIf",t===s.currentSlide)}}const g=(0,p.oQ)([(0,p.oB)({opacity:0,transform:"scale(0.5)"}),(0,p.jt)("{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)",(0,p.oB)({opacity:1,transform:"scale(1)"}))]),_=(0,p.oQ)([(0,p.jt)("{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)",(0,p.oB)({opacity:0,transform:"scale(0.5)"}))]);let f=(()=>{class t{constructor(){this.currentSlide=0}ngOnInit(){this.preloadImages()}prev(t){const e=this.currentSlide-1;this.currentSlide=e<0?this.images.length-1:e}next(t){const e=this.currentSlide+1;this.currentSlide=e===this.images.length?0:e}preloadImages(){for(const t of this.images)(new Image).src=t.url}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=i.Xpm({type:t,selectors:[["app-carousel"]],inputs:{images:"images"},decls:9,vars:1,consts:[[1,"carousel"],["class","carousel__img-wrap",4,"ngFor","ngForOf"],[1,"carousel__button-wrap"],["mat-icon-button","",1,"carousel__button",3,"click"],[1,"material-icons"],[1,"carousel__img-wrap"],["class","carousel__img",3,"src",4,"ngIf"],[1,"carousel__img",3,"src"]],template:function(t,e){1&t&&(i.TgZ(0,"div",0),i.YNc(1,d,2,1,"div",1),i.TgZ(2,"div",2),i.TgZ(3,"button",3),i.NdJ("click",function(t){return e.prev(t)}),i.TgZ(4,"span",4),i._uU(5,"arrow_back_ios_new"),i.qZA(),i.qZA(),i.TgZ(6,"button",3),i.NdJ("click",function(t){return e.next(t)}),i.TgZ(7,"span",4),i._uU(8,"arrow_forward_ios"),i.qZA(),i.qZA(),i.qZA(),i.qZA()),2&t&&(i.xp6(1),i.Q6J("ngForOf",e.images))},directives:[o.sg,m.lW,o.O5],styles:[".carousel[_ngcontent-%COMP%]{position:relative;height:100%;width:100%;overflow:hidden}.carousel__button[_ngcontent-%COMP%]{background-color:#f5f5f5}.carousel__button-wrap[_ngcontent-%COMP%]{position:absolute;left:50%;bottom:20px;transform:translate(-50%);width:60%;display:inline-flex;justify-content:space-between}.carousel__img-wrap[_ngcontent-%COMP%]{display:inline-flex;max-width:250px;overflow-x:scroll}.carousel__img[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%;-o-object-fit:cover;object-fit:cover;transition:transform .15s cubic-bezier(.25,.46,.45,.84)}"],data:{animation:[(0,p.X$)("slideAnimation",[(0,p.eR)("void => scale",[(0,p._7)(g,{params:{time:"500ms"}})]),(0,p.eR)("scale => void",[(0,p._7)(_,{params:{time:"500ms"}})])])]}}),t})();const h=function(t){return["detail",t]};function b(t,e){if(1&t){const t=i.EpF();i.ynx(0),i.TgZ(1,"li"),i.TgZ(2,"article",3),i.TgZ(3,"div",4),i._UZ(4,"app-carousel",5),i.qZA(),i.TgZ(5,"div",6),i.NdJ("mouseenter",function(s){i.CHM(t);const o=e.index;return i.oxw().setActiveBalloon(s,o)})("mouseleave",function(s){i.CHM(t);const o=e.index;return i.oxw().setActiveBalloon(s,o)}),i.TgZ(6,"h2"),i._uU(7),i.qZA(),i.TgZ(8,"p"),i.TgZ(9,"span",7),i._uU(10,"\u0410\u0434\u0440\u0435\u0441"),i.qZA(),i._uU(11),i.qZA(),i.TgZ(12,"p"),i.TgZ(13,"span",7),i._uU(14,"\u0426\u0435\u043d\u0430 \u0437\u0430 \u043d\u043e\u0447\u044c"),i.qZA(),i._uU(15),i.qZA(),i.TgZ(16,"a",8),i._uU(17,"\u041f\u043e\u0434\u0440\u043e\u0431\u043d\u0435\u0435"),i.qZA(),i.qZA(),i.qZA(),i.qZA(),i.BQk()}if(2&t){const t=e.$implicit;i.xp6(4),i.Q6J("images",t.images),i.xp6(3),i.Oqu(t.name),i.xp6(4),i.hij(" ",t.address," "),i.xp6(4),i.hij(" ",t.price," \u20bd "),i.xp6(1),i.Q6J("routerLink",i.VKq(5,h,t.id))}}let v=(()=>{class t{constructor(t,e,s){this.roomsService=t,this.matDialog=e,this.mapSetService=s,this.rooms=[],this.coords={},this.placemarks=[]}ngOnInit(){this.getRooms()}getRooms(){this.roomsService.getRooms(r.W).subscribe(t=>{this.rooms=t}),this.rooms.forEach(t=>{this.placemarks.push({geometry:[t.lat,t.long],properties:{balloonContentHeader:`<div style="max-width: 250px">\n                                    <a href="./detail/${t.id}" class="map-detail-link">${t.name}</a>\n                                    <br><span class="map-detail-address">${t.address}</span></div>`,balloonContentBody:`<img src="${t.images[0].url}" width="250px" alt="${t.name}"/>`,iconContent:t.price+"\u20bd"},options:{preset:"islands#darkBlueStretchyIcon"}})}),this.mapSetService.setPlacemarks(this.placemarks)}setActiveBalloon(t,e){this.mapSetService.setActiveBalloon(t,e)}}return t.\u0275fac=function(e){return new(e||t)(i.Y36(a.L),i.Y36(c.uw),i.Y36(l))},t.\u0275cmp=i.Xpm({type:t,selectors:[["app-list-rooms"]],decls:3,vars:1,consts:[[1,"list-rooms"],[1,"list-rooms__wrap"],[4,"ngFor","ngForOf"],[1,"list-rooms__item"],[1,"list-rooms__carousel"],[3,"images"],[1,"list-rooms__info",3,"mouseenter","mouseleave"],[1,"list-rooms__item-title"],["mat-raised-button","","color","accent",3,"routerLink"]],template:function(t,e){1&t&&(i.TgZ(0,"section",0),i.TgZ(1,"ul",1),i.YNc(2,b,18,7,"ng-container",2),i.qZA(),i.qZA()),2&t&&(i.xp6(2),i.Q6J("ngForOf",e.rooms))},directives:[o.sg,f,m.zs,n.yS],styles:[".list-rooms__wrap[_ngcontent-%COMP%]{list-style:none;padding:15px}.list-rooms__item[_ngcontent-%COMP%]{border:1px solid #ccc;padding:1rem;border-radius:4px;min-height:100px;width:auto;margin:25px;box-sizing:border-box;display:flex;flex-flow:row nowrap;justify-content:space-between}.list-rooms__item-title[_ngcontent-%COMP%]{font-weight:bold}.list-rooms__info[_ngcontent-%COMP%]{flex-basis:65%;padding:25px;margin-left:15px}.list-rooms__info[_ngcontent-%COMP%]:hover{background-color:#fbf8ff}.list-rooms__carousel[_ngcontent-%COMP%]{flex-basis:90%}@media screen and (max-width: 1440px){.list-rooms__item[_ngcontent-%COMP%]{flex-flow:row wrap}.list-rooms__carousel[_ngcontent-%COMP%]{flex-basis:100%;height:310px}}"]}),t})(),Z=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=i.Xpm({type:t,selectors:[["app-map-sidebar"]],decls:4,vars:0,consts:[[1,"map-sidebar__wrap"]],template:function(t,e){1&t&&(i.TgZ(0,"h1"),i._uU(1,"\u0421\u043f\u0438\u0441\u043e\u043a \u043e\u0442\u0435\u043b\u0435\u0439"),i.qZA(),i.TgZ(2,"div",0),i._UZ(3,"app-list-rooms"),i.qZA())},directives:[v],styles:[".map-sidebar__wrap[_ngcontent-%COMP%]{background-color:#fff;height:85vh;max-height:1000px;overflow:scroll;width:100%}"]}),t})();var w=s(51545);function x(t,e){if(1&t&&i._UZ(0,"ya-placemark",3),2&t){const t=e.$implicit;i.Q6J("geometry",t.geometry)("properties",t.properties)("options",t.options)}}let y=(()=>{class t{constructor(t){this.mapSetService=t,this.center=[55.771209,37.568156],this.placemarks=[],this.zoom=10,this.options={preset:"islands#redStretchyIcon"},this.unsetOptions={preset:"islands#darkBlueStretchyIcon"}}ngOnInit(){this.subscription=this.mapSetService.passPreparedData.subscribe(t=>{this.placemarks=t}),this.subscription=this.mapSetService.eventAndIndex.subscribe(t=>{this.placemarks[t.index].options="mouseenter"===t.e.type?this.options:this.unsetOptions})}ngOnDestroy(){this.subscription.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(i.Y36(l))},t.\u0275cmp=i.Xpm({type:t,selectors:[["app-map"]],decls:5,vars:3,consts:[[1,"container"],[3,"center","zoom"],[3,"geometry","properties","options",4,"ngFor","ngForOf"],[3,"geometry","properties","options"]],template:function(t,e){1&t&&(i.TgZ(0,"h1"),i._uU(1,"\u043a\u0430\u0440\u0442\u0430"),i.qZA(),i.TgZ(2,"div",0),i.TgZ(3,"ya-map",1),i.YNc(4,x,1,3,"ya-placemark",2),i.qZA(),i.qZA()),2&t&&(i.xp6(3),i.Q6J("center",e.center)("zoom",e.zoom),i.xp6(1),i.Q6J("ngForOf",e.placemarks))},directives:[w.k0,o.sg,w.i],styles:[".container[_ngcontent-%COMP%]{width:100%;height:100%}"]}),t})();const A=[{path:"",component:(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=i.Xpm({type:t,selectors:[["app-main"]],decls:3,vars:0,consts:[[1,"main__wrap"]],template:function(t,e){1&t&&(i.TgZ(0,"div",0),i._UZ(1,"app-map-sidebar"),i._UZ(2,"app-map"),i.qZA())},directives:[Z,y],styles:[".main__wrap[_ngcontent-%COMP%]{display:grid;grid-template-columns:40% 60%}"]}),t})()},{path:"detail/:id",loadChildren:()=>s.e(926).then(s.bind(s,21926)).then(t=>t.RoomDetailModule)}];let k=(()=>{class t{}return t.\u0275mod=i.oAB({type:t}),t.\u0275inj=i.cJS({factory:function(e){return new(e||t)},imports:[[o.ez,n.Bz.forChild(A)]]}),t})()}}]);