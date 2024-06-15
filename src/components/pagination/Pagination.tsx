import styled from "styled-components";
import { useEffect, useState } from "react";

export const Pages = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	column-gap: 5px;
	margin: 0 10px;
`;

interface PaginationProps {
	className?: string;
	page: number;
	lastPage: number | null;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationContainer: React.FC<PaginationProps> = ({
	className,
	page,
	lastPage,
	setCurrentPage,
}) => {
	const [buttons, setButtons] = useState<React.ReactNode[]>([]);

	useEffect(() => {
		const buttons: React.ReactNode[] = [];

		for (let i = 1; i < (lastPage as number) + 1; i++) {
			buttons.push(
				<div key={i} className={`${i === page ? "current-page" : "page"}`}>
					{i}
				</div>
			);
		}

		setButtons(buttons);
	}, [page, lastPage]);

	return (
		<div className={className}>
			<button onClick={() => setCurrentPage(1)} disabled={page === 1}>
				Start
			</button>
			<button onClick={() => setCurrentPage((prev) => prev - 1)} disabled={page === 1}>
				Prev
			</button>

			<Pages>{buttons && buttons.map((btn) => btn)}</Pages>

			<button disabled={page === lastPage} onClick={() => setCurrentPage((prev) => prev + 1)}>
				Next
			</button>
			<button onClick={() => setCurrentPage(lastPage as number)} disabled={page === lastPage}>
				End
			</button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)<PaginationProps>`
	margin-top: 30px;
	display: flex;
	justify-content: center;
	column-gap: 8px;
	align-items: center;

	& button {
		height: 25px;
		width: 45px;
	}

	& .current-page {
		font-size: 19px;
		font-weight: 600;
		color: #000;
		text-decoration: underline;
	}

	& .page {
		font-size: 15px;
		font-weight: 300;
		color: #808080;
	}
`;
