import React from 'react';

import { s, types } from './';

const ProfilePage = ({ dataTestId }: types.ProfilePageProps) => (
  <section className={s.container} data-testid={dataTestId}>
    Profile
  </section>
);

export default ProfilePage;
