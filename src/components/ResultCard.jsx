// Importing all required files
import React from "react";
import "../assets/style.css";
import axios from "axios";

// calling class constructor method
class ResultCard extends React.Component {
	constructor(props) {
		// calling all required ingredients
		super(props);
		this.state = {
			drinkGlassName: "",
			strIngredient1: null,
			strIngredient2: null,
			strIngredient3: null,
			strIngredient4: null,
			strIngredient5: null,
			strIngredient6: null,
			strIngredient7: null,
			strIngredient8: null,
			strIngredient9: null,
			strIngredient10: null,
			strIngredient11: null,
			strIngredient12: null,
			strIngredient13: null,
			strIngredient14: null,
			strIngredient15: null,
		};
	}
	componentDidMount() {
		// fetching Filter by Category for alcholic
		axios
			.get(
				"https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" +
					this.props.idDrink,
			)
			.then((response) => {
				this.setState(
					{
						drinkGlassName: response.data.drinks[0]["strGlass"],
						strIngredient1:
							response.data.drinks[0]["strIngredient1"],
						strIngredient2:
							response.data.drinks[0]["strIngredient2"],
						strIngredient3:
							response.data.drinks[0]["strIngredient3"],
						strIngredient4:
							response.data.drinks[0]["strIngredient4"],
						strIngredient5:
							response.data.drinks[0]["strIngredient5"],
						strIngredient6:
							response.data.drinks[0]["strIngredient6"],
						strIngredient7:
							response.data.drinks[0]["strIngredient7"],
						strIngredient8:
							response.data.drinks[0]["strIngredient8"],
						strIngredient9:
							response.data.drinks[0]["strIngredient9"],
						strIngredient10:
							response.data.drinks[0]["strIngredient10"],
						strIngredient11:
							response.data.drinks[0]["strIngredient11"],
						strIngredient12:
							response.data.drinks[0]["strIngredient12"],
						strIngredient13:
							response.data.drinks[0]["strIngredient13"],
						strIngredient14:
							response.data.drinks[0]["strIngredient14"],
						strIngredient15:
							response.data.drinks[0]["strIngredient15"],
					},
					console.log(response.data.drinks[0]["strIngredient1"]),
				);
			});
	}
	// rendering output
	render() {
		return (
			<div class="cocktail-card">
				<a class="cocktail-card__card-link"></a>
				<img src={this.props.drinkImage} class="cocktail-card__image" />
				<div class="cocktail-card__text-wrapper">
					<h2 class="cocktail-card__title">{this.props.drinkName}</h2>
					<div class="cocktail-card__identity">
						Glass Type : {this.state.drinkGlassName} <br />
						Drink Id : {this.props.idDrink}
					</div>
					<div class="cocktail-card__details-wrapper">
						<p class="cocktail-card__text">
							Ingredients : {this.state.strIngredient1}{" "}
							{this.state.strIngredient2}{" "}
							{this.state.strIngredient3}{" "}
							{this.state.strIngredient4}{" "}
							{this.state.strIngredient5}{" "}
							{this.state.strIngredient6}{" "}
							{this.state.strIngredient7}{" "}
							{this.state.strIngredient8}{" "}
							{this.state.strIngredient9}{" "}
							{this.state.strIngredient10}{" "}
							{this.state.strIngredient11}{" "}
							{this.state.strIngredient12}{" "}
							{this.state.strIngredient13}{" "}
							{this.state.strIngredient14}{" "}
							{this.state.strIngredient15}{" "}
						</p>
					</div>
				</div>
			</div>
		);
	}
}

export { ResultCard };
