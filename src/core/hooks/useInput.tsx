import { useState } from 'react';

interface UseInputs {
  userEmail: string;
  userId: string;
  password: string;
  nickName: string;
  feedTitle: string;
  feedContent: string;
}

export const useInputs = () => {
  const [inputs, setInputs] = useState<UseInputs | null>({
    userEmail: '',
    userId: '',
    password: '',
    nickName: '',
    feedTitle: '',
    feedContent: '',
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
      feedTitle: '',
      feedContent: '',
    });
  };

  return [inputs, onChangeInput, clearInput, setInputs] as [
    UseInputs,
    () => void,
    () => void,
    () => void,
  ];
};
