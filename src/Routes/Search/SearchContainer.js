import React from "react";
import SearchPresenter from "./SearchPresenter";
import { moviesApi, tvApi } from "api";

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.isSearching = false;
		this.state = {
			movieResults: null,
			tvResults: null,
			searchTerm: "",
			searchResultTerm: "",
			error: null,
			loading: false
		};
	}

	// Add Search Hash.
	handleSubmit = () => {
		const { searchTerm } = this.state;
		const { pathname } = this.props;
		if( searchTerm !== "" ){
			const hashString = `#search&term=${searchTerm}`;
			this.props.history.push(hashString);
		} else {
			this.props.history.push(pathname);
		}
	}

	// Input vlaue change detection
	updateTerm = (event) => {
		const { target: { value: searchTerm } } = event;
		this.setState({
			searchTerm
		});
	}

	// Search for api with trim.
	searchByTerm = async () => {
		const { searchTerm } = this.state;
		this.setState({
			loading: true
		});

		try {
			const { data: { results: movieResults } } = await moviesApi.search(searchTerm);
			const { data: { results: tvResults } } = await tvApi.search(searchTerm);
			this.setState({
				movieResults,
				tvResults
			});
		} catch {
			this.setState({
				error: "Can't find results."
			});
		} finally {
			this.setState({
				loading: false
			});
		}
	}

	// Check Hash for search.
	searchHashCheck = () => {
		const {
			location: { hash }
		} = this.props;
		const { searchTerm } = this.state;

		if ( hash === "" || !hash.includes("#search") ) {
			this.isSearching = false;
			this.setState({
				searchTerm: "",
				searchResultTerm: "",
				movieResults: null,
				tvResults: null
			});
		} else if ( hash.includes("#search") ) {
			const hashArray = hash.split("&");
			const searchResultTerm = decodeURIComponent(hashArray.find(item => item.includes("term=")).split("term=")[1]);
			this.isSearching = true;
			this.setState({
				searchTerm: (searchTerm === searchResultTerm) ? searchTerm : searchResultTerm,
				searchResultTerm
			}, () => this.searchByTerm(searchResultTerm));
		}
	}

	componentDidMount() {
		// First run after page lander
		this.searchHashCheck();
	}

	componentDidUpdate(prevProps){
		// Run whenever location hash changes.
		if (this.props.location.hash !== prevProps.location.hash) {
			this.searchHashCheck();
		}
	}

	render() {
		const { movieResults, tvResults, searchTerm, searchResultTerm, error, loading } = this.state;
		return (
			<SearchPresenter movieResults={movieResults} tvResults={tvResults} searchTerm={searchTerm} searchResultTerm={searchResultTerm} error={error} loading={loading} handleSubmit={this.handleSubmit} updateTerm={this.updateTerm} />
		);
	}
}