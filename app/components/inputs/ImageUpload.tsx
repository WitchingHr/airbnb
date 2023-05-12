"use client";

import { useCallback } from "react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary"; // for image upload
import { TbPhotoPlus } from "react-icons/tb"; // for image upload icon

// declare global var for cloudinary
declare global {
	var cloudinary: any;
}

// props
interface ImageUploadProps {
	onChange: (value: string) => void;
	value: string;
}

// image upload component
const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
	// update form value on upload
	const handleUpload = useCallback(
		(result: any) => {
			onChange(result.info.secure_url);
		},
		[onChange]
	);

	return (
		<CldUploadWidget
			onUpload={handleUpload}
			uploadPreset="mn6wsaeb" // cloudinary upload preset
			options={{
				maxFiles: 1,
			}}
		>
			{({ open }) => {
				return (
					<div
						onClick={() => open?.()}
						className="
							relative flex flex-col items-center justify-center
							gap-4 p-20 transition border-2 border-dashed cursor-pointer
							text-neutral-600 hover:opacity-70 border-neutral-300"
					>
						{/* upload icon */}
						<TbPhotoPlus size={50} />

						<div className="text-lg font-semibold">Click to upload</div>

						{/* display uploaded image */}
						{value && (
							<div className="absolute inset-0 w-full h-full">
								<Image
									alt="upload"
									fill
									style={{ objectFit: "cover" }}
									src={value}
								/>
							</div>
						)}
					</div>
				);
			}}
		</CldUploadWidget>
	);
};

export default ImageUpload;
