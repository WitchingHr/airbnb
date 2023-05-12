'use client';

import Select from 'react-select';
import useCountries from '@/app/hooks/useCountries';

// type
export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: [number, number];
  region: string;
  value: string;
};

// props
interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

// country select component
// dropdown select for countries
const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
}) => {
  // get all countries
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()} // get all countries and use as options
        value={value}
        onChange={(value) => onChange?.(value as CountrySelectValue)} // send value to form
        formatOptionLabel={(option: any) => ( // format option appearance
          <div className="flex flex-row items-center gap-3">
            {/* flag */}
            <div>{option.flag}</div>
            <div>
              {/* country name */}
              {option.label},
              <span className='ml-1 text-neutral-800'>
                {/* region */}
                {option.region}
              </span>
            </div>
          </div>
        )}
        classNames={{ // custom styles
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg',
        }}
        theme={(theme) => ({ // custom theme
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6',
          }
        })}
      />     
    </div>
  )
};

export default CountrySelect;
