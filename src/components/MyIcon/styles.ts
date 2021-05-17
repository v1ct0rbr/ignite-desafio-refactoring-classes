import styled, { css } from 'styled-components';

interface ContainerProps {
	isFilled: boolean;
	isFocused: boolean;
}

export const Container = styled.div<ContainerProps>`
	svg {
		margin-right: 16px;
	}
`;
