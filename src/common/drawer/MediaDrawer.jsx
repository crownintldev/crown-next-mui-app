import React, { useState } from 'react'
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TreeView from '@mui/lab/TreeView'
import TreeItem from '@mui/lab/TreeItem'

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
          Media Drawer Content
        </Typography>
        <Typography variant='body1'>Here is some static data:</Typography>
        <TreeView
          defaultCollapseIcon={<span>-</span>}
          defaultExpandIcon={<span>+</span>}
          expanded={expanded}
          onNodeToggle={handleTreeItemToggle}
        >
          <TreeItem nodeId='passportId' label='passportId'>
            {data.passportId.files.map((item, index) => (
              <>
                <TreeItem
                  key={`${index}+${item.fileName}`}
                  nodeId={`${index}+${item.fileName}`}
                  label={`fileType: ${item.fileName}`}
                />
                <TreeItem
                  key={`${index}+${item.fileType}`}
                  nodeId={`${index}+${item.fileType}`}
                  label={`fileType: ${item.fileType}`}
                />
                <TreeItem
                  key={`${index}+${item.fileUrl}`}
                  nodeId={`${index}+${item.fileUrl}`}
                  label={`fileUrl: ${item.fileUrl.substring(0, 35)}`}
                  onClick={event =>
                    handleTreeItemClick(event, `${index}+${item.fileUrl}`, item.fileUrl)
                  }
                />
              </>
            ))}
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
