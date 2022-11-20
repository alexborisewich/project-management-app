import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

const StyledMUISwitch = styled(Switch)(({ theme }) => ({
  width: 64,
  padding: 0,
  borderRadius: '10px',
  '& .MuiSwitch-switchBase': {
    margin: 0,
    padding: 2,
    transform: 'translateX(0px)',
    '& .MuiSwitch-thumb': {
      borderRadius: '10px',
    },
    '&.Mui-checked': {
      color: '#000',
      transform: 'translateX(26px)',
      '& .MuiSwitch-thumb:before': {
        content: "'Ru'",
        paddingTop: 9,
        paddingLeft: 10,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#56B8EF' : '#5352ED',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#56B8EF' : '#EFF0F3', // circle
    width: 34,
    height: 34,
    color: '#000',
    '&:before': {
      content: "'En'",
      position: 'absolute',
      width: '100%',
      height: '100%',
      paddingTop: 9,
      paddingLeft: 10,
      left: 0,
      top: 0,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#56B8EF' : '#5352ED', //background
    borderRadius: 0.1,
    height: 39,
  },
}));

export default StyledMUISwitch;
