import { Fragment, useState, useEffect } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// ** Icon Imports
import Icon from 'src/@core/components/icon';

// ** Third Party Imports
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

const SingleFileUploader = ({ initialFileUrl, file, setFile, onChange }) => {
  // ** Effect to handle initial file URL
  useEffect(() => {
    if (initialFileUrl) {
      setFile(initialFileUrl);
    }
  }, [initialFileUrl])

  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      const newFile = acceptedFiles[0];
      setFile(newFile);
      if (onChange) {
        onChange(newFile);
      }
    }
  });
  const renderFilePreview = (file) => {
    if (file && file?.type?.startsWith('image')) {
      return (
        <Image width={38} height={38} alt={file.name} src={file.url ?? URL.createObjectURL(file)} />
      );
  }else{
    return null;
  }
}

  const handleRemoveFile = () => {
    setFile(null);
  };

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
            boxShadow: '1px 1px rgba(255, 255, 255, 0.4)',
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
      {file && (
        <Fragment>
          <List>
            <ListItem>
              <div className='file-details'>
                <div className='file-preview'>{renderFilePreview(file)}</div>
                <div>
                  <Typography className='file-name'>{file.name}</Typography>
                  {/* File size Typography */}
                </div>
              </div>
              <IconButton onClick={handleRemoveFile}>
                <Icon icon='tabler:x' fontSize={20} />
              </IconButton>
            </ListItem>
          </List>
        </Fragment>
      )}
    </Fragment>
  );
};

export default SingleFileUploader;
