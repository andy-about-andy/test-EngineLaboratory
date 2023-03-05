import{ScrollLock}from"../utils/scroll-lock.js";import{FocusLock}from"../utils/focus-lock.js";export class Modals{constructor(t={}){this._scrollLock=new ScrollLock,this._focusLock=new FocusLock,this._modalOpenElements=document.querySelectorAll("[data-open-modal]"),this._openedModalElement=null,this._modalName=null,this._enableScrolling=!0,this._settingKey="default",this._settings=t,this._preventDefault=this._settings[this._settingKey].preventDefault,this._stopPlay=this._settings[this._settingKey].stopPlay,this._lockFocus=this._settings[this._settingKey].lockFocus,this._startFocus=this._settings[this._settingKey].startFocus,this._focusBack=this._settings[this._settingKey].focusBack,this._eventTimeout=this._settings[this._settingKey].eventTimeout,this._openCallback=this._settings[this._settingKey].openCallback,this._closeCallback=this._settings[this._settingKey].closeCallback,this._documentKeydownHandler=this._documentKeydownHandler.bind(this),this._documentClickHandler=this._documentClickHandler.bind(this),this._modalClickHandler=this._modalClickHandler.bind(this),this._init()}_init(){this._modalOpenElements.length&&document.addEventListener("click",this._documentClickHandler)}_setSettings(t=this._settingKey){this._settings[t]&&(this._preventDefault="boolean"==typeof this._settings[t].preventDefault?this._settings[t].preventDefault:this._settings[this._settingKey].preventDefault,this._stopPlay="boolean"==typeof this._settings[t].stopPlay?this._settings[t].stopPlay:this._settings[this._settingKey].stopPlay,this._lockFocus="boolean"==typeof this._settings[t].lockFocus?this._settings[t].lockFocus:this._settings[this._settingKey].lockFocus,this._startFocus="boolean"==typeof this._settings[t].startFocus?this._settings[t].startFocus:this._settings[this._settingKey].startFocus,this._focusBack="boolean"==typeof this._settings[t].lockFocus?this._settings[t].focusBack:this._settings[this._settingKey].focusBack,this._eventTimeout="number"==typeof this._settings[t].eventTimeout?this._settings[t].eventTimeout:this._settings[this._settingKey].eventTimeout,this._openCallback=this._settings[t].openCallback||this._settings[this._settingKey].openCallback,this._closeCallback=this._settings[t].closeCallback||this._settings[this._settingKey].closeCallback)}_documentClickHandler(t){const e=t.target;e.closest("[data-open-modal]")&&(t.preventDefault(),this._modalName=e.closest("[data-open-modal]").dataset.openModal,this._modalName&&this.open())}_documentKeydownHandler(t){("Escape"===t.key||"Esc"===t.key)&&(t.preventDefault(),this.close(document.querySelector(".modal.is-active").dataset.modal))}_modalClickHandler(t){const e=t.target;e.closest("[data-close-modal]")&&this.close(e.closest("[data-modal]").dataset.modal)}_addListeners(t){t.addEventListener("click",this._modalClickHandler),document.addEventListener("keydown",this._documentKeydownHandler)}_removeListeners(t){t.removeEventListener("click",this._modalClickHandler),document.removeEventListener("keydown",this._documentKeydownHandler)}_stopInteractive(t){this._stopPlay&&(t.querySelectorAll("video, audio").forEach((t=>t.pause())),t.querySelectorAll("[data-iframe]").forEach((t=>{t.querySelector("iframe").contentWindow.postMessage('{"event": "command", "func": "pauseVideo", "args": ""}',"*")})))}_autoPlay(t){t.querySelectorAll("[data-iframe]").forEach((t=>{t.closest("[data-auto-play]")&&t.querySelector("iframe").contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}',"*")}))}open(t=this._modalName){const e=document.querySelector(`[data-modal="${t}"]`);e&&!e.classList.contains("is-active")&&(document.removeEventListener("click",this._documentClickHandler),this._openedModalElement=document.querySelector(".modal.is-active"),this._openedModalElement&&(this._enableScrolling=!1,this.close(this._openedModalElement.dataset.modal)),this._setSettings(t),e.classList.add("is-active"),this._openedModalElement||this._scrollLock.disableScrolling(),this._openCallback&&this._openCallback(),this._lockFocus&&this._focusLock.lock(".modal.is-active",this._startFocus),setTimeout((()=>{this._addListeners(e),this._autoPlay(e),document.addEventListener("click",this._documentClickHandler)}),this._eventTimeout))}close(t=this._modalName){const e=document.querySelector(`[data-modal="${t}"]`);document.removeEventListener("click",this._documentClickHandler),e&&e.classList.contains("is-active")&&(this._lockFocus&&this._focusLock.unlock(this._focusBack),e.classList.remove("is-active"),this._removeListeners(e),this._stopInteractive(e),this._closeCallback&&this._closeCallback(),this._enableScrolling&&setTimeout((()=>{this._scrollLock.enableScrolling()}),this._eventTimeout),setTimeout((()=>{document.addEventListener("click",this._documentClickHandler)}),this._eventTimeout),this._setSettings("default"),this._enableScrolling=!0)}}