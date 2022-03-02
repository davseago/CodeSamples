import React from 'react';
import { useQuery, gql } from '@apollo/client';
import AnniversaryGroup from './AnniversaryGroup';
import 'unfetch/polyfill/index.js';

const GET_ANNIV = gql`
	{
		anniversaries(days: 4) {
			accountName
			displayName
			title
			department
			nextAnniversary
			hireDate
		}
	}
`;

export default function Anniversaries() {
	const { loading, error, data } = useQuery(GET_ANNIV);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error!</p>;

	const items = data.anniversaries.reduce((annivs, anniv) => {
		if (!annivs[anniv.nextAnniversary]) {
			annivs[anniv.nextAnniversary] = [];
		}

		annivs[anniv.nextAnniversary].push(anniv);
		return annivs;
	}, {});

	const anniversaries = [];
	if (items.length === 0) {
		return 'No anniversaries coming up!';
	}

	for (var i in items) {
		anniversaries.push({ day: i, people: items[i] });
	}

	return anniversaries.map((anniversary) => {
		return <AnniversaryGroup day={anniversary.day} people={anniversary.people} />;
	});
}