// ** MUI Imports
import React, { useState } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import toast from 'react-hot-toast'
import { IconButton, Menu, MenuItem } from '@mui/material'

// import { mdiCallToAction } from '@mdi/js';
import Button from '@mui/material/Button'
import ExportButton from './ExportButton'

import Icon from 'src/@core/components/icon'
import { useDispatch } from 'react-redux'
import { axiosErrorMessage } from 'src/utils/helperfunction'
import { capitalizeSplitDash } from 'src/utils/helperfunction'

const TableHeader = props => {
  const dispatch = useDispatch()

  // ** Props
  const {
    toggle,
    buttonTitle,
    selectedIds,
    fetchData,
    api,
    table,
    tableData,
    removeSelection,
    headerMenu
  } = props

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleRemove = async () => {
    if (!api) {
      return toast.error('api not found', { position: 'top-center' })
    }
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/${api}/remove`, {
        ids: selectedIds
      })
      if (response.data) {
        dispatch(
          fetchData({
            limit: 20,
            page: 1
          })
        )
        removeSelection()
        toast.success('Delete Successfully', { position: 'top-center' })
      }
    } catch (error) {
      console.log(axiosErrorMessage(error))
      toast.error(axiosErrorMessage(error), { position: 'top-center' })
    }
  }
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }
  return (
    <Box>
      <Box
        sx={{
          rowGap: 2,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}
      >
        {/* {buttonTitle && (
          <Button onClick={toggle} variant='contained'  sx={{ '& svg': { mr: 2 } }}>
            <Icon fontSize='1.125rem' icon='tabler:plus' />
            {buttonTitle}
          </Button>
        )} */}
        <IconButton onClick={handleClick}>
          <Icon fontSize='1.5rem' icon='mdi:call-to-action' color='#2b60fe' />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          {buttonTitle && (
            <div onClick={handleClose}>
              <MenuItem
                onClick={toggle}
                // onMouseEnter={handleMouseEnter}
                // onMouseLeave={handleMouseLeave}
                sx={{
                  py: 1,
                  m: 0
                  // borderBottom: isHovered ? '1px solid #8080806e' : 'none'
                }}
              >
                <Box
                  // onClick={toggle}
                  sx={{
                    fontSize: '0.8em',
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: '4px',
                    color: '#2b60fe'
                  }}
                >
                  <Icon fontSize='0.8rem' icon='tabler:plus' />
                  <div>{buttonTitle}</div>
                </Box>
              </MenuItem>
            </div>
          )}
          {api && selectedIds && selectedIds.length > 0 && (
            <div onClick={handleClose}>
              <div onClick={handleRemove}>
                <MenuItem
                  // onClick={toggle} // onMouseLeave={handleMouseLeave}
                  sx={{
                    py: 1,
                    m: 0
                    // borderBottom: isHovered ? '1px solid #8080806e' : 'none'
                  }}
                >
                  <Box
                    // onClick={handleRemove}
                    sx={{
                      fontSize: '0.8em',
                      display: 'flex',
                      alignItems: 'center',
                      columnGap: '4px',
                      color: 'red'
                    }}
                  >
                    <Icon fontSize='0.8rem' icon='tabler:minus' />
                    {/* {api === 'visa' && 'Delete Visa Service'} */}
                    {`Delete ${capitalizeSplitDash(api)}`}
                  </Box>
                </MenuItem>
              </div>
            </div>
          )}
          {/* <div onClick={removeSelection}>
            <div onClick={toggle}>
              {headerMenu && headerMenu({ selectedIds, handleClose, toggle, removeSelection })}
            </div>
          </div> */}
          {headerMenu && headerMenu({ selectedIds, handleClose, toggle, removeSelection })}
        </Menu>

        {/* ----------Export data--------- */}
        <ExportButton table={table} tableData={tableData} />
      </Box>
    </Box>
  )
}

export default TableHeader
