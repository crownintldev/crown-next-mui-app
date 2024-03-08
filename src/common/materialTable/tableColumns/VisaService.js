import React from 'react'
import { useMemo } from 'react'

import {
  defaultCellRenderer,
  defaultCellUpperCase,
  CellRowId
} from 'src/common/materialTable/tableColumnFunction'

const useTableColumns = () =>
  useMemo(
    () => [
      { accessorKey: '_id', header: 'ID', Cell: CellRowId },
      {
        accessorKey: 'processing.processingFee',
        header: 'Processing Fee',
        Cell: defaultCellRenderer
      },
      {
        accessorKey: 'processing.visaFee',
        header: 'Processing - Visa Fee',
        Cell: defaultCellRenderer
      },
      {
        accessorKey: 'confirmed.totalFee',
        header: 'Confirmed - Total Fee',
        Cell: defaultCellRenderer
      },
      {
        accessorKey: 'supplierVisaService.supplier.name',
        header: 'Supplier Name',
        Cell: defaultCellRenderer
      },
      {
        accessorKey: 'destination.name',
        header: 'Destination',
        Cell: defaultCellUpperCase
      },
      { accessorKey: 'type.name', header: 'Type', Cell: defaultCellUpperCase },
      { accessorKey: 'category.name', header: 'Category', Cell: defaultCellRenderer },
      { accessorKey: 'duration.name', header: 'Duration', Cell: defaultCellRenderer },
      {
        accessorKey: 'supplierVisaService.supplier.phone',
        header: 'Supplier Phone',
        Cell: defaultCellRenderer
      },
      {
        accessorKey: 'supplierVisaService.processing.processingFee',
        header: 'Sup - proc Fee',
        Cell: defaultCellRenderer
      },
      {
        accessorKey: 'supplierVisaService.processing.visaFee',
        header: 'Sup - proc V Fee',
        Cell: defaultCellRenderer
      },
      {
        accessorKey: 'supplierVisaService.confirmed.totalFee',
        header: 'Sup - Conf Fee',
        Cell: defaultCellRenderer
      },
      {
        accessorKey: 'supplierVisaService.additionSupplierId.name',
        header: 'Addition Supplier Name',
        Cell: defaultCellRenderer
      },
      {
        accessorKey: 'supplierVisaService.additionSupplierFee',
        header: 'Addition Supplier Fee',
        Cell: defaultCellRenderer
      },
      
    ],
    []
  )

export default useTableColumns
