export type AppRichEditorMenuButtonAction = string;

export interface AppRichEditorMenuButtonActionWithValue {
  name: string;
  prompt?: boolean;
  value: string;
}

export interface AppRichEditorMenuButtonConfig {
  label: string;
  icon: string;
  action: AppRichEditorMenuButtonAction | AppRichEditorMenuButtonActionWithValue;
}
