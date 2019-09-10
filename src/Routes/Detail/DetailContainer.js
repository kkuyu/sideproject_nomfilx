import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "api";

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
			match: { params: { id } },
			history: { push }
		} = this.props;
		const { isMovie } = this.state;
		const parsedId = parseInt(id);
		if( isNaN(parsedId) ) {
			return push("/");
		}
		try {
			const { data: result } = isMovie ? await moviesApi.movieDetail(parsedId) : await tvApi.showDetail(parsedId);
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
		return <DetailPresenter result={result} error={error} loading={loading} isMovie={isMovie} />;
	}
}