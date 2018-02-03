export default function promisedNoop(..._args: any[]): Promise<void> {
  return Promise.resolve();
}
