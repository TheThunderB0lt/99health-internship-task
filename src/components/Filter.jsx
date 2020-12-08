// Importing all required files
import React from "react";
import "../assets/style.css";

// calling class constructor method
class Filter extends React.Component {
	// rendering output
	render() {
		return (
			<>
				<div class="control filter">
					<div class="control-icon">
						<i class="fa fa-filter"></i>
					</div>
					<div class="select-arrow">
						<i class="fa fa-arrow-down"></i>
					</div>
					<select class="control-field filter-field form-control">
						<option value="" selected>
							All
						</option>
						{this.props.list.map((result) => (
							<option value={result["strCategory"]}>
								{result["strCategory"]}
							</option>
						))}
					</select>
				</div>
			</>
		);
	}
}

export { Filter };
