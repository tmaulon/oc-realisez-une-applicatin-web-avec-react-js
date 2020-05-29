import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GuessCount } from "./components/guess-count/guess-count";
import { Card } from "./components/card/card";
import shuffle from "lodash.shuffle";
import { HallOfFame, FAKE_HOF } from "./components/hall-of-fame/hall-of-fame";

const SIDE = 6;
const SYMBOLS = "😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿";

const App = () => {
	const [cards, setCards] = useState<string[]>();
	const [currentPair, setCurrentPair] = useState<number[]>([]);
	const [guesses, setGuesses] = useState<number>(0);
	const [matchedCardIndices, setMatchedCardIndices] = useState<number[]>([]);

	const handleNewPairClosedBy = (index: number) => {
		if (!cards) return;
		const newPair = [currentPair[0], index];
		setCurrentPair(newPair);
		setGuesses(guesses + 1);
		const matched = cards[newPair[0]] === cards[newPair[1]];
		console.log(
			"cards[newPair[0]] === cards[newPair[1]] : ",
			cards[newPair[0]] === cards[newPair[1]]
		);
		// if (matched) setMatchedCardIndices(matchedCardIndices.concat(newPair));
		if (matched) setMatchedCardIndices([...matchedCardIndices, ...newPair]);
		console.log("matchedCardIndices : ", matchedCardIndices);
		setTimeout(() => setCurrentPair([]), 750);
	};

	const handleCardClick = (index: number) => {
		if (currentPair.length === 2) return;
		if (currentPair.length === 0) {
			setCurrentPair([index]);
			return;
		}
		console.log("handleCardClick currentPair : ", currentPair);

		handleNewPairClosedBy(index);
	};
	const won = cards && matchedCardIndices.length === cards.length;

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
	useEffect(() => {
		const initializeGame = generateCards();
		setCards(initializeGame);
	}, []);
	console.log("generatedCards", cards);

	const getCardFeedback = (index: number) => {
		const indexMatched = matchedCardIndices.includes(index);
		if (currentPair.length < 2) {
			return indexMatched || index === currentPair[0] ? "visible" : "hidden";
		}
		if (currentPair.includes(index)) {
			return indexMatched ? "justMatched" : "justMismatched";
		}
		return indexMatched ? "visible" : "hidden";
	};

	return (
		<Memory>
			<GuessCount guesses={guesses} />
			{cards &&
				cards.map((card, index) => (
					<Card
						card={card}
						feedback={getCardFeedback(index)}
						key={index}
						index={index}
						onClick={() => handleCardClick(index)}
					/>
				))}
			{won && <HallOfFame entries={FAKE_HOF} />}
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
