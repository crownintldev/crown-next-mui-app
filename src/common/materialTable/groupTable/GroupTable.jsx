import { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box, LinearProgress, Typography, Tab, Tabs } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { muiLinearProgressProps, tableProps } from '../functions';
import { Button, Grid } from '@mui/material';
import CardStatsHorizontalWithDetails from 'src/@core/components/card-statistics/card-stats-horizontal-with-details';
import FormDrawer from '../../drawer/FormDrawer';
import TableHeader from './TableHeader';
import { ChildTable } from './ChildTable';
import { useTheme } from '@emotion/react';
import InboxIcon from '@mui/icons-material/Inbox'; // Import appropriate icons
import PaymentsIcon from '@mui/icons-material/Payments';
import { useRouter } from 'next/router';

const Example = ({
  columns,
  childColumns,
  fetchData,
  stateSelector,
  apiData,
  selectedId,
  drawerProps,
  api,
  headerMenu,
  NewHeaderMenu,
  logTabLink
}) => {
  const {
    formTitle="",
    editFormTitle="",
    buttonTitle="",
    editButtonTitle="",
    EditForm="",
    CreateForm="",
    multiSelected = false
  } = drawerProps;
  const theme = useTheme();
  const dispatch = useDispatch();
  const accountItems = useSelector((state) => state.account.data);
  const { data, total, isLoading, isError } = useSelector(
    (state) => state[stateSelector]
  );
  // console.log(data)
  const [isRefetching, setIsRefetching] = useState(false);

  // Table state
  // Table Tab
  const [activeTab, setActiveTab] = useState('default'); // State to track the active tab

  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [selectionRow, setSelectionRow] = useState([]);

  // childRow
  const [childRowSelection, setChildRowSelection] = useState([]);
  const [childSelectionRow, setChildSelectionRow] = useState([]);
  const [parentId, setParentId] = useState('');

  //router
  const router = useRouter();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  //drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  useEffect(() => {
    let sortField = sorting.length > 0 && sorting[0].id ? sorting[0].id : 'createdAt';
    let sortOrder = sorting.length > 0 && sorting[0].desc ? 1 : -1;

    const handleEnterPress = (event) => {
      if (event.key === 'Enter') {
        dispatch(
          fetchData({
            limit: pagination.pageSize,
            page: pagination.pageIndex,
            searchTerm: globalFilter,
            columnFilters: JSON.stringify(columnFilters),
            sortField,
            sortOrder
          })
        );
      }
    };

    window.addEventListener('keydown', handleEnterPress);
    if (!globalFilter && columnFilters.length === 0) {
      dispatch(
        fetchData({
          limit: pagination.pageSize,
          page: pagination.pageIndex + 1,
          sortField,
          sortOrder
        })
      );
    }

    // Cleanup the event listener
    return () => {
      window.removeEventListener('keydown', handleEnterPress);
    };
  }, [dispatch, setPagination, pagination, globalFilter, columnFilters, sorting]);

  //row selection method start

  const selectedRowIds = Object.keys(rowSelection).filter((key) => rowSelection[key]);

  useEffect(() => {
    setSelectionRow(selectedRowIds);
  }, [rowSelection]);

  const handleRemoveSelection = () => {
    setRowSelection({});
  };

  // child
  useEffect(() => {
    setChildSelectionRow(
      Object.keys(childRowSelection).filter((key) => childRowSelection[key])
    );
  }, [childRowSelection]);

  const handleChildRowSelectionChange = (selection, parentRowId) => {
    setChildRowSelection(selection);
    setParentId(parentRowId);
  };

  //row selection method end

  const renderCustomActions = ({ table }) => {
    // console.log(table)
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
        childTable={{
          visaBookingIds: childSelectionRow,
          accountId: parentId
        }}
        ejectValue={{
          visaBookingIds: childSelectionRow,
          accountId: parentId
        }}
        selectedIds={selectionRow}
        setChildRowSelection={setChildRowSelection}
        fetchData={fetchData}
        api={api}
        table={table}
        tableData={data}
        removeSelection={handleRemoveSelection}
        headerMenu={headerMenu}
        NewHeaderMenu={NewHeaderMenu}
      />
    );
  };

  //apidata
  const cards = () => {
    return (
      <Grid xs={12} className='mb-6' sx={{ zIndex: 10 }}>
        {apiData && apiData.data && apiData.data.length > 0 && (
          <Grid container spacing={6}>
            {apiData.data.map((item, index) => {
              return (
                <Grid item xs={12} md={3} sm={6} key={index}>
                  {/* <CardStatsHorizontalWithDetails {...item} /> */}
                </Grid>
              );
            })}
          </Grid>
        )}
      </Grid>
    );
  };

  const table = useMaterialReactTable({
    columns,
    data,
    ...tableProps(theme),
    renderTopToolbarCustomActions: renderCustomActions,
    getRowId: (row) => row[selectedId !== undefined ? selectedId : '_id'], // Adjust based on your data's unique identifier
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
    enableFilters: true,
    onRowSelectionChange: setRowSelection,
    initialState: { showColumnFilters: true, density: 'compact' },
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
      isLoading: false,
      pagination,
      showAlertBanner: isError,
      showProgressBars: false,
      sorting
    },
    muiLinearProgressProps: muiLinearProgressProps,

    renderDetailPanel: ({ row }) => (
      <ChildTable
        row={row}
        childColumns={childColumns}
        childRowSelection={childRowSelection}
        handleChildRowSelectionChange={handleChildRowSelectionChange}
        visaBookingIds={accountItems[0]?.visaBookingIds}
      />
    ),
    enableRowSelection: true
  });

  // Function to handle tab changes
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    if (newValue === 'account') {
      router.push('/accounts/account/visa-account');
    } else {
      router.push(logTabLink || '/accounts/account/visa-account-log');
    }
  };
  // Conditionally render the table component based on the active tab
  // const renderTableComponent = () => {
  //   if (activeTab === 'account') {
  //     return <MaterialReactTable table={table} className='custom-table-styles' />;
  //   } else if (activeTab === 'trash') {
  //     // Pass the trashed rows to the table in the "Trash" tab
  //     return (
  //       <MaterialReactTable
  //         table={table}
  //         data={trashedRows}
  //         className='custom-table-styles'
  //       />
  //     );
  //   }
  // };
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
              <InboxIcon style={{ marginRight: '4px' }} /> Account
            </div>
          }
          value='account'
        />
        <Tab
          // onClick={() => setShowTrash("true")}
          label={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <PaymentsIcon style={{ marginRight: '4px' }} /> Report
            </div>
          }
          value='report'
        />
      </Tabs>
     
      <div className='custom-scrollbar'>
        {isLoading && (
          <LinearProgress
            sx={{
              height: '3px'
            }}
          />
        )}
    
        <MaterialReactTable table={table} />
        {isLoading && (
          <LinearProgress
            sx={{
              height: '3px'
            }}
          />
        )}
      </div>
      <FormDrawer
        open={drawerOpen}
        toggle={toggleDrawer}
        drawerTitle={
          multiSelected
            ? editFormTitle
            : selectionRow.length === 1
            ? editFormTitle
            : formTitle
        }
        Form={
          multiSelected ? EditForm : selectionRow.length === 1 ? EditForm : CreateForm
        }
        removeSelection={handleRemoveSelection}
        _id={
          multiSelected ? selectionRow : selectionRow.length === 1 ? selectionRow[0] : ''
        }
      />
    </>
  );
};

export default Example;
