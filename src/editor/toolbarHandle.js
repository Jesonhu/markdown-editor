import UTIL from '../util/Util';
import CONFIG from './config';
import CM from './codemirror';

const { isMac, toggleClass, addClass, removeClass } = UTIL;
const { baseUrl, gitGubUrl } = CONFIG;
const { getState } = CM;


let EDITOR = null;
/**
 * 工具栏功能
 */

 /** 
  * Action fro toggle Bold.
  * `加粗` 图标处理功能
  */
const toggleBold = (e) => {
  e = e || windowl.event;
  const self = e.currentTarget;
  const editor = self.$editor;
  const cm = editor.$codemirror;

  // 获取当前激活的类型
  const type = self.getAttribute('data-name') || 'bold';
  // 当前块对应的 markdown 类型.
  const blockStyles = editor._options.$tools.blockStyles[type];

  const stat = getState(cm);
  // 插入内容
  let text;
  let startChars = blockStyles;
  let endChars = blockStyles;

  let startPoint = cm.getCursor('start');
  let endPoint = cm.getCursor('end');

  // 当前激活的类型
  if (stat[type]) {
    // text = cm.getLine(startPoint.line);
    // startChars = text.slice(0, startPoint.ch);
    // endChars = text.slice(startPoint.ch);

    // if(type == "bold") {
		// 	startChars = startChars.replace(/(\*\*|__)(?![\s\S]*(\*\*|__))/, "");
		// 	endChars = endChars.replace(/(\*\*|__)/, "");
		// } else if(type == "italic") {
		// 	startChars = startChars.replace(/(\*|_)(?![\s\S]*(\*|_))/, "");
		// 	endChars = endChars.replace(/(\*|_)/, "");
		// } else if(type == "strikethrough") {
		// 	startChars = startChars.replace(/(\*\*|~~)(?![\s\S]*(\*\*|~~))/, "");
		// 	endChars = endChars.replace(/(\*\*|~~)/, "");
    // }
    
    // cm.replaceRange(startChars + endChars, {
    //   line: startPoint.line,
    //   ch: 0
    // }, {
    //   line: startPoint.line,
    //   ch: 99999999999999
    // });
  } else { // 需要插入的内容
    text = cm.getSelection();

    if(type == "bold") {
			text = text.split("**").join("");
			text = text.split("__").join("");
		} else if(type == "italic") {
			text = text.split("*").join("");
			text = text.split("_").join("");
		} else if(type == "strikethrough") {
			text = text.split("~~").join("");
    }
    cm.replaceSelection(startChars + text + endChars);

    startPoint.ch += startChars.length;
    endPoint.ch = startPoint.ch + text.length;
  }

  cm.setSelection(startPoint, endPoint);
  cm.focus();
}

/** 
 * Action fro toggle Italic.
 * `斜体` 图标处理功能
 */
const toggleItalic = (e) => {
  e = e || windowl.event;
  const self = e.currentTarget;
  const editor = self.$editor;
  const cm = editor.$codemirror;

  // 获取当前激活的类型
  const type = self.getAttribute('data-name') || 'italic';
  // 当前块对应的 markdown 类型.
  const blockStyles = editor._options.$tools.blockStyles[type];
  const stat = getState(cm);
  // 插入内容
  let text;
  let startChars = blockStyles;
  let endChars = blockStyles;

  let startPoint = cm.getCursor('start');
  let endPoint = cm.getCursor('end');

  // 当前激活的类型
  if (stat[type]) {
    
  } else { // 需要插入的内容
    text = cm.getSelection();

    if(type == "bold") {
			text = text.split("**").join("");
			text = text.split("__").join("");
		} else if(type == "italic") {
			text = text.split("*").join("");
			text = text.split("_").join("");
		} else if(type == "strikethrough") {
			text = text.split("~~").join("");
    }
    cm.replaceSelection(startChars + text + endChars);

    startPoint.ch += startChars.length;
    endPoint.ch = startPoint.ch + text.length;
  }

  cm.setSelection(startPoint, endPoint);
  cm.focus();
}

// 标题相关 start =========================
/**
 * Action for toggle Heading.
 * `标题` 图标处理功能
 */
const toggleHeading = (e) => {
  e = e || windowl.event;
  const self = e.currentTarget;
  const editor = self.$editor;
  const cm = editor.$codemirror;

  // 获取当前激活的类型
  const type = self.getAttribute('data-name') || 'Heading';
  // 当前块对应的 markdown 类型.
  const blockStyles = editor._options.$tools.blockStyles[type];
  const stat = getState(cm);
  
  let startChars = blockStyles;
  let endChars = blockStyles;

  let startPoint = cm.getCursor('start');
  let endPoint = cm.getCursor('end');

  for (let i = startPoint.line; i <= endPoint.line; i++) {
    // 插入内容
    let text = cm.getLine(i);
    const currHeadingLevel = text.search(/[^#]/);

    text = "# " + text.substr(currHeadingLevel + 1);

    cm.replaceRange(text, {
      line: i,
      ch: 0
    }, {
      line: i,
      ch: 99999999999999
    });
  }

  cm.focus();
}

/**
 * Action for toggling heading size: normal -> h1 -> h2 -> h3 -> h4 -> h5 -> h6 -> normal
 * `小标题` 处理功能
 */
const toggleHeadingSmaller = (e) => {

}

/**
 * Action for toggling heading size: normal -> h6 -> h5 -> h4 -> h3 -> h2 -> h1 -> normal
 * `大标题` 处理功能
 */
const toggleHeadingBigger = (e) => {
  
}

// 标题相关 end =========================

/**
 * Action for toggle Blockquote.
 * `引号` 处理功能
 */
const toggleBlockquote = (e) => {
  e = e || windowl.event;
  const self = e.currentTarget;
  const editor = self.$editor;
  const cm = editor.$codemirror;

  // 获取当前激活的类型
  const type = self.getAttribute('data-name') || 'quote';
  // 当前块对应的 markdown 类型.
  const blockStyles = editor._options.$tools.blockStyles[type];
  const stat = getState(cm);
  let startChars = blockStyles;
  let endChars = blockStyles;
  let startPoint = cm.getCursor('start');
  let endPoint = cm.getCursor('end');
  const repl = {
		"quote": /^(\s*)\>\s+/,
		"unordered-list": /^(\s*)(\*|\-|\+)\s+/,
		"ordered-list": /^(\s*)\d+\.\s+/
	};
	const map = {
		"quote": "> ",
		"unordered-list": "* ",
		"ordered-list": "1. "
  };
  
  for (let i = startPoint.line; i <= endPoint.line; i++) {
    let text = cm.getLine(i);
    if(stat[type]) {
      text = text.replace(repl[type], '$1');
    } else {
      text = map[type] + text;
    }

    cm.replaceRange(text, {
      line: i,
      ch: 0
    }, {
      line: i,
      ch: 99999999999999
    });
  }
  cm.focus();

}

/**
 * Action for toggle code.
 * `代码块` 处理功能.
 */
const toggleCodeBlock = (e) => {
  e = e || windowl.event;
  const self = e.currentTarget;
  const editor = self.$editor;
  const cm = editor.$codemirror;

  // 获取当前激活的类型
  const type = self.getAttribute('data-name') || 'code';
  // 当前块对应的 markdown 类型.
  const blockStyles = editor._options.$tools.blockStyles[type];
  const stat = getState(cm);
  // 插入内容
  let text;
  let startChars = blockStyles;
  let endChars = blockStyles;

  let startPoint = cm.getCursor('start');
  let endPoint = cm.getCursor('end');

  // 当前激活的类型
  if (stat[type]) {
    
  } else { // 需要插入的内容
    text = cm.getSelection();

    if(type == "bold") {
			text = text.split("**").join("");
			text = text.split("__").join("");
		} else if(type == "italic") {
			text = text.split("*").join("");
			text = text.split("_").join("");
		} else if(type == "strikethrough") {
			text = text.split("~~").join("");
    } else if (type == "code") {
      text = '\n\n';
    }
    cm.replaceSelection(startChars + text + endChars);

    startPoint.ch += startChars.length;
    endPoint.ch = startPoint.ch + text.length;
  }

  // cm.setSelection(startPoint, endPoint);
  cm.setSelection(startPoint, startPoint);
  cm.focus();
}

/**
 * Action for toggle UnorderedList.
 * `无序列表` 处理功能
 */
const toggleUnorderedList = (e) => {
  toggleBlockquote(e);
}

/**
 * Action for toggleOrderedList.
 * `有序列表` 处理功能.
 */
const toggleOrderedList = (e) => {
  toggleBlockquote(e);
}

/**
 * Action for drawImage.
 * `图片` 处理功能.
 */
const drawImage = (e) => {
  e = e || windowl.event;
  const self = e.currentTarget;
  const editor = self.$editor;
  const cm = editor.$codemirror;

  // 获取当前激活的类型
  const type = self.getAttribute('data-name') || 'quote';

  // 当前块对应的 markdown 类型.
  const insertTexts = editor._options.$tools.insertTexts[type];

  const stat = getState(cm);
  let url = '';
  
  // url = prompt('请输入图片地址', '');
  // if (!url) return false;
  _replaceSelection(cm, stat.image, insertTexts, url);
}

/**
 * Action for drawLink.
 * `链接` 处理功能.
 */
const drawLink = (e) => {
  e = e || windowl.event;
  const self = e.currentTarget;
  const editor = self.$editor;
  const cm = editor.$codemirror;

  // 获取当前激活的类型
  const type = self.getAttribute('data-name') || 'quote';

  // 当前块对应的 markdown 类型.
  const insertTexts = editor._options.$tools.insertTexts[type];

  const stat = getState(cm);
  let url = '';
  
  // url = prompt('请输入链接', '');
  // if (!url) return false;
  _replaceSelection(cm, stat.link, insertTexts, url);
}

/**
 * 图片和地址插入内容处理. 
 */
function _replaceSelection(cm, active, startEnd, url) {
	var text;
	var start = startEnd[0];
	var end = startEnd[1];
	var startPoint = cm.getCursor("start");
	var endPoint = cm.getCursor("end");
	// if(url) {
  //   end = end.replace("#url#", url);
  // }
  end = end.replace("#url#", url);
	if(active) {
		text = cm.getLine(startPoint.line);
		start = text.slice(0, startPoint.ch);
		end = text.slice(startPoint.ch);
		cm.replaceRange(start + end, {
			line: startPoint.line,
			ch: 0
		});
	} else {
		text = cm.getSelection();
    cm.replaceSelection(start + text + end);

		startPoint.ch += start.length;
		if(startPoint !== endPoint) {
			endPoint.ch += start.length;
		}
	}
	cm.setSelection(startPoint, endPoint);
  cm.focus();
}

/**
 * Action for Back.
 * 返回一步(撤销). 
 */
const onUndo = (e) => {
  e = e || window.event;
  const self = e.currentTarget;
  const editor = self.$editor;

  if (!EDITOR) EDITOR = editor;

  const cm = editor.$codemirror;
  if (cm) {
    const history = cm.getHistory();
    console.log('回退', history);
    cm.undoSelection();
  }
}

/**
 * Action for Front.
 * 前进一步(重做).
 */
const onRedo = (e) => {
  e = e || window.event;
  const self = e.currentTarget;
  const editor = self.$editor;

  if (!EDITOR) EDITOR = editor;

  const cm = editor.$codemirror;
  if (cm) {
    const history = cm.getHistory();
    console.log('取消撤销', history);
    cm.redoSelection();
  }
}

/**
 * 仅显示编辑部分
 */
const openEdit = (e) => {
  e = e || window.event;
  const self = e.currentTarget;
  const editor = self.$editor;

  if (!EDITOR) EDITOR = editor;
  const isOnlyEdit = EDITOR.$status['isOnlyEdit'];

  // 当前只显示编辑效果
  if (isOnlyEdit) return;

  EDITOR.$status['isOnlyEdit'] = true;
  EDITOR.$status['isOnlyPreview'] = !EDITOR.$status['isOnlyEdit'];
  EDITOR.$status['isShowAll'] = !EDITOR.$status['isOnlyEdit'];

  toggleClass(self, 'active');

  // 隐藏 `预览容器`，显示 `内容编辑容器`.
  const editorEl = EDITOR._options.el;
  const previewEl = editorEl.querySelector('.editor-preview');
  const mdEl = editorEl.querySelector('.editor-md');
  if (mdEl) removeClass(mdEl, 'hide');
  if (previewEl) addClass(previewEl, 'hide');

  // `只显示预览图标` 去掉激活状态.
  const toolPreviewEl = editorEl.querySelector('.editor-tools').querySelector('.icon-eye');
  const toolShowAllEl = editorEl.querySelector('.editor-tools').querySelector('.icon-columns');
  if (toolPreviewEl) removeClass(toolPreviewEl, 'active');
  if (toolShowAllEl) removeClass(toolShowAllEl, 'active');
}

/**
 * 显示编辑和预览.
 */
const openCompare = (e) => {
  e = e || window.event;
  const self = e.currentTarget;
  const editor = self.$editor;

  if (!EDITOR) EDITOR = editor;
  const isShowAll = EDITOR.$status['isShowAll'];

  // 当前只显示编辑效果
  if (isShowAll) return;

  EDITOR.$status['isShowAll'] = true;
  EDITOR.$status['isOnlyPreview'] = !EDITOR.$status['isShowAll'];
  EDITOR.$status['isOnlyEdit'] = !EDITOR.$status['isShowAll'];

  toggleClass(self, 'active');

  // 显示 `预览容器`，显示 `内容编辑容器`.
  const editorEl = EDITOR._options.el;
  const previewEl = editorEl.querySelector('.editor-preview');
  const mdEl = editorEl.querySelector('.editor-md');
  if (mdEl) removeClass(mdEl, 'hide');
  if (previewEl) removeClass(previewEl, 'hide');

  // 去掉 `编辑` `预览` 激活效果.
  const toolEditEl = editorEl.querySelector('.editor-tools').querySelector('.icon-pen');
  const toolPreviewEl = editorEl.querySelector('.editor-tools').querySelector('.icon-eye');
  if (toolEditEl) removeClass(toolEditEl, 'active');
  if (toolPreviewEl) removeClass(toolPreviewEl, 'active');
}

/**
 * 仅显示预览部分. 
 */
const openPreview = (e) => {
  e = e || window.event;
  const self = e.currentTarget;
  const editor = self.$editor;

  if (!EDITOR) EDITOR = editor;
  const isOnlyPreview = EDITOR.$status['isOnlyPreview'];

  // 当前只显示预览视图.
  if (isOnlyPreview) return;

  EDITOR.$status['isOnlyPreview'] = true;
  EDITOR.$status['isOnlyEdit'] = !EDITOR.$status['isOnlyPreview'];
  EDITOR.$status['isShowAll'] = !EDITOR.$status['isOnlyPreview'];

  toggleClass(self, 'active');

  // 显示： `预览容器`，隐藏：`内容编辑容器`.
  const editorEl = EDITOR._options.el;
  const mdEl = editorEl.querySelector('.editor-md');
  const previewEl = editorEl.querySelector('.editor-preview');
  if (mdEl) addClass(mdEl, 'hide');
  if (previewEl) removeClass(previewEl, 'hide');

  // `只显示编辑图标` 去掉激活状态
  const toolEditEl = editorEl.querySelector('.editor-tools').querySelector('.icon-pen');
  const toolShowAllEl = editorEl.querySelector('.editor-tools').querySelector('.icon-columns');
  if (toolEditEl) removeClass(toolEditEl, 'active');
  if (toolShowAllEl) removeClass(toolShowAllEl, 'active');
}

/**
 * 全屏按钮点击处理回调. 
 */
const openFullScreen = (e) => {
  commoFnHanlde(e);

  const editorEl = EDITOR._options.el;

  toggleClass(editorEl, 'fullscreen');
}

/**
 * `关于` 点击处理回调.
 */
const aboutEditor = () => {
  window.open(gitGubUrl);
}

/**
 * Tools 图标点击回调处理函数中相同的处理部分. 
 * 
 * @param {Object} e 触发图标对应回调的事件对象.
 * @return {Object} editor 编辑器实例对象.
 */
function commoFnHanlde (e) {
  e = e || window.event;
  const self = e.currentTarget;
  const editor = self.$editor;

  toggleClass(self, 'active');

  if (!EDITOR) EDITOR = editor;

  return editor;
}

// 按钮定义
const toolbarBuiltInButtons = {
  'bold': {
    name: 'bold',
    action: toggleBold,
    className: 'icon-bold',
    title: 'Bold',
    default: true,
    index: 0,
    isEditTools: true
  },
  'italic': {
    name: 'italic',
    action: toggleItalic,
    className: 'icon-italic',
    title: 'Italic',
    default: true,
    index: 1,
    isEditTools: true
  },
  'heading': {
    name: 'heading',
    action: toggleHeading,
    className: 'icon-heading',
    title: 'Heading',
    default: true,
    index: 2,
    isEditTools: true
  },
  'quote': {
    name: 'quote',
    action: toggleBlockquote,
    className: 'icon-quotation-marks',
    title: 'Quote',
    default: true,
    index: 3,
    isEditTools: true
  },
  'code': {
    name: 'code',
    action: toggleCodeBlock,
    className: 'icon-code',
    title: 'Code',
    default: true,
    index: 4,
    isEditTools: true
  },
  'unordered-list': {
    name: 'unordered-list',
    className: 'icon-Listofissues',
    action: toggleUnorderedList,
    title: 'Generic List',
    default: true,
    index: 5,
    isEditTools: true
  },
  'ordered-list': {
    name: 'ordered-list',
    className: 'icon-list',
    action: toggleOrderedList,
    title: 'Number List',
    default: true,
    index: 6,
    isEditTools: true
  },
  'link': {
    name: 'link',
    className: 'icon-link',
    action: drawLink,
    title: 'Insert Link',
    default: true,
    index: 7,
    isEditTools: true
  },
  'image': {
    name: 'image',
    className: 'icon-img',
    action: drawImage,
    title: 'Insert Image',
    default: true,
    index: 8,
    isEditTools: true
  },
  'undo': {
    name: 'undo',
    className: 'icon-goLeft',
    action: onUndo,
    title: 'Undo',
    default: true,
    index: 9,
    isEditTools: true
  },
  'redo': {
    name: 'redo',
    className: 'icon-goRight',
    action: onRedo,
    title: 'Redo',
    default: true,
    index: 10,
    isEditTools: true
  },
  'about': {
    name: 'about',
    className: 'icon-question',
    action: aboutEditor,
    title: 'About Editor',
    default: true,
    index: 0,
    isEditTools: false
  },
  'edit': {
    name: 'edit',
    className: 'icon-pen',
    action: openEdit,
    title: 'Toggle Edit',
    default: true,
    index: 1,
    isEditTools: false
  },
  'compare': {
    name: 'compare',
    className: 'icon-columns',
    action: openCompare,
    title: 'Toggle Compare',
    default: true,
    index: 2,
    isEditTools: false
  },
  'preview': {
    name: 'preview',
    className: 'icon-eye',
    action: openPreview,
    title: 'Toggle Preview',
    default: true,
    index: 3,
    isEditTools: false
  },
  'fullscreen': {
    name: 'fullscreen',
    className: 'icon-full-screen',
    action: openFullScreen,
    title: 'Toggle Fullscreen',
    default: true,
    index: 4,
    isEditTools: false
  },

}

/** 格式 */
const insertTexts = {
  link: ["[", "](#url#)"],
	image: ["![](", "#url#)"],
	table: ["", "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text     | Text     |\n\n"],
	horizontalRule: ["", "\n\n-----\n\n"]
}

/** 远程的文字. */
const promptTexts = {
	link: "URL for the link:",
	image: "URL of the image:"
}

/** Markdown 缩写 */
const blockStyles = {
  "bold": "**",
	"code": "```",
	"italic": "*"
}

/** 快捷键 */
const shortcuts = {
  "bold": "Cmd-B",
	"italic": "Cmd-I",
	"link": "Cmd-K",
  "heading": "Cmd-H",
  "quote": "Cmd-'",
	"toggleHeadingBigger": "Shift-Cmd-H",
	"cleanBlock": "Cmd-E",
  "image": "Cmd-Alt-I",
  "back": "Cmd-Z",
  "front": "Cmd-Y",
	"toggleBlockquote": "Cmd-'",
	"ordered-list": "Cmd-Alt-L",
	"unordered-list": "Cmd-L",
	"toggleCodeBlock": "Cmd-Alt-C",
	"togglePreview": "Cmd-P",
	"toggleSideBySide": "F9",
	"toggleFullScreen": "F11"
}

/**
 * 快捷键针对不同系统做兼容处理.
 * @param {objet} name 
 * @desc win: Ctrl; mac: Cmd
 */
const fixShortcut = (name) => {
  if (isMac) {
    name = name.replace('Ctrl', 'Cmd');
  } else {
    name = name.replace('Cmd', 'Ctrl');
  }
  return name;
}

export default {
  // 工具条图标、类名、回调函数等.
  toolbarBuiltInButtons,

  insertTexts,

  promptTexts,

  blockStyles,

  // 快捷键
  shortcuts,

  // Ctrl(Win OS) 还是 Cmd(Mac OS)
  fixShortcut,

}