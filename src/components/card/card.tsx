import React from "react";
import styled from "styled-components";

export interface CardProps {
	feedback: string;
	card: string;
	onClick: (card: string) => void;
}

const HIDDEN_SYMBOL = "❓";

export const Card: React.FC<CardProps> = ({
	card,
	feedback,
	onClick,
	children,
}) => (
	<CardWrapper feedback={feedback} onClick={() => onClick(card)}>
		<Symbol>{feedback === "hidden" ? HIDDEN_SYMBOL : card}</Symbol>
	</CardWrapper>
);

const CardWrapper = styled.div<{ feedback: string }>`
	font-size: 2em;
	flex: 1 1 calc(100% / 6 - 0.4em);
	outline: ${({ feedback }) =>
		feedback === "justMatched" || feedback === "justMismatched"
			? feedback === "justMatched"
				? "0.1em solid green"
				: "0.1em solid red"
			: "0.08em solid silver"};
	margin: 0.2em;
	display: flex;
	cursor: ${({ feedback }) =>
		feedback === "visible" ? "not-allowed" : "default"};
	background: ${({ feedback }) => (feedback === " hidden" ? "silver" : "")};
`;

const Symbol = styled.span`
	margin: auto;
`;
