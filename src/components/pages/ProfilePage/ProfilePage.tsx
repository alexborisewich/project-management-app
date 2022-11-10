import React from 'react';

import s from './ProfilePage.module.css';
import { ProfilePageProps } from './ProfilePage.types';

const ProfilePage = ({ dataTestId }: ProfilePageProps) => (
  <section className={s.container} data-testid={dataTestId}>
    Profile
  </section>
);

export default ProfilePage;
