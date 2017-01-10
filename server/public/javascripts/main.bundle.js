webpackJsonp([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * semfeng 主js文件
	 */
	"use strict";
	// require('./index.slide.js');
	//格式化时间

	__webpack_require__(22);
	// const Model = require('./tipModal');
	__webpack_require__(23);

	$(function () {
	    $("[data-toggle='tooltip']").tooltip(); //全局启动tooltip
	    //变量
	    var $dropDown = $('.js-dropdown'); //下拉
	    var $search = $('#mainSearch'); //搜索
	    var $mobSearchIco = $('.js-mobSearchIco'); //移动搜索图标
	    var $mobSearchForm = $('.js-mobSearch'); //移动搜索框
	    var $mobileNav = $('#mobileNav'); //移动导航
	    var $mobileNavBtn = $('#mobileNavBtn'); //移动导航按钮
	    var $shadeLayout = $('.js-shade'); //遮罩层
	    var width = window.innerWidth; //窗口宽度
	    var height = window.innerHeight; //窗口高度
	    var $fixed = $('.js-fixed'); //pin功能，固定底部
	    var $date = $('.js-date'); //date
	    var $dateTime = $('.js-dateTime'); //date time
	    var $checkInput = $('.js-checkInput'); //通用input检测
	    var $linkAjax = $('.js-linkAjax'); //全局ajax link 标签
	    var $back = $('.js-back'); //返回按钮
	    var $prevNext = $('.js-prevNext'); //上一篇下一篇
	    var $navActive = $('.js-navActive'); //渲染active标记
	    var $dialog = $('.js-dialog'); //定义dialog
	    var $loadPage = $('.js-loadPage'); //动态加载分页
	    var $listContent = $('.js-listContent'); //内容列表容器

	    //一个简单的dialog
	    $dialog.on('click', function (e) {
	        e.stopPropagation();
	        e.preventDefault();
	        var content = $(this).data('content');
	        var title = $(this).attr('title');
	        $.dialog({
	            animation: 'top',
	            closeAnimation: 'top',
	            title: title,
	            columnClass: 'medium',
	            content: content
	        });
	    });

	    //dropdown
	    $dropDown.hover(function () {
	        $(this).addClass('open');
	    }, function () {
	        $(this).removeClass('open');
	    });
	    //search
	    $search.find('input').on({
	        focus: function focus() {
	            $search.addClass('active');
	        },
	        input: function input() {
	            if (!$(this).val()) {
	                $search.removeClass('active');
	            }
	        },
	        mouseout: function mouseout() {
	            if (!$(this).val()) {
	                $search.removeClass('active');
	            }
	        }
	    });
	    // 移动胶囊导航
	    $mobileNavBtn.on('click', closeMobileNav);
	    //点击遮罩层关闭导航
	    function closeMobileNav() {
	        if (!$mobileNav.hasClass('in')) {
	            ShadeL.show(closeMobileNav);
	            $mobileNavBtn.addClass('open');
	            $mobileNav.addClass('in');
	        } else {
	            ShadeL.hide();
	            $mobileNavBtn.removeClass('open');
	            $mobileNav.removeClass('in');
	        }
	    }

	    // shade 层方法
	    var ShadeL = {
	        show: function show(callback) {
	            //显示遮罩 并 添加事件监听
	            $shadeLayout.addClass('show').off('click').on('click', callback);
	        },
	        hide: function hide() {
	            $shadeLayout.removeClass('show').off('click'); //隐藏遮罩
	        }
	    };

	    // 移动search
	    $mobSearchIco.on('click', function () {
	        var _this = this;

	        ShadeL.show(function () {
	            ShadeL.hide();
	            $(_this).removeClass('hide');
	            $mobSearchForm.removeClass('show');
	        });
	        $(this).addClass('hide');
	        $mobSearchForm.addClass('show');
	    });

	    // 判断宽度，超过 768 则启用
	    if (width >= 768 && $fixed.length !== 0) {
	        (function () {
	            var scTop = $fixed.offset().top;
	            $(window).scroll(function () {
	                var scrollH = $(document).scrollTop();
	                if (scTop - $fixed.height() - scrollH > height) {
	                    $fixed.addClass('fixed');
	                } else {
	                    $fixed.removeClass('fixed');
	                }
	            });
	        })();
	    }

	    //格式化时间
	    $date.each(function () {
	        var thisDate = new Date($(this).attr('date')).format('yyyy-MM-dd');
	        $(this).text(thisDate);
	    });
	    $dateTime.each(function () {
	        var thisDate = new Date($(this).attr('date')).format('yyyy-MM-dd hh:mm:ss');
	        $(this).text(thisDate);
	    });

	    /**
	     * input检测
	     * 必要的class为 help-block
	     * 若为必填项，则添加 em标记，input添加must
	     * focusin/focusout 两个事件支持冒泡，但是浏览器支持有问题（可能）
	     */
	    $checkInput.focusin(function (e) {
	        $(this).find('.help-block').addClass('on').find('span').text($(e.target).attr('placeholder'));
	    }).focusout(function (e) {
	        console.log($(e.target).val());

	        $(this).find('.help-block').removeClass('on');
	        if ($(e.target).hasClass('must') && $(e.target).val() === '') {
	            $(e.target).parent().addClass('has-error');
	            $(this).find('.help-block span').text('该项不能为空');
	        } else {
	            $(e.target).parent().removeClass('has-error');
	        }
	    });

	    //全局ajax link 方法
	    $linkAjax.on('click', function (e) {
	        e.stopPropagation();
	        e.preventDefault();
	        // Model.setTip($minTip, '处理中...');
	        var $thisLink = $(this);
	        var content = $thisLink.data('confirm') ? $thisLink.data('confirm') : "确定进行此操作吗？";

	        $.confirm({
	            animation: 'top',
	            closeAnimation: 'top',
	            title: '系统提示',
	            content: content,
	            buttons: {
	                "取消": {
	                    btnClass: 'btn-default',
	                    keys: ['esc']
	                },
	                '确定': {
	                    btnClass: 'btn-success',
	                    keys: ['enter'],
	                    action: function action() {
	                        $.ajax({
	                            url: $thisLink.attr('href'),
	                            method: 'GET'
	                        }).then(function (d) {
	                            // Model.setTip($minTip, d.messages.body);
	                            $.alert({
	                                animation: 'top',
	                                closeAnimation: 'top',
	                                title: d.messages.title,
	                                content: d.messages.body,
	                                buttons: {
	                                    '确定': function _() {
	                                        if (d.error === 0) {
	                                            setTimeout(window.location.reload());
	                                        }
	                                    }
	                                }
	                            });
	                            //end alert
	                        });
	                    }
	                }

	            }
	        });
	    });

	    //动态加载分页
	    $loadPage.on('click', function (e) {
	        e.stopPropagation();
	        e.preventDefault();
	        var $btn = $(this);
	        $btn.button('loading');

	        var page = $btn.data('page') > 1 ? $btn.data('page') : 2;
	        var url = $btn.attr('href') + '?ajax=1&page=' + page;
	        $.ajax({
	            url: url,
	            method: 'GET'
	        }).then(function (d) {

	            if (d) {
	                $listContent.append(d);
	                $btn.data('page', page + 1).button('reset');
	            } else {
	                $btn.text('没有更多了');
	            }
	        });
	    });

	    //全局返回按钮
	    $back.on('click', function (e) {
	        e.stopPropagation();
	        e.preventDefault();
	        window.history.go(-1);
	    });

	    //获取上一篇下一篇
	    if ($prevNext.length !== 0) {
	        setTimeout(function () {
	            $.ajax({
	                url: '/article/prevNext',
	                method: 'post',
	                data: { date: $prevNext.data('date') }
	            }).then(function (d) {
	                var prev = d[0][0],
	                    next = d[1][0];
	                console.log(prev, next);
	                if (!!prev) {
	                    $prevNext.append('<p><a href="' + prev._id + '" title="' + prev.title + '">\u4E0A\u4E00\u7BC7</a></p>');
	                }
	                if (!!next) {
	                    $prevNext.prepend('<p><a href="' + next._id + '" title="' + next.title + '">\u4E0B\u4E00\u7BC7</a></p>');
	                }
	            });
	        });
	    }

	    //渲染当前导航 active
	    setTimeout(function () {
	        var thisLink = window.location.href;
	        var theLink = $navActive.find('li a');

	        theLink.each(function () {
	            // console.log(thisLink === $(this).attr('href'),'|',thisLink,$(this).attr('href'));

	            if ($(this).attr('href') === thisLink || $(this).attr('href') + '/' === thisLink) {
	                $(this).parent().addClass('active').siblings('active').removeClass('active');
	            }
	        });
	    });

	    //function END
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 22:
/***/ function(module, exports) {

	"use strict";

	/**
	 * Created by feng on 2016/11/14.
	 * Used to format the Date
	 * 格式化时间
	 */

	//全局添加格式化方法
	Date.prototype.format = function (fmt) {
	    var o = {
	        "M+": this.getMonth() + 1, //月份
	        "d+": this.getDate(), //日
	        "h+": this.getHours(), //小时
	        "m+": this.getMinutes(), //分
	        "s+": this.getSeconds(), //秒
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
	        "S": this.getMilliseconds() //毫秒
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o) {
	        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	    }return fmt;
	};

	module.exports = {
	    relTime: function relTime() {
	        //todo 相对时间
	        console.log('相对时间');
	    }
	};

/***/ },

/***/ 23:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/*!
	 * jquery-confirm v3.0.1 (http://craftpip.github.io/jquery-confirm/)
	 * Author: Boniface Pereira
	 * Website: www.craftpip.com
	 * Contact: hey@craftpip.com
	 *
	 * Copyright 2013-2016 jquery-confirm
	 * Licensed under MIT (https://github.com/craftpip/jquery-confirm/blob/master/LICENSE)
	 */
	if (typeof jQuery === "undefined") {
	  throw new Error("jquery-confirm requires jQuery");
	}var _jconfirm, Jconfirm;(function ($) {
	  $.fn.confirm = function (options, option2) {
	    if (typeof options === "undefined") {
	      options = {};
	    }if (typeof options === "string") {
	      options = { content: options, title: option2 ? option2 : false };
	    }$(this).each(function () {
	      var $this = $(this);$this.on("click", function (e) {
	        e.preventDefault();var jcOption = $.extend({}, options);if ($this.attr("data-title")) {
	          jcOption.title = $this.attr("data-title");
	        }if ($this.attr("data-content")) {
	          jcOption.content = $this.attr("data-content");
	        }if (typeof jcOption.buttons == "undefined") {
	          jcOption.buttons = {};
	        }jcOption["$target"] = $this;if ($this.attr("href") && Object.keys(jcOption.buttons).length == 0) {
	          var buttons = {};if (_jconfirm.defaults && _jconfirm.defaults.defaultButtons) {
	            buttons = $.extend({}, _jconfirm.pluginDefaults.defaultButtons, _jconfirm.defaults.defaultButtons || {});
	          } else {
	            buttons = $.extend({}, _jconfirm.pluginDefaults.defaultButtons);
	          }var firstBtn = Object.keys(buttons)[0];jcOption.buttons = buttons;jcOption.buttons[firstBtn].action = function () {
	            location.href = $this.attr("href");
	          };
	        }jcOption.closeIcon = false;$.confirm(jcOption);
	      });
	    });return $(this);
	  };$.confirm = function (options, option2) {
	    if (typeof options === "undefined") {
	      options = {};
	    }if (typeof options === "string") {
	      options = { content: options, title: option2 ? option2 : false };
	    }if (_typeof(options.buttons) != "object") {
	      options.buttons = {};
	    }if (Object.keys(options.buttons).length == 0) {
	      var buttons = {};if (_jconfirm.defaults && _jconfirm.defaults.defaultButtons) {
	        buttons = $.extend({}, _jconfirm.pluginDefaults.defaultButtons, _jconfirm.defaults.defaultButtons || {});
	      } else {
	        buttons = $.extend({}, _jconfirm.pluginDefaults.defaultButtons);
	      }options.buttons = buttons;
	    }return _jconfirm(options);
	  };$.alert = function (options, option2) {
	    if (typeof options === "undefined") {
	      options = {};
	    }if (typeof options === "string") {
	      options = { content: options, title: option2 ? option2 : false };
	    }if (_typeof(options.buttons) != "object") {
	      options.buttons = {};
	    }if (Object.keys(options.buttons).length == 0) {
	      var buttons = {};if (_jconfirm.defaults && _jconfirm.defaults.defaultButtons) {
	        buttons = $.extend({}, _jconfirm.pluginDefaults.defaultButtons, _jconfirm.defaults.defaultButtons || {});
	      } else {
	        buttons = $.extend({}, _jconfirm.pluginDefaults.defaultButtons);
	      }var firstBtn = Object.keys(buttons)[0];options.buttons[firstBtn] = buttons[firstBtn];
	    }return _jconfirm(options);
	  };$.dialog = function (options, option2) {
	    if (typeof options === "undefined") {
	      options = {};
	    }if (typeof options === "string") {
	      options = { content: options, title: option2 ? option2 : false, closeIcon: function closeIcon() {} };
	    }options.buttons = {};if (typeof options.closeIcon == "undefined") {
	      options.closeIcon = function () {};
	    }options.confirmKeys = [13];return _jconfirm(options);
	  };_jconfirm = function jconfirm(options) {
	    if (typeof options === "undefined") {
	      options = {};
	    }if (_jconfirm.defaults) {
	      $.extend(_jconfirm.pluginDefaults, _jconfirm.defaults);
	    }options = $.extend({}, _jconfirm.pluginDefaults, options);var instance = new Jconfirm(options);_jconfirm.instances.push(instance);return instance;
	  };Jconfirm = function Jconfirm(options) {
	    $.extend(this, options);this._init();
	  };Jconfirm.prototype = { _init: function _init() {
	      var that = this;this._lastFocused = $("body").find(":focus");this._id = Math.round(Math.random() * 99999);setTimeout(function () {
	        that.open();
	      }, 0);
	    }, _buildHTML: function _buildHTML() {
	      var that = this;this._parseAnimation(this.animation, "o");this._parseAnimation(this.closeAnimation, "c");this._parseBgDismissAnimation(this.backgroundDismissAnimation);this._parseColumnClass(this.columnClass);this._parseTheme(this.theme);var template = $(this.template);var type = "";switch (this.type) {case "default":case "blue":case "green":case "red":case "orange":case "purple":case "dark":
	          type = "jconfirm-" + this.type;break;default:
	          console.warn("Invalid dialog type: " + this.type);}template.find(".jconfirm-box").addClass(this.animationParsed).addClass(this.backgroundDismissAnimationParsed).addClass(type);if (this.typeAnimated) {
	        template.find(".jconfirm-box").addClass("jconfirm-type-animated");
	      }if (this.useBootstrap) {
	        template.find(".jc-bs3-row").addClass(this.bootstrapClasses.row);template.find(".jconfirm-box-container").addClass(this.columnClassParsed);if (this.containerFluid) {
	          template.find(".jc-bs3-container").addClass(this.bootstrapClasses.containerFluid);
	        } else {
	          template.find(".jc-bs3-container").addClass(this.bootstrapClasses.container);
	        }
	      } else {
	        template.find(".jconfirm-box").css("width", this.boxWidth);
	      }if (this.titleClass) {
	        template.find(".jconfirm-title-c").addClass(this.titleClass);
	      }template.addClass(this.themeParsed);var ariaLabel = "jconfirm-box" + this._id;template.find(".jconfirm-box").attr("aria-labelledby", ariaLabel).attr("tabindex", -1);template.find(".jconfirm-content").attr("id", ariaLabel);if (this.bgOpacity != null) {
	        template.find(".jconfirm-bg").css("opacity", this.bgOpacity);
	      }if (this.rtl) {
	        template.addClass("jconfirm-rtl");
	      }this.$el = template.appendTo(this.container);this.$jconfirmBoxContainer = this.$el.find(".jconfirm-box-container");this.$jconfirmBox = this.$body = this.$el.find(".jconfirm-box");this.$jconfirmBg = this.$el.find(".jconfirm-bg");this.$title = this.$el.find(".jconfirm-title");this.$content = this.$el.find("div.jconfirm-content");this.$contentPane = this.$el.find(".jconfirm-content-pane");this.$icon = this.$el.find(".jconfirm-icon-c");this.$closeIcon = this.$el.find(".jconfirm-closeIcon");this.$btnc = this.$el.find(".jconfirm-buttons");this.$scrollPane = this.$el.find(".jconfirm-scrollpane");this._contentReady = $.Deferred();this._modalReady = $.Deferred();this.setTitle();this.setIcon();this._setButtons();this._parseContent();if (this.isAjax) {
	        this.showLoading(false);
	      }$.when(this._contentReady, this._modalReady).then(function () {
	        if (that.isAjaxLoading) {
	          setTimeout(function () {
	            that.isAjaxLoading = false;that.setContent();that.setTitle();that.setIcon();setTimeout(function () {
	              that.hideLoading(false);
	            }, 100);if (typeof that.onContentReady == "function") {
	              that.onContentReady();
	            }
	          }, 50);
	        } else {
	          that.setContent();that.setTitle();that.setIcon();if (typeof that.onContentReady == "function") {
	            that.onContentReady();
	          }
	        }if (that.autoClose) {
	          that._startCountDown();
	        }
	      });that._contentHash = this._hash(that.$content.html());that._contentHeight = this.$content.height();this._watchContent();this.setDialogCenter();if (this.animation == "none") {
	        this.animationSpeed = 1;this.animationBounce = 1;
	      }this.$body.css(this._getCSS(this.animationSpeed, this.animationBounce));this.$contentPane.css(this._getCSS(this.animationSpeed, 1));this.$jconfirmBg.css(this._getCSS(this.animationSpeed, 1));
	    }, themeParsed: "", _themePrefix: "jconfirm-", setTheme: function setTheme(theme) {
	      var that = this;var previous = this.theme;this.theme = theme || this.theme;this._parseTheme(this.theme);if (previous) {
	        this.$el.removeClass(previous);
	      }this.$el.addClass(this.themeParsed);this.theme = theme;
	    }, _parseTheme: function _parseTheme(theme) {
	      var that = this;theme = theme.split(",");$.each(theme, function (k, a) {
	        if (a.indexOf(that._themePrefix) == -1) {
	          theme[k] = that._themePrefix + $.trim(a);
	        }
	      });this.themeParsed = theme.join(" ").toLowerCase();
	    }, backgroundDismissAnimationParsed: "", _bgDismissPrefix: "jconfirm-hilight-", _parseBgDismissAnimation: function _parseBgDismissAnimation(bgDismissAnimation) {
	      var animation = bgDismissAnimation.split(",");var that = this;$.each(animation, function (k, a) {
	        if (a.indexOf(that._bgDismissPrefix) == -1) {
	          animation[k] = that._bgDismissPrefix + $.trim(a);
	        }
	      });this.backgroundDismissAnimationParsed = animation.join(" ").toLowerCase();
	    }, animationParsed: "", closeAnimationParsed: "", _animationPrefix: "jconfirm-animation-", setAnimation: function setAnimation(animation) {
	      this.animation = animation || this.animation;this._parseAnimation(this.animation, "o");
	    }, _parseAnimation: function _parseAnimation(animation, which) {
	      which = which || "o";var animations = animation.split(",");var that = this;$.each(animations, function (k, a) {
	        if (a.indexOf(that._animationPrefix) == -1) {
	          animations[k] = that._animationPrefix + $.trim(a);
	        }
	      });var a_string = animations.join(" ").toLowerCase();if (which == "o") {
	        this.animationParsed = a_string;
	      } else {
	        this.closeAnimationParsed = a_string;
	      }return a_string;
	    }, setCloseAnimation: function setCloseAnimation(closeAnimation) {
	      this.closeAnimation = closeAnimation || this.closeAnimation;this._parseAnimation(this.closeAnimation, "c");
	    }, setAnimationSpeed: function setAnimationSpeed(speed) {
	      this.animationSpeed = speed || this.animationSpeed;
	    }, columnClassParsed: "", setColumnClass: function setColumnClass(colClass) {
	      this.columnClass = colClass || this.columnClass;this._parseColumnClass(this.columnClass);this.$jconfirmBoxContainer.addClass(this.columnClassParsed);
	    }, _parseColumnClass: function _parseColumnClass(colClass) {
	      colClass = colClass.toLowerCase();var p;switch (colClass) {case "xl":case "xlarge":
	          p = "col-md-12";break;case "l":case "large":
	          p = "col-md-8 col-md-offset-2";break;case "m":case "medium":
	          p = "col-md-6 col-md-offset-3";break;case "s":case "small":
	          p = "col-md-4 col-md-offset-4";break;case "xs":case "xsmall":
	          p = "col-md-2 col-md-offset-5";break;default:
	          p = colClass;}this.columnClassParsed = p;
	    }, _hash: function _hash(a) {
	      return btoa(encodeURIComponent(a));
	    }, _watchContent: function _watchContent() {
	      var that = this;if (this._timer) {
	        clearInterval(this._timer);
	      }this._timer = setInterval(function () {
	        var now = that._hash(that.$content.html());var nowHeight = that.$content.height();if (that._contentHash != now || that._contentHeight != nowHeight) {
	          that._contentHash = now;that._contentHeight = nowHeight;that.setDialogCenter();that._imagesLoaded();
	        }
	      }, this.watchInterval);
	    }, _hilightAnimating: false, _hiLightModal: function _hiLightModal() {
	      var that = this;if (this._hilightAnimating) {
	        return;
	      }that.$body.addClass("hilight");var duration = 2;this._hilightAnimating = true;setTimeout(function () {
	        that._hilightAnimating = false;that.$body.removeClass("hilight");
	      }, duration * 1000);
	    }, _bindEvents: function _bindEvents() {
	      var that = this;this.boxClicked = false;this.$scrollPane.click(function (e) {
	        if (!that.boxClicked) {
	          var buttonName = false;var shouldClose = false;var str;if (typeof that.backgroundDismiss == "function") {
	            str = that.backgroundDismiss();
	          } else {
	            str = that.backgroundDismiss;
	          }if (typeof str == "string" && typeof that.buttons[str] != "undefined") {
	            buttonName = str;shouldClose = false;
	          } else {
	            if (typeof str == "undefined" || !!str == true) {
	              shouldClose = true;
	            } else {
	              shouldClose = false;
	            }
	          }if (buttonName) {
	            var btnResponse = that.buttons[buttonName].action.apply(that);shouldClose = typeof btnResponse == "undefined" || !!btnResponse;
	          }if (shouldClose) {
	            that.close();
	          } else {
	            that._hiLightModal();
	          }
	        }that.boxClicked = false;
	      });this.$jconfirmBox.click(function (e) {
	        that.boxClicked = true;
	      });setTimeout(function () {
	        $(window).on("keyup." + that._id, function (e) {
	          that.reactOnKey(e);
	        });
	      }, 10);$(window).on("resize." + this._id, function () {
	        that.setDialogCenter(true);
	      });
	    }, _cubic_bezier: "0.36, 0.55, 0.19", _getCSS: function _getCSS(speed, bounce) {
	      return { "-webkit-transition-duration": speed / 1000 + "s", "transition-duration": speed / 1000 + "s", "-webkit-transition-timing-function": "cubic-bezier(" + this._cubic_bezier + ", " + bounce + ")", "transition-timing-function": "cubic-bezier(" + this._cubic_bezier + ", " + bounce + ")" };
	    }, _imagesLoaded: function _imagesLoaded() {
	      var that = this;if (that.imageLoadInterval) {
	        clearInterval(that.imageLoadInterval);
	      }$.each(this.$content.find("img:not(.loaded)"), function (i, a) {
	        that.imageLoadInterval = setInterval(function () {
	          var h = $(a).css("height");if (h !== "0px") {
	            $(a).addClass("loaded");clearInterval(that.imageLoadInterval);that.setDialogCenter();
	          }
	        }, 40);
	      });
	    }, _setButtons: function _setButtons() {
	      var that = this;var total_buttons = 0;if (_typeof(this.buttons) !== "object") {
	        this.buttons = {};
	      }$.each(this.buttons, function (key, button) {
	        total_buttons += 1;if (typeof button === "function") {
	          that.buttons[key] = button = { action: button };
	        }that.buttons[key].text = button.text || key;that.buttons[key].btnClass = button.btnClass || "btn-default";that.buttons[key].action = button.action || function () {};that.buttons[key].keys = button.keys || [];$.each(that.buttons[key].keys, function (i, a) {
	          that.buttons[key].keys[i] = a.toLowerCase();
	        });var button_element = $('<button type="button" class="btn ' + that.buttons[key].btnClass + '">' + that.buttons[key].text + "</button>").click(function (e) {
	          e.preventDefault();var res = that.buttons[key].action.apply(that);that.onAction(key);that._stopCountDown();if (typeof res === "undefined" || res) {
	            that.close();
	          }
	        });that.buttons[key].el = button_element;that.buttons[key].setText = function (text) {
	          button_element.html(text);
	        };that.buttons[key].addClass = function (className) {
	          button_element.addClass(className);
	        };that.buttons[key].removeClass = function (className) {
	          button_element.removeClass(className);
	        };that.buttons[key].disable = function () {
	          button_element.prop("disabled", true);
	        };that.buttons[key].enable = function () {
	          button_element.prop("disabled", false);
	        };that.buttons[key].show = function () {
	          button_element.css("display", "");that.setDialogCenter();
	        };that.buttons[key].hide = function () {
	          button_element.css("display", "none");that.setDialogCenter();
	        };that["$_" + key] = that["$$" + key] = button_element;that.$btnc.append(button_element);
	      });if (total_buttons === 0) {
	        this.$btnc.hide();
	      }if (this.closeIcon === null && total_buttons === 0) {
	        this.closeIcon = true;
	      }if (this.closeIcon) {
	        if (this.closeIconClass) {
	          var closeHtml = '<i class="' + this.closeIconClass + '"></i>';this.$closeIcon.html(closeHtml);
	        }this.$closeIcon.click(function (e) {
	          e.preventDefault();var buttonName = false;var shouldClose = false;var str;if (typeof that.closeIcon == "function") {
	            str = that.closeIcon();
	          } else {
	            str = that.closeIcon;
	          }if (typeof str == "string" && typeof that.buttons[str] != "undefined") {
	            buttonName = str;shouldClose = false;
	          } else {
	            if (typeof str == "undefined" || !!str == true) {
	              shouldClose = true;
	            } else {
	              shouldClose = false;
	            }
	          }if (buttonName) {
	            var btnResponse = that.buttons[buttonName].action.apply(that);shouldClose = typeof btnResponse == "undefined" || !!btnResponse;
	          }if (shouldClose) {
	            that.close();
	          }
	        });this.$closeIcon.show();
	      } else {
	        this.$closeIcon.hide();
	      }
	    }, setTitle: function setTitle(string, force) {
	      force = force || false;if (typeof string !== "undefined") {
	        if (typeof string == "string") {
	          this.title = string;
	        } else {
	          if (typeof string == "function") {
	            if (typeof string.promise == "function") {
	              console.error("Promise was returned from title function, this is not supported.");
	            }var response = string();if (typeof response == "string") {
	              this.title = response;
	            } else {
	              this.title = false;
	            }
	          } else {
	            this.title = false;
	          }
	        }
	      }if (this.isAjax && !force) {
	        return;
	      }this.$title.html(this.title || "");
	    }, setIcon: function setIcon(iconClass, force) {
	      force = force || false;if (typeof iconClass !== "undefined") {
	        if (typeof iconClass == "string") {
	          this.icon = iconClass;
	        } else {
	          if (typeof iconClass === "function") {
	            var response = iconClass();if (typeof response == "string") {
	              this.icon = response;
	            } else {
	              this.icon = false;
	            }
	          } else {
	            this.icon = false;
	          }
	        }
	      }if (this.isAjax && !force) {
	        return;
	      }this.$icon.html(this.icon ? '<i class="' + this.icon + '"></i>' : "");
	    }, setContentPrepend: function setContentPrepend(string, force) {
	      this.contentParsed = string + this.contentParsed;if (this.isAjaxLoading && !force) {
	        return;
	      }this.$content.prepend(string);
	    }, setContentAppend: function setContentAppend(string, force) {
	      this.contentParsed = this.contentParsed + string;if (this.isAjaxLoading && !force) {
	        return;
	      }this.$content.append(string);
	    }, setContent: function setContent(string, force) {
	      force = force || false;var that = this;this.contentParsed = typeof string == "undefined" ? this.contentParsed : string;if (this.isAjaxLoading && !force) {
	        return;
	      }this.$content.html(this.contentParsed);this.setDialogCenter();setTimeout(function () {
	        that.$body.find("input[autofocus]:visible:first").focus();
	      }, 100);
	    }, loadingSpinner: false, showLoading: function showLoading(disableButtons) {
	      this.loadingSpinner = true;this.$jconfirmBox.addClass("loading");if (disableButtons) {
	        this.$btnc.find("button").prop("disabled", true);
	      }this.setDialogCenter();
	    }, hideLoading: function hideLoading(enableButtons) {
	      this.loadingSpinner = false;this.$jconfirmBox.removeClass("loading");if (enableButtons) {
	        this.$btnc.find("button").prop("disabled", false);
	      }this.setDialogCenter();
	    }, ajaxResponse: false, contentParsed: "", isAjax: false, isAjaxLoading: false, _parseContent: function _parseContent() {
	      var that = this;var e = "&nbsp;";if (typeof this.content == "function") {
	        var res = this.content.apply(this);if (typeof res == "string") {
	          this.content = res;
	        } else {
	          if ((typeof res === "undefined" ? "undefined" : _typeof(res)) == "object" && typeof res.always == "function") {
	            this.isAjax = true;this.isAjaxLoading = true;res.always(function (data, status, xhr) {
	              that.ajaxResponse = { data: data, status: status, xhr: xhr };that._contentReady.resolve(data, status, xhr);if (typeof that.contentLoaded == "function") {
	                that.contentLoaded(data, status, xhr);
	              }
	            });this.content = e;
	          } else {
	            this.content = e;
	          }
	        }
	      }if (typeof this.content == "string" && this.content.substr(0, 4).toLowerCase() === "url:") {
	        this.isAjax = true;this.isAjaxLoading = true;var u = this.content.substring(4, this.content.length);$.get(u).done(function (html) {
	          that.contentParsed = html;
	        }).always(function (data, status, xhr) {
	          that.ajaxResponse = { data: data, status: status, xhr: xhr };that._contentReady.resolve(data, status, xhr);if (typeof that.contentLoaded == "function") {
	            that.contentLoaded(data, status, xhr);
	          }
	        });
	      }if (!this.content) {
	        this.content = e;
	      }if (!this.isAjax) {
	        this.contentParsed = this.content;this.setContent(this.contentParsed);that._contentReady.resolve();
	      }
	    }, _stopCountDown: function _stopCountDown() {
	      clearInterval(this.autoCloseInterval);if (this.$cd) {
	        this.$cd.remove();
	      }
	    }, _startCountDown: function _startCountDown() {
	      var that = this;var opt = this.autoClose.split("|");if (opt.length !== 2) {
	        console.error("Invalid option for autoClose. example 'close|10000'");return false;
	      }var button_key = opt[0];var time = parseInt(opt[1]);if (typeof this.buttons[button_key] === "undefined") {
	        console.error("Invalid button key '" + button_key + "' for autoClose");return false;
	      }var seconds = time / 1000;this.$cd = $('<span class="countdown"> (' + seconds + ")</span>").appendTo(this["$_" + button_key]);this.autoCloseInterval = setInterval(function () {
	        that.$cd.html(" (" + (seconds -= 1) + ") ");if (seconds === 0) {
	          that["$$" + button_key].trigger("click");that._stopCountDown();
	        }
	      }, 1000);
	    }, _getKey: function _getKey(key) {
	      switch (key) {case 192:
	          return "tilde";case 13:
	          return "enter";case 16:
	          return "shift";case 9:
	          return "tab";case 20:
	          return "capslock";case 17:
	          return "ctrl";case 91:
	          return "win";case 18:
	          return "alt";case 27:
	          return "esc";case 32:
	          return "space";}var initial = String.fromCharCode(key);if (/^[A-z0-9]+$/.test(initial)) {
	        return initial.toLowerCase();
	      } else {
	        return false;
	      }
	    }, reactOnKey: function reactOnKey(e) {
	      var that = this;var a = $(".jconfirm");if (a.eq(a.length - 1)[0] !== this.$el[0]) {
	        return false;
	      }var key = e.which;if (this.$content.find(":input").is(":focus") && /13|32/.test(key)) {
	        return false;
	      }var keyChar = this._getKey(key);if (keyChar === "esc" && this.escapeKey) {
	        if (this.escapeKey === true) {
	          this.$scrollPane.trigger("click");
	        } else {
	          if (typeof this.escapeKey === "string" || typeof this.escapeKey === "function") {
	            var buttonKey;if (typeof this.escapeKey === "function") {
	              buttonKey = this.escapeKey();
	            } else {
	              buttonKey = this.escapeKey;
	            }if (buttonKey) {
	              if (typeof this.buttons[buttonKey] === "undefined") {
	                console.warn("Invalid escapeKey, no buttons found with key " + buttonKey);
	              } else {
	                this["$_" + buttonKey].trigger("click");
	              }
	            }
	          }
	        }
	      }$.each(this.buttons, function (key, button) {
	        if (button.keys.indexOf(keyChar) != -1) {
	          that["$_" + key].trigger("click");
	        }
	      });
	    }, setDialogCenter: function setDialogCenter() {
	      var contentHeight;var paneHeight;var style;contentHeight = 0;paneHeight = 0;if (this.$contentPane.css("display") != "none") {
	        contentHeight = this.$content.outerHeight() || 0;paneHeight = this.$contentPane.height() || 0;
	      }var children = this.$content.children();if (children.length != 0) {
	        var marginTopChild = parseInt(children.eq(0).css("margin-top"));if (marginTopChild) {
	          contentHeight += marginTopChild;
	        }
	      }if (paneHeight == 0) {
	        paneHeight = contentHeight;
	      }var windowHeight = $(window).height();var boxHeight;boxHeight = this.$body.outerHeight() - paneHeight + contentHeight;var topMargin = (windowHeight - boxHeight) / 2;var minMargin = 100;if (boxHeight > windowHeight - minMargin) {
	        style = { "margin-top": minMargin / 2, "margin-bottom": minMargin / 2 };$("body").addClass("jconfirm-no-scroll-" + this._id);
	      } else {
	        style = { "margin-top": topMargin, "margin-bottom": minMargin / 2 };$("body").removeClass("jconfirm-no-scroll-" + this._id);
	      }this.$contentPane.css({ height: contentHeight }).scrollTop(0);this.$body.css(style);
	    }, _unwatchContent: function _unwatchContent() {
	      clearInterval(this._timer);
	    }, close: function close() {
	      var that = this;if (typeof this.onClose === "function") {
	        this.onClose();
	      }this._unwatchContent();clearInterval(this.imageLoadInterval);$(window).unbind("resize." + this._id);$(window).unbind("keyup." + this._id);$("body").removeClass("jconfirm-no-scroll-" + this._id);this.$body.addClass(this.closeAnimationParsed);this.$jconfirmBg.addClass("jconfirm-bg-h");var closeTimer = this.closeAnimation == "none" ? 1 : this.animationSpeed;setTimeout(function () {
	        that.$el.remove();console.log(that._lastFocused);if (that._lastFocused.length && $.contains(document, that._lastFocused[0])) {
	          var st = $(window).scrollTop();var ot = that._lastFocused.offset().top;var wh = $(window).height();if (!(ot > st && ot < st + wh)) {
	            $("html, body").animate({ scrollTop: ot - Math.round(wh / 3) }, that.animationSpeed, "swing", function () {
	              that._lastFocused.focus();
	            });
	          } else {
	            that._lastFocused.focus();
	          }
	        }if (typeof that.onDestroy == "function") {
	          that.onDestroy();
	        }
	      }, closeTimer * 0.4);return true;
	    }, open: function open() {
	      this._buildHTML();this._bindEvents();this._open();return true;
	    }, _open: function _open() {
	      var that = this;if (typeof that.onOpenBefore == "function") {
	        that.onOpenBefore();
	      }this.$body.removeClass(this.animationParsed);this.$jconfirmBg.removeClass("jconfirm-bg-h");this.$body.focus();setTimeout(function () {
	        that.$body.css(that._getCSS(that.animationSpeed, 1));that.$body.css({ "transition-property": that.$body.css("transition-property") + ", margin" });that._modalReady.resolve();if (typeof that.onOpen === "function") {
	          that.onOpen();
	        }
	      }, this.animationSpeed);
	    }, isClosed: function isClosed() {
	      return this.$el.css("display") === "";
	    }, isOpen: function isOpen() {
	      return !this.isClosed();
	    }, toggle: function toggle() {
	      if (!this.isOpen()) {
	        this.open();
	      } else {
	        this.close();
	      }
	    } };_jconfirm.instances = [];_jconfirm.pluginDefaults = { template: '<div class="jconfirm"><div class="jconfirm-bg jconfirm-bg-h"></div><div class="jconfirm-scrollpane"><div class="jc-bs3-container"><div class="jc-bs3-row"><div class="jconfirm-box-container"><div class="jconfirm-box" role="dialog" aria-labelledby="labelled" tabindex="-1"><div class="jconfirm-closeIcon">&times;</div><div class="jconfirm-title-c"><span class="jconfirm-icon-c"></span><span class="jconfirm-title"></span></div><div class="jconfirm-content-pane"><div class="jconfirm-content"></div></div><div class="jconfirm-buttons"></div><div class="jconfirm-clear"></div></div></div></div></div></div></div>', title: "Hello", titleClass: "", type: "default", typeAnimated: true, content: "Are you sure to continue?", buttons: {}, defaultButtons: { ok: { action: function action() {} }, close: { action: function action() {} } }, contentLoaded: function contentLoaded() {}, icon: "", bgOpacity: null, theme: "light", animation: "zoom", closeAnimation: "scale", animationSpeed: 400, animationBounce: 1.2, escapeKey: true, rtl: false, container: "body", containerFluid: false, backgroundDismiss: false, backgroundDismissAnimation: "shake", autoClose: false, closeIcon: null, closeIconClass: false, watchInterval: 100, columnClass: "col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1", boxWidth: "50%", useBootstrap: true, bootstrapClasses: { container: "container", containerFluid: "container-fluid", row: "row" }, onContentReady: function onContentReady() {}, onOpenBefore: function onOpenBefore() {}, onOpen: function onOpen() {}, onClose: function onClose() {}, onDestroy: function onDestroy() {}, onAction: function onAction() {} };
	})(jQuery);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }

});