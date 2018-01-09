export interface ClassNamesObject {
  [label: string]: boolean;
}

export function calculateClassNames(classNames: ClassNamesObject): string {
  return Object.keys(classNames)
    .filter((key: string) => {
      return classNames[key];
    })
    .join(' ');
}

export function toggleClassNames($element: HTMLElement, classNames: ClassNamesObject): void {
  Object.keys(classNames)
    .forEach((key: string) => {
      if (classNames[key]) {
        $element.classList.add(key);
      } else {
        $element.classList.remove(key);
      }
    });
}
