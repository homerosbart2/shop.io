(this["webpackJsonpshop.io"]=this["webpackJsonpshop.io"]||[]).push([[0],{30:function(e,t,n){},32:function(e,t,n){},33:function(e,t,n){},39:function(e,t,n){},40:function(e,t,n){},41:function(e,t,n){},42:function(e,t,n){},53:function(e,t,n){},54:function(e,t,n){},55:function(e,t,n){"use strict";n.r(t);var c,a=n(0),r=n(1),s=n.n(r),i=n(22),o=n.n(i),u=(n(30),n(11)),l=n(6),d=n(4),j=n.n(d),b=n(7),O=n(5);n(32);!function(e){e.GREEN="green",e.ORANGE="orange"}(c||(c={}));var h,m,f=function(e){return Object(a.jsx)("div",{className:"button ".concat(e.color," ").concat(!1!==e.shown?"shown":""),onClick:e.onClick,children:e.children})},p=/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,x=(n(33),n(8)),v=n(12),g=n(2);!function(e){e.JSON="application/json"}(h||(h={})),function(e){e.GET="GET",e.POST="POST",e.PATCH="PATCH",e.PUT="PUT",e.DELETE="DELETE"}(m||(m={}));var N,C=function(e,t,n){return new Promise((function(c){fetch("".concat("http://localhost:3002","/").concat(t),{method:e,headers:{"Content-Type":h.JSON},body:n?JSON.stringify(n):null}).then((function(e){e.json().then((function(t){c(Object(l.a)(Object(l.a)({},t),{},{status:e.status}))}))})).catch((function(e){console.error(e)}))}))},S=function(e){return C(m.GET,e)},y=function(e,t){return C(m.POST,e,t)},w=function(){function e(){var t=this;Object(x.a)(this,e),this.products=[],this.isIndexing=!1,this.index=Object(b.a)(j.a.mark((function e(){var n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.isIndexing=!0,e.next=3,S(t.path);case 3:return n=e.sent,Object(g.m)((function(){n.successful&&n.data&&(t.products=n.data)})),t.isIndexing=!1,e.abrupt("return",n.successful);case 7:case"end":return e.stop()}}),e)}))),Object(g.k)(this)}return Object(v.a)(e,[{key:"mappedProducts",get:function(){return this.products.reduce((function(e,t){return Object(l.a)(Object(l.a)({},e),{},Object(u.a)({},t.id,t))}),{})}},{key:"path",get:function(){return"product"}}]),e}(),T=function(){function e(){var t=this;Object(x.a)(this,e),this.user=void 0,this.isShowing=!1,this.isCreating=!1,this.show=function(){var e=Object(b.a)(j.a.mark((function e(n){var c;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.isShowing=!0,e.next=3,S("".concat(t.path,"/").concat(n));case 3:return c=e.sent,Object(g.m)((function(){c.successful&&c.data&&(t.user=c.data)})),t.isShowing=!1,e.abrupt("return",c.successful);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.create=function(){var e=Object(b.a)(j.a.mark((function e(n){var c;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.isCreating=!0,e.next=3,y(t.path,n);case 3:return c=e.sent,Object(g.m)((function(){c.successful&&c.data&&(t.user=c.data)})),t.isCreating=!1,e.abrupt("return",c.successful);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Object(g.k)(this)}return Object(v.a)(e,[{key:"path",get:function(){return"user"}}]),e}(),k=function(){function e(){var t=this;Object(x.a)(this,e),this.isCreating=!1,this.isPaying=!1,this.create=function(){var e=Object(b.a)(j.a.mark((function e(n){var c;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.isCreating=!0,e.next=3,y(t.path,n);case 3:return c=e.sent,t.isCreating=!1,e.abrupt("return",c.successful);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.pay=function(){var e=Object(b.a)(j.a.mark((function e(n,c){var a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.isPaying=!0,e.next=3,y("".concat(t.path,"/pay"),{id:n,amount:c});case 3:return a=e.sent,t.isPaying=!1,e.abrupt("return",a.successful);case 6:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),Object(g.k)(this)}return Object(v.a)(e,[{key:"path",get:function(){return"order"}}]),e}(),E=new w,I=new T,A=new k,P=Object(r.createContext)({productStore:E,userStore:I,orderStore:A}),G=function(){return Object(r.useContext)(P)},R=n(13);!function(e){e[e.LOGIN=0]="LOGIN",e[e.REGISTRATION=1]="REGISTRATION"}(N||(N={}));var L,F={name:"",email:""},M=Object(R.a)((function(e){var t=G().userStore.user,n=Object(r.useState)(F),s=Object(O.a)(n,2),i=s[0],o=s[1],u=Object(r.useState)(N.LOGIN),d=Object(O.a)(u,2),j=d[0],b=d[1],h=e.onSignIn;Object(r.useEffect)((function(){if(!t){var e=localStorage.getItem("loggedInUserEmail");e&&h({email:e},!1)}}),[h,t]);return Object(a.jsxs)("div",{className:"login ".concat(e.loggedIn?"":"shown"),children:[Object(a.jsxs)("div",{className:"brand",children:["shop",Object(a.jsx)("span",{className:"secondary",children:".io"})]}),Object(a.jsx)("input",{className:"user-name-input ".concat(j===N.LOGIN?"":"shown"),type:"text",name:"name",value:i.name,placeholder:"Name: John Wick",onChange:function(e){o((function(t){return Object(l.a)(Object(l.a)({},t),{},{name:e.target.value})}))}}),Object(a.jsx)("input",{type:"text",name:"email",value:i.email,placeholder:"Email: myname@email.com",onChange:function(e){o((function(t){return Object(l.a)(Object(l.a)({},t),{},{email:e.target.value})}))}}),Object(a.jsxs)("div",{className:"buttons",children:[Object(a.jsx)(f,{color:c.ORANGE,onClick:function(){b((function(e){return e===N.REGISTRATION?N.LOGIN:N.REGISTRATION}))},children:j===N.REGISTRATION?"Sign In":"Sign Up"}),Object(a.jsx)(f,{color:c.GREEN,onClick:function(){i.email.match(p)?j===N.REGISTRATION?i.name?e.onSignIn(i,!0):e.onFail("Please insert your name."):e.onSignIn({email:i.email},!1):e.onFail("Incorrect email format.")},children:"Accept"})]})]})})),J=n(9),B=(n(39),function(e){return Object(a.jsxs)("div",{className:"product",children:[Object(a.jsxs)("div",{className:"card",children:[Object(a.jsx)("div",{className:"image",style:{backgroundColor:e.product.color}}),Object(a.jsx)("div",{className:"name",children:e.product.name}),Object(a.jsx)("div",{className:"quantity",children:e.product.quantity}),Object(a.jsxs)("div",{className:"add-to-cart",onClick:function(){e.onAddToCart(e.product)},children:[Object(a.jsx)(J.a,{icon:"shopping-cart"})," Add one"]})]}),Object(a.jsxs)("div",{className:"price",children:["$",(e.product.price/100).toFixed(2)]})]})}),z=(n(40),function(e){return Object(a.jsxs)("div",{className:"navbar",children:[Object(a.jsxs)("div",{className:"brand",children:["shop",Object(a.jsx)("span",{className:"secondary",children:".io"})]}),Object(a.jsxs)("div",{className:"actions",children:[Object(a.jsxs)("div",{className:"action ".concat(e.shopMode===L.CATALOGE?"selected":""),onClick:function(){e.shopMode!==L.CATALOGE&&e.onShopModeChange(L.CATALOGE)},children:[Object(a.jsx)(J.a,{icon:"store"}),Object(a.jsx)("div",{className:"selected-indicator"})]}),Object(a.jsxs)("div",{className:"action ".concat(e.shopMode===L.CART?"selected":""),onClick:function(){e.shopMode!==L.CART&&e.onShopModeChange(L.CART)},children:[Object(a.jsx)(J.a,{icon:"shopping-cart"}),Object(a.jsx)("div",{className:"counter ".concat(e.inCartProductCount>0?"shown":""),children:e.inCartProductCount}),Object(a.jsx)("div",{className:"selected-indicator"})]}),Object(a.jsxs)("div",{className:"action",style:{fontSize:18},onClick:e.onSignOut,children:[Object(a.jsx)(J.a,{icon:"sign-out-alt"}),Object(a.jsx)("div",{className:"selected-indicator"})]})]})]})}),H=n(23),U=n(10),q=(n(41),function(){return Object(a.jsxs)("div",{className:"loading-spinner",children:[Object(a.jsx)("div",{}),Object(a.jsx)("div",{}),Object(a.jsx)("div",{}),Object(a.jsx)("div",{})]})}),D=(n(42),Object(R.a)((function(e){var t=G(),n=t.orderStore.isPaying||t.orderStore.isCreating,s=Object(r.useState)(!1),i=Object(O.a)(s,2),o=i[0],u=i[1],l=Object(r.useState)(!1),d=Object(O.a)(l,2),h=d[0],m=d[1],p=Object(U.useStripe)(),x=Object(U.useElements)(),v=function(){var n=Object(b.a)(j.a.mark((function n(c){var a,r,s;return j.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(c.preventDefault(),!p||!x){n.next=21;break}return m(!0),n.next=5,p.createPaymentMethod({type:"card",card:x.getElement(U.CardElement)});case 5:if(a=n.sent,r=a.error,s=a.paymentMethod,m(!1),r){n.next=20;break}if(!s){n.next=18;break}return n.next=13,t.orderStore.pay(s.id,e.amount);case 13:if(!n.sent){n.next=17;break}e.onPaySuccess(),n.next=18;break;case 17:e.onFail("There was an error with your payment method.");case 18:n.next=21;break;case 20:console.log(r.message);case 21:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}();return Object(a.jsx)("div",{className:"checkout-form ".concat(e.shown?"shown":""),children:Object(a.jsxs)("form",{onSubmit:v,children:[Object(a.jsx)(U.CardElement,{onChange:function(e){var t=e.complete;u(t)}}),Object(a.jsxs)("div",{className:"buttons",children:[Object(a.jsx)(f,{color:c.ORANGE,onClick:e.onCancelButtonClick,children:"Cancel"}),Object(a.jsx)("button",{className:o?"":"disabled",children:n||h?Object(a.jsx)(q,{}):"Pay"})]})]})})}))),K=Object(H.a)("pk_test_51HpP5lGq34SadLyT4eHD7y2xLr9RK5412Z89ansl8OElyxGRuX6vARNE43KkPtzYInp8zBnrMTLyzYEIn8T9RIIs002h4K7uHN"),Y=function(e){return Object(a.jsx)(U.Elements,{stripe:K,children:Object(a.jsx)(D,{amount:e.amount,shown:e.shown,onCancelButtonClick:e.onCancelButtonClick,onPaySuccess:e.onPaySuccess,onFail:e.onFail})})},$=n(24),_=n.n($),Q=(n(53),function(e){var t=Object(r.useState)(""),n=Object(O.a)(t,2),c=n[0],s=n[1],i=Object(r.useState)(!1),o=Object(O.a)(i,2),u=o[0],l=o[1];return Object(r.useEffect)((function(){if(e.message){var t=u;if(s(e.message),l(!0),!t){var n=window.setTimeout((function(){l(!1),window.setTimeout((function(){e.onMessageClear()}),300)}),3e3);return function(){window.clearTimeout(n)}}}}),[e.message]),Object(a.jsx)("div",{className:"context-message ".concat(u?"shown":""),children:_()(c||"")})});n(54);!function(e){e[e.CATALOGE=0]="CATALOGE",e[e.CART=1]="CART"}(L||(L={}));var W=Object(R.a)((function(){var e=G(),t=e.productStore,n=t.products,s=t.mappedProducts,i=e.userStore,o=e.userStore.user,d=Object(r.useState)(!1),h=Object(O.a)(d,2),m=h[0],p=h[1],x=Object(r.useState)({}),v=Object(O.a)(x,2),g=v[0],N=v[1],C=Object(r.useState)(L.CATALOGE),S=Object(O.a)(C,2),y=S[0],w=S[1],T=Object(r.useState)(!1),k=Object(O.a)(T,2),E=k[0],I=k[1],A=Object(r.useState)(""),P=Object(O.a)(A,2),R=P[0],F=P[1];Object(r.useEffect)((function(){y===L.CATALOGE&&t.index()}),[y,t]);var H=Object(r.useMemo)((function(){return Object.entries(g).reduce((function(e,t){var n=Object(O.a)(t,2),c=n[0],a=n[1],r=s[c];return{inCartProductCount:e.inCartProductCount+a,total:r?e.total+a*r.price:0}}),{inCartProductCount:0,total:0})}),[g,s]),U=H.inCartProductCount,q=H.total,D=function(){var t=Object(b.a)(j.a.mark((function t(n,c){var a,r;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a=!1,!c){t.next=7;break}return t.next=4,i.create(n);case 4:a=t.sent,t.next=10;break;case 7:return t.next=9,i.show(n.email);case 9:a=t.sent;case 10:a?(p(!0),w(L.CATALOGE),localStorage.setItem("loggedInUserEmail",n.email),(r=localStorage.getItem("shoppingCart::".concat(n.email)))&&N(JSON.parse(r)),e.userStore.user&&F("Hello, ".concat(e.userStore.user.name))):W("Your email is not registered, please sign up.");case 11:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),K=function(e){N((function(t){var n=(t[e.id]||0)+1,c=n<=e.quantity,a=c?Object(l.a)(Object(l.a)({},t),{},Object(u.a)({},e.id,n)):t;return c?F("The product <b>".concat(e.name,"</b> was added.")):W("Not enough stock."),o&&localStorage.setItem("shoppingCart::".concat(o.email),JSON.stringify(a)),a}))},$=function(){var e=Object(b.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:I(!0);case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),_=function(){var t=Object(b.a)(j.a.mark((function t(){return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!o){t.next=8;break}return t.next=3,e.orderStore.create({shoppingCart:g,user:o});case 3:if(!t.sent){t.next=7;break}N({}),I(!1),localStorage.setItem("shoppingCart::".concat(o.email),JSON.stringify({}));case 7:case 8:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),W=function(e){F(e)};return Object(a.jsxs)("div",{className:"shop",children:[Object(a.jsx)(M,{loggedIn:m,onSignIn:D,onFail:W}),Object(a.jsxs)("div",{className:"manager ".concat(m?"shown":""),children:[Object(a.jsx)(z,{shopMode:y,inCartProductCount:U,onShopModeChange:function(e){w(e)},onSignOut:function(){p(!1),N({}),localStorage.removeItem("loggedInUserEmail")}}),Object(a.jsx)("div",{className:"catalogue",children:n.map((function(e){return Object(a.jsx)(B,{product:e,onAddToCart:K},"product-".concat(e.id))}))}),Object(a.jsx)("div",{className:"cart ".concat(y===L.CART?"shown":""),children:Object(a.jsxs)("div",{className:"summary",children:[Object(a.jsxs)("div",{className:"table",children:[Object(a.jsxs)("div",{className:"headers",children:[Object(a.jsx)("div",{className:"header"}),Object(a.jsx)("div",{className:"header",children:"Quantity"}),Object(a.jsx)("div",{className:"header",children:"Image"}),Object(a.jsx)("div",{className:"header",children:"Name"}),Object(a.jsx)("div",{className:"header",children:"Subtotal"})]}),n.length>0&&Object.entries(g).map((function(e){var t=Object(O.a)(e,2),n=t[0],c=t[1],r=s[n];return Object(a.jsxs)("div",{className:"row",children:[Object(a.jsx)("div",{className:"cell",children:Object(a.jsx)("div",{className:"remove-formatter",onClick:function(){return function(e){N((function(t){var n=(t[e]||0)-1,c=Object(l.a)({},t);return 0===n?delete c[e]:n>0&&(c[e]=n),o&&localStorage.setItem("shoppingCart::".concat(o.email),JSON.stringify(c)),c}))}(+n)},children:Object(a.jsx)(J.a,{icon:"minus"})})}),Object(a.jsx)("div",{className:"cell",children:Object(a.jsx)("div",{className:"quantity-formatter",children:c})}),Object(a.jsx)("div",{className:"cell",children:Object(a.jsx)("div",{className:"image-formatter",style:{backgroundColor:null===r||void 0===r?void 0:r.color}})}),Object(a.jsx)("div",{className:"cell",children:Object(a.jsx)("div",{className:"name-formatter",children:null===r||void 0===r?void 0:r.name})}),Object(a.jsx)("div",{className:"cell",children:Object(a.jsxs)("div",{className:"price-formatter",children:["$",(((null===r||void 0===r?void 0:r.price)||0)*c/100).toFixed(2)]})})]},"row-".concat(n))}))]}),Object(a.jsxs)("div",{className:"total",children:[Object(a.jsx)(f,{color:c.GREEN,shown:q>0&&!E,onClick:$,children:"Proceed"}),Object(a.jsx)(Y,{amount:q,shown:E,onCancelButtonClick:function(){I(!1)},onPaySuccess:_,onFail:W}),Object(a.jsxs)("div",{className:"amount",children:[Object(a.jsx)("div",{className:"text",children:"Total"}),Object(a.jsxs)("div",{className:"number",children:["$",(q/100).toFixed(2)]})]})]})]})})]}),Object(a.jsx)(Q,{message:R,onMessageClear:function(){F("")}})]})})),X=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,56)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),c(e),a(e),r(e),s(e)}))},Z=n(14),V=n(15),ee=function e(){Object(x.a)(this,e)};ee.initializeFontAwesomeLibrary=function(){Z.b.add(V.c,V.b,V.d,V.a)},ee.initializeFontAwesomeLibrary(),o.a.render(Object(a.jsx)(s.a.StrictMode,{children:Object(a.jsx)(W,{})}),document.getElementById("root")),X()}},[[55,1,2]]]);
//# sourceMappingURL=main.ad4b9bb2.chunk.js.map