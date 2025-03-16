import { ChangeEvent, forwardRef, InputHTMLAttributes, useEffect, useState } from 'react';
import classnames from 'classnames';
import { HUDListItem } from '@components/HUDListItem';
import styles from './PlanetAutoComplete.module.css';
import { PlanetItem } from '../../services/Planet';

interface PlanetAutoCompleteProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'defaultValue'> {
  error?: string;
  autoCompleteOptions: (searchTerm?: string) => Promise<PlanetItem[]>;
  fieldLabel: string;
  onChange?: (selectedOption: PlanetItem) => void;
  defaultValue: PlanetItem;
}

type AutoCompleteOptionsStateType = {
  data: PlanetItem[];
  isVisible: boolean;
};

export const PlanetAutoComplete = forwardRef<HTMLInputElement | null, PlanetAutoCompleteProps>(
  function HUDInputComponent(
    {
      className,
      defaultValue,
      error = null,
      autoCompleteOptions,
      fieldLabel,
      name,
      onChange,
      placeholder,
      required = false,
      style,
      type = 'text',
    },
    ref,
  ) {
    const componentClassNames = classnames(styles.hudautocomplete, className);
    const inputClassNames = classnames(styles.hudautocompleteHtmlInput, {
      [styles.hudautocompleteHtmlInputError]: error !== null,
    });
    const labelClassNames = classnames(styles.hudautocompleteLabel, {
      [styles.hudautocompleteLabelError]: error !== null,
    });
    const barClassNames = classnames(styles.hudautocompleteBar, {
      [styles.hudautocompleteBarError]: error !== null,
    });
    const optionsClassNames = classnames(styles.hudautocompleteOptions, {
      [styles.hudautocompleteOptionsError]: error !== null,
    });

    const [options, setOptions] = useState<AutoCompleteOptionsStateType>({
      data: [],
      isVisible: false,
    });
    const [selectedOption, setSelectedOption] = useState<PlanetItem | null>(defaultValue);
    const [inputValue, setInputValue] = useState(selectedOption?.label ?? '');
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
      if (!inputValue) {
        setOptions({ data: [], isVisible });
        return;
      }

      const handler = setTimeout(async () => {
        const searchedList = await autoCompleteOptions(inputValue);
        setOptions({ data: searchedList, isVisible });
      }, 300);
      return () => clearTimeout(handler);
    }, [inputValue, autoCompleteOptions, isVisible]);

    const handleOptionOnClick = (newOptionValue: PlanetItem) => {
      setSelectedOption(newOptionValue);
      setInputValue(newOptionValue.label);
      setIsVisible(false);
      if (onChange) {
        onChange(newOptionValue);
      }
    };

    const handleInputOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
      const searchTerm = e.target.value;
      setInputValue(searchTerm);
      setIsVisible(true);
    };

    const handleVisibleOnFocus = () => {
      setIsVisible(true);
      setOptions({ ...options, isVisible });
    };

    const handleNotVisibleOnBlur = async () => {
      setTimeout(() => {
        setIsVisible(false);
        setOptions({ ...options, isVisible });
      }, 150);
    };

    return (
      <div className={componentClassNames} style={style}>
        <input
          name={`${name}_value`}
          id={`${name}_value`}
          value={selectedOption?.value}
          ref={ref}
          type="hidden"
        />
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          className={inputClassNames}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputOnChange}
          onFocus={handleVisibleOnFocus}
          onBlur={handleNotVisibleOnBlur}
          autoComplete="off"
        />

        <label htmlFor={name} className={labelClassNames}>
          {fieldLabel}
        </label>
        <i className={barClassNames}></i>
        {error && <div className={styles.hudautocompleteError}>{error}</div>}
        {options.isVisible && (
          <div className={optionsClassNames}>
            {options.data.map(({ label, value }: PlanetItem) => (
              <HUDListItem key={`${value}`} hasBorder onClick={() => handleOptionOnClick({ label, value })}>
                {label}
              </HUDListItem>
            ))}
          </div>
        )}
      </div>
    );
  },
);
