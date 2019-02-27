import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Filters extends Component {
	constructor() {
		super()
		this.state = {
			openCategories: []
		}
	}

	openCategory = key => {
		let openCategories = this.state.openCategories;
		if (openCategories.indexOf(key) === -1) openCategories.push(key);
		this.setState({ openCategories });
	}

	toggleCategory = key => {
		let openCategories = this.state.openCategories;
		if(openCategories.indexOf(key) > -1) openCategories.splice(openCategories.indexOf(key), 1);
		else openCategories.push(key);
		this.setState({ openCategories });
	}

	changeFilterList = tree => {
		this.props.changeFilterList(tree.id);
		this.openCategory(tree.id);
		if (tree.children.length) tree.children.forEach( child => {
			this.changeFilterList(child);
		})
	}

	buildLocations(locTree) {
		let tree = locTree.children ? locTree.children.map( (locations) => {
			return this.buildLocations(locations);
		}) : '';
		return <div className="tree-substructure" key={locTree.id}>
			<div className="tree-heading header" onClick={() => this.toggleCategory(locTree.id)}>
				<label className="input-container">
					<input
					onChange={() => this.changeFilterList(locTree)}
					checked={this.props.filterList.indexOf(locTree.id) > -1}
					type="checkbox" />
					<span className="checkmark"></span>
				</label>
				<span>{locTree.name}</span>
			</div>
			<div className={(this.state.openCategories.indexOf(locTree.id) > -1 ? '' : 'gone')}>
			{tree}
			</div>
		</div>
	}

	renderFilters() {
		if(this.props.filters.items) {
			let filters = this.props.filters.items.map( (filter, key) => {
				let categories = filter.value.map( (value, valueKey) => {
					let subCategories = value.value.map( (subValue, subKey) => {
						if(subValue.type === 'ITEM') {
							return <div className="filter-categories" key={subKey + 'subKey'}>
								<div className="data-heading header" >
									<label className="input-container">
										<input
										onChange={() => this.props.changeFilterList(subValue.id)}
										checked={this.props.filterList.indexOf(subValue.id) > -1}
										type="checkbox" />
										<span className="checkmark">{subValue.name}</span>
									</label>
								</div>
							</div>
						} else {
							let locations = this.buildLocations(subValue);
							return <div className="filter-locations" key={subKey + 'subKey'}>
								{locations}
							</div>
						}
					})
					return <div className={"filter-categories"} key={valueKey + 'valueKey'}>
						<div className="filter-subheading header" onClick={() => this.toggleCategory(valueKey + 'valueKey')}>{value.name}</div>
						<div className={"category-container " + (this.state.openCategories.indexOf(valueKey + 'valueKey') > -1 ? '' : 'gone')}>
							{subCategories}
						</div>
					</div>
				})
				return <div className="filter-categories" key={key + 'filter'}>
					<div className="filter-heading header" onClick={() => this.toggleCategory(key + 'filter')}>{filter.name}</div>
					<div className={"category-container " + (this.state.openCategories.indexOf(key + 'filter') > -1 ? '' : 'gone')}>
						{categories}
					</div>
				</div>
			})
			return <div className="filters-block">{filters}</div>
		} else return '';
	}

  	render() {
  		let filters = this.renderFilters();

    	return (<div className="Filters" id="Components/ReusableTemplates/Filters">
    		{filters}
      	</div>);
  	}
}

Filters.propTypes = {
	filterList: PropTypes.array.isRequired,
	changeFilterList: PropTypes.func.isRequired
};

export default Filters;