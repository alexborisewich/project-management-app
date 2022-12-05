import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { s, types } from '.';

import { PATHS } from 'data';

const ErrorPage = ({ dataTestId }: types.ErrorPageProps) => {
  const { t } = useTranslation();
  const locationState = useLocation().state as { errorText: string };
  const { errorText } = locationState;
  return (
    <section className={s.container} data-testid={dataTestId}>
      <div className={s.wrapper}>
        <h2 className={s.title}>{t('ErrorPage.Title')}</h2>
        <p className={s.text}>{t('ErrorPage.Text')}</p>
        {errorText && <p className={s.text}>{errorText}</p>}
        <Link className={s.link} to={PATHS.welcome}>
          {t('ErrorPage.Link')}
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
