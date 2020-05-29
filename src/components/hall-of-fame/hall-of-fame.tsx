import React from "react";
import styled from "styled-components";

export interface PlayerProps {
	id: number;
	guesses: number;
	date: string;
	player: string;
}
export interface EntriesProps {
	entries: PlayerProps[];
}

export const HallOfFame: React.FC<EntriesProps> = ({ entries }) => (
	<HallOfFameTable>
		<tbody>
			{entries.map(({ id, date, guesses, player }) => (
				<tr key={id}>
					<Date>{date}</Date>
					<Guesses>{guesses}</Guesses>
					<td>{player}</td>
				</tr>
			))}
		</tbody>
	</HallOfFameTable>
);

const HallOfFameTable = styled.table`
	width: 100%;
	border-collapse: collapse;
	& tr:nth-child(even) {
		background: #eee;
	}
`;
const Date = styled.td`
	width: 20%;
	text-align: center;
`;
const Guesses = styled.td`
	width: 20%;
	text-align: center;
`;

// == Internal helpers ==============================================

export const FAKE_HOF: PlayerProps[] = [
	{ id: 3, guesses: 18, date: "10/10/2017", player: "Jane" },
	{ id: 2, guesses: 23, date: "11/10/2017", player: "Kevin" },
	{ id: 1, guesses: 31, date: "06/10/2017", player: "Louisa" },
	{ id: 0, guesses: 48, date: "14/10/2017", player: "Marc" },
];
