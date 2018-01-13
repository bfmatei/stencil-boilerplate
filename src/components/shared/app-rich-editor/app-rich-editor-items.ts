import {
  AppRichEditorMenuButtonConfig,
  AppRichEditorMenuSeparatorConfig
} from './app-rich-editor-menu-item/app-rich-editor-menu-item.interface';

export const separator: AppRichEditorMenuSeparatorConfig = {
  type: 'separator'
};

export const boldButton: AppRichEditorMenuButtonConfig = {
  type: 'button',
  label: 'bold',
  icon: 'bold',
  action: 'bold'
};

export const italicButton: AppRichEditorMenuButtonConfig = {
  type: 'button',
  label: 'italic',
  icon: 'italic',
  action: 'italic'
};

export const underlineButton: AppRichEditorMenuButtonConfig = {
  type: 'button',
  label: 'underline',
  icon: 'underline',
  action: 'underline'
};

export const strikeThroughButton: AppRichEditorMenuButtonConfig = {
  type: 'button',
  label: 'strikeThrough',
  icon: 'strike-through',
  action: 'strikeThrough'
};

export const alignJustifyButton: AppRichEditorMenuButtonConfig = {
  type: 'button',
  label: 'alignJustify',
  icon: 'align-justify',
  action: 'justifyFull'
};

export const alignLeftButton: AppRichEditorMenuButtonConfig = {
  type: 'button',
  label: 'alignLeft',
  icon: 'align-left',
  action: 'justifyLeft'
};

export const alignCenterButton: AppRichEditorMenuButtonConfig = {
  type: 'button',
  label: 'alignCenter',
  icon: 'align-center',
  action: 'justifyCenter'
};

export const alignRightButton: AppRichEditorMenuButtonConfig = {
  type: 'button',
  label: 'alignRight',
  icon: 'align-right',
  action: 'justifyRight'
};

export const orderedListButton: AppRichEditorMenuButtonConfig = {
  type: 'button',
  label: 'orderedList',
  icon: 'ordered-list',
  action: 'insertOrderedList'
};

export const unorderedListButton: AppRichEditorMenuButtonConfig = {
  type: 'button',
  label: 'unorderedList',
  icon: 'unordered-list',
  action: 'insertUnorderedList'
};

export const horizontalLineButton: AppRichEditorMenuButtonConfig = {
  type: 'button',
  label: 'horizontalRule',
  icon: 'horizontal-rule',
  action: 'insertHorizontalRule'
};

export const linkButton: AppRichEditorMenuButtonConfig = {
  type: 'button',
  label: 'link',
  icon: 'link',
  action: {
    name: 'createLink',
    prompt: true,
    value: 'linkUrl'
  }
};

export const imageButton: AppRichEditorMenuButtonConfig = {
  type: 'button',
  label: 'image',
  icon: 'image',
  action: {
  name: 'insertImage',
    prompt: true,
    value: 'imageUrl'
  }
};

export const heading1Button: AppRichEditorMenuButtonConfig = {
  type: 'button',
  label: 'h1',
  icon: 'h1',
  action: {
    name: 'formatBlock',
    value: 'h1'
  }
};

export const heading2Button: AppRichEditorMenuButtonConfig = {
  type: 'button',
  label: 'h2',
  icon: 'h2',
  action: {
    name: 'formatBlock',
    value: 'h2'
  }
};

export const heading3Button: AppRichEditorMenuButtonConfig = {
  type: 'button',
  label: 'h3',
  icon: 'h3',
  action: {
    name: 'formatBlock',
    value: 'h3'
  }
};

export const heading4Button: AppRichEditorMenuButtonConfig = {
  type: 'button',
  label: 'h4',
  icon: 'h4',
  action: {
    name: 'formatBlock',
    value: 'h4'
  }
};

export const heading5Button: AppRichEditorMenuButtonConfig = {
  type: 'button',
  label: 'h5',
  icon: 'h5',
  action: {
    name: 'formatBlock',
    value: 'h5'
  }
};

export const heading6Button: AppRichEditorMenuButtonConfig = {
  type: 'button',
  label: 'h6',
  icon: 'h6',
  action: {
    name: 'formatBlock',
    value: 'h6'
  }
};

export const paragraphButton: AppRichEditorMenuButtonConfig = {
  type: 'button',
  label: 'paragraph',
  icon: 'paragraph',
  action: {
    name: 'formatBlock',
    value: 'p'
  }
};

export const blockquoteButton: AppRichEditorMenuButtonConfig = {
  type: 'button',
  label: 'blockquote',
  icon: 'blockquote',
  action: {
    name: 'formatBlock',
    value: 'blockquote'
  }
};

export const codeButton: AppRichEditorMenuButtonConfig = {
  type: 'button',
  label: 'codeBlock',
  icon: 'code-block',
  action: {
    name: 'formatBlock',
    value: 'pre'
  }
};
