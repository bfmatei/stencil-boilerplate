export default function isRequired(value: string): string {
  return !!value ? '' : 'This field is required';
}
