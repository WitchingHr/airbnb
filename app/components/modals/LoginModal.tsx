'use client';

import { useCallback, useState } from 'react';
import { AiFillGithub } from 'react-icons/ai'; // for github icon
import { FcGoogle } from 'react-icons/fc'; // for google icon
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'; // for form validation
import { toast } from 'react-hot-toast'; // for toast notifications
import { signIn } from 'next-auth/react'; // for next auth sign in
import { useRouter } from 'next/navigation'; // for page routing

import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from '@/app/components/modals/Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';

// login modal component
// modal for logging user in
const LoginModal = () => {
  // modal view state, (methods: isOpen, onClose, onOpen)
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  // loading state, for disabling inputs during api requests
  const [isLoading, setIsLoading] = useState(false);

  // router for page refresh after login
  const router = useRouter();

  // form logic
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // submit form
  const onSubmit: SubmitHandler<FieldValues> = async(data) => {
    // set loading true, disable inputs
    setIsLoading(true);

    // validate credentials with NextAuth
    signIn('credentials', {
      // pass email and password
      ...data,

      // don't redirect page
      redirect: false,

    }).then((callback) => {
      // set loading false, enable inputs
      setIsLoading(false);

      // if success, toast success, refresh page and close modal
      if (callback?.ok) {
        toast.success('Logged in successfully!');
        router.refresh();
        loginModal.onClose();
      }
      
      // if error, toast error
      if (callback?.error) {
        toast.error(callback.error);
      }
    })
  };

  // close login modal and open register modal
  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);
  
  // form inputs, email and password
  // passed to modal body prop
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title='Welcome back' subtitle='Login to your account!' />
      <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
      <Input id="password" label="Password" type='password' disabled={isLoading} register={register} errors={errors} required />
    </div>
  );

  // google and github sign in buttons
  // passed to modal footer prop
  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      
      {/* google */}
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />

      {/* github */}
      <Button
        outline
        label="Continue with GitHub"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />

      {/* don't have an account */}
      <div className='mt-4 font-light text-center text-neutral-500'>
        <div className='flex flex-row items-center justify-center gap-2'>
          <div>Don&#39;t have an account?</div>
          {/* close modal */}
          <div onClick={toggle} className='cursor-pointer text-neutral-800 hover:underline'>Sign up</div>
        </div>
      </div>
    </div>
  );


  return (
    <Modal 
      disabled={isLoading} // disable inputs during api request
      isOpen={loginModal.isOpen} // modal view state
      title="Login"
      actionLabel='Continue'
      onClose={loginModal.onClose} // close modal
      onSubmit={handleSubmit(onSubmit)} // submit form
      body={bodyContent} // form inputs
      footer={footerContent} // google and github sign in buttons
    />
  )
};

export default LoginModal;
