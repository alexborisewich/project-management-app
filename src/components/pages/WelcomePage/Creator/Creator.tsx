import React from 'react';
import { useTranslation } from 'react-i18next';

import { s, types } from '.';

import Photo from './../../../../assets/images/Fronted.png';

const Creator = ({ name, feature, dataTestId }: types.CreatorProps) => {
  const { t } = useTranslation();
  const arrFeature: string[] = [];
  const featureFunc = (length: number) => {
    for (let i = 1; i <= length; i++) {
      const feat = t(`WelcomePage.Creator${name}.feat.feat${i}`);
      arrFeature.push(feat);
    }
  };
  featureFunc(feature);
  return (
    <div className={s.creator} data-testid={dataTestId}>
      <img src={Photo} alt='Creator' />
      <h3 className={s.name}>{t(`WelcomePage.Creator${name}.Name`)}</h3>
      <ul className={s.ul}>
        {arrFeature.map((el, index) => (
          <li key={index}>{el}</li>
        ))}
      </ul>
    </div>
  );
};

export default Creator;
