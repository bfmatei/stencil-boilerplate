export default function convertRichEditorToString(input: string): string {
  return input
    .replace(/<(?:.|\n)*?>/gm, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\n\n+/g, '\n\n')
    .trim();
}
