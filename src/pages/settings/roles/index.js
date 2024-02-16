// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import { AuthApi } from 'config'

// ** Demo Components Imports
import Table from 'src/views/apps/roles/Table'
import { fetchUser } from 'src/store'
import useUserColumns from 'src/common/materialTable/tableColumns/authColumns'
import RoleCards from 'src/views/apps/roles/RoleCards'
import MaterialTable from 'src/common/materialTable/MaterialTable'
import AuthTable from 'src/common/tables/authTable/AuthTable'
import DialogModal from 'src/views/apps/roles/Dialog'
//form
import UserForm from 'src/common/forms/user/UserForm'


const RolesComponent = () => {
  const columns = useUserColumns()
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h4' sx={{ mb: 6 }}>
            Roles List
          </Typography>
        }
        subtitle={
          <Typography sx={{ color: 'text.secondary' }}>
            A role provided access to predefined menus and features so that depending on <br />{' '}
            assigned role an administrator can have access to what he need
          </Typography>
        }
      />
      <Grid item xs={12}>
        <RoleCards />
      </Grid>
      <Grid item xs={12}>
        {/* <Table /> */}
        <MaterialTable
          api={'user'}
          fetchData={fetchUser}
          stateSelector='user'
          columns={columns}
          drawerProps={{
            apidomain:AuthApi,
            formTitle:"Create User",
            editFormTitle: 'Edit User',
            //header buttons drawer
            buttonTitle: 'Create User',
            editButtonTitle: 'Edit User',
            CreateForm: UserForm,
            EditForm: UserForm,
            multiSelected:true
          }}
        />
      </Grid>
    </Grid>
  )
}

export default RolesComponent
