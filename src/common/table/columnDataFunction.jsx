import { Box, Typography } from '@mui/material'
import Link from 'next/link'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

const statusObj = {
  booked: 'success',
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

export const columnData = ({
  flex = 0.25,
  minWidth = 150,
  field = '',
  headerName = '',
  href = ''
} = {}) => {
  return {
    flex,
    minWidth,
    field,
    headerName,
    renderCell: params => {
      // console.log(params)
      // const value = row[field]
      // Check if params and params.row exist
      if (!params || !params.row) {
        return null
      }

      let value
      if (field.includes('.')) {
        // Split the field string to navigate nested objects
        const fieldParts = field.split('.')
        let currentObject = params.row
        for (const part of fieldParts) {
          if (currentObject && typeof currentObject === 'object') {
            currentObject = currentObject[part]
          } else {
            // Break out of the loop if the path does not exist
            currentObject = undefined
            break
          }
        }
        value = currentObject
      } else {
        value = params.row[field]
      }

      // if (Array.isArray(value)) {
      //   value = value.join(', ');  // Format array as string
      // } else if (value && typeof value === 'object') {
      //   value = JSON.stringify(value);  // Format object as JSON string
      // }

      return (
        <>
          {headerName === 'Status' ? (
            <CustomChip
              rounded
              skin='light'
              size='small'
              label={value}
              color={statusObj[value]}
              sx={{ textTransform: 'capitalize' }}
            />
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* {renderClient(row)} */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                <Typography
                  noWrap
                  component={Link}
                  href={`${href}`}
                  sx={{
                    fontWeight: 500,
                    textDecoration: 'none',
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main' },
                    textTransform: 'capitalize'
                  }}
                >
                  {value}
                </Typography>
              </Box>
            </Box>
          )}
        </>
      )
    }
  }
}

// {
//   flex: 0.1,
//   minWidth: 110,
//   field: 'status',
//   headerName: 'Status',
//   renderCell: ({ row }) => {
//     return (

//     )
//   }
// },
