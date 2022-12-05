import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import { IconButton, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import { motion, useScroll, useTransform } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { useNavigate, useLocation } from 'react-router-dom';

import { s, types } from './';

import { StyledMUISwitch } from 'components';
import ModalCreateBoard from 'components/pages/ModalCreateBoardPage/ModalCreateBoard';
import ProfileMenu from 'components/ProfileMenu';
import { PATHS, signInBtnSXProps, SignUpBtnSXProps } from 'data';
import { useAppSelector } from 'hooks';

const Header = ({ dataTestId }: types.HeaderProps) => {
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const { user } = useAppSelector((state) => state.app);
  const boxShadow = useTransform(
    scrollYProgress,
    [0, 100],
    ['3px 3px 3px rgba(83, 82, 237, 0)', '3px 3px 3px rgba(83, 82, 237, 100)']
  );
  const { i18n } = useTranslation();

  return (
    <motion.header className={s.container} data-testid={dataTestId} style={{ boxShadow }}>
      <span className={s.logo}>PMA</span>
      <motion.div className={s.wrapper__btns}>
        {user ? (
          <>
            <ModalCreateBoard />
            {location.pathname !== PATHS.main && (
              <Tooltip title={t('Buttons.BtnMain')}>
                <IconButton
                  sx={{ color: '#5352ED', padding: '2px' }}
                  aria-label='go to main'
                  onClick={() => navigate(PATHS.main)}
                >
                  <DashboardIcon fontSize='large' />
                </IconButton>
              </Tooltip>
            )}
            <ProfileMenu />
          </>
        ) : (
          <>
            {!isMobile ? (
              <>
                <Button
                  variant='contained'
                  startIcon={<LoginIcon />}
                  sx={signInBtnSXProps}
                  onClick={() => navigate(PATHS.signIn)}
                >
                  {t('Buttons.BtnSignIn')}
                </Button>
                <Button
                  variant='outlined'
                  startIcon={<AppRegistrationIcon />}
                  sx={SignUpBtnSXProps}
                  onClick={() => navigate(PATHS.signUp)}
                >
                  {t('Buttons.BtnSignUp')}
                </Button>
              </>
            ) : (
              <>
                <Tooltip title={t('Buttons.BtnSignIn')}>
                  <IconButton
                    sx={{ color: '#5352ED', padding: '2px' }}
                    aria-label='go to main'
                    onClick={() => navigate(PATHS.signIn)}
                  >
                    <LoginIcon fontSize='large' />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('Buttons.BtnSignUp')}>
                  <IconButton
                    sx={{ color: '#5352ED', padding: '2px' }}
                    aria-label='go to main'
                    onClick={() => navigate(PATHS.signUp)}
                  >
                    <AppRegistrationIcon fontSize='large' />
                  </IconButton>
                </Tooltip>
              </>
            )}
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
