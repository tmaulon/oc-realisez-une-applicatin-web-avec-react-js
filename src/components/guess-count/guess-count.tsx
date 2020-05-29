import React from "react";
import styled from "styled-components";

export interface GuessCountProps {
	guesses: number;
}
export const GuessCount: React.FC<GuessCountProps> = ({ guesses }) => (
	<Guesses>{guesses}</Guesses>
);

const Guesses = styled.div`
	font-size: 1em;
	width: calc(100% - 0.4em);
	margin: 0.2em;
	text-align: right;
	font-family: Menlo, Monaco, Consolas, Inconsolata, "Courier New", monospace;
`;
