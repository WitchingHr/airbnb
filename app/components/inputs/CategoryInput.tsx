'use client';

import { IconType } from "react-icons";

// props
interface CategoryInputProps {
  icon: IconType,
  label: string,
  selected?: boolean,
  onClick: (value: string) => void,
}

// category input component
// renders each category as a form input
const CategoryInput: React.FC<CategoryInputProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)} // set category form value to label
      className={`
        rounded-xl border-2 p-4 flex flex-col gap-3
      hover:border-black transition cursor-pointer
        ${selected ? 'border-black' : 'border-neutral-200'}`}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  )
};

export default CategoryInput;
