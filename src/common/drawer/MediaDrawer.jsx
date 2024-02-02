// React Imports
import React, { useState } from 'react'

// Next Imports
import Image from 'next/image'

import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TreeView from '@mui/lab/TreeView'
import TreeItem from '@mui/lab/TreeItem'

import Icon from 'src/@core/components/icon'
import { Divider } from '@mui/material'

const MediaDrawer = ({ open, onClose, data }) => {
  const [expanded, setExpanded] = useState([])

  const handleTreeItemToggle = (event, nodeIds) => {
    setExpanded(nodeIds)
  }

  const handleTreeItemClick = (event, nodeId, url) => {
    // Open the URL in a new tab when a TreeItem is clicked
    window.open(url, '_blank')
  }

  return (
    <Drawer anchor='right' open={open} onClose={onClose}>
      <Box p={2} width={500} className='media-drawer'>
        <Typography variant='h5' gutterBottom>
          Booking Visa Assets
        </Typography>
        <Typography variant='body1'>Dynamic visa image and document lists</Typography>

        <TreeView
          defaultCollapseIcon={
            <span>
              <Icon icon='tabler:minus' />
            </span>
          }
          defaultExpandIcon={
            <span>
              <Icon icon='tabler:plus' />
            </span>
          }
          expanded={expanded}
          onNodeToggle={handleTreeItemToggle}
        >
          <TreeItem nodeId='Images' label='Images' className='node-images'>
            {data.passport && data.passport.files ? (
              data.passport.files.map((item, index) => (
                <div key={index}>
                  {item.fileType.startsWith('image/') && ( // Check if it's an image
                    <TreeItem
                      key={`${index}+${item.url}`}
                      nodeId={`${index}+${item.url}`}
                      label={
                        <div className='media-img-container'>
                          {/* {item.fileType === 'image/png' ? (
                            <Icon
                              icon='tabler:file-type-png'
                              width={24}
                              height={24}
                              className='media-doc-icon'
                            />
                          ) : (
                            <Icon
                              icon='tabler:file-type-jpg'
                              width={24}
                              height={24}
                              className='media-doc-icon'
                            />
                          )} */}
                          <Image src={item.url} height={80} width={80} className='media-image' />
                          <span className='tooltip'>{item.fileName.substring(0, 10)}</span>{' '}
                          {/* Truncate to 10 characters */}
                        </div>
                      }
                    />
                  )}
                </div>
              ))
            ) : (
              <h3>No Image Found...</h3>
            )}
          </TreeItem>
          <Divider />
          <TreeItem nodeId='documents' label='Documents' className='node-images'>
            {data.passport && data.passport.files ? (
              data.passport.files.map((item, index) => (
                <div key={index}>
                  {item.fileType.startsWith('application/') && ( // Check if it's a PDF or DOCX
                    <TreeItem
                      key={`${index}+${item.url}`}
                      nodeId={`${index}+${item.url}`}
                      label={
                        <div className='media-img-container'>
                          {item.fileType === 'application/pdf' ? (
                            <div>
                              <Icon icon='tabler:file-type-pdf' width={60} height={60} />
                              <span className='tooltip'>{item.fileName.substring(0, 10)}</span>
                              <a href={item.fileUrl} target='_blank' rel='noopener noreferrer'>
                                <Icon
                                  icon='tabler:eye'
                                  width={24}
                                  height={24}
                                  className='media-doc-icon'
                                />
                              </a>
                            </div>
                          ) : (
                            <div>
                              <Icon icon='tabler:file-type-doc' width={60} height={60} />
                              <span className='tooltip'>{item.fileName.substring(0, 10)}</span>
                              <a href={item.fileUrl} target='_blank' rel='noopener noreferrer'>
                                <Icon
                                  icon='tabler:eye'
                                  width={24}
                                  height={24}
                                  className='media-doc-icon'
                                />
                              </a>
                            </div>
                          )}
                          <span className='tooltip'>{item.fileName.substring(0, 10)}</span>{' '}
                          {/* Truncate to 10 characters */}
                        </div>
                      }
                    />
                  )}
                </div>
              ))
            ) : (
              <h3>Document Not Found...</h3>
            )}
          </TreeItem>
        </TreeView>
        <Button variant='contained' color='primary' onClick={onClose} sx={{ mt: 10 }}>
          Close
        </Button>
      </Box>
    </Drawer>
  )
}

export default MediaDrawer
