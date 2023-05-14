"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import qs from "query-string";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";

import useSearchModal from "@/app/hooks/useSearchModal";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";

import Modal from "./Modal";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../Counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  // router
  const router = useRouter();

  // search params
  const params = useSearchParams();

  // search modal
  const searchModal = useSearchModal();

  // state
  const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  // import map dynamically to avoid ssr
  const Map = useMemo(() => dynamic(() => import("../Map"), {
    ssr: false,
  }), [location]);

  // go to previous step
  const onBack = useCallback(() => {
    setStep((prev) => prev - 1);
  }, []);

  // go to next step
  const onNext = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  // submit search
  const onSubmit = useCallback(async () => {
    // if not on last step, go to next step
    if (step !== STEPS.INFO) {
      return onNext();
    }

    // initialize current query
    let currentQuery = {};

    // parse current query from url
    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    // update query with new values
    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    // update query with start date
    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    // update query with end date
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    // create url with updated query
    const url = qs.stringifyUrl({
      url: "/",
      query: updatedQuery,
    }, { skipNull: true });

    // reset step
    setStep(STEPS.LOCATION);
    
    // close modal
    searchModal.onClose();

    // push new url to router
    router.push(url);
  }, [
    searchModal, step, location, guestCount, roomCount,
    bathroomCount, dateRange, router, onNext, params
  ]);

  // get action label
  const actionLabel = useMemo(() => {
    // if on last step, action label is Search
    if (step === STEPS.INFO) {
      return "Search";
    }

    // otherwise, action label is Next
    return "Next";
  }, [step]);

  // get secondary action label
  const secondaryActionLabel = useMemo(() => {
    // if on first step, secondary action label is undefined
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    // otherwise, secondary action label is Back
    return "Back";
  }, [step]);

  // step one body content
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where would you like to go?"
        subtitle="Find the perfect location"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  // step two body content
  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When would you like to go?"
          subtitle="Make sure everyone is free!"
        />
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  // step three body content
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="More information"
          subtitle="Find your perfect stay"
        />
        <Counter
          title="Guests"
          subtitle="How many people are coming?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms will you need?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms will you need?"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
    />
  );
};

export default SearchModal;
