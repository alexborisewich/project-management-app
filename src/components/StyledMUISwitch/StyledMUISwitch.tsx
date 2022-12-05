import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { useTranslation } from 'react-i18next';

const StyledMUISwitch = styled(Switch)(({ theme }) => {
  const { t } = useTranslation();
  return {
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
          content: `'${t('Header.LanguageSwitcher.En')}'`,
          paddingTop: 10,
          paddingLeft: 11,
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
        content: `'${t('Header.LanguageSwitcher.Ru')}'`,
        position: 'absolute',
        width: '100%',
        height: '100%',
        paddingTop: 10,
        paddingLeft: 8,
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
  };
});

export default StyledMUISwitch;
