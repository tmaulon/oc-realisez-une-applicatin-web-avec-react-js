import React from "react";
import styled from "styled-components";
import { GuessCount } from "./components/guess-count/guess-count";
import { Card } from "./components/card/card";
import shuffle from "lodash.shuffle";
import { HallOfFame, FAKE_HOF } from "./components/hall-of-fame/hall-of-fame";

const SIDE = 6;
const SYMBOLS = "😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿";

const App = () => {
	const handleCardClick = (card: string) => {
		console.log(card, "clicked");
	};

	const generateCards = () => {
		const cardsGenerated: string[] = [];
		const cardsNumber: number = SIDE * SIDE;
		const candidates = shuffle(SYMBOLS);
		while (cardsGenerated.length < cardsNumber) {
			const card = candidates.pop();
			if (!card) return;
			cardsGenerated.push(card, card);
		}
		return shuffle(cardsGenerated);
	};
	const cards = generateCards();

	console.log("generatedCards", cards);

	return (
		<Memory>
			<GuessCount guesses={0} />
			{cards &&
				cards.map((card, index) => (
					<Card
						card={card}
						feedback="visible"
						key={index}
						onClick={handleCardClick}
					/>
				))}
			<HallOfFame entries={FAKE_HOF} />
		</Memory>
	);
};

export default App;

const Memory = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 300px;
	margin: auto;
	user-select: none;
`;
