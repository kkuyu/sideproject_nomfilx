import React from "react";
import SeasonPresenter from "./SeasonPresenter";
import { tvApi } from "api";

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			result: null,
			error: null,
			loading: true
		};
	}

	async componentDidMount() {
		const {
			match: { params: { id, number } },
			history: { push }
		} = this.props;
		const parsedId = parseInt(id);
		const parsedNumber = parseInt(number);
		if( isNaN(parsedId) || isNaN(parsedNumber) ) return push("/");

		try {
			const { data: result } = await tvApi.season(parsedId, parsedNumber);
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
		return <SeasonPresenter result={result} error={error} loading={loading} isMovie={isMovie} />;
	}
}