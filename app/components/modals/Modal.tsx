"use client";

import { useState, useEffect, useCallback } from "react";
import { IoMdClose } from "react-icons/io"; // for close icon

import Button from "../Button";

// props
interface ModalProps {
	isOpen?: boolean; // renders modal if true
	onClose: () => void;
	onSubmit: () => void;
	title?: string;
	body?: React.ReactElement;
	footer?: React.ReactElement;
	actionLabel: string; // label for submit button
	disabled?: boolean;
	secondaryAction?: () => void;
	secondaryActionLabel?: string; // label for secondary action button
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
	title,
	body,
	footer,
	actionLabel,
	disabled,
	secondaryAction,
	secondaryActionLabel,
}) => {
	// modal view state
	const [showModal, setShowModal] = useState(isOpen);

	useEffect(() => {
		// animate slide in from bottom
		setShowModal(isOpen);
	}, [isOpen]);

	// close modal
	const handleClose = useCallback(() => {
		if (disabled) {
			return;
		}

		// animate slide out to bottom
		setShowModal(false);

		// close modal after animation
		setTimeout(() => {
			onClose();
		}, 300);
	}, [disabled, onClose]);

	// submit function
	const handleSubmit = useCallback(() => {
		if (disabled) {
			return;
		}

		onSubmit();
	}, [disabled, onSubmit]);

	// secondary action function
	const handleSecondaryAction = useCallback(() => {
		if (disabled || !secondaryAction) {
			return;
		}

		secondaryAction();
	}, [disabled, secondaryAction]);

	// render nothing if modal is not open
	if (!isOpen) {
		return null;
	}

	return (
		<>
			<div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none  focus:outline-none bg-neutral-800/70"
			>
				<div className="relative w-full h-full mx-auto my-6 md:w-4/6 lg:w-3/6 xl:w-2/5 lg:h-auto md:h-auto">
					<div
						className={`
              translate
              duration-300
              h-full
              ${
								showModal
									? // slide in from bottom on mount
									  "translate-y-0 opacity-100"
									: // initial state
									  "translate-y-full opacity-0"
							}`}
					>
						<div className="relative flex flex-col w-full h-full bg-white border-0 rounded-lg shadow-lg outline-none  translate lg:h-auto md:h-auto focus:outline-none"
						>
							{/* header */}
							<div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">

								{/* close button */}
								<button
									onClick={handleClose}
									className="absolute p-1 transition border-0 hover:opacity-70 left-9"
								>
									{/* close icon */}
									<IoMdClose size={18} />
								</button>

								{/* title */}
								<div className="text-lg font-semibold ">{title}</div>
							</div>

							{/* body content */}
							<div className="relative flex-auto p-6 ">{body}</div>

							<div className="flex flex-col gap-2 p-6 ">
								{/* submit buttons */}
								<div className="flex flex-row items-center w-full gap-4 ">

									{/* if secondary action */}
									{secondaryAction && secondaryActionLabel && (
										<Button
											outline
											disabled={disabled}
											label={secondaryActionLabel}
											onClick={handleSecondaryAction}
										/>
									)}

									{/* submit */}
									<Button
										disabled={disabled}
										label={actionLabel}
										onClick={handleSubmit}
									/>
								</div>

								{/* footer content */}
								{footer}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;
