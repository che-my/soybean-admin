// 字体大小
const fontSizeFormats = '14px 16px 18px 24px 28px 32px 36px 48px 56px 64px 72px';
// 字体
const fontFamilyFormats =
  "微软雅黑='微软雅黑';宋体='宋体';黑体='黑体';仿宋='仿宋';楷体='楷体';隶书='隶书';幼圆='幼圆';Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings";
const toobars = [
  'undo redo',
  'indent outdent',
  'blocks fontfamily fontsize forecolor backcolor',
  'bold italic underline strikethrough',
  'lineheight align',
  'superscript subscript',
  'link unlink anchor',
  'numlist bullist',
  'listprops',
  'image media table',
  'emoticons charmap insertdatetime',
  'removeformat codesample preview code',
  'fullscreen',
  'FileManager'
];
// export const plugins = [
// 	'advlist anchor autolink autosave code codesample  directionality  fullscreen hr insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus  template  textpattern visualblocks visualchars wordcount',
// ];
//
// export const toolbar = [
// 	'fontsizeselect lineheight searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample',
// 	'hr bullist numlist link  preview anchor pagebreak insertdatetime media  forecolor backcolor fullscreen',
// ];

export const plugins = [
  'anchor autoresize nonbreaking pagebreak quickbars',
  'lists advlist charmap insertdatetime searchreplace',
  'link image media table quickbars preview wordcount emoticons',
  'fullscreen code codesample'
];

const contentStyle = `
.mce-content-body,.tox-collection__group{
	scrollbar-width: thin;
	scrollbar-color: #979797 transparent;
}
.mce-content-body::-webkit-scrollbar-thumb{
	background-color: #979797;
	border-radius: 10px;
}
.mce-content-body::-webkit-scrollbar-thumb:hover{
	background-color: #979797;
	border-radius: 10px;
}
.mce-content-body::-webkit-scrollbar{
	width: 10px;
	height: 10px;
}
.mce-content-body::-webkit-scrollbar-track-piece{
	background-color: rgba(0, 0, 0, 0);
	border-radius: 0;
}
`;

export default {
  toolbar: toobars.join(' '),
  // browser_spellcheck: true, // 拼写检查
  // branding: false, // 去水印
  // paste_data_images: true, // 允许粘贴图像
  // 字体单位
  font_size_input_default_unit: 'px',
  // 字体大小,
  font_size_formats: fontSizeFormats,
  // 字体
  font_family_formats: fontFamilyFormats,
  // 隐藏最上方menu
  // menubar: false,
  // 隐藏编辑器底部的状态栏
  statusbar: true,
  quickbars_insert_toolbar: 'quicktable emoticons charmap image media codesample',
  quickbars_selection_toolbar:
    'removeformat bold italic underline strikethrough fontfamily fontsize forecolor backcolor',
  plugins: plugins.join(' '),
  end_container_on_empty_block: true, // enter键 分块
  powerpaste_word_import: 'merge', // 是否保留word粘贴样式  clean | merge
  code_dialog_height: 450, // 代码框高度 、宽度
  code_dialog_width: 1000,
  advlist_bullet_styles: 'square', // 无序列表 有序列表
  advlist_number_styles: 'default',
  link_default_target: '_blank',
  link_title: false,
  contextmenu: false,
  promotion: false,
  plugin_preview_width: 475, // 预览宽度
  plugin_preview_height: 668, // 预览宽度
  nonbreaking_force_tab: false, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
  codesample_global_prismjs: true,
  content_style: contentStyle,
  images_upload_credentials: true,
  allow_html_in_named_anchor: true,
  autoresize_bottom_margin: 50,
  max_height: 500,
  pagebreak_split_block: true,
  insertdatetime_formats: ['%H:%M:%S', '%Y-%m-%d', '%Y-%m-%d %H:%M:%S', '%I:%M:%S %p', '%D']
};
