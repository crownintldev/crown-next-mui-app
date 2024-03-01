import { useMemo } from 'react'

import { defaultCellRenderer,CellRowId,dateFormat } from 'src/common/materialTable/tableColumnFunction'
import { capitalizeCamelSpace } from 'src/utils/helperfunction';

const TableColumn = (accessorKey, header, Cell = defaultCellRenderer) => {
  return { accessorKey, header: header || capitalizeCamelSpace(accessorKey), Cell };
};

const useBusinessSettingColumns = () =>
  useMemo(
    () => [
      TableColumn('_id',"ID",CellRowId),
      TableColumn('businessName'),
      TableColumn('phone1'),
      TableColumn('phone2'),
      TableColumn('email'),
      TableColumn('businessAddress'),
      TableColumn('from.name',"Branch Name"),
      TableColumn('createdAt', 'Created At', dateFormat),
      TableColumn('updatedAt', 'Updated At', dateFormat),
    ],
    []
  )

export default useBusinessSettingColumns
