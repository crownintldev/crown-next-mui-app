// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'

const EditFilesUploader = ({
  files,
  setFiles,
  onChange,
  previousFiles,
  setPreviousFiles,
  removeFiles,
  setRemoveFiles
}) => {
  // ** State
  // const [files, setFiles] = useState<File[]>([])

  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file)))
      if (onChange) {
        onChange(acceptedFiles) // Notify react-hook-form about the change
      }
    }
  })

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <Image width={38} height={38} alt={file.name} src={URL.createObjectURL(file)} />
    } else {
      return <Icon icon='tabler:file-description' />
    }
  }
  const renderPreviousFiles = file => {
    
    return <Image width={38} height={38} alt={file.name ?? ""} src={file.url ?? ""} />
  }

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setFiles([...filtered])
  }

  const handlePrevRemoveFile = file => {
    let removeFile = previousFiles?.filter(prevFile => prevFile.url !== file.url)
    setPreviousFiles(removeFile)
    setRemoveFiles([...removeFiles, file?.fileId])
  }

  const fileList = files.map(file => (
    <ListItem key={file.name}>
      <div className='file-details'>
        <div className='file-preview'>{renderFilePreview(file)}</div>
        <div>
          <Typography className='file-name'>{file.name}</Typography>
          <Typography className='file-size' variant='body2'>
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <Icon icon='tabler:x' fontSize={20} />
      </IconButton>
    </ListItem>
  ))

  const prevFileList = previousFiles?.map(file => (
    <ListItem key={file.url}>
      <div className='file-details'>
        <div className='file-preview'>{renderPreviousFiles(file)}</div>
        <div>
          <Typography className='file-name'>{file.name}</Typography>
        </div>
      </div>
      <IconButton onClick={() => handlePrevRemoveFile(file)}>
        <Icon icon='tabler:x' fontSize={20} />
      </IconButton>
    </ListItem>
  ))

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  return (
    <Fragment>
      <div
        {...getRootProps({ className: 'dropzone' })}
        style={{ padding: '10px', paddingBottom: '20px' }}
      >
        {/* <input
          {...getInputProps()}
          type='file'
          id={'files'}
        /> */}
        <Box
         sx={{
            cursor: 'pointer',
            padding: 2,
            margin: 'auto',
            display: 'flex',
            border: 1,
            borderRadius: 2,
            boxShadow: '3px 3px rgba(255, 255, 255, 0.4)',
            borderColor: '',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <Box
            sx={{
              mb: 8.75,
              display: 'flex',
              borderRadius: 1,
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.08)`
            }}
          >
            <Icon icon='tabler:upload' fontSize='1.2rem' />
          </Box>
          <Typography>Drop Files / Browse.</Typography>
        </Box>
      </div>
      {previousFiles && previousFiles.length > 0 && <List>{prevFileList}</List>}
      {files.length ? (
        <Fragment>
          <List>{fileList}</List>
          {/* <div className='buttons'>
            <Button
              color='error'
              variant='outlined'
              onClick={handleRemoveAllFiles}
            >
              Remove All
            </Button>
            <Button variant='contained'>Upload Files</Button>
          </div> */}
        </Fragment>
      ) : null}
    </Fragment>
  )
}

export default EditFilesUploader
