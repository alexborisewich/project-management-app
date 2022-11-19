import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { motion, useScroll, useTransform } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';

import { s, types } from './';

import { useAppDispatch, useAppSelector } from 'hooks';
import { setUser } from 'store';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
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

const Header = ({ dataTestId }: types.HeaderProps) => {
  const { scrollYProgress } = useScroll();
  const state = useAppSelector((state) => state.app.user);
  const dispatch = useAppDispatch();
  const boxShadow = useTransform(
    scrollYProgress,
    [0, 100],
    ['3px 3px 3px rgba(83, 82, 237, 0)', '3px 3px 3px rgba(83, 82, 237, 100)']
  );

  return (
    <motion.header className={s.container} data-testid={dataTestId} style={{ boxShadow }}>
      <span>Logo</span>
      <motion.div className={s.wrapper__btns}>
        {!state?.token && (
          <Link to='/login'>
            <Button
              variant='contained'
              startIcon={<LoginIcon />}
              sx={{ borderRadius: '10px', backgroundColor: '#5352ED', height: '40px', textTransform: 'none' }}
            >
              Sign In
            </Button>
          </Link>
        )}
        {!state?.token && (
          <Link to='/registration'>
            <Button
              variant='outlined'
              startIcon={<AppRegistrationIcon />}
              sx={{
                borderRadius: '10px',
                color: '#0D0D0D',
                border: '1px solid #5352ED',
                height: '40px',
                textTransform: 'none',
              }}
            >
              Sign Up
            </Button>
          </Link>
        )}
        {state?.token && (
          <Button
            variant='contained'
            startIcon={<ExitToAppIcon />}
            onClick={() => {
              dispatch(setUser(null));
            }}
            sx={{
              color: 'white',
              borderRadius: '10px',
              backgroundColor: '#5352ED',
              // height: '40px',
              textTransform: 'none',
            }}
          >
            Sign out
          </Button>
        )}
        <MaterialUISwitch defaultChecked />
      </motion.div>
    </motion.header>
  );
};

export default Header;
