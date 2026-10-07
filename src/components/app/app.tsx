import { defaultArticleState, type ArticleStateType } from '@/constants/articleProps.ts';
import { clsx } from 'clsx';
import { useState } from 'react';

import { ArticleParamsForm } from '@components/article-params-form';

import { Article } from '../article/Article';

import styles from './app.module.scss';

export const App = (): React.JSX.Element => {
  const [appliedSettings, setAppliedSettings] =
    useState<ArticleStateType>(defaultArticleState);
  const handleApply = (settings: ArticleStateType): void => {
    setAppliedSettings(settings);
  };

  return (
    <main className={clsx(styles.main)}>
      <ArticleParamsForm onApply={handleApply} />
      <Article settings={appliedSettings} />
    </main>
  );
};
