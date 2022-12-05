import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { s, types } from '.';

import { PATHS } from 'data';

const NotFoundPage = ({ dataTestId }: types.NotFoundPageProps) => {
  const { t } = useTranslation();
  return (
    <section className={s.container} data-testid={dataTestId}>
      <div className={s.wrapper}>
        <h2 className={s.title}>{t('NotFoundPage.Title')}</h2>
        <p className={s.text}>{t('NotFoundPage.Text')}</p>
        <Link className={s.link} to={PATHS.welcome}>
          {t('NotFoundPage.Link')}
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
