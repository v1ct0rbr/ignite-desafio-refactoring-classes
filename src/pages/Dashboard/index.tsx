import { useEffect, useState } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { FoodData } from '../../@types/TypeFood';

function Dashboard() {
	const [foods, setFoods] = useState<Array<FoodData>>([]);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [editingFood, setEditingFood] = useState({} as FoodData);

	useEffect(() => {
		async function loadFoods() {
			const response = await api.get('/foods');
			if (response?.data) setFoods(response.data);
		}

		loadFoods();
	}, []);

	const handleAddFood = async (food: FoodData) => {
		try {
			const response = await api.post('/foods', {
				...food,
				available: true,
			});

			setFoods([...foods, response.data]);
		} catch (err) {
			console.log(err);
		}
	};

	const handleUpdateFood = async (food: FoodData) => {
		try {
			const foodUpdated = await api.put(`/foods/${editingFood.id}`, { ...food, available: true });
			console.log(foodUpdated.data);

			const foodsUpdated = foods.map((f) => (f.id !== foodUpdated.data.id ? f : foodUpdated.data));

			setFoods(foodsUpdated);
			setModalOpen(false);
		} catch (err) {
			console.log(err);
		}
	};

	const handleDeleteFood = async (id: number) => {
		await api.delete(`/foods/${id}`);

		const foodsFiltered = foods.filter((food) => food.id !== id);

		setFoods(foodsFiltered);
	};

	const toggleModal = () => {
		setModalOpen(!modalOpen);
		console.log(!modalOpen);
	};

	const toggleEditModal = () => {
		setEditModalOpen(!editModalOpen);
	};

	const handleEditFood = (food: FoodData) => {
		setEditingFood(food);
		setEditModalOpen(true);
	};
	const handleDuplicate = async (food: FoodData) => {
		try {
			const response = await api.post('/foods', {
				name: food.name,
				image: food.image,
				available: food.available,
				description: food.description,
				price: food.price,
			} as FoodData);

			setFoods([...foods, response.data]);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Header openModal={toggleModal} />
			<ModalAddFood isOpen={modalOpen} setIsOpen={toggleModal} handleAddFood={handleAddFood} />
			<ModalEditFood
				isOpen={editModalOpen}
				setIsOpen={toggleEditModal}
				editingFood={editingFood}
				handleUpdateFood={handleUpdateFood}
			/>

			<FoodsContainer data-testid="foods-list">
				{foods &&
					foods.map((food) => (
						<Food
							key={food.id}
							food={food}
							handleDelete={handleDeleteFood}
							handleEditFood={handleEditFood}
							handleDuplicate={handleDuplicate}
						/>
					))}
			</FoodsContainer>
		</>
	);
}

export default Dashboard;
