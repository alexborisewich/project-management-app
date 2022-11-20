import React, { useEffect } from 'react';

import { types } from './';

import { Footer, Header, Main } from 'components';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setUser } from 'store';
import { getSavedUser, isSavedUserValid } from 'utils';

const Layout: React.FC<types.LayoutProps> = () => {
  const { user } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!user) {
      const savedUser = getSavedUser();
      if (savedUser && isSavedUserValid(savedUser)) {
        dispatch(setUser(savedUser));
      }
    }
  }, [dispatch, user]);

  return !user && getSavedUser() ? null : (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
};

export default Layout;
