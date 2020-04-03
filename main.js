!function(e){var t={};function n(i){if(t[i])return t[i].exports;var a=t[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(i,a,function(t){return e[t]}.bind(null,a));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){n(3),n(1),e.exports=n(2)},function(e,t){e.exports='<!doctype html> <html lang=en> <head> <meta charset=UTF-8> <meta name=viewport content="width=device-width,initial-scale=1"> <title>Virtual Keyboard</title> </head> <body> </body> </html>'},function(e,t,n){},function(e,t,n){"use strict";function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}n.r(t);var a=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.symbols=[],this.createElement(),this.updateCursor(0),this.render(),this.addEventListeners()}var t,n,a;return t=e,(n=[{key:"createElement",value:function(){this.el=document.createElement("textarea"),this.el.classList.add("textarea")}},{key:"render",value:function(){var e=this.getScrollPosition();this.el.textContent=this.symbols.join(""),this.el.blur(),this.el.focus(),this.el.scrollTo(0,e)}},{key:"getScrollPosition",value:function(){return this.el.scrollTop}},{key:"updateCursor",value:function(e){this.cursor=e,this.cursor=Math.max(0,this.cursor),this.cursor=Math.min(this.symbols.length,this.cursor),this.el.selectionStart===this.el.selectionEnd&&(this.el.selectionStart=this.cursor,this.el.selectionEnd=this.cursor)}},{key:"addLetter",value:function(e){this.symbols.splice(this.cursor,0,e),this.render(),this.updateCursor(this.cursor+1)}},{key:"selection",value:function(){return this.el.selectionStart===this.el.selectionEnd?{position:this.el.selectionStart}:{start:this.el.selectionStart,end:this.el.selectionEnd}}},{key:"deleteBySelection",value:function(e,t){this.symbols.splice(e,t-e),this.render(),this.updateCursor(e)}},{key:"backSpace",value:function(){var e=this.selection();void 0!==e.position?this.deleteBySelection(e.position-1,e.position):this.deleteBySelection(e.start,e.end+1)}},{key:"delete",value:function(){var e=this.selection();void 0!==e.position?this.deleteBySelection(e.position,e.position+1):this.deleteBySelection(e.start,e.end+1)}},{key:"addEventListeners",value:function(){var e=this;this.el.addEventListener("click",(function(){e.updateCursor(e.el.selectionStart)}))}},{key:"left",value:function(){this.render(),this.updateCursor(this.cursor-1)}},{key:"right",value:function(){this.render(),this.updateCursor(this.cursor+1)}},{key:"up",value:function(){this.render(),this.updateCursor(0)}},{key:"down",value:function(){this.updateCursor(this.symbols.length)}},{key:"element",get:function(){return this.el}}])&&i(t.prototype,n),a&&i(t,a),e}();function r(e){return function(e){if(Array.isArray(e))return s(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return s(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}function o(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var d=function(){function e(t,n,i,a,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.keyState=i,this.isLetter=n,this.simpleKey="string"==typeof i,this.lang=t,this.upperCase=!1,this.pressed=!1,this.downCb=a,this.upCb=r,this.createElement(),this.addClickEvents(),this.render()}var t,n,i;return t=e,i=[{key:"modifierClass",value:function(e){return"key--".concat(e)}}],(n=[{key:"createElement",value:function(){this.el=document.createElement("button"),this.el.classList=["key"]}},{key:"addIndicator",value:function(){this.indicator=!1,this.addModifiers("indicator")}},{key:"toggleIndicator",value:function(t){void 0!==this.indicator&&this.el.classList.toggle(e.modifierClass("indicator-on",t))}},{key:"setUpperCase",value:function(e,t){var n=e;this.isLetter&&t&&(n=!n),this.upperCase=n,this.render()}},{key:"render",value:function(){this.el.classList.toggle("key--down",this.pressed),this.el.innerText=this.text}},{key:"setLang",value:function(e){this.lang=e,this.render()}},{key:"down",value:function(){this.pressed||(this.pressed=!0,this.render(),void 0!==this.downCb&&this.downCb(this.text))}},{key:"up",value:function(){this.pressed&&(this.pressed=!1,this.render(),void 0!==this.upCb&&this.upCb(this.text))}},{key:"addClickEvents",value:function(){var e=this;this.el.addEventListener("mousedown",(function(t){t.preventDefault(),e.down(),document.addEventListener("mouseup",(function(t){t.preventDefault(),e.up(),document.removeEventListener("mouseup",e)}))}))}},{key:"addModifiers",value:function(){for(var t,n=arguments.length,i=new Array(n),a=0;a<n;a++)i[a]=arguments[a];(t=this.el.classList).add.apply(t,r(i.map((function(t){return e.modifierClass(t)}))))}},{key:"element",get:function(){return this.el}},{key:"text",get:function(){return this.simpleKey?this.keyState:this.keyState[this.lang][+this.upperCase]}}])&&o(t.prototype,n),i&&o(t,i),e}();function p(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var u=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.text=new a,this.langList=["en","ru"],this.setLang(),this.setDefaultControlKeyState(),this.keys=[],this.keyMap={},this.selector=document.querySelector(t),this.buildKeyBoard(),this.addEventListeners()}var t,n,i;return t=e,i=[{key:"renderLegend",value:function(){var e=document.createElement("p");return e.classList.add("legend"),e.innerHTML="<b>Alt + Shift</b> - change language",e}},{key:"createRow",value:function(){var e=document.createElement("div");return e.className="row",e}}],(n=[{key:"setLang",value:function(e){void 0===window.localStorage.lang&&(window.localStorage.lang=0),this.currentLang=void 0===e?Number(window.localStorage.lang):e,window.localStorage.lang=this.currentLang}},{key:"buildKeyBoard",value:function(){var t=document.createElement("div");t.classList.add("keyboard"),t.append(this.text.element);var n=document.createElement("div");n.classList.add("keys"),this.createKeys(n),t.append(n),t.append(e.renderLegend()),this.selector.append(t)}},{key:"addEventListeners",value:function(){var e=this;document.addEventListener("keydown",(function(t){t.preventDefault();var n=e.keyMap[t.code];void 0!==n&&(n.down(),t.repeat&&!n.simpleKey&&n.up())})),document.addEventListener("keyup",(function(t){t.preventDefault();var n=e.keyMap[t.code];void 0!==n&&n.up()}))}},{key:"nextLang",value:function(){var e=this,t=(this.currentLang+1)%this.langList.length;this.setLang(t),this.keys.forEach((function(t){t.setLang(e.getLang())}))}},{key:"getLang",value:function(){return this.langList[this.currentLang]}},{key:"bindKey",value:function(e,t){this.keyMap[e]=t,this.keys.push(t)}},{key:"appendKey",value:function(e,t){return this.bindKey(e,t),t.element}},{key:"updateKeyboardState",value:function(){var e=this;this.controlState.Shift&&this.controlState.Alt?this.nextLang():this.keys.forEach((function(t){t.setUpperCase(!!e.controlState.Shift,e.capsLockOn)}))}},{key:"updateCapsLock",value:function(){this.capsLockOn=!this.capsLockOn,this.keyMap.CapsLock.toggleIndicator(this.capsLockOn),this.updateKeyboardState()}},{key:"updateControlKeyState",value:function(e,t){t?this.controlState[e]+=1:this.controlState[e]-=1,this.updateKeyboardState()}},{key:"setDefaultControlKeyState",value:function(){this.controlState={Ctrl:0,Alt:0,Shift:0,Meta:0}}},{key:"createKeys",value:function(e){e.append(this.createRow1()),e.append(this.createRow2()),e.append(this.createRow3()),e.append(this.createRow4()),e.append(this.createRow5()),this.styleKeys()}},{key:"styleKeys",value:function(){this.keyMap.Space.addModifiers("space"),this.keyMap.ShiftLeft.addModifiers("shift-left","left"),this.keyMap.Enter.addModifiers("enter","right"),this.keyMap.Tab.addModifiers("tab","left"),this.keyMap.CapsLock.addModifiers("caps-lock","left"),this.keyMap.ControlLeft.addModifiers("left"),this.keyMap.Delete.addModifiers("right"),this.keyMap.Backspace.addModifiers("right"),this.keyMap.CapsLock.addIndicator()}},{key:"createRow1",value:function(){var t=this,n=e.createRow();return n.append(this.appendKey("Backquote",new d(this.getLang(),!1,{en:["`","~"],ru:["ё","Ё"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("Digit1",new d(this.getLang(),!1,{en:["1","!"],ru:["1","!"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("Digit2",new d(this.getLang(),!1,{en:["2","@"],ru:["2",'"']},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("Digit3",new d(this.getLang(),!1,{en:["3","#"],ru:["3","№"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("Digit4",new d(this.getLang(),!1,{en:["4",";"],ru:["4","$"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("Digit5",new d(this.getLang(),!1,{en:["5","%"],ru:["5","%"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("Digit6",new d(this.getLang(),!1,{en:["6","^"],ru:["6",":"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("Digit7",new d(this.getLang(),!1,{en:["7","&"],ru:["7","?"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("Digit8",new d(this.getLang(),!1,{en:["8","*"],ru:["8","*"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("Digit9",new d(this.getLang(),!1,{en:["9","("],ru:["9","("]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("Digit0",new d(this.getLang(),!1,{en:["0",")"],ru:["0",")"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("Minus",new d(this.getLang(),!1,{en:["-","_"],ru:["-","_"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("Equal",new d(this.getLang(),!1,{en:["=","+"],ru:["=","+"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("Backspace",new d(this.getLang(),!1,{en:["Backspace","Backspace"],ru:["Backspace","Backspace"]},(function(){t.text.backSpace()})))),n}},{key:"createRow2",value:function(){var t=this,n=e.createRow();return n.append(this.appendKey("Tab",new d(this.getLang(),!1,{en:["Tab","Tab"],ru:["Tab","Tab"]},(function(){t.text.addLetter("\t")})))),n.append(this.appendKey("KeyQ",new d(this.getLang(),!0,{en:["q","Q"],ru:["й","Й"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("KeyW",new d(this.getLang(),!0,{en:["w","W"],ru:["ц","Ц"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("KeyE",new d(this.getLang(),!0,{en:["e","E"],ru:["у","У"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("KeyR",new d(this.getLang(),!0,{en:["r","R"],ru:["к","К"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("KeyT",new d(this.getLang(),!0,{en:["t","T"],ru:["е","Е"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("KeyY",new d(this.getLang(),!0,{en:["y","Y"],ru:["н","Н"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("KeyU",new d(this.getLang(),!0,{en:["u","U"],ru:["г","Г"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("KeyI",new d(this.getLang(),!0,{en:["i","I"],ru:["ш","Ш"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("KeyO",new d(this.getLang(),!0,{en:["o","O"],ru:["щ","Щ"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("KeyP",new d(this.getLang(),!0,{en:["p","P"],ru:["з","З"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("BracketLeft",new d(this.getLang(),!1,{en:["[","{"],ru:["х","Х"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("BracketRight",new d(this.getLang(),!1,{en:["]","}"],ru:["ъ","Ъ"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("Delete",new d(this.getLang(),!1,{en:["Del","Del"],ru:["Del","Del"]},(function(){t.text.delete()})))),n}},{key:"createRow3",value:function(){var t=this,n=e.createRow();return n.append(this.appendKey("CapsLock",new d(this.getLang(),!1,"Caps Lock",(function(){t.updateCapsLock()})))),n.append(this.appendKey("KeyA",new d(this.getLang(),!0,{en:["a","A"],ru:["ф","Ф"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("KeyS",new d(this.getLang(),!0,{en:["s","S"],ru:["ы","Ы"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("KeyD",new d(this.getLang(),!0,{en:["d","D"],ru:["в","В"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("KeyF",new d(this.getLang(),!0,{en:["f","F"],ru:["а","А"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("KeyG",new d(this.getLang(),!0,{en:["g","G"],ru:["п","П"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("KeyH",new d(this.getLang(),!0,{en:["h","H"],ru:["р","Р"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("KeyJ",new d(this.getLang(),!0,{en:["j","J"],ru:["о","О"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("KeyK",new d(this.getLang(),!0,{en:["k","K"],ru:["л","Л"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("KeyL",new d(this.getLang(),!0,{en:["l","L"],ru:["д","Д"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("Semicolon",new d(this.getLang(),!1,{en:[";",":"],ru:["ж","Ж"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("Quote",new d(this.getLang(),!1,{en:["'",'"'],ru:["э","Э"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("Backslash",new d(this.getLang(),!1,{en:["\\","|"],ru:["\\","/"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("Enter",new d(this.getLang(),!1,{en:["Enter","Enter"],ru:["Enter","Enter"]},(function(){t.text.addLetter("\n")})))),n}},{key:"createRow4",value:function(){var t=this,n=e.createRow();return n.append(this.appendKey("ShiftLeft",new d(this.getLang(),!1,"Shift",(function(){t.updateControlKeyState("Shift",!0)}),(function(){t.updateControlKeyState("Shift",!1)})))),n.append(this.appendKey("IntlBackslash",new d(this.getLang(),!1,{en:["\\","|"],ru:["\\","/"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("KeyZ",new d(this.getLang(),!0,{en:["z","Z"],ru:["я","Я"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("KeyX",new d(this.getLang(),!0,{en:["x","X"],ru:["ч","Ч"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("KeyC",new d(this.getLang(),!0,{en:["c","C"],ru:["с","С"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("KeyV",new d(this.getLang(),!0,{en:["v","V"],ru:["м","М"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("KeyB",new d(this.getLang(),!0,{en:["b","B"],ru:["и","И"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("KeyN",new d(this.getLang(),!0,{en:["n","N"],ru:["т","Т"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("KeyM",new d(this.getLang(),!0,{en:["m","M"],ru:["ь","Ь"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("Comma",new d(this.getLang(),!1,{en:[",","<"],ru:["б","Б"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("Period",new d(this.getLang(),!1,{en:[".",">"],ru:["ю","Ю"]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("Slash",new d(this.getLang(),!1,{en:["/","?"],ru:[".",","]},(function(e){t.text.addLetter(e)})))),n.append(this.appendKey("ArrowUp",new d(this.getLang(),!1,{en:["Up","Up"],ru:["Up","Up"]},(function(){t.text.up()})))),n}},{key:"createRow5",value:function(){var t=this,n=e.createRow();return n.append(this.appendKey("ControlLeft",new d(this.getLang(),!1,"Ctrl",(function(){t.updateControlKeyState("Ctrl",!0)}),(function(){t.updateControlKeyState("Ctrl",!1)})))),n.append(this.appendKey("MetaLeft",new d(this.getLang(),!1,"Win",(function(){t.updateControlKeyState("Meta",!0)}),(function(){t.updateControlKeyState("Meta",!1)})))),n.append(this.appendKey("AltLeft",new d(this.getLang(),!1,"Alt",(function(){t.updateControlKeyState("Alt",!0)}),(function(){t.updateControlKeyState("Alt",!1)})))),n.append(this.appendKey("Space",new d(this.getLang(),!1,{en:["Space","Space"],ru:["Space","Space"]},(function(){t.text.addLetter(" ")})))),n.append(this.appendKey("ArrowLeft",new d(this.getLang(),!1,{en:["Left","Left"],ru:["Left","Left"]},(function(){t.text.left()})))),n.append(this.appendKey("ArrowDown",new d(this.getLang(),!1,{en:["Down","Down"],ru:["Down","Down"]},(function(){t.text.down()})))),n.append(this.appendKey("ArrowRight",new d(this.getLang(),!1,{en:["Right","Right"],ru:["Right","Right"]},(function(){t.text.right()})))),n}}])&&p(t.prototype,n),i&&p(t,i),e}();window.onload=function(){new u("body")}}]);