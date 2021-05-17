import { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import { FoodData } from '../../@types/TypeFood';
import { convertCurrentToString } from '../../utils/functions';

interface ModalEditFoodProps {
	isOpen: boolean;
	setIsOpen: () => void;
	editingFood: FoodData;
	handleUpdateFood: (food: FoodData) => Promise<void>;
}

export default function ModalEditFood({ isOpen, editingFood, handleUpdateFood, setIsOpen }: ModalEditFoodProps) {
	const formRef = useRef(null);

	const handleSubmit = async (food: FoodData) => {
		handleUpdateFood(food);
		setIsOpen();
	};

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<Form
				onSubmit={handleSubmit}
				initialData={{ ...editingFood, price: convertCurrentToString(editingFood.price) }}
				ref={formRef}
			>
				<h1>Editar Prato</h1>
				<Input icon="image" name="image" placeholder="Cole o link aqui" />

				<Input icon="name" name="name" placeholder="Ex: Moda Italiana" />
				<Input inputType="currency" icon="price" name="price" placeholder="Ex: 19.90" />

				<Input icon="description" name="description" placeholder="Descrição" />

				<button type="submit" data-testid="edit-food-button">
					<div className="text">Editar Prato</div>
					<div className="icon">
						<FiCheckSquare size={24} />
					</div>
				</button>
			</Form>
		</Modal>
	);
}
