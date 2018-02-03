export default function isRequired(value: string): string {
  return !!value ? '' : 'forms.errors.validators.isRequired';
}
