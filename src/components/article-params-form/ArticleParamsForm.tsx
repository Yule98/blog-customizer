import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (settings: typeof defaultArticleState) => void;
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
          <Select
            title="ШРИФТ"
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
            title="РАЗМЕР"
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
            title="ЦВЕТ ТЕКСТА"
            selected={formState.fontColor}
            options={fontColors}
            onChange={(fontColor) =>
              setFormState((previousState) => ({
                ...previousState,
                fontColor,
              }))
            }
          />

          <Select
            title="ЦВЕТ ФОНА"
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
            title="ШИРИНА КОНТЕНТА"
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
