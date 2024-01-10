// ** React Imports
import { useState, useEffect, MouseEvent, useCallback } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { SelectChangeEvent } from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomTextField from 'src/@core/components/mui/text-field'
import CardStatsHorizontalWithDetails from 'src/@core/components/card-statistics/card-stats-horizontal-with-details'

// ** Custom Table Components Imports
import TableHeader from './TableHeader'
import FormDrawer from '../drawer/FormDrawer'

//redux
import { ReduxFetchAndGet } from 'src/utils/ReduxFetchAndGet'
import { useDispatch } from 'react-redux'

// ------------------------------------------------
const DataTable = ({
  apiData,
  columns,
  fetchTableData,
  formTitle = 'Form Title',
  editFormTitle,
  buttonTitle,
  editButtonTitle,
  CreateForm,
  EditForm,
  multiSelected,
  fetchData
}) => {
  // ** State
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const [selection, setSelection] = useState([])
  const [drawerOpen, setDrawerOpen] = useState(false)

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  })

  const handlePagination = value => {
    console.log(value)

    // dispatch(fetchData({ limit: value.pageSize, page: value.page }))
    setPaginationModel(value)
  }

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const toggleDrawer = () => setDrawerOpen(!drawerOpen)

  const handleOnRowSelection = selection => {
    // console.log('handleOnRowSelection', selection)
    setSelection(selection)
  }

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        {apiData && (
          <Grid container spacing={6}>
            {apiData.statsHorizontalWithDetails.map((item, index) => {
              return (
                <Grid item xs={12} md={3} sm={6} key={index}>
                  <CardStatsHorizontalWithDetails {...item} />
                </Grid>
              )
            })}
          </Grid>
        )}
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Divider sx={{ m: '0 !important' }} />
          <TableHeader
            value={value}
            handleFilter={handleFilter}
            toggle={toggleDrawer}
            buttonTitle={
              multiSelected && selection.length > 0
                ? editButtonTitle
                : selection.length === 1
                ? editButtonTitle
                : buttonTitle
                ? buttonTitle
                : ''
            }
          />
          <DataGrid
            autoHeight
            checkboxSelection
            getRowId={row => row._id && row._id}
            rowHeight={62}
            rows={fetchTableData ? fetchTableData : []}
            columns={columns}
            onRowSelectionModelChange={handleOnRowSelection}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={handlePagination}

            // pagination
            // paginationMode='server'
            // page={paginationModel.page}
            // pageSize={paginationModel.pageSize}
            // onPaginationModelChange={handlePagination}
            // rowCount={totalRows} // total number of rows from backend
          />
        </Card>
      </Grid>
      <FormDrawer
        open={drawerOpen}
        toggle={toggleDrawer}
        drawerTitle={
          multiSelected ? editFormTitle : selection.length === 1 ? editFormTitle : formTitle
        }
        Form={multiSelected ? EditForm : selection.length === 1 ? EditForm : CreateForm}
        setRowTableSelection={setSelection}
        _id={multiSelected ? selection : selection.length === 1 ? selection[0] : ''}
      />
    </Grid>
  )
}

export default DataTable
