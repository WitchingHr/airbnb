'use client';

import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { categories } from "../navbar/Categories";
import useRentModal from '@/app/hooks/useRentModal';

import Modal from '@/app/components/modals/Modal';
import axios from "axios";
import { toast } from "react-hot-toast";
import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import Counter from "../Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";

// form steps
enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

// rent modal component
// modal for listing home for rent
const RentModal = () => {
  // modal view state, (methods: isOpen, onClose, onOpen)
  const rentModal = useRentModal();

  // router
  const router = useRouter();

  // loading state to disable inputs
  const [isLoading, setIsLoading] = useState(false);

  // form step state
  const [step, setStep] = useState(STEPS.CATEGORY);

  // go to previous step
  const onBack = () => {
    setStep((prev) => prev - 1);
  };

  // go to next step
  const onNext = () => {
    setStep((prev) => prev + 1);
  };

  // form action label
  const actionLabel = useMemo(() => {
    // if on last step, label is create
    if (step === STEPS.PRICE) {
      return 'Create';
    }

    // otherwise, label is next
    return 'Next';
  }, [step]);

  // form secondary action label
  const secondaryActionLabel = useMemo(() => {
    // if on first step, label is undefined
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    // otherwise, label is back
    return 'Back';
  }, [step]);

  // form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<FieldValues>({
    // default values to match schema
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    }
  })

  // retrieve form values
  const category = watch('category');
  const location = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

  // set custom form value
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }

  // form submit handler
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // if not on last step, go to next step
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    // disable inputs
    setIsLoading(true);

    // create listing
    axios.post('/api/listings', data)
      .then(() => {
        // toast success
        toast.success('Listing created!');
        // refresh router
        router.refresh();
        // reset form
        reset();
        // reset form step
        setStep(STEPS.CATEGORY);
        // close modal
        rentModal.onClose();
      })
      .catch((err) => {
        // toast error
        toast.error(err.message);
      })
      .finally(() => {
        // enable inputs
        setIsLoading(false);
      });
  }

  // dynamically import map component with no ssr
  const Map = useMemo(() => dynamic(() => import('../Map'), {
    ssr: false
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [location]);

  // modal body content
  // default to step 0 (category)
  let bodyContent = (
    <div className="flex flex-col gap-8">

      {/* heading */}
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />

      {/* categories grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            
            {/* category input */}
            <CategoryInput
              onClick={(category) => setCustomValue('category', category)} // set category form value
              selected={category === item.label} // if category form value matches label, set as selected
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  // if on step 1 (location)
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Where is your place located?" subtitle="Help guests find you!" />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue('location', value)} // set location form value
        />
        <Map
          center={location?.latlng}
        />
      </div>
    );
  }

  // if on step 2 (info)
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Share some basic info about your place" subtitle="What amenities do you have?" />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount} // get guestCount form value
          onChange={(value) => setCustomValue('guestCount', value)} // set guestCount form value
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount} // get roomCount form value
          onChange={(value) => setCustomValue('roomCount', value)} // set roomCount form value
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount} // get bathroomCount form value
          onChange={(value) => setCustomValue('bathroomCount', value)} // set bathroomCount form value
        />
      </div>
    );
  }

  // if on step 3 (images)
  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Add a photo of your place" subtitle="Show guests what your place looks like!" />
        <ImageUpload
          value={imageSrc} // get imageSrc form value
          onChange={(value) => setCustomValue('imageSrc', value)} // set imageSrc form value
        />
      </div>
    );
  }

  // if on step 4 (description)
  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="How would you describe your place" subtitle="Short and sweet works best!" />
        <Input 
          id="title"
          label="Title"
          register={register}
          disabled={isLoading}
          errors={errors}
          required
        />
        <hr />
        <Input 
          id="description"
          label="Description"
          register={register}
          disabled={isLoading}
          errors={errors}
          required
        />
      </div>
    );
  }

  // if on step 5 (price)
  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="How much do you want to charge?" subtitle="Set a price per night" />
        <Input 
          id="price"
          label="Price"
          formatPrice={true}
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal 
      isOpen={rentModal.isOpen} // modal view state
      title="Airbnb your home!"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rentModal.onClose} // close modal
      onSubmit={handleSubmit(onSubmit)} // go to next step
      body={bodyContent}
    />
  )
};

export default RentModal;
