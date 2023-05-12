'use client';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from '@/app/components/modals/Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';

const RegisterModal = () => {
  // state
  const registerModal = useRegisterModal();

  // loading
  const [isLoading, setIsLoading] = useState(false);

  // form
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
    // set loading true
    setIsLoading(true);

    // send request
    axios.post('/api/register', data)
      .then((res) => {
        registerModal.onClose();
      })
      .catch((err) => {
        // toast error
        toast.error('Something went wrong!');
      })
      .finally(() => {
        // set loading false
        setIsLoading(false);
      });
  };

  // form inputs 
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title='Welcome to Airbnb' subtitle='Create an account!' />
      <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
      <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
      <Input id="password" label="Password" type='password' disabled={isLoading} register={register} errors={errors} required />
    </div>
  );

  // log in with google or github buttons
  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label="Continue with GitHub"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div className='mt-4 font-light text-center text-neutral-500'>
        <div className='flex flex-row items-center justify-center gap-2'>
          <div>Already have an account?</div>
          {/* close modal */}
          <div onClick={registerModal.onClose} className='cursor-pointer text-neutral-800 hover:underline'>Log in</div>
        </div>
      </div>
    </div>
  );


  return (
    <Modal 
      disabled={isLoading}
      isOpen={registerModal.isOpen} 
      title="Register"
      actionLabel='Continue'
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
};

export default RegisterModal;
