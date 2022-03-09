import { useState, useCallback } from "react";

export interface useFormType {
  values: any;
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

export default () => {
  const [values, setValues] = useState({});

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const { name, value } = e.currentTarget;
      setValues((prev) => ({ ...prev, [name]: value }));
    },
    []
  );
 
  return { values, onChange };
};
