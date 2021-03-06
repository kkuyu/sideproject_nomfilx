import React from "react";
import CollectionPresenter from "./CollectionPresenter";
import { moviesApi } from "api";

export default class extends React.Component {
	constructor(props) {
		super(props);
		const { location: { pathname } } = props;
		this.state = {
			result: null,
			error: null,
			loading: true,
			isMovie: pathname.includes("/movie/")
		};
	}

	async componentDidMount() {
		const {
			match: { params: { number } },
			history: { push }
		} = this.props;
		const parsedNumber = parseInt(number);
		if( isNaN(parsedNumber) ) return push("/");

		try {
			const { data: result } = await moviesApi.collection(parsedNumber);
			this.setState({
				result
			});
		} catch {
			this.setState({
				error: "Can't find a anything."
			});
		} finally {
			this.setState({
				loading: false
			});
		}
	}

	render() {
		const { result, error, loading, isMovie } = this.state;
		return <CollectionPresenter result={result} error={error} loading={loading} isMovie={isMovie} />;
	}
}