export type AppRichEditorMenuButtonAction = string;

export interface AppRichEditorMenuButtonActionWithValue {
  name: string;
  prompt?: boolean;
  value: string;
}

export interface AppRichEditorMenuButtonConfig {
  type: 'button';
  label: string;
  icon: string;
  action: AppRichEditorMenuButtonAction | AppRichEditorMenuButtonActionWithValue;
}

export interface AppRichEditorMenuSeparatorConfig {
  type: 'separator';
}

export type AppRichEditorMenuItemConfig = AppRichEditorMenuButtonConfig | AppRichEditorMenuSeparatorConfig;
