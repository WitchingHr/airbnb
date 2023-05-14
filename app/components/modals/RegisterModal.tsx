'use client';

import { useState, useCallback } from 'react';
import axios from 'axios'; // for api requests
import { AiFillGithub } from 'react-icons/ai'; // for github icon
import { FcGoogle } from 'react-icons/fc'; // for google icon
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'; // for form validation
import { toast } from 'react-hot-toast'; // for toast notifications
import { signIn } from 'next-auth/react'; // for google and github sign in

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import Modal from '@/app/components/modals/Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';
import { log } from 'console';

// register modal component
// modal for registering new user
const RegisterModal = () => {
  // modal view state, (methods: isOpen, onClose, onOpen)
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  // loading state, for disabling inputs during api requests
  const [isLoading, setIsLoading] = useState(false);

  // form logic
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  // submit form
  const onSubmit: SubmitHandler<FieldValues> = async(data) => {
    // set loading true, disable inputs
    setIsLoading(true);

    // send request with data
    axios.post('/api/register', data)
      .then((res) => {
        // toast success
        toast.success('Account created! Please log in.');

        // close register modal and open login modal
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((err) => {
        // toast error
        toast.error('Something went wrong!');
      })
      .finally(() => {
        // set loading false, enable inputs
        setIsLoading(false);
      });
  };

  // close register modal and open login modal
  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  // form inputs, email, name and password
  // passed to modal body prop
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title='Welcome to Airbnb' subtitle='Create an account!' />
      <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
      <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
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

      {/* already have an account */}
      <div className='mt-4 font-light text-center text-neutral-500'>
        <div className='flex flex-row items-center justify-center gap-2'>
          <div>Already have an account?</div>
          <div onClick={toggle} className='cursor-pointer text-neutral-800 hover:underline'>Log in</div>
        </div>
      </div>
    </div>
  );


  return (
    <Modal 
      disabled={isLoading} // disable inputs during api request
      isOpen={registerModal.isOpen} // modal view state
      title="Register"
      actionLabel='Continue'
      onClose={registerModal.onClose} // close modal
      onSubmit={handleSubmit(onSubmit)} // submit form
      body={bodyContent} // inputs
      footer={footerContent} // google and github buttons
    />
  )
};

export default RegisterModal;
