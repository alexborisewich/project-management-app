import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import { motion, useScroll, useTransform } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { s, types } from './';

import { StyledMUISwitch } from 'components';
import { PATHS, signInBtnSXProps, signOutBtnSXProps, SignUpBtnSXProps } from 'data';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setUser } from 'store';
import { removeSavedUser } from 'utils';

const Header = ({ dataTestId }: types.HeaderProps) => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const { user } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const boxShadow = useTransform(
    scrollYProgress,
    [0, 100],
    ['3px 3px 3px rgba(83, 82, 237, 0)', '3px 3px 3px rgba(83, 82, 237, 100)']
  );
  const { i18n } = useTranslation();

  return (
    <motion.header className={s.container} data-testid={dataTestId} style={{ boxShadow }}>
      <span>Logo</span>
      <motion.div className={s.wrapper__btns}>
        {user?.token ? (
          <Button
            variant='contained'
            startIcon={<ExitToAppIcon />}
            onClick={() => {
              removeSavedUser();
              dispatch(setUser(null));
            }}
            sx={signOutBtnSXProps}
          >
            Sign out
          </Button>
        ) : (
          <>
            <Button
              variant='contained'
              startIcon={<LoginIcon />}
              sx={signInBtnSXProps}
              onClick={() => navigate(PATHS.signIn)}
            >
              Sign In
            </Button>
            <Button
              variant='outlined'
              startIcon={<AppRegistrationIcon />}
              sx={SignUpBtnSXProps}
              onClick={() => navigate(PATHS.signUp)}
            >
              Sign Up
            </Button>
          </>
        )}
        <StyledMUISwitch
          defaultChecked
          onChange={() => void i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en')}
        />
      </motion.div>
    </motion.header>
  );
};

export default Header;
