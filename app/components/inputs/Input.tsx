"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"; // for form validation
import { BiDollar } from "react-icons/bi"; // for price icon

// props
interface InputProps {
	id: string;
	label: string;
	type?: string;
	disabled?: boolean;
	formatPrice?: boolean;
	required?: boolean;
	register: UseFormRegister<FieldValues>; // register function from useForm
	errors: FieldErrors; // errors object from useForm
}

// input component
// used for all inputs in the app
const Input: React.FC<InputProps> = ({
	id,
	label,
	type = "text",
	disabled,
	formatPrice,
	required,
	register,
	errors,
}) => {
	return (
		<div className="relative w-full">

			{/* if input for price, render dollar icon */}
			{formatPrice && (
				<BiDollar
					size={24}
					className="absolute text-neutral-700 top-5 left-2"
				/>
			)}
			<input
				id={id}
				disabled={disabled}
				{...register(id, { required })}
				placeholder=" " // placeholder for label animation
				type={type}
				className={`
          peer
          w-full
          p-4
          pt-6
          font-light
          bg-white
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? "pl-9" : "pl-4"}
          ${
						errors[id]
							? "border-rose-500 focus:border-rose-500"
							: "border-neutral-300 focus:border-black"
					}
        `}
			/>
			<label
				className={`
          absolute
          text-md
          duration-150
          transform
          -translate-y-3
          top-5
          z-10
          origin-[0]
          ${formatPrice ? "left-9" : "left-4"}
          ${errors[id] ? "text-rose-500" : "text-zinc-400"}
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4`}
					// peer ulility classes are used to animate the label
			>
				{label}
			</label>
		</div>
	);
};

export default Input;
