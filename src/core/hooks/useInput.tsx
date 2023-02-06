import { useState } from 'react';

interface UseInputs {
  userEmail: string;
  userId: string;
  password: string;
  nickName: string;
  title: string;
  content: string;
}

export const useInputs = (): any => {
  const [inputs, setInputs] = useState<UseInputs | null>({
    userEmail: '',
    userId: '',
    password: '',
    nickName: '',
    title: '',
    content: '',
  });

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const clearInput = (): void => {
    setInputs({
      userEmail: '',
      userId: '',
      password: '',
      nickName: '',
      title: '',
      content: '',
    });
  };

  return [inputs, onChangeInput, clearInput, setInputs] as [
    UseInputs,
    () => void,
    () => void,
    () => void,
  ];
};
