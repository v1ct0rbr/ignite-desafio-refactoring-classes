import { useEffect, useRef, useState, useCallback } from 'react';

import { useField } from '@unform/core';
import { Icon } from '../MyIcon';

import { Container } from './styles';
import CurrencyInput from 'react-currency-input-field';

import { currencyConfig } from '../../utils/config';


interface InputProps {
	name: string;
	icon: string;
	placeholder: string;
	inputType?: string;
}

const Input = ({ name, icon, ...rest }: InputProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const [isFocused, setIsFocused] = useState(false);
	const [isFilled, setIsFilled] = useState(false);

	const { fieldName, defaultValue, registerField } = useField(name);

	const handleInputFocus = useCallback(() => {
		setIsFocused(true);
	}, []);

	const handleInputBlur = useCallback(() => {
		setIsFocused(false);

		setIsFilled(!!inputRef.current?.value);
	}, []);

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: 'value',
		});
	}, [fieldName, registerField]);

	return (
		<Container isFilled={isFilled} isFocused={isFocused}>
			{/* {Icon && <Icon type={icon} size={20} />} */}
			{Icon && <Icon type={icon} size={20} />}
			{rest.inputType && rest.inputType === 'currency' ? (
				<CurrencyInput
					onFocus={handleInputFocus}
					onBlur={handleInputBlur}
					defaultValue={defaultValue}
					ref={inputRef}
					decimalSeparator=","
					groupSeparator="."
					intlConfig={currencyConfig}
					placeholder="preço"
				/>
			) : (
				<input
					onFocus={handleInputFocus}
					onBlur={handleInputBlur}
					defaultValue={defaultValue}
					ref={inputRef}
					{...rest}
				/>
			)}
		</Container>
	);
};

export default Input;
