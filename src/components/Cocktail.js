// Importing all required files
import React from "react";
import axios from "axios";
import { ResultCard } from "./ResultCard";
import "../assets/style.css";

// exporting to default class constructor method
export default class Cocktail extends React.Component {
	constructor(props) {
		super(props);
		// calling all required query set
		this.state = {
			search_query: "",
			search_results: [],
			category_list: [],
			alcoholic_list: [],
			category_filter: "",
			alcoholic_filter: "",
			category_results: [],
			alcoholic_results: [],
			final_display_results: [],
			lookupResults: [],
			cardDetails: [],
		};
		// binding method
		this.filter = this.filter.bind(this);
		this.storeSearchQuery = this.storeSearchQuery.bind(this);
		this.getCategoryFilterInput = this.getCategoryFilterInput.bind(this);
		this.getAlcoholicFilterInput = this.getAlcoholicFilterInput.bind(this);
		this.intersectOperation = this.intersectOperation.bind(this);
		// fetching the categories from cocktail API
		axios
			.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list")
			.then((response) => {
				this.setState({
					category_list: response.data.drinks,
				});
			});
		// fetching the alcoholic filter from cocktail API
		axios
			.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list")
			.then((response) => {
				this.setState({
					alcoholic_list: response.data.drinks,
				});
			});
	}

	componentDidMount() {
		var search_bar = document.getElementById("search-bar");
		search_bar.addEventListener("keyup", function (event) {
			if (event.keyCode === 13) {
				event.preventDefault();
				document.getElementById("search-button").click();
			}
		});
	}

	getCategoryFilterInput(event) {
		this.setState({ category_filter: event.target.value }, () => {
			if (!this.state.alcoholic_filter == "") {
				// fetching Filter by Category for categories
				axios
					.get(
						"https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=" +
							this.state.category_filter,
					)
					.then((response) => {
						this.setState({
							category_results: response.data.drinks,
						});
					});
			}
		});
	}

	getAlcoholicFilterInput(event) {
		this.setState({ alcoholic_filter: event.target.value }, () => {
			if (!this.state.alcoholic_filter == "") {
				// fetching Filter by Category for alcholic
				axios
					.get(
						"https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=" +
							this.state.alcoholic_filter,
					)
					.then((response) => {
						this.setState({
							alcoholic_results: response.data.drinks,
						});
					});
			}
		});
	}
	// search-bar
	storeSearchQuery() {
		this.setState({
			search_query: document.getElementById("search-bar").value,
		});
	}
	// comparing 3 filters using inserction & union method
	intersectOperation(list1, list2, isUnion) {
		var result = [];

		for (var i = 0; i < list1.length; i++) {
			var item1 = list1[i],
				found = false;
			for (var j = 0; j < list2.length && !found; j++) {
				found = item1.idDrink === list2[j].idDrink;
			}
			if (found === !!isUnion) {
				// isUnion is coerced to boolean
				result.push(item1);
			}
		}
		return result;
	}

	// Following functions are to be used:

	filter() {
		axios
			.get(
				"https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" +
					this.state.search_query,
			)
			.then((response) => {
				this.setState({ search_results: response.data.drinks }, () => {
					// If Category, SearchByIngrdients & Alcoholic => nested query
					if (
						typeof this.state.category_results != "undefined" &&
						this.state.category_results.length > 0 &&
						typeof this.state.alcoholic_results != "undefined" &&
						this.state.alcoholic_results.length > 0 &&
						typeof this.state.search_results != "undefined" &&
						this.state.search_results.length > 0
					) {
						this.setState({
							final_display_results: this.intersectOperation(
								this.state.search_results,
								this.intersectOperation(
									this.state.category_results,
									this.state.alcoholic_results,
									true,
								),
								true,
							),
						});
						console.log(
							this.intersectOperation(
								this.state.search_results,
								this.intersectOperation(
									this.state.category_results,
									this.state.alcoholic_results,
									true,
								),
								true,
							),
						);
					}
					// If Category & Alcoholic
					else if (
						typeof this.state.category_results != "undefined" &&
						this.state.category_results.length > 0 &&
						typeof this.state.alcoholic_results != "undefined" &&
						this.state.alcoholic_results.length > 0
					) {
						this.setState({
							final_display_results: this.intersectOperation(
								this.state.category_results,
								this.state.alcoholic_results,
								true,
							),
						});
						console.log(
							this.intersectOperation(
								this.state.category_results,
								this.state.alcoholic_results,
								true,
							),
						);
					}
					// If SearchByIngrdients & Alcoholic
					else if (
						typeof this.state.search_results != "undefined" &&
						this.state.search_results.length > 0 &&
						typeof this.state.alcoholic_results != "undefined" &&
						this.state.alcoholic_results.length > 0
					) {
						this.setState({
							final_display_results: this.intersectOperation(
								this.state.search_results,
								this.state.alcoholic_results,
								true,
							),
						});
						console.log(
							this.intersectOperation(
								this.state.search_results,
								this.state.alcoholic_results,
								true,
							),
						);
					}
					// If Category &SearchByIngrdients
					else if (
						typeof this.state.category_results != "undefined" &&
						this.state.category_results.length > 0 &&
						typeof this.state.search_results != "undefined" &&
						this.state.search_results.length > 0
					) {
						this.setState({
							final_display_results: this.intersectOperation(
								this.state.category_results,
								this.state.search_results,
								true,
							),
						});
						console.log(
							this.intersectOperation(
								this.state.category_results,
								this.state.search_results,
								true,
							),
						);
					}
					// If SearchByIngrdients
					else if (
						typeof this.state.search_results != "undefined" &&
						this.state.search_results.length > 0
					) {
						this.setState({
							final_display_results: this.state.search_results,
						});
						console.log(this.state.search_results);
					}
					// If Category
					else if (
						typeof this.state.category_results != "undefined" &&
						this.state.category_results.length > 0
					) {
						this.setState({
							final_display_results: this.state.category_results,
						});
						console.log(this.state.category_results);
					} else {
						this.setState({
							final_display_results: this.state.alcoholic_results,
						});
						console.log(this.state.alcoholic_results);
					}
				});
			});
	}

	// renderning output
	render() {
		return (
			// TailWind css className
			<div className="mx-24">
				<h1 className="flex justify-center my-20 text-6xl font-bold uppercase text-gray-800">
					Cocktail Shop
				</h1>
				<div class="control search">
					<div class="control-icon">
						<i class="fa fa-search"></i>
					</div>
					<input
						class="control-field search-field form-control "
						autoComplete="off"
						type="text"
						placeholder="Search by Ingregients"
						id="search-bar"
						onInput={this.storeSearchQuery}
					/>
				</div>

				{/* category filtering */}

				<div class="control filter">
					<div class="control-icon">
						<i class="fa fa-filter"></i>
					</div>
					<div class="select-arrow">
						<i class="fas fa-angle-down"></i>
					</div>
					<select
						class="control-field filter-field form-control"
						value={this.state.category_filter}
						onChange={this.getCategoryFilterInput}
					>
						<option selected>Category filter</option>
						{this.state.category_list.map((result) => (
							<option value={result["strCategory"]}>
								{result["strCategory"]}
							</option>
						))}
					</select>
				</div>

				{/* alcoholic filtering */}

				<div class="control filter">
					<div class="control-icon">
						<i class="fa fa-filter"></i>
					</div>
					<div class="select-arrow">
						<i class="fas fa-angle-down"></i>
					</div>
					<select
						class="control-field filter-field form-control"
						value={this.state.alcoholic_filter}
						onChange={this.getAlcoholicFilterInput}
					>
						<option selected>Alcoholic filter</option>
						{this.state.alcoholic_list.map((result) => (
							<option value={result["strAlcoholic"]}>
								{result["strAlcoholic"]}
							</option>
						))}
					</select>
				</div>

				{/* search button */}

				<button
					class="add-more-items btn btn-primary"
					id="search-button"
					onClick={this.filter}
				>
					SEARCH
				</button>
				<div class="content-wrapper">
					{this.state.final_display_results.map((result) => (
						<ResultCard
							drinkName={result["strDrink"]}
							drinkImage={result["strDrinkThumb"]}
							idDrink={result["idDrink"]}
						/>
					))}
				</div>
			</div>
		);
	}
}
