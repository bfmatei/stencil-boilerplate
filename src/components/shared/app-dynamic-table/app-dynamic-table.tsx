import {
  Component,
  Prop
} from '@stencil/core';

import autobind from '../../../decorators/autobind';
import {
  calculateClassNames
} from '../../../helpers/className';
import noop from '../../../helpers/noop';

import {
  ButtonData,
  ColumnAlign,
  ColumnData,
  ColumnTypes,
  IconData,
  IndexData,
  RichData
} from './app-dynamic-table.interface';

@Component({
  tag: 'app-dynamic-table',
  styleUrl: 'style.pcss'
})
export class AppDynamicTable {
  @Prop()
  public columns: ColumnData[] = [];

  @Prop()
  public data: any = {};

  @Prop()
  public rowClassName: string = '';

  @Prop()
  public rowOnClick: (id: string) => void = noop;

  private renderLabel(label: string = ''): JSX.Element | string {
    return label.length > 0 ? (
      <app-translate entry={label} />
    ) : '';
  }

  private static calculateWidth(columnWidth: string, columnType: ColumnTypes): string {
    let width: string = 'auto';

    if (columnWidth !== null) {
      width = columnWidth;
    } else if (columnType === ColumnTypes.INDEX) {
      width = '20px';
    }

    return width;
  }

  @autobind
  private renderColumnHeader(column: ColumnData): JSX.Element {
    const className: string = calculateClassNames({
      'table-header-cell': true,
      [column.className]: (column.className || '').length > 0
    });

    return (
      <th
        class={className}
        style={{
          width: AppDynamicTable.calculateWidth(column.width || null, column.type)
        }}
      >
        {this.renderLabel(column.label)}
      </th>
    );
  }

  private renderIndex(
    indexData: IndexData = {
      className: '',
      onClick: null,
      onMouseEnter: null,
      onMouseLeave: null
    },
    index: number
  ): JSX.Element {
    return (
      <span onClick={indexData.onClick} onMouseEnter={indexData.onMouseEnter} onMouseLeave={indexData.onMouseLeave}>
        {index}
      </span>
    );
  }

  private elementEventHandlerBinder(value: string | number, handler: any = noop): typeof noop {
    return (): void => {
      handler(value);
    };
  }

  @autobind
  private renderIcon(iconData: IconData): JSX.Element {
    const className: string = calculateClassNames({
      'entry-icon': true,
      [iconData.className]: (iconData.className || '').length > 0
    });

    return (
      <app-icon
        name={iconData.icon}
        onClick={this.elementEventHandlerBinder(iconData.value, iconData.onClick)}
        onMouseEnter={this.elementEventHandlerBinder(iconData.value, iconData.onMouseEnter)}
        onMouseLeave={this.elementEventHandlerBinder(iconData.value, iconData.onMouseLeave)}
        class={className}
      />
    );
  }

  @autobind
  private renderButton(buttonData: ButtonData): JSX.Element {
    const buttonClassName: string = calculateClassNames({
      'entry-button': true,
      [buttonData.className]: (buttonData.className || '').length > 0
    });

    const iconClassName: string = calculateClassNames({
      [buttonData.iconClassName]: (buttonData.iconClassName || '').length > 0
    });

    return (
      <button
        onClick={this.elementEventHandlerBinder(buttonData.value, buttonData.onClick)}
        onMouseEnter={this.elementEventHandlerBinder(buttonData.value, buttonData.onMouseEnter)}
        onMouseLeave={this.elementEventHandlerBinder(buttonData.value, buttonData.onMouseLeave)}
        class={buttonClassName}
        disabled={buttonData.disabled || false}
      >
        <app-icon name={buttonData.icon} class={iconClassName} />
      </button>
    );
  }

  private renderContent(columnType: ColumnTypes, value: string | ButtonData[] | IconData[] | IndexData | RichData, index: number): string | JSX.Element | JSX.Element[] {
    switch (columnType) {
      case ColumnTypes.TEXT:
        return value as string;

      case ColumnTypes.BUTTONS:
        return (value as ButtonData[]).map(this.renderButton);

      case ColumnTypes.ICONS:
        return (value as IconData[]).map(this.renderIcon);

      case ColumnTypes.INDEX:
        return this.renderIndex(value as IndexData, index);

      // TODO: implement rich text
      // case ColumnTypes.RICH_TEXT:
      //   return !value ? '' : convertFromRaw(value as RichEditorValue).getPlainText();

      default:
        return value as string;
    }
  }

  @autobind
  private bindRenderColumn(item: any, index: number): (column: ColumnData) => JSX.Element {
    return (column: ColumnData): JSX.Element => {
      const itemClassName: string = item[column.itemClassName || ''] || '';

      const cellClassName: string = calculateClassNames({
        'table-body-cell': true,
        [column.className]: (column.className || '').length > 0,
        'index-Cell': column.type === ColumnTypes.INDEX,
        [itemClassName]: itemClassName.length > 0
      });

      return (
        <td
          class={cellClassName}
          style={{
            width: AppDynamicTable.calculateWidth(column.width || null, column.type),
            textAlign: column.align || ColumnAlign.LEFT
          }}
        >
          {this.renderContent(column.type, item[column.dataKey], index)}
        </td>
      );
    };
  }

  @autobind
  private renderRow(item: any, index: number): JSX.Element {
    return (
      <tr class='table-body-row'>
        {this.columns.map(this.bindRenderColumn(item, index))}
      </tr>
    );
  }

  public render(): JSX.Element {
    return (
      <table class='table'>
        <thead class='table-header'>
          <tr class='table-header-row'>
            {this.columns.map(this.renderColumnHeader)}
          </tr>
        </thead>
        <tbody class='table-body'>
          {this.data.map(this.renderRow)}
        </tbody>
      </table>
    );
  }
}
