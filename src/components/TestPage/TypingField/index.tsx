import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';

export interface TypingFieldProps {
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  disabled: boolean;
  isTestRunning: boolean;
}

const TypingField: React.FC<TypingFieldProps> = ({
  value,
  onChange,
  disabled,
  isTestRunning,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      className={clsx('px-4 py-3', 'rounded', 'flex-1', 'text-black text-3xl')}
      placeholder={`${!isTestRunning ? 'start typing to start the test' : ''}`}
      onChange={onChange}
      value={value}
      disabled={disabled}
    />
  );
};

export default TypingField;
