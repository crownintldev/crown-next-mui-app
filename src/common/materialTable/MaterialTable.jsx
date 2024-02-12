import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardStatsHorizontalWithDetails from 'src/@core/components/card-statistics/card-stats-horizontal-with-details'
import FormDrawer from '../drawer/FormDrawer'
import TableHeader from './tableHeader/TableHeader'

// MUI Imports
import { LinearProgress, Tab, Tabs } from '@mui/material'
import { useTheme } from '@mui/material'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { Grid } from '@mui/material'
import InboxIcon from '@mui/icons-material/Inbox' // Import appropriate icons
import DeleteIcon from '@mui/icons-material/Delete' // Import appropriate icons

//functions
import { hasSubRows, muiLinearProgressProps, tableProps } from './functions'
import Icon from 'src/@core/components/icon'

const MaterialTable = ({
  fetchData,
  stateSelector,
  columns,
  settings,
  apiData,
  drawerProps,
  api,
  headerMenu
}) => {
  // console.log('apiData', apiData)
  const {
    formTitle,
    editFormTitle,
    buttonTitle,
    editButtonTitle,
    EditForm,
    CreateForm,
    multiSelected = false
  } = drawerProps
  const theme = useTheme()
  const dispatch = useDispatch()
  const [showTrash, setShowTrash] = useState("false")
  const { data, total, isLoading, isError } = useSelector((state) => state[stateSelector])
  const [activeTab, setActiveTab] = useState('default') // State to track the active tab

  // Table state

  const [columnFilters, setColumnFilters] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState([])
  const [rowSelection, setRowSelection] = useState({})
  const [selectionRow, setSelectionRow] = useState([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20
  })
  const [trashedRows, setTrashedRows] = useState([]) // State to track trashed rows
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  //drawer
  const [drawerOpen, setDrawerOpen] = useState(false)
  const toggleDrawer = () => setDrawerOpen(!drawerOpen)

  // console.log(globalFilter)
  useEffect(() => {
    let sortField = sorting.length > 0 && sorting[0].id ? sorting[0].id : 'createdAt'
    let sortOrder = sorting.length > 0 && sorting[0].desc ? 1 : -1

    const handleEnterPress = (event) => {
      if (event.key === 'Enter') {
        dispatch(
          fetchData({
            limit: pagination.pageSize,
            page: pagination.pageIndex,
            searchTerm: globalFilter,
            columnFilters: JSON.stringify(columnFilters),
            sortField,
            sortOrder,
            deleted: showTrash
          })
        )
      }
    }

    window.addEventListener('keydown', handleEnterPress)
    if (!globalFilter && columnFilters.length === 0) {
      dispatch(
        fetchData({
          limit: pagination.pageSize,
          page: pagination.pageIndex + 1,
          sortField,
          sortOrder,
          deleted: showTrash
        })
      )
    }
    // Cleanup the event listener
    return () => {
      window.removeEventListener('keydown', handleEnterPress)
    }
  }, [dispatch, showTrash, setPagination, pagination, globalFilter, columnFilters, sorting])

  const selectedRowIds = Object.keys(rowSelection).filter((key) => rowSelection[key])
  useEffect(() => {
    setSelectionRow(selectedRowIds)
  }, [rowSelection])

  // Function to handle tab changes
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    if(newValue === "default"){
      setShowTrash("false")
    }else{
      setShowTrash("true")
    }
    
  }

  // Conditionally render the table component based on the active tab
  const renderTableComponent = () => {
    if (activeTab === 'default') {
      return <MaterialReactTable table={table} className='custom-table-styles' />
    } else if (activeTab === 'trash') {
      // Pass the trashed rows to the table in the "Trash" tab
      return <MaterialReactTable table={table} data={trashedRows} className='custom-table-styles' />
    }
  }

  const handleRemoveSelection = () => {
    setRowSelection({})
  }

  const renderCustomActions = ({ table }) => {
    return (
      <TableHeader
        toggle={toggleDrawer}
        buttonTitle={
          multiSelected && selectionRow.length > 0
            ? editButtonTitle
            : selectionRow.length === 1
            ? editButtonTitle
            : buttonTitle
            ? buttonTitle
            : ''
        }
        selectedIds={selectionRow}
        fetchData={fetchData}
        api={api}
        table={table}
        tableData={data}
        removeSelection={handleRemoveSelection}
        showTrash={showTrash}
        setActiveTab={setActiveTab}
        headerMenu={headerMenu}
      />
    )
  }

  //apidata
  const cards = () => {
    return (
      <Grid xs={12} className='mb-6' sx={{ zIndex: 10, mb: 5 }}>
        {apiData && apiData.data && apiData.data.length > 0 && (
          <Grid container spacing={6}>
            {apiData.data.map((item, index) => {
              return (
                <Grid item xs={12} md={3} sm={6} key={index}>
                  <CardStatsHorizontalWithDetails {...item} />
                </Grid>
              )
            })}
          </Grid>
        )}
      </Grid>
    )
  }

  const tablePropsData = tableProps(theme)

  // table start
  const table = useMaterialReactTable({
    columns,
    data: data,
    ...tablePropsData,
    enableExpanding: hasSubRows(data),

    // enableExpanding: true,
    renderTopToolbarCustomActions: CreateForm || selectionRow.length>0? renderCustomActions : ()=>{},
    getRowId: (row) => row._id, // Adjust based on your data's unique identifier
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    muiToolbarAlertBannerProps: isError
      ? {
          color: 'error',
          children: 'Error loading data'
        }
      : undefined,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    initialState: { showColumnFilters: false, density: 'compact' },
    rowSelection,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    rowCount: total,
    state: {
      rowSelection,
      columnFilters,
      globalFilter,
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: false,
      sorting
    },
    muiLinearProgressProps: muiLinearProgressProps
  })

  return (
    <>
      {cards()}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        indicatorColor='primary'
        textColor='primary'
        variant='fullWidth'
        aria-label='table sections tabs'
        sx={{
          backgroundColor: theme.palette.background.paper,
          marginBottom: '3px',
          borderRadius: '7px'
        }}
      >
        <Tab
          // onClick={() => setShowTrash("false")}
          label={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <InboxIcon style={{ marginRight: '4px' }} /> Default
            </div>
          }
          value='default'
        />
        <Tab
          // onClick={() => setShowTrash("true")}
          label={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <DeleteIcon style={{ marginRight: '4px' }} /> Trash
            </div>
          }
          value='trash'
        />
      </Tabs>
      <div style={{ backgroundColor: '#FFF', borderRadius: '10px' }} className='custom-scrollbar'>
        {/* Conditionally render the table component */}
        {renderTableComponent()}
      </div>
      <div style={{ backgroundColor: '#FFF', borderRadius: '10px' }} className='custom-scrollbar'>
        {/* <TableProvider> */}
        {isLoading && (
          <LinearProgress
            sx={{
              height: '3px'
            }}
          />
        )}

        {/* <MaterialReactTable table={table} className='custom-table-styles' /> */}
        {isLoading && (
          <LinearProgress
            sx={{
              height: '3px'
            }}
          />
        )}
        {/* </TableProvider> */}
      </div>
      <FormDrawer
        open={drawerOpen}
        toggle={toggleDrawer}
        drawerTitle={selectionRow.length > 0 ? editFormTitle : formTitle}
        Form={selectionRow.length > 0 ? EditForm : CreateForm}
        removeSelection={handleRemoveSelection}
        _id={
          multiSelected && selectionRow.length > 0
            ? selectionRow
            : selectionRow.length === 1
            ? selectionRow[0]
            : ''
        }
        api={api}
        fetchApi={fetchData}
        stateSelector={stateSelector}
      />
    </>
  )
}

export default MaterialTable
