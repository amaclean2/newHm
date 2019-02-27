import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';

import TableHeaders from '../../DefaultData/TableHeaders';

class AhTable extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: props.data,
			sortReverse: false,
			selectedRows: [],
			picker: false,
			columns: {}
		}
	}

	componentDidMount() {
		let headersObj = TableHeaders[this.props.type],
			columns = this.state.columns;
		for (let column in headersObj) {
			columns[column] = true;
		}

		this.setState({ columns });
	}

	sortColumn = property => {
		let data = this.state.data;

		data.sort((a, b) => {
			if ( !this.state.sortReverse ) {
				return a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
			} else {
				return a[property] > b[property] ? -1 : a[property] < b[property] ? 1 : 0;
			}
		});

		this.setState({ data, sortReverse: !this.state.sortReverse });
	}

	columnPicker = e => {
		let columns = this.state.columns;

		if(e.target.checked) {
			columns[e.target.id] = true;
		} else {
			delete columns[e.target.id];
		}
		this.setState({ columns });
	}

	togglePicker = () => {
		this.setState({ picker: !this.state.picker });
	}

	showPicker() {
		if(this.state.picker) {
			let headersArray = [];

			for( let i in TableHeaders[this.props.type]) {
				headersArray.push(TableHeaders[this.props.type][i]);
			}

			let options = headersArray.map( (header, key) => {
				return <label className="input-container" key={key + 'picker'} htmlFor={header.field}>
					<input
					type="checkbox"
					onChange={this.columnPicker}
					checked={this.state.columns[header.field]}
					id={header.field} />
					<span className="checkmark">{header.title}</span>
				</label>
			});
			return <div className="column-picker">
				<b>Column Picker</b>
				<button className="close-button button" onClick={this.togglePicker} ></button>
				<div className="picker-options-container">
					{options}
				</div>
			</div>
		}
	}

	searchTable = e => {
		let searchValue = e.target.value.toLowerCase();
		if(searchValue.length > 5 || searchValue.length === 0) {
			if (this.props.externalSearch) {
				this.props.externalSearch(searchValue)
			} else {
				let data = this.props.data.filter( point => {
					for ( let prop in point ) {
						if(prop !== 'id' && TableHeaders[this.props.type][prop].searchable && point[prop].toLowerCase().indexOf(searchValue) > -1)
							return true
					}
					return false
				});

				this.setState({ data });
			}
		}
	}

	selectAll = e => {
		if(e.target.checked) {
			this.setState({ selectedRows: this.state.data });
		} else {
			this.setState({ selectedRows: [] });
		}
	}

	changeRowSelected = e => {
		let selectedRows = this.state.selectedRows;

		if(e.target.checked) {

			let currentObject = this.state.data.find( item => {
				return item.id.toString() === e.target.id.toString();
			})

			selectedRows.push(currentObject);
		} else {
			selectedRows = selectedRows.filter( item => {
				return item.id.toString() !== e.target.id.toString();
			});
		}

		this.setState({ selectedRows });
	}

	constructTable() {
		let data = this.state.data,
			headers = this.constructHeaders(),
			body = data.map((item, i) => {
				return this.constructRow(item, i);
			});

		let table = <table>
			<thead>{headers}</thead>
			<tbody>{body}</tbody>
		</table>

		return table;
	}

	constructHeaders() {
		let headersObj = TableHeaders[this.props.type],
			headersArray = [];

		for( let i in headersObj) {
			if (this.state.columns[i])
				headersArray.push(headersObj[i]);
		}

		let headers = headersArray.map( (header, i) => 
		<th 
			onClick={(header.sortable ? () => {this.sortColumn(header.field)} : null)}
			className={(header.classes || '') + ' ' + (header.sortable ? 'sortable' : '')}
			key={'head' + i} >
			{header.title}
		</th>)
		
		if(this.props.selectable) {
			headers.unshift(<th key="checkHeader">
				<label className="input-container" htmlFor="checkHeader">
					<input
						checked={this.state.selectedRows.length === this.state.data.length}
						onChange={this.selectAll}
						id={"checkHeader"}
						type="checkbox" />
					<span className="checkmark"></span>
				</label>
			</th>);
		}

		return <tr>{headers}</tr>;
	}

	constructRow(dataObject, i) {
		let fieldsArray = [],
			headersObj = TableHeaders[this.props.type]
		for( let property in dataObject ) {
			let value = '', classes = '';

			if (this.state.columns[property]) {
				value = headersObj[property].formatter
					  ? headersObj[property].formatter(dataObject[property])
					  : dataObject[property];
				classes = headersObj[property].classes || classes;
			} else {
				value = null;
			}

			fieldsArray.push({value: value, classes: classes || ''});
		}

		let fields = fieldsArray.map((field, i) => {
			return this.constructField(field.value, i, field.classes);
		})

		let isChecked = this.state.selectedRows.find( row => {
			return row.id === dataObject.id;
		})

		if(this.props.selectable) {
			fields.unshift(<td key="checkRow">
				<label className="input-container" htmlFor={dataObject.id}>
					<input
					type="checkbox"
					onChange={this.changeRowSelected}
					id={dataObject.id}
					checked={isChecked} />
					<span className="checkmark"></span>
				</label>
			</td>);
		}

		return <tr key={'row' + i} className="table-row" >{fields}</tr>
	}

	constructField(field, i, classes) {
		return field !== null ? <td key={'field' + i} className={classes}>{field}</td> : null;
	}

  	render() {
  		let table = this.constructTable(),
  			picker = this.showPicker();

    	return (<div className="Table" id="Components/ReusableTemplates/AhTable">
    		<div className="table-header">
    			<input type="text" className={"search-box " + (this.props.searchable ? '' : 'gone')} placeholder="Search" onChange={this.searchTable} />
    			<div className="flex-spacer"></div>
    			<div className="right-buttons-container">
	    			<CSVLink
	    				data={this.state.selectedRows}
	    				filename={'eventsData.csv'}
	    				onClick={() => {console.log('events downloaded')}}
	    				className={"download-button button outline-button " + (this.props.downloadable ? '' : 'gone')} >
	    				Download
	    			</CSVLink>
	    			<div className={ "refresh-icon button " + (this.props.refresh ? '' : 'gone')} onClick={this.props.refreshFunction} />
	    			<button className={"button column-picker-button " + (this.props.columnPicker ? '' : 'gone')}
	    				onClick={this.togglePicker}></button>
	    			{picker}
    			</div>
    		</div>
    		<div className="table-container">
    			{table}
    		</div>
      	</div>);
  	}
}

AhTable.propTypes = {
	data: PropTypes.array.isRequired,
	type: PropTypes.string.isRequired,
	refresh: PropTypes.bool,
	refreshFunction: PropTypes.func,
	selectable: PropTypes.bool,
	downloadable: PropTypes.bool,
	searchable: PropTypes.bool,
	externalSerch: PropTypes.func,
	columnPicker: PropTypes.bool
}

export default AhTable;