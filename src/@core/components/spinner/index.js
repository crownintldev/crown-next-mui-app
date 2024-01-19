// // ** MUI Imports
// import { useTheme } from '@mui/material/styles'
// import Box from '@mui/material/Box'
// import CircularProgress from '@mui/material/CircularProgress'

// const FallbackSpinner = ({ sx }) => {
//   // ** Hook
//   const theme = useTheme()

//   return (
//     <Box
//       sx={{
//         height: '100vh',
//         display: 'flex',
//         alignItems: 'center',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         ...sx
//       }}
//     >
//       <div className='loader'>
//         <img src='/images/favicon.svg' alt='Logo' width='200' className='loaderimg' />
//       </div>
//     </Box>
//   )
// }

// export default FallbackSpinner

import React from 'react'
import { motion } from 'framer-motion'
import bird from '../../../../public/images/animate-logo/bird.svg'
import circle from '../../../../public/images/animate-logo/circle.svg'
import travokey from '../../../../public/images/animate-logo/Travokey.svg'
import bgbird from '../../../../public/images/animate-logo/bird-back.svg'
import Image from 'next/image'

const firstImageVariants = {
  initial: { x: '-100vw', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { opacity: 0 }
}

const secondImageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.5 } }
}

const thirdImageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.9 } }
}

const fourthImageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 1.2 } }
}

const transition = {
  duration: 1,
  ease: 'easeInOut'
}
const fifthImageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 1.1 } }
}

const FallbackSpinner = ({ sx }) => (
  <div className='preloader' style={{ position: 'relative' }}>
    <motion.div
      variants={fifthImageVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={{ ...transition, delay: 0.3 }}
      style={{
        position: 'absolute',
        zIndex: 1,
        width: '270px',
        height: '270px',
        borderRadius: '50%',
        backgroundColor: 'white'
      }}
    ></motion.div>
    <motion.div
      variants={firstImageVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={{ ...transition, delay: 0 }}
      style={{ position: 'absolute', zIndex: 5 }}
    >
      <Image
        src={bird}
        alt='Bird Image'
        width={200}
        height={200}
        style={{
          width: '112px', // or you can use theme spacing like theme.spacing(28)
          height: '112px', // or theme.spacing(28)
          marginBottom: '80px',
          marginRight: '16px'
        }}
        className='image w-28 h-28 mb-20 mr-4'
      />
    </motion.div>
    <motion.div
      variants={secondImageVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={{ duration: 1, delay: 0.6 }}
      style={{ position: 'absolute', zIndex: 1 }}
    >
      <Image
        src={circle}
        alt='Circle Image'
        width={300}
        height={300}
        style={{
          height: 320,
          width: 320
        }}
        className='image w-80 h-80'
      />
    </motion.div>
    <motion.div
      variants={thirdImageVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={{ ...transition, delay: 1 }}
      style={{ position: 'absolute', zIndex: 2 }}
    >
      <Image
        src={travokey}
        alt='Third Image'
        width={200}
        height={200}
        style={{
          marginTop: '56px'
        }}
        className='image mt-14'
      />
    </motion.div>

    <motion.div
      variants={fourthImageVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={{ ...transition, delay: 1.2 }}
      style={{ position: 'absolute', zIndex: 3 }}
    >
      <Image
        src={bgbird}
        alt='Fourth Image'
        width={200}
        height={200}
        style={{
          width: '256px',
          height: '256px',
          marginBottom: '64px',
          marginRight: '12px'
        }}
        className='image w-64 h-64 mb-16 mr-3'
      />
    </motion.div>
  </div>
)

export default FallbackSpinner
