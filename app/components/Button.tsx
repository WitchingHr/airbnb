'use client';

import { IconType } from "react-icons"; // for icon types

// props
interface ButtonProps {
	label: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	outline?: boolean;
	small?: boolean;
	icon?: IconType;
}

// button component
// reusable button component
const Button: React.FC<ButtonProps> = ({
	label,
	onClick,
	disabled,
	outline,
	small,
	icon: Icon, // destructured and renamed to Icon for readability
}) => {
	return (
		<button
      onClick={onClick}
      disabled={disabled}
			className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full ${
				outline
					? "bg-white border-black text-black"
					: "bg-rose-500 border-rose-500 text-white"
			} ${small ? "py-1 text-sm font-light border-[1px]" : "py-3 text-md font-semibold border-2"}`}
		>

			{/* render icon if it exists */}
      {Icon && (
        <Icon className="absolute left-4 top-3" size={24} />
      )}

			{label}

		</button>
	);
};

export default Button;
