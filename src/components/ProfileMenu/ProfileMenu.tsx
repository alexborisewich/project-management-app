import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { IconButton, Tooltip } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { s, types } from './';

import { PATHS } from 'data';
import { useAppDispatch } from 'hooks';
import { setUser } from 'store';
import { removeSavedUser } from 'utils';

export default function ProfileMenu({ dataTestId }: types.ProfileMenuProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={s.container} data-testid={dataTestId}>
      <Tooltip title={t('Buttons.BtnEditProfile')}>
        <IconButton sx={{ color: '#5352ED', padding: '2px' }} aria-label='delete profile' onClick={handleClick}>
          <AccountCircleIcon fontSize='large' />
        </IconButton>
      </Tooltip>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {location.pathname !== PATHS.profile && (
          <MenuItem
            onClick={() => {
              handleClose();
              navigate(PATHS.profile);
            }}
          >
            <ListItemIcon>
              <EditIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>{t('Buttons.BtnEditProfile')}</ListItemText>
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            removeSavedUser();
            dispatch(setUser(null));
          }}
        >
          <ListItemIcon>
            <ExitToAppIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>{t('Buttons.BtnSignOut')}</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}
