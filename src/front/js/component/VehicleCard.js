import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function VehicleCard( { id } ) {
	const imgSrc = "https://starwars-visualguide.com/assets/img/vehicles/" + id + ".jpg";
	const { store, actions } = useContext(Context);
	let fav = false;

	useEffect (() => {
		if (localStorage.getItem('Vehicle' + id) == null)
			actions.getVehicle(id)
	}, []);

	const vehicle = JSON.parse(localStorage.getItem(('Vehicle' + id)));

	if (vehicle){
		for (let i = 0; i < store.favorites.length; i++){
			if (store.favorites[i] == vehicle.name)
				fav = true;
		}
	}

	return (
	<>
		<Card className='p-0 border border-0' style={{ width: '16rem' }}>
			<Card.Img variant="top" src={imgSrc} />

			{vehicle &&
			<Card.Body>
				<Card.Title>{vehicle.name}</Card.Title>
				<div key={id}>
					<ul>
						<li>Model: {vehicle.model}</li>
						<li>Max speed: {vehicle.max_atmosphering_speed}</li>
						<li>Passengers: {vehicle.passengers}</li>
					</ul>
					<div className='d-flex justify-content-between'>
						<Link to={'/vehicledescription/' + vehicle.name + '/' + id}>
							<Button variant="outline-primary" className='mt-2'>
								Learn more!
							</Button>
						</Link>
						{fav && <Button variant="outline-warning" className='mt-2'
						onClick={() => actions.saveFavorite(vehicle.name)}>
							<i className="fa-solid fa-heart"></i>
						</Button>}
						{!fav && <Button variant="outline-warning" className='mt-2'
						onClick={() => actions.saveFavorite(vehicle.name)}>
							<i className="fa-regular fa-heart"></i>
						</Button>}
					</div>
				</div>
			</Card.Body>
			}

		</Card>
	</>
	);
}

export default VehicleCard;
