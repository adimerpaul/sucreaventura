import{s as G,g as dt,r as _,l as nt,a4 as Q,o as $,a as o,b as l,w as n,Q as J,e as N,aw as ot,ap as O,c as I,a3 as R,f as T,Z,a2 as K,t as A,a0 as W,a1 as X,a5 as st,a6 as ct,h as ut}from"./index-C05ozP0x.js";import{Q as lt}from"./QSelect-CwwB6Fad.js";import{Q as it}from"./QForm-Bi75cvdv.js";import{d as tt,Q as et,a as D,b as M,c as pt}from"./QList-D7IEQ_89.js";import{Q as vt}from"./QMarkupTable-DK0wuBaQ.js";import{Q as ft}from"./QPage-8hAejBos.js";import{Q as ht}from"./QSpace-CnhSba8s.js";import{h as k}from"./moment-C5S46NFB.js";import"./format-BPkxeWz4.js";var C={},rt;function mt(){if(rt)return C;rt=1,Object.defineProperty(C,"__esModule",{value:!0}),C.Printd=C.createIFrame=C.createLinkStyle=C.createStyle=void 0;var B=/^(((http[s]?)|file):)?(\/\/)+([0-9a-zA-Z-_.=?&].+)$/,i=/^((\.|\.\.)?\/)([0-9a-zA-Z-_.=?&]+\/)*([0-9a-zA-Z-_.=?&]+)$/,v=function(d){return B.test(d)||i.test(d)};function h(d,t){var s=d.createElement("style");return s.appendChild(d.createTextNode(t)),s}C.createStyle=h;function b(d,t){var s=d.createElement("link");return s.type="text/css",s.rel="stylesheet",s.href=t,s}C.createLinkStyle=b;function g(d){var t=window.document.createElement("iframe");return t.setAttribute("src","about:blank"),t.setAttribute("style","visibility:hidden;width:0;height:0;position:absolute;z-index:-9999;bottom:0;"),t.setAttribute("width","0"),t.setAttribute("height","0"),t.setAttribute("wmode","opaque"),d.appendChild(t),t}C.createIFrame=g;var c={parent:window.document.body,headElements:[],bodyElements:[]},m=function(){function d(t){this.isLoading=!1,this.hasEvents=!1,this.opts=[c,t||{}].reduce(function(s,u){return Object.keys(u).forEach(function(f){return s[f]=u[f]}),s},{}),this.iframe=g(this.opts.parent)}return d.prototype.getIFrame=function(){return this.iframe},d.prototype.print=function(t,s,u,f){if(!this.isLoading){var y=this.iframe,P=y.contentDocument,E=y.contentWindow;if(!(!P||!E)&&(this.iframe.src="about:blank",this.elCopy=t.cloneNode(!0),!!this.elCopy)){this.isLoading=!0,this.callback=f;var x=E.document;x.open(),x.write('<!DOCTYPE html><html><head><meta charset="utf-8"></head><body></body></html>'),this.addEvents();var Y=this.opts,L=Y.headElements,V=Y.bodyElements;Array.isArray(L)&&L.forEach(function(r){return x.head.appendChild(r)}),Array.isArray(V)&&V.forEach(function(r){return x.body.appendChild(r)}),Array.isArray(s)&&s.forEach(function(r){r&&x.head.appendChild(v(r)?b(x,r):h(x,r))}),x.body.appendChild(this.elCopy),Array.isArray(u)&&u.forEach(function(r){if(r){var S=x.createElement("script");v(r)?S.src=r:S.innerText=r,x.body.appendChild(S)}}),x.close()}}},d.prototype.printURL=function(t,s){this.isLoading||(this.addEvents(),this.isLoading=!0,this.callback=s,this.iframe.src=t)},d.prototype.onBeforePrint=function(t){this.onbeforeprint=t},d.prototype.onAfterPrint=function(t){this.onafterprint=t},d.prototype.launchPrint=function(t){this.isLoading||t.print()},d.prototype.addEvents=function(){var t=this;if(!this.hasEvents){this.hasEvents=!0,this.iframe.addEventListener("load",function(){return t.onLoad()},!1);var s=this.iframe.contentWindow;s&&(this.onbeforeprint&&s.addEventListener("beforeprint",this.onbeforeprint),this.onafterprint&&s.addEventListener("afterprint",this.onafterprint))}},d.prototype.onLoad=function(){var t=this;if(this.iframe){this.isLoading=!1;var s=this.iframe,u=s.contentDocument,f=s.contentWindow;if(!u||!f)return;typeof this.callback=="function"?this.callback({iframe:this.iframe,element:this.elCopy,launchPrint:function(){return t.launchPrint(f)}}):this.launchPrint(f)}},d}();return C.Printd=m,C.default=m,C}var at=mt();class z{static imprimirSalas(i,v,h,b){let g='<table class="table">',c=0;i.forEach(t=>{g+=`
        <tr style="border-top: 1px solid black; border-bottom: 1px solid black;">
          <td>${t.nombre}</td>
          <td>${t.sala}</td>
          <td>${t.horario}</td>
          <td>${t.estado}</td>
          <td class="text-right">${t.total}</td>
        </tr>
      `,c+=parseInt(t.total)}),g+=`
      <tr style="border-top: 1px solid black; border-bottom: 1px solid black;">
        <td class="text-right"></td>
        <td class="text-right"></td>
        <td class="text-right"></td>
        <td class="text-right text-bold">Total</td>
        <td class="text-right">${c.toFixed(2)}</td>
      </tr>
    `,g+="</table>";const m=`
    <style>
        .text-right {
            text-align: right;
        }
        .text-h6 {
            font-size: 10px;
        }
        .text-h5 {
            font-size: 12px;
        }
        .text-h4 {
            font-size: 14px;
        }
        .text-center {
            text-align: center;
        }
        .text-bold {
            font-weight: bold;
        }
        .table {
          width: 100%;
          border-collapse: collapse;
        }
    </style>
    <div>
      <div class="text-right text-h6">Fecha: ${k().format("DD/MM/YYYY HH:mm:ss")}</div>
      <div class="text-right text-h6">${G().user.name}</div>
      <div class="text-center text-bold">CONTROL SALAS</div>
      <div><span class="text-bold">Fecha</span> ${k(v).format("DD/MM/YYYY")} - ${k(h).format("DD/MM/YYYY")}</div>
      <div><span class="text-bold">Usuario:</span> ${b}</div>
      <div><span class="text-bold">Salas:</span> ${g}</div>
    </div>
    `;document.getElementById("myElement").innerHTML=m,new at.Printd().print(document.getElementById("myElement"))}static imprimirProductos(i,v,h,b,g){const c=i.productos,m=i.productosGaseosa,d=i.productosPipoca,t=i.productosFrape;let s='<div class="text-h5"><table class="table"><tr style="border-top: 1px solid black; border-bottom: 1px solid black;"><th>Nombre</th><th class="text-right">Precio</th><th class="text-right">Cantidad</th><th class="text-right">Total</th></tr>',u=0;c.forEach(r=>{s+=`
        <tr style="border-top: 1px solid black; border-bottom: 1px solid black;">
          <td>${r.nombre}</td>
          <td class="text-right">${parseInt(r.precio).toFixed(2)}</td>
          <td class="text-right">${r.cantidad_total}</td>
          <td class="text-right">${(parseInt(r.precio)*parseInt(r.cantidad_total)).toFixed(2)}</td>
        </tr>
      `,u+=parseInt(r.precio)*parseInt(r.cantidad_total)}),s+=`
      <tr style="border-top: 1px solid black; border-bottom: 1px solid black;">
        <td class="text-right"></td>
        <td class="text-right"></td>
        <td class="text-right text-bold">Total</td>
        <td class="text-right">${u.toFixed(2)}</td>
      </tr>
    `,s+="</table></div>";let f=0,y='<div class="text-h5"><table class="table"><tr style="border-top: 1px solid black; border-bottom: 1px solid black;"><th>Nombre</th><th class="text-right">Cantidad</th></tr>';m.forEach(r=>{y+=`
        <tr style="border-top: 1px solid black; border-bottom: 1px solid black;">
          <td>${r.nombre}</td>
          <td class="text-right">${r.cantidad_total}</td>
        </tr>
        `,f+=parseInt(r.cantidad_total)}),y+=`
      <tr style="border-top: 1px solid black; border-bottom: 1px solid black;">
        <td class="text-right"></td>
        <td class="text-right text-bold">Total</td>
        <td class="text-right text-bold">${f}</td>
      </tr>
    `,y+="</table></div>";let P=0,E='<div class="text-h5"><table class="table"><tr style="border-top: 1px solid black; border-bottom: 1px solid black;"><th>Nombre</th><th class="text-right">Cantidad</th></tr>';d.forEach(r=>{E+=`
        <tr style="border-top: 1px solid black; border-bottom: 1px solid black;">
          <td>${r.nombre}</td>
          <td class="text-right">${r.cantidad_total}</td>
        </tr>
        `,P+=parseInt(r.cantidad_total)}),E+=`
      <tr style="border-top: 1px solid black; border-bottom: 1px solid black;">
      <td class="text-right"></td>
      <td class="text-right text-bold">Total</td>
      <td class="text-right text-bold">${P}</td>
      </tr>
      `,E+="</table></div>";let x=0,Y='<div class="text-h5"><table class="table"><tr style="border-top: 1px solid black; border-bottom: 1px solid black;"><th>Nombre</th><th class="text-right">Cantidad</th></tr>';t.forEach(r=>{Y+=`
        <tr style="border-top: 1px solid black; border-bottom: 1px solid black;">
          <td>${r.nombre}</td>
          <td class="text-right">${r.cantidad_total}</td>
        </tr>
        `,x+=parseInt(r.cantidad_total)}),Y+=`
      <tr style="border-top: 1px solid black; border-bottom: 1px solid black;">
      <td class="text-right"></td>
      <td class="text-right text-bold">Total</td>
      <td class="text-right text-bold">${x}</td>
      </tr>
      `,Y+="</table></div>";const L=`
    <style>
        .text-right {
            text-align: right;
        }
        .text-h6 {
            font-size: 10px;
        }
        .text-h5 {
            font-size: 12px;
        }
        .text-h4 {
            font-size: 14px;
        }
        .text-center {
            text-align: center;
        }
        .text-bold {
            font-weight: bold;
        }
        .table {
          width: 100%;
          border-collapse: collapse;
        }
    </style>
    <div>
      <div class="text-right text-h6">Fecha: ${k().format("DD/MM/YYYY HH:mm:ss")}</div>
      <div class="text-right text-h6">${G().user.name}</div>
      <div class="text-center text-bold">CONTROL PRODUCTOS</div>
      <div><span class="text-bold">Fecha</span> ${k(v).format("DD/MM/YYYY")} - ${k(h).format("DD/MM/YYYY")}</div>
      <div><span class="text-bold">Usuario:</span> ${b}</div>
      <div>${s}</div>
      <div class="text-center">Gaseosas</div>
      <div>${y}</div>
      <div class="text-center">Pipocas</div>
      <div>${E}</div>
      <div class="text-center">Frape</div>
      <div>${Y}</div>
    </div>
    `;document.getElementById("myElement").innerHTML=L,new at.Printd().print(document.getElementById("myElement"))}static imprimirCaja(i,v,h,b){const g=i.cajas;let c="<table>";g.forEach(t=>{c+=`
      <div style="border: 1px solid black; padding: 5px;border-radius: 5px;">
        <div><span class="text-bold">Fecha Cierre:</span> ${k(t.fecha_cierre).format("DD/MM/YYYY HH:mm:ss")}</div>
<!--        <div><span class="text-bold">Total Reservas:</span> ${parseInt(t.monto_reserva).toFixed(2)}</div>-->
<!--        <div><span class="text-bold">Total Venta:</span> ${parseInt(t.monto_venta).toFixed(2)}</div>-->
<!--        <div><span class="text-bold">Monto Inicial:</span> ${parseInt(t.monto_inicial).toFixed(2)}</div>-->
        <div><span class="text-bold">Total:</span> ${parseInt(t.monto_caja).toFixed(2)}</div>
        <div><span class="text-bold">Monto Final:</span> ${parseInt(t.monto_final).toFixed(2)}</div>
<!--        <div><span class="text-bold">Monto Real:</span> ${parseInt(t.monto_real).toFixed(2)}</div>-->
        <div><span class="text-bold">Monto Diferencia:</span> ${parseInt(t.monto_diferencia).toFixed(2)}</div>
        <div><span class="text-bold">Observación:</span> ${t.observacion==null?"":t.observacion}</div>
      </div>
      `});const m=`
    <style>
        .text-right {
            text-align: right;
        }
        .text-h6 {
            font-size: 10px;
        }
        .text-h5 {
            font-size: 12px;
        }
        .text-h4 {
            font-size: 14px;
        }
        .text-center {
            text-align: center;
        }
        .text-bold {
            font-weight: bold;
        }
    </style>
    <div>
      <div class="text-right text-h6">Fecha: ${k(i.fecha).format("DD/MM/YYYY HH:mm:ss")}</div>
      <div class="text-right text-h6">${G().user.name}</div>
      <div class="text-center text-bold">CONTROL CAJA</div>
      <div><span class="text-bold">Fecha</span> ${k(v).format("DD/MM/YYYY")} - ${k(h).format("DD/MM/YYYY")}</div>
      <div><span class="text-bold">Usuario:</span> ${b}</div>
      <div><span class="text-bold">Total Ventas:</span> ${parseInt(i.ventas).toFixed(2)}</div>
      <div><span class="text-bold">Total Reservas:</span> ${parseInt(i.reservas).toFixed(2)}</div>
      <div><span class="text-bold">Total:</span> ${(parseInt(i.ventas)+parseInt(i.reservas)).toFixed(2)}</div>
      <div>
      <span class="text-bold">Cajas:</span>
      <div>
      ${c}
      </div>
      </div>
    </div>
    `;document.getElementById("myElement").innerHTML=m,new at.Printd().print(document.getElementById("myElement"))}static numeroALetras(i){if(i=parseInt(i),isNaN(i)||i<0||i>1e6)return"Número fuera de rango";const v=["cero","uno","dos","tres","cuatro","cinco","seis","siete","ocho","nueve"],h=["","","veinte","treinta","cuarenta","cincuenta","sesenta","setenta","ochenta","noventa"],b={10:"diez",11:"once",12:"doce",13:"trece",14:"catorce",15:"quince",16:"dieciséis",17:"diecisiete",18:"dieciocho",19:"diecinueve"},g=["","cien","doscientos","trescientos","cuatrocientos","quinientos","seiscientos","setecientos","ochocientos","novecientos"];function c(u){if(u<10)return v[u];if(u>=10&&u<20)return b[u];if(u<100){const y=u%10;return`${h[Math.floor(u/10)]}${y>0?" y "+v[y]:""}`}if(u===100)return"cien";const f=u%100;return`${g[Math.floor(u/100)]}${f>0?" "+c(f):""}`}if(i===1e6)return"un millón";let m=Math.floor(i/1e3),d=i%1e3,t=m>0?m===1?"mil":`${c(m)} mil`:"",s=d>0?c(d):"";return(t+" "+s).trim()}}const bt={class:"row"},xt={class:"col-12 col-md-2"},gt={class:"col-12 col-md-2"},yt={class:"col-12 col-md-2"},_t={class:"col-12 col-md-2 flex flex-center"},$t={class:"col-12 col-md-2"},Ct={class:"col-12 col-md-2 flex flex-center"},kt={class:"col-12 col-md-4"},Ft={class:"col-12 col-md-2 flex flex-center"},Et={class:"col-12 col-md-2 flex flex-center"},Yt={class:"row"},wt={class:"col-12 col-md-4 q-pa-xs"},At={class:"text-weight-bold"},It={class:"col-12 col-md-4 q-pa-xs"},Tt={class:"text-weight-bold"},Pt={class:"col-12 col-md-4 q-pa-xs"},Lt={class:"text-weight-bold"},Dt={key:1},Mt={style:{"max-width":"200px","wrap-option":"wrap"}},qt={__name:"Ventas",setup(B){const{proxy:i}=dt(),v=_(k().format("YYYY-MM-DD")),h=_(k().format("YYYY-MM-DD")),b=_([]),g=_([]),c=_(!1),m=_(""),d=_([]),t=_(""),s=_("CAJA"),u=_(!1),f=_({}),y=_([]),P=_(["CAJA","PRODUCTOS","SALA"]);nt(()=>{q(),S(),E()});function E(){i.$axios.get("/productos").then(p=>{y.value=p.data})}function x(){if(!t.value&&s.value!=="PRODUCTOS"){i.$alert.error("Seleccione un usuario","Por favor");return}if(c.value=!0,s.value==="PRODUCTOS"&&t.value===""){const p=d.value.filter(e=>e.id!=="").map(e=>i.$axios.post("/ventas/imprimir",{user_id:e.id,fechaInicio:v.value,fechaFin:h.value,reporte:s.value}).then(a=>({data:a.data,usuario:e.name})));Promise.all(p).then(e=>{let a={productos:[],productosCombo:[],productosGaseosa:[],productosPipoca:[],productosFrape:[]};e.forEach(({data:U})=>{["productos","productosCombo","productosGaseosa","productosPipoca","productosFrape"].forEach(w=>{U[w]&&(a[w]=a[w].concat(U[w]))})});const F=U=>{const w={};return U.forEach(j=>{const H=j.nombre;w[H]?w[H].cantidad_total+=j.cantidad_total:w[H]={...j}}),Object.values(w)};a.productos=F(a.productos),a.productosCombo=F(a.productosCombo),a.productosGaseosa=F(a.productosGaseosa),a.productosPipoca=F(a.productosPipoca),a.productosFrape=F(a.productosFrape),z.imprimirProductos(a,v.value,h.value,"Todos",y.value)}).finally(()=>{c.value=!1})}else{const p=d.value.find(e=>e.id===t.value);i.$axios.post("/ventas/imprimir",{user_id:t.value,fechaInicio:v.value,fechaFin:h.value,reporte:s.value}).then(e=>{s.value==="CAJA"&&z.imprimirCaja(e.data,v.value,h.value,p.name),s.value==="PRODUCTOS"&&z.imprimirProductos(e.data,v.value,h.value,p.name,y.value),s.value==="SALA"&&z.imprimirSalas(e.data,v.value,h.value,p.name)}).finally(()=>{c.value=!1})}}function Y(){u.value=!0,f.value={monto_inicial:0,monto_final:0,observacion:""}}function L(){c.value=!0,i.$axios.post("/cajas",f.value).then(p=>{u.value=!1,i.$alert.success("Registrado correctamente",p.data)}).finally(()=>{c.value=!1})}function V(){b.value=g.value.filter(p=>p.nombre.toLowerCase().includes(m.value.toLowerCase())||p.user?.name.toLowerCase().includes(m.value.toLowerCase())||p.detalleText.toLowerCase().includes(m.value.toLowerCase()))}function r(p){i.$q.dialog({title:"Anular Venta",message:"¿Está seguro de anular la venta?",ok:"Sí",cancel:"No"}).onOk(()=>{c.value=!0,i.$axios.put(`/ventas/${p}/anular`).then(()=>{q()}).finally(()=>{c.value=!1})})}function S(){d.value=[{id:"",name:"Todos"}],i.$axios.get("/usersSucursal").then(p=>{p.data.forEach(e=>{d.value.push({id:e.id,name:e.name})})})}function q(){c.value=!0,i.$axios.get("/ventas",{params:{fechaInicio:v.value,fechaFin:h.value,user_id:t.value}}).then(p=>{b.value=p.data,g.value=p.data}).finally(()=>{c.value=!1})}return(p,e)=>($(),Q(st,null,[o(ft,{class:"q-pa-xs"},{default:n(()=>[o(J,{flat:"",bordered:""},{default:n(()=>[o(N,{class:"q-pa-xs"},{default:n(()=>[o(it,{onSubmit:ot(q,["prevent"])},{default:n(()=>[l("div",bt,[l("div",xt,[o(O,{modelValue:v.value,"onUpdate:modelValue":e[0]||(e[0]=a=>v.value=a),label:"Fecha Inicio",type:"date",outlined:"",dense:""},null,8,["modelValue"])]),l("div",gt,[o(O,{modelValue:h.value,"onUpdate:modelValue":e[1]||(e[1]=a=>h.value=a),label:"Fecha Fin",type:"date",outlined:"",dense:""},null,8,["modelValue"])]),l("div",yt,[p.$store.user.role==="Admin"?($(),I(lt,{key:0,modelValue:t.value,"onUpdate:modelValue":e[2]||(e[2]=a=>t.value=a),label:"Usuario",outlined:"",dense:"",options:d.value,"option-label":"name","option-value":"id","emit-value":"","map-options":""},null,8,["modelValue","options"])):R("",!0)]),l("div",_t,[o(T,{style:{width:"150px"},label:"Buscar",color:"primary",type:"submit",icon:"search","no-caps":"",loading:c.value},null,8,["loading"])]),l("div",$t,[p.$store.user.role==="Admin"?($(),I(lt,{key:0,modelValue:s.value,"onUpdate:modelValue":e[3]||(e[3]=a=>s.value=a),label:"Tipo Reporte",outlined:"",dense:"",options:P.value},null,8,["modelValue","options"])):R("",!0)]),l("div",Ct,[p.$store.user.role==="Admin"?($(),I(T,{key:0,style:{width:"150px"},label:"Imprimir",color:"indigo",icon:"print","no-caps":"",loading:c.value,onClick:x},null,8,["loading"])):R("",!0)]),e[10]||(e[10]=l("div",{class:"col-12 col-md-12 flex flex-center"},null,-1)),l("div",kt,[o(O,{modelValue:m.value,"onUpdate:modelValue":[e[4]||(e[4]=a=>m.value=a),V],label:"Filtro",outlined:"",dense:""},null,8,["modelValue"])]),l("div",Ft,[o(T,{style:{width:"150px"},label:"Venta",color:"positive",onClick:e[5]||(e[5]=a=>p.$router.push("/ventas/add")),"no-caps":"",icon:"add_circle_outline",loading:c.value},null,8,["loading"])]),e[11]||(e[11]=l("div",{class:"col-12 col-md-4 flex flex-center"},null,-1)),l("div",Et,[o(T,{style:{width:"150px"},label:"Cerrar Caja",color:"red",onClick:Y,"no-caps":"",icon:"point_of_sale",loading:c.value},null,8,["loading"])])])]),_:1}),l("div",Yt,[l("div",wt,[o(tt,{bordered:"",padding:"",dense:""},{default:n(()=>[Z(($(),I(et,{clickable:""},{default:n(()=>[o(D,{avatar:""},{default:n(()=>[o(K,{color:"indigo","text-color":"white",icon:"event"})]),_:1}),o(D,null,{default:n(()=>[o(M,{lines:"1"},{default:n(()=>[l("span",At,A(b.value.length)+" ventas ",1)]),_:1}),o(M,{caption:"",lines:"2"},{default:n(()=>e[12]||(e[12]=[W(" Cantida de ventas ")])),_:1})]),_:1})]),_:1})),[[X]])]),_:1})]),l("div",It,[p.$store.user.role==="Admin"?($(),I(tt,{key:0,bordered:"",padding:"",dense:""},{default:n(()=>[Z(($(),I(et,{clickable:""},{default:n(()=>[o(D,{avatar:""},{default:n(()=>[o(K,{color:"green","text-color":"white",icon:"attach_money"})]),_:1}),o(D,null,{default:n(()=>[o(M,{lines:"1"},{default:n(()=>[l("span",Tt," Bs "+A(b.value.filter(a=>!a.anulada).reduce((a,F)=>a+parseFloat(F.total),0).toFixed(2)),1)]),_:1}),o(M,{caption:"",lines:"2"},{default:n(()=>e[13]||(e[13]=[W(" Total de ventas ")])),_:1})]),_:1})]),_:1})),[[X]])]),_:1})):R("",!0)]),l("div",Pt,[o(tt,{bordered:"",padding:"",dense:""},{default:n(()=>[Z(($(),I(et,{clickable:""},{default:n(()=>[o(D,{avatar:""},{default:n(()=>[o(K,{color:"red","text-color":"white",icon:"cancel"})]),_:1}),o(D,null,{default:n(()=>[o(M,{lines:"1"},{default:n(()=>[l("span",Lt," Bs "+A(b.value.filter(a=>a.anulada).reduce((a,F)=>a+parseFloat(F.total),0).toFixed(2)),1)]),_:1}),o(M,{caption:"",lines:"2"},{default:n(()=>e[14]||(e[14]=[W(" Total de reservas canceladas ")])),_:1})]),_:1})]),_:1})),[[X]])]),_:1})])])]),_:1})]),_:1}),o(J,{flat:"",bordered:"",class:"q-mt-md"},{default:n(()=>[o(N,null,{default:n(()=>[o(vt,{"wrap-cells":"",dense:"",flat:"",bordered:""},{default:n(()=>[e[15]||(e[15]=l("thead",null,[l("tr",null,[l("th",null,"Acciones"),l("th",null,"Fecha"),l("th",null,"Total"),l("th",null,"Nombre Cliente"),l("th",null,"Usuario"),l("th",null,"Detalle"),l("th",null,"Agencia")])],-1)),l("tbody",null,[($(!0),Q(st,null,ct(b.value,a=>($(),Q("tr",{key:a.id},[l("td",null,[a.anulada?($(),Q("div",Dt,[o(pt,{color:"red","text-color":"white",label:"Anulada"})])):($(),I(T,{key:0,style:{width:"80px"},icon:"remove_circle_outline",color:"negative",dense:"",onClick:F=>r(a.id),label:"Anular","no-caps":"",size:"10px"},null,8,["onClick"]))]),l("td",null,A(a.fecha),1),l("td",null,A(a.total),1),l("td",null,A(a.nombre),1),l("td",null,A(a.user?.name),1),l("td",null,[l("div",Mt,A(a.detalleText),1)]),l("td",null,A(a.agencia),1)]))),128))])]),_:1})]),_:1})]),_:1})]),_:1}),o(ut,{modelValue:u.value,"onUpdate:modelValue":e[9]||(e[9]=a=>u.value=a),persistent:""},{default:n(()=>[o(J,{flat:"",bordered:"",style:{width:"350px"}},{default:n(()=>[o(N,{class:"row items-center q-pb-none"},{default:n(()=>[e[16]||(e[16]=l("div",{class:"text-bold"}," Cerrar Caja ",-1)),o(ht),o(T,{flat:"",dense:"",icon:"close",onClick:e[6]||(e[6]=a=>u.value=!1)})]),_:1}),o(N,null,{default:n(()=>[o(it,{onSubmit:ot(L,["prevent"])},{default:n(()=>[o(O,{modelValue:f.value.monto_final,"onUpdate:modelValue":e[7]||(e[7]=a=>f.value.monto_final=a),label:"Monto Final",type:"number",outlined:"",dense:"",hint:""},null,8,["modelValue"]),o(O,{type:"textarea",modelValue:f.value.observacion,"onUpdate:modelValue":e[8]||(e[8]=a=>f.value.observacion=a),label:"Observación",outlined:"",dense:"",hint:""},null,8,["modelValue"]),o(T,{label:"Cerrar Caja",color:"red",type:"submit",loading:c.value,"no-caps":"",icon:"point_of_sale",class:"q-mt-md"},null,8,["loading"])]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),e[17]||(e[17]=l("div",{id:"myElement"},null,-1))],64))}};export{qt as default};
