import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
  type ArticleStateType,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps): React.JSX.Element => {
  const { onApply } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState(defaultArticleState);

  const handleToggle = (): void => {
    setIsOpen((previousValue) => !previousValue);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleOverlayClick = (): void => {
      setIsOpen(false);
    };

    const overlay = document.querySelector(`.${styles.overlay}`);

    overlay?.addEventListener('click', handleOverlayClick);

    return (): void => {
      overlay?.removeEventListener('click', handleOverlayClick);
    };
  }, [isOpen]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onApply(formState);
  };

  const handleReset = (): void => {
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  return (
    <>
      <div>
        <ArrowButton isOpen={isOpen} onClick={handleToggle} />
      </div>

      {isOpen && <div className={styles.overlay} />}

      <aside
        className={clsx(styles.container, {
          [styles.container_open]: isOpen,
        })}
      >
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>
          <Select
            title="Шрифт"
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={(fontFamilyOption) =>
              setFormState((previousState) => ({
                ...previousState,
                fontFamilyOption,
              }))
            }
          />

          <RadioGroup
            name="font-size"
            title="Размер шрифта"
            selected={formState.fontSizeOption}
            options={fontSizeOptions}
            onChange={(fontSizeOption) =>
              setFormState((previousState) => ({
                ...previousState,
                fontSizeOption,
              }))
            }
          />

          <Select
            title="Цвет шрифта"
            selected={formState.fontColor}
            options={fontColors}
            onChange={(fontColor) =>
              setFormState((previousState) => ({
                ...previousState,
                fontColor,
              }))
            }
          />

          <Separator />

          <Select
            title="Цвет фона"
            selected={formState.backgroundColor}
            options={backgroundColors}
            onChange={(backgroundColor) =>
              setFormState((previousState) => ({
                ...previousState,
                backgroundColor,
              }))
            }
          />

          <Select
            title="Ширина контента"
            selected={formState.contentWidth}
            options={contentWidthArr}
            onChange={(contentWidth) =>
              setFormState((previousState) => ({
                ...previousState,
                contentWidth,
              }))
            }
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
