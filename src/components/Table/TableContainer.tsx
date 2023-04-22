import { FC, ReactNode } from "react";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

interface TableContainerProps {
	title: string;
	onToggleAll: () => void;
	onClickAdd: () => void;
	onClickRemove: () => void;
	checked: boolean;
	children: ReactNode;
}

const getData = async () => {
	console.log(1);

	// подгружаем данные для таблицы
};

const TableContainer: FC<TableContainerProps> = ({
	title,
	onToggleAll,
	onClickRemove,
	onClickAdd,
	children,
	checked,
}) => {
	const { containerRef, isLoading } = useInfiniteScroll(getData);

	return (
		<div className="table-container">
			<h2 className="table-container__title">{title}</h2>

			<label className="table-container__checkbox-label">
				<input type="checkbox" checked={checked} onChange={onToggleAll} />
				<span>Выбрать всё</span>
			</label>

			<div ref={containerRef} className="table-container__scroll-area">
				<table className="table">{children}</table>
				{isLoading && <div>...Loading</div>}
			</div>

			<div className="table-container__buttons">
				<button className="table-container__button" onClick={onClickAdd}>
					Добавить
				</button>
				<button className="table-container__button" onClick={onClickRemove}>
					Удалить
				</button>
			</div>
		</div>
	);
};

export default TableContainer;
