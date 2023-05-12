"use client";

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai"; // for menu icon

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";

// props
interface UserMenuProps {
	currentUser?: SafeUser | null;
}

// user menu component
// dropmenu for navbar
const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
	// register and login modals view state
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();

	// menu view state
	const [isOpen, setIsOpen] = useState(false);
 
  // open menu modal
	const toggleOpen = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);

	return (
		<div className="relative">
			<div className="flex flex-row items-center gap-3">
				<div
					onClick={() => {}}
					className="hidden px-4 py-3 text-sm font-semibold transition rounded-full cursor-pointer md:block hover:bg-neutral-100"
				>
					Airbnb your home
				</div>

				{/* drop menu */}
				<div
					onClick={toggleOpen}
					className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-sm transition"
				>
					{/* menu icon */}
					<AiOutlineMenu />

					{/* user profile picture */}
					<div className="hidden md:block">
						<Avatar src={currentUser?.image} />
					</div>

				</div>
			</div>

      {/* menu items */}
			{isOpen && (
				<div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
					<div className="flex flex-col cursor-pointer">
						{currentUser ? (
							<>
								{/* trips */}
								<MenuItem onClick={() => {}} label="My trips" />

								{/* favorites */}
								<MenuItem onClick={() => {}} label="My favorites" />

								{/* reservations */}
								<MenuItem onClick={() => {}} label="My reservations" />

								{/* properties */}
								<MenuItem onClick={() => {}} label="My properties" />

								{/* my home */}
								<MenuItem onClick={() => {}} label="Airbnb my home" />

								<hr />

								{/* logout */}
								<MenuItem onClick={() => signOut()} label="Logout" />
							</>
						) : (
							<>
								{/* login */}
								<MenuItem onClick={loginModal.onOpen} label="Login" />

								{/* sign up */}
								<MenuItem onClick={registerModal.onOpen} label="Sign up" />
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default UserMenu;
