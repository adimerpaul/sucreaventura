import{s as G,g as ct,r as $,l as ut,a4 as N,o as _,a as o,b as s,w as c,Q as J,e as R,aD as lt,ai as U,c as E,a3 as L,f as P,Z,a2 as K,t as T,a0 as W,a1 as X,a5 as it,a6 as pt,h as vt}from"./index-BoXKdRxj.js";import{Q as tt}from"./QSelect-BqBz2-c-.js";import{Q as rt}from"./QForm-D0_oIC2-.js";import{d as et,Q as at,a as M,b as V,c as ft}from"./QList-g_NaNXXp.js";import{Q as mt}from"./QMarkupTable-B0npqxwF.js";import{Q as ht}from"./QPage-QwcOkhvp.js";import{Q as bt}from"./QSpace-DmEhkjNj.js";import{h as k}from"./moment-C5S46NFB.js";import"./format-DVVh6w9X.js";var C={},dt;function xt(){if(dt)return C;dt=1,Object.defineProperty(C,"__esModule",{value:!0}),C.Printd=C.createIFrame=C.createLinkStyle=C.createStyle=void 0;var z=/^(((http[s]?)|file):)?(\/\/)+([0-9a-zA-Z-_.=?&].+)$/,l=/^((\.|\.\.)?\/)([0-9a-zA-Z-_.=?&]+\/)*([0-9a-zA-Z-_.=?&]+)$/,v=function(d){return z.test(d)||l.test(d)};function f(d,e){var i=d.createElement("style");return i.appendChild(d.createTextNode(e)),i}C.createStyle=f;function b(d,e){var i=d.createElement("link");return i.type="text/css",i.rel="stylesheet",i.href=e,i}C.createLinkStyle=b;function y(d){var e=window.document.createElement("iframe");return e.setAttribute("src","about:blank"),e.setAttribute("style","visibility:hidden;width:0;height:0;position:absolute;z-index:-9999;bottom:0;"),e.setAttribute("width","0"),e.setAttribute("height","0"),e.setAttribute("wmode","opaque"),d.appendChild(e),e}C.createIFrame=y;var u={parent:window.document.body,headElements:[],bodyElements:[]},h=function(){function d(e){this.isLoading=!1,this.hasEvents=!1,this.opts=[u,e||{}].reduce(function(i,n){return Object.keys(n).forEach(function(m){return i[m]=n[m]}),i},{}),this.iframe=y(this.opts.parent)}return d.prototype.getIFrame=function(){return this.iframe},d.prototype.print=function(e,i,n,m){if(!this.isLoading){var x=this.iframe,I=x.contentDocument,A=x.contentWindow;if(!(!I||!A)&&(this.iframe.src="about:blank",this.elCopy=e.cloneNode(!0),!!this.elCopy)){this.isLoading=!0,this.callback=m;var g=A.document;g.open(),g.write('<!DOCTYPE html><html><head><meta charset="utf-8"></head><body></body></html>'),this.addEvents();var Y=this.opts,D=Y.headElements,S=Y.bodyElements;Array.isArray(D)&&D.forEach(function(r){return g.head.appendChild(r)}),Array.isArray(S)&&S.forEach(function(r){return g.body.appendChild(r)}),Array.isArray(i)&&i.forEach(function(r){r&&g.head.appendChild(v(r)?b(g,r):f(g,r))}),g.body.appendChild(this.elCopy),Array.isArray(n)&&n.forEach(function(r){if(r){var O=g.createElement("script");v(r)?O.src=r:O.innerText=r,g.body.appendChild(O)}}),g.close()}}},d.prototype.printURL=function(e,i){this.isLoading||(this.addEvents(),this.isLoading=!0,this.callback=i,this.iframe.src=e)},d.prototype.onBeforePrint=function(e){this.onbeforeprint=e},d.prototype.onAfterPrint=function(e){this.onafterprint=e},d.prototype.launchPrint=function(e){this.isLoading||e.print()},d.prototype.addEvents=function(){var e=this;if(!this.hasEvents){this.hasEvents=!0,this.iframe.addEventListener("load",function(){return e.onLoad()},!1);var i=this.iframe.contentWindow;i&&(this.onbeforeprint&&i.addEventListener("beforeprint",this.onbeforeprint),this.onafterprint&&i.addEventListener("afterprint",this.onafterprint))}},d.prototype.onLoad=function(){var e=this;if(this.iframe){this.isLoading=!1;var i=this.iframe,n=i.contentDocument,m=i.contentWindow;if(!n||!m)return;typeof this.callback=="function"?this.callback({iframe:this.iframe,element:this.elCopy,launchPrint:function(){return e.launchPrint(m)}}):this.launchPrint(m)}},d}();return C.Printd=h,C.default=h,C}var ot=xt();class q{static imprimirSalas(l,v,f,b){let y='<table class="table">',u=0;l.forEach(e=>{y+=`
        <tr style="border-top: 1px solid black; border-bottom: 1px solid black;">
          <td>${e.nombre}</td>
          <td>${e.sala}</td>
          <td>${e.horario}</td>
          <td>${e.estado}</td>
          <td class="text-right">${e.total}</td>
        </tr>
      `,u+=parseInt(e.total)}),y+=`
      <tr style="border-top: 1px solid black; border-bottom: 1px solid black;">
        <td class="text-right"></td>
        <td class="text-right"></td>
        <td class="text-right"></td>
        <td class="text-right text-bold">Total</td>
        <td class="text-right">${u.toFixed(2)}</td>
      </tr>
    `,y+="</table>";const h=`
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
      <div><span class="text-bold">Fecha</span> ${k(v).format("DD/MM/YYYY")} - ${k(f).format("DD/MM/YYYY")}</div>
      <div><span class="text-bold">Usuario:</span> ${b}</div>
      <div><span class="text-bold">Salas:</span> ${y}</div>
    </div>
    `;document.getElementById("myElement").innerHTML=h,new ot.Printd().print(document.getElementById("myElement"))}static imprimirProductos(l,v,f,b,y){const u=l.productos,h=l.productosGaseosa,d=l.productosPipoca,e=l.productosFrape;let i='<div class="text-h5"><table class="table"><tr style="border-top: 1px solid black; border-bottom: 1px solid black;"><th>Nombre</th><th class="text-right">Precio</th><th class="text-right">Cantidad</th><th class="text-right">Total</th></tr>',n=0;u.forEach(r=>{i+=`
        <tr style="border-top: 1px solid black; border-bottom: 1px solid black;">
          <td>${r.nombre}</td>
          <td class="text-right">${parseInt(r.precio).toFixed(2)}</td>
          <td class="text-right">${r.cantidad_total}</td>
          <td class="text-right">${(parseInt(r.precio)*parseInt(r.cantidad_total)).toFixed(2)}</td>
        </tr>
      `,n+=parseInt(r.precio)*parseInt(r.cantidad_total)}),i+=`
      <tr style="border-top: 1px solid black; border-bottom: 1px solid black;">
        <td class="text-right"></td>
        <td class="text-right"></td>
        <td class="text-right text-bold">Total</td>
        <td class="text-right">${n.toFixed(2)}</td>
      </tr>
    `,i+="</table></div>";let m=0,x='<div class="text-h5"><table class="table"><tr style="border-top: 1px solid black; border-bottom: 1px solid black;"><th>Nombre</th><th class="text-right">Cantidad</th></tr>';h.forEach(r=>{x+=`
        <tr style="border-top: 1px solid black; border-bottom: 1px solid black;">
          <td>${r.nombre}</td>
          <td class="text-right">${r.cantidad_total}</td>
        </tr>
        `,m+=parseInt(r.cantidad_total)}),x+=`
      <tr style="border-top: 1px solid black; border-bottom: 1px solid black;">
        <td class="text-right"></td>
        <td class="text-right text-bold">Total</td>
        <td class="text-right text-bold">${m}</td>
      </tr>
    `,x+="</table></div>";let I=0,A='<div class="text-h5"><table class="table"><tr style="border-top: 1px solid black; border-bottom: 1px solid black;"><th>Nombre</th><th class="text-right">Cantidad</th></tr>';d.forEach(r=>{A+=`
        <tr style="border-top: 1px solid black; border-bottom: 1px solid black;">
          <td>${r.nombre}</td>
          <td class="text-right">${r.cantidad_total}</td>
        </tr>
        `,I+=parseInt(r.cantidad_total)}),A+=`
      <tr style="border-top: 1px solid black; border-bottom: 1px solid black;">
      <td class="text-right"></td>
      <td class="text-right text-bold">Total</td>
      <td class="text-right text-bold">${I}</td>
      </tr>
      `,A+="</table></div>";let g=0,Y='<div class="text-h5"><table class="table"><tr style="border-top: 1px solid black; border-bottom: 1px solid black;"><th>Nombre</th><th class="text-right">Cantidad</th></tr>';e.forEach(r=>{Y+=`
        <tr style="border-top: 1px solid black; border-bottom: 1px solid black;">
          <td>${r.nombre}</td>
          <td class="text-right">${r.cantidad_total}</td>
        </tr>
        `,g+=parseInt(r.cantidad_total)}),Y+=`
      <tr style="border-top: 1px solid black; border-bottom: 1px solid black;">
      <td class="text-right"></td>
      <td class="text-right text-bold">Total</td>
      <td class="text-right text-bold">${g}</td>
      </tr>
      `,Y+="</table></div>";const D=`
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
      <div><span class="text-bold">Fecha</span> ${k(v).format("DD/MM/YYYY")} - ${k(f).format("DD/MM/YYYY")}</div>
      <div><span class="text-bold">Usuario:</span> ${b}</div>
      <div>${i}</div>
      <div class="text-center">Gaseosas</div>
      <div>${x}</div>
      <div class="text-center">Pipocas</div>
      <div>${A}</div>
      <div class="text-center">Frape</div>
      <div>${Y}</div>
    </div>
    `;document.getElementById("myElement").innerHTML=D,new ot.Printd().print(document.getElementById("myElement"))}static imprimirCaja(l,v,f,b){const y=l.cajas;let u="<table>";y.forEach(e=>{u+=`
      <div style="border: 1px solid black; padding: 5px;border-radius: 5px;">
        <div><span class="text-bold">Fecha Cierre:</span> ${k(e.fecha_cierre).format("DD/MM/YYYY HH:mm:ss")}</div>
<!--        <div><span class="text-bold">Total Reservas:</span> ${parseInt(e.monto_reserva).toFixed(2)}</div>-->
<!--        <div><span class="text-bold">Total Venta:</span> ${parseInt(e.monto_venta).toFixed(2)}</div>-->
<!--        <div><span class="text-bold">Monto Inicial:</span> ${parseInt(e.monto_inicial).toFixed(2)}</div>-->
        <div><span class="text-bold">Total:</span> ${parseInt(e.monto_caja).toFixed(2)}</div>
        <div><span class="text-bold">Monto Final:</span> ${parseInt(e.monto_final).toFixed(2)}</div>
<!--        <div><span class="text-bold">Monto Real:</span> ${parseInt(e.monto_real).toFixed(2)}</div>-->
        <div><span class="text-bold">Monto Diferencia:</span> ${parseInt(e.monto_diferencia).toFixed(2)}</div>
        <div><span class="text-bold">Observación:</span> ${e.observacion==null?"":e.observacion}</div>
      </div>
      `});const h=`
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
      <div class="text-right text-h6">Fecha: ${k(l.fecha).format("DD/MM/YYYY HH:mm:ss")}</div>
      <div class="text-right text-h6">${G().user.name}</div>
      <div class="text-center text-bold">CONTROL CAJA</div>
      <div><span class="text-bold">Fecha</span> ${k(v).format("DD/MM/YYYY")} - ${k(f).format("DD/MM/YYYY")}</div>
      <div><span class="text-bold">Usuario:</span> ${b}</div>
      <div><span class="text-bold">Total Ventas:</span> ${parseInt(l.ventas).toFixed(2)}</div>
      <div><span class="text-bold">Total Reservas:</span> ${parseInt(l.reservas).toFixed(2)}</div>
      <div><span class="text-bold">Total:</span> ${(parseInt(l.ventas)+parseInt(l.reservas)).toFixed(2)}</div>
      <div>
      <span class="text-bold">Cajas:</span>
      <div>
      ${u}
      </div>
      </div>
    </div>
    `;document.getElementById("myElement").innerHTML=h,new ot.Printd().print(document.getElementById("myElement"))}static numeroALetras(l){if(l=parseInt(l),isNaN(l)||l<0||l>1e6)return"Número fuera de rango";const v=["cero","uno","dos","tres","cuatro","cinco","seis","siete","ocho","nueve"],f=["","","veinte","treinta","cuarenta","cincuenta","sesenta","setenta","ochenta","noventa"],b={10:"diez",11:"once",12:"doce",13:"trece",14:"catorce",15:"quince",16:"dieciséis",17:"diecisiete",18:"dieciocho",19:"diecinueve"},y=["","cien","doscientos","trescientos","cuatrocientos","quinientos","seiscientos","setecientos","ochocientos","novecientos"];function u(n){if(n<10)return v[n];if(n>=10&&n<20)return b[n];if(n<100){const x=n%10;return`${f[Math.floor(n/10)]}${x>0?" y "+v[x]:""}`}if(n===100)return"cien";const m=n%100;return`${y[Math.floor(n/100)]}${m>0?" "+u(m):""}`}if(l===1e6)return"un millón";let h=Math.floor(l/1e3),d=l%1e3,e=h>0?h===1?"mil":`${u(h)} mil`:"",i=d>0?u(d):"";return(e+" "+i).trim()}}const gt={class:"row"},yt={class:"col-12 col-md-2"},$t={class:"col-12 col-md-2"},_t={class:"col-12 col-md-2"},Ct={class:"col-12 col-md-2"},kt={class:"col-12 col-md-2 flex flex-center"},Ft={class:"col-12 col-md-2"},Et={class:"col-12 col-md-2 flex flex-center"},At={class:"col-12 col-md-4"},Yt={class:"col-12 col-md-2 flex flex-center"},wt={class:"col-12 col-md-2 flex flex-center"},Tt={class:"row"},It={class:"col-12 col-md-4 q-pa-xs"},Pt={class:"text-weight-bold"},Dt={class:"col-12 col-md-4 q-pa-xs"},Lt={class:"text-weight-bold"},Mt={class:"col-12 col-md-4 q-pa-xs"},Vt={class:"text-weight-bold"},St={key:1},Ot={style:{"max-width":"200px","wrap-option":"wrap"}},Gt={__name:"Ventas",setup(z){const{proxy:l}=ct(),v=$(k().format("YYYY-MM-DD")),f=$(k().format("YYYY-MM-DD")),b=$([]),y=$([]),u=$(!1),h=$(""),d=$([]),e=$(""),i=$("Todo"),n=$("CAJA"),m=$(!1),x=$({}),I=$([]),A=$(["CAJA","PRODUCTOS","SALA"]);ut(()=>{B(),st(),g()});function g(){const p=JSON.parse(localStorage.getItem("user")||"{}"),a=l.$store.user?.sucursal||p?.sucursal||"Central";l.$axios.get("/productos",{params:{agencia:a}}).then(t=>{I.value=t.data})}function Y(){if(!e.value&&n.value!=="PRODUCTOS"){l.$alert.error("Seleccione un usuario","Por favor");return}if(u.value=!0,n.value==="PRODUCTOS"&&e.value===""){const p=d.value.filter(a=>a.id!=="").map(a=>l.$axios.post("/ventas/imprimir",{user_id:a.id,fechaInicio:v.value,fechaFin:f.value,reporte:n.value}).then(t=>({data:t.data,usuario:a.name})));Promise.all(p).then(a=>{let t={productos:[],productosCombo:[],productosGaseosa:[],productosPipoca:[],productosFrape:[]};a.forEach(({data:Q})=>{["productos","productosCombo","productosGaseosa","productosPipoca","productosFrape"].forEach(w=>{Q[w]&&(t[w]=t[w].concat(Q[w]))})});const F=Q=>{const w={};return Q.forEach(j=>{const H=j.nombre;w[H]?w[H].cantidad_total+=j.cantidad_total:w[H]={...j}}),Object.values(w)};t.productos=F(t.productos),t.productosCombo=F(t.productosCombo),t.productosGaseosa=F(t.productosGaseosa),t.productosPipoca=F(t.productosPipoca),t.productosFrape=F(t.productosFrape),q.imprimirProductos(t,v.value,f.value,"Todos",I.value)}).finally(()=>{u.value=!1})}else{const p=d.value.find(a=>a.id===e.value);l.$axios.post("/ventas/imprimir",{user_id:e.value,fechaInicio:v.value,fechaFin:f.value,reporte:n.value}).then(a=>{n.value==="CAJA"&&q.imprimirCaja(a.data,v.value,f.value,p.name),n.value==="PRODUCTOS"&&q.imprimirProductos(a.data,v.value,f.value,p.name,I.value),n.value==="SALA"&&q.imprimirSalas(a.data,v.value,f.value,p.name)}).finally(()=>{u.value=!1})}}function D(){m.value=!0,x.value={monto_inicial:0,monto_final:0,observacion:""}}function S(){u.value=!0,l.$axios.post("/cajas",x.value).then(p=>{m.value=!1,l.$alert.success("Registrado correctamente",p.data)}).finally(()=>{u.value=!1})}function r(){b.value=y.value.filter(p=>p.nombre.toLowerCase().includes(h.value.toLowerCase())||p.user?.name.toLowerCase().includes(h.value.toLowerCase())||p.detalleText.toLowerCase().includes(h.value.toLowerCase()))}function O(p){l.$q.dialog({title:"Anular Venta",message:"¿Está seguro de anular la venta?",ok:"Sí",cancel:"No"}).onOk(()=>{u.value=!0,l.$axios.put(`/ventas/${p}/anular`).then(()=>{B()}).finally(()=>{u.value=!1})})}function st(){d.value=[{id:"",name:"Todos"}];const p=l.$store.user.role==="Admin"?"/users":"/usersSucursal";l.$axios.get(p).then(a=>{a.data.forEach(t=>{l.$store.user.role==="Admin"&&i.value!=="Todo"&&t.sucursal!==i.value||d.value.push({id:t.id,name:t.name})})})}function nt(){e.value="",st()}function B(){u.value=!0,l.$axios.get("/ventas",{params:{fechaInicio:v.value,fechaFin:f.value,user_id:e.value,agencia:i.value}}).then(p=>{b.value=p.data,y.value=p.data}).finally(()=>{u.value=!1})}return(p,a)=>(_(),N(it,null,[o(ht,{class:"q-pa-xs"},{default:c(()=>[o(J,{flat:"",bordered:""},{default:c(()=>[o(R,{class:"q-pa-xs"},{default:c(()=>[o(rt,{onSubmit:lt(B,["prevent"])},{default:c(()=>[s("div",gt,[s("div",yt,[o(U,{modelValue:v.value,"onUpdate:modelValue":a[0]||(a[0]=t=>v.value=t),label:"Fecha Inicio",type:"date",outlined:"",dense:""},null,8,["modelValue"])]),s("div",$t,[o(U,{modelValue:f.value,"onUpdate:modelValue":a[1]||(a[1]=t=>f.value=t),label:"Fecha Fin",type:"date",outlined:"",dense:""},null,8,["modelValue"])]),s("div",_t,[p.$store.user.role==="Admin"?(_(),E(tt,{key:0,modelValue:e.value,"onUpdate:modelValue":a[2]||(a[2]=t=>e.value=t),label:"Usuario",outlined:"",dense:"",options:d.value,"option-label":"name","option-value":"id","emit-value":"","map-options":""},null,8,["modelValue","options"])):L("",!0)]),s("div",Ct,[p.$store.user.role==="Admin"?(_(),E(tt,{key:0,modelValue:i.value,"onUpdate:modelValue":[a[3]||(a[3]=t=>i.value=t),nt],label:"Agencia",outlined:"",dense:"",options:["Todo","Central","Ricardo"]},null,8,["modelValue"])):L("",!0)]),s("div",kt,[o(P,{style:{width:"150px"},label:"Buscar",color:"primary",type:"submit",icon:"search","no-caps":"",loading:u.value},null,8,["loading"])]),s("div",Ft,[p.$store.user.role==="Admin"?(_(),E(tt,{key:0,modelValue:n.value,"onUpdate:modelValue":a[4]||(a[4]=t=>n.value=t),label:"Tipo Reporte",outlined:"",dense:"",options:A.value},null,8,["modelValue","options"])):L("",!0)]),s("div",Et,[p.$store.user.role==="Admin"?(_(),E(P,{key:0,style:{width:"150px"},label:"Imprimir",color:"indigo",icon:"print","no-caps":"",loading:u.value,onClick:Y},null,8,["loading"])):L("",!0)]),a[11]||(a[11]=s("div",{class:"col-12 col-md-12 flex flex-center"},null,-1)),s("div",At,[o(U,{modelValue:h.value,"onUpdate:modelValue":[a[5]||(a[5]=t=>h.value=t),r],label:"Filtro",outlined:"",dense:""},null,8,["modelValue"])]),s("div",Yt,[o(P,{style:{width:"150px"},label:"Venta",color:"positive",onClick:a[6]||(a[6]=t=>p.$router.push("/ventas/add")),"no-caps":"",icon:"add_circle_outline",loading:u.value},null,8,["loading"])]),a[12]||(a[12]=s("div",{class:"col-12 col-md-4 flex flex-center"},null,-1)),s("div",wt,[o(P,{style:{width:"150px"},label:"Cerrar Caja",color:"red",onClick:D,"no-caps":"",icon:"point_of_sale",loading:u.value},null,8,["loading"])])])]),_:1}),s("div",Tt,[s("div",It,[o(et,{bordered:"",padding:"",dense:""},{default:c(()=>[Z((_(),E(at,{clickable:""},{default:c(()=>[o(M,{avatar:""},{default:c(()=>[o(K,{color:"indigo","text-color":"white",icon:"event"})]),_:1}),o(M,null,{default:c(()=>[o(V,{lines:"1"},{default:c(()=>[s("span",Pt,T(b.value.length)+" ventas ",1)]),_:1}),o(V,{caption:"",lines:"2"},{default:c(()=>a[13]||(a[13]=[W(" Cantida de ventas ")])),_:1})]),_:1})]),_:1})),[[X]])]),_:1})]),s("div",Dt,[p.$store.user.role==="Admin"?(_(),E(et,{key:0,bordered:"",padding:"",dense:""},{default:c(()=>[Z((_(),E(at,{clickable:""},{default:c(()=>[o(M,{avatar:""},{default:c(()=>[o(K,{color:"green","text-color":"white",icon:"attach_money"})]),_:1}),o(M,null,{default:c(()=>[o(V,{lines:"1"},{default:c(()=>[s("span",Lt," Bs "+T(b.value.filter(t=>!t.anulada).reduce((t,F)=>t+parseFloat(F.total),0).toFixed(2)),1)]),_:1}),o(V,{caption:"",lines:"2"},{default:c(()=>a[14]||(a[14]=[W(" Total de ventas ")])),_:1})]),_:1})]),_:1})),[[X]])]),_:1})):L("",!0)]),s("div",Mt,[o(et,{bordered:"",padding:"",dense:""},{default:c(()=>[Z((_(),E(at,{clickable:""},{default:c(()=>[o(M,{avatar:""},{default:c(()=>[o(K,{color:"red","text-color":"white",icon:"cancel"})]),_:1}),o(M,null,{default:c(()=>[o(V,{lines:"1"},{default:c(()=>[s("span",Vt," Bs "+T(b.value.filter(t=>t.anulada).reduce((t,F)=>t+parseFloat(F.total),0).toFixed(2)),1)]),_:1}),o(V,{caption:"",lines:"2"},{default:c(()=>a[15]||(a[15]=[W(" Total de reservas canceladas ")])),_:1})]),_:1})]),_:1})),[[X]])]),_:1})])])]),_:1})]),_:1}),o(J,{flat:"",bordered:"",class:"q-mt-md"},{default:c(()=>[p.$store.user.role==="Admin"?(_(),E(R,{key:0,class:"q-pa-xs"},{default:c(()=>[o(mt,{"wrap-cells":"",dense:"",flat:"",bordered:""},{default:c(()=>[a[16]||(a[16]=s("thead",null,[s("tr",null,[s("th",null,"Acciones"),s("th",null,"Fecha"),s("th",null,"Total"),s("th",null,"Nombre Cliente"),s("th",null,"Usuario"),s("th",null,"Detalle"),s("th",null,"Agencia")])],-1)),s("tbody",null,[(_(!0),N(it,null,pt(b.value,t=>(_(),N("tr",{key:t.id},[s("td",null,[t.anulada?(_(),N("div",St,[o(ft,{color:"red","text-color":"white",label:"Anulada"})])):(_(),E(P,{key:0,style:{width:"80px"},icon:"remove_circle_outline",color:"negative",dense:"",onClick:F=>O(t.id),label:"Anular","no-caps":"",size:"10px"},null,8,["onClick"]))]),s("td",null,T(t.fecha),1),s("td",null,T(t.total),1),s("td",null,T(t.nombre),1),s("td",null,T(t.user?.name),1),s("td",null,[s("div",Ot,T(t.detalleText),1)]),s("td",null,T(t.agencia),1)]))),128))])]),_:1})]),_:1})):L("",!0)]),_:1})]),_:1}),o(vt,{modelValue:m.value,"onUpdate:modelValue":a[10]||(a[10]=t=>m.value=t),persistent:""},{default:c(()=>[o(J,{flat:"",bordered:"",style:{width:"350px"}},{default:c(()=>[o(R,{class:"row items-center q-pb-none"},{default:c(()=>[a[17]||(a[17]=s("div",{class:"text-bold"}," Cerrar Caja ",-1)),o(bt),o(P,{flat:"",dense:"",icon:"close",onClick:a[7]||(a[7]=t=>m.value=!1)})]),_:1}),o(R,null,{default:c(()=>[o(rt,{onSubmit:lt(S,["prevent"])},{default:c(()=>[o(U,{modelValue:x.value.monto_final,"onUpdate:modelValue":a[8]||(a[8]=t=>x.value.monto_final=t),label:"Monto Final",type:"number",outlined:"",dense:"",hint:""},null,8,["modelValue"]),o(U,{type:"textarea",modelValue:x.value.observacion,"onUpdate:modelValue":a[9]||(a[9]=t=>x.value.observacion=t),label:"Observación",outlined:"",dense:"",hint:""},null,8,["modelValue"]),o(P,{label:"Cerrar Caja",color:"red",type:"submit",loading:u.value,"no-caps":"",icon:"point_of_sale",class:"q-mt-md"},null,8,["loading"])]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),a[18]||(a[18]=s("div",{id:"myElement",class:"hidden"},null,-1))],64))}};export{Gt as default};
