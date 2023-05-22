import React, { useMemo } from "react";
import { FormControl } from "@chakra-ui/form-control";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Date = ({ date, onChange, showTimeSelect, ...rest }) => {
  const datePickerForms = useMemo(() => {
    if (showTimeSelect) {
      return {
        showTimeSelect: true,
        dateFormat: "Pp",
      };
    }

    return {};
  }, [showTimeSelect]);
  return (
    <FormControl zIndex={3}>
      <DatePicker
        selected={date || null}
        onChange={onChange}
        {...datePickerForms}
        {...rest}
      />
    </FormControl>
  );
};

export default Date;
