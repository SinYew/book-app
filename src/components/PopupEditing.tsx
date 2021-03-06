import React, { JSXElementConstructor, ReactElement } from 'react';
import { Plugin, Template, TemplateConnector, TemplatePlaceholder } from '@devexpress/dx-react-core';

const PopupEditing = React.memo(({ 
    popupComponent: Popup,
    children,
    popupTitle,
    popupSaveButtonText,
  }
  : { 
    popupComponent: any, 
    children: ReactElement<any, string | JSXElementConstructor<any>>,
    popupTitle: string,
    popupSaveButtonText: string
  }) => (
  <Plugin>
    <Template name="popupEditing">
      <TemplateConnector>
        {(
          {
            rows,
            getRowId,
            addedRows,
            editingRowIds,
            createRowChange,
            rowChanges,
          },
          {
            changeRow, changeAddedRow, commitChangedRows, commitAddedRows,
            stopEditRows, cancelAddedRows, cancelChangedRows,
          },
        ) => {
          const isNew = addedRows.length > 0;
          let editedRow: any;
          let rowId: any;
          if (isNew) {
            rowId = 0;
            editedRow = addedRows[rowId];
          } else {
            [rowId] = editingRowIds;
            const targetRow = rows.filter((row: any) => getRowId(row) === rowId)[0];
            editedRow = { ...targetRow, ...rowChanges[rowId] };
          }

          const processValueChange = ({ target: { name, value } }: { target: any }) => {
            const changeArgs = {
              rowId,
              change: createRowChange(editedRow, value, name),
            };
            if (isNew) {
              changeAddedRow(changeArgs);
            } else {
              changeRow(changeArgs);
            }
          };
          const rowIds = isNew ? [0] : editingRowIds;
          const applyChanges = () => {
            if (isNew) {
              commitAddedRows({ rowIds });
            } else {
              stopEditRows({ rowIds });
              commitChangedRows({ rowIds });
            }
          };
          const cancelChanges = () => {
            if (isNew) {
              cancelAddedRows({ rowIds });
            } else {
              stopEditRows({ rowIds });
              cancelChangedRows({ rowIds });
            }
          };

          const open = editingRowIds.length > 0 || isNew;
          return (
            <Popup
              title={popupTitle}
              saveButtonText={popupSaveButtonText}
              open={open}
              onApplyChanges={applyChanges}
              onCancelChanges={cancelChanges}
            >
              {React.cloneElement(children, { row: editedRow, onChange: processValueChange })}
            </Popup>
          );
        }}
      </TemplateConnector>
    </Template>
    <Template name="root">
      <TemplatePlaceholder />
      <TemplatePlaceholder name="popupEditing" />
    </Template>
  </Plugin>
));

export default PopupEditing
