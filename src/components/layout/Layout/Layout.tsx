import React, { useEffect } from 'react';

import { types } from './';

import { Footer, Header, Main } from 'components';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setUser } from 'store';
import { getSavedUser, isSavedUserValid, removeSavedUser } from 'utils';

const Layout: React.FC<types.LayoutProps> = () => {
  const { user } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const savedUser = getSavedUser();
    if (!user && savedUser) {
      isSavedUserValid(savedUser) ? dispatch(setUser(savedUser)) : removeSavedUser();
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
