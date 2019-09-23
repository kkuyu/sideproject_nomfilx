import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "api";

export default class extends React.Component {
	constructor(props) {
		super(props);

		this.videoArray = [];
		this.modalRef = React.createRef();
		this.modalContentType = null;
		this.currentVideoKey = null;

		const { location: { pathname } } = props;
		this.state = {
			result: null,
			error: null,
			loading: true,
			isMovie: pathname.includes("/movie/"),
			isModalOpen: false
		};
	}

	handleModalOpen = (modalType) => {
		let queryParameter = "#modal";
		if(Object.keys(modalType).length) {
			for(let key in modalType){
				queryParameter += `&${key}=${modalType[key]}`;
			}
		}
		this.props.history.push(queryParameter);
		this.setState({
			isModalOpen: true
		}, () => this.modalRef.current.focus());
		this.toggleScrollLock();
	};

	handleModalClose = () => {
		const { location: { pathname } } = this.props;
		this.props.history.push(pathname);
		this.setState({
			isModalOpen: false
		});
		this.toggleScrollLock();
	};

	handleOnClick = (event) => {
		if (this.modalRef && this.modalRef.current.contains(event.target)) return;
		this.handleModalClose();
	}

	handleKeyDown = (event) => event.keyCode === 27 && this.handleModalClose();

	toggleScrollLock = () => document.querySelector('html').classList.toggle("scroll-lock");

	async componentDidMount() {
		const {
			match: { params: { id } },
			history: { push }
		} = this.props;
		const { isMovie } = this.state;
		const parsedId = parseInt(id);
		if( isNaN(parsedId) ) return push("/");
		
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
		const { result, error, loading, isMovie, isModalOpen } = this.state;
		return <DetailPresenter
			modalRef={this.modalRef} videoArray={this.videoArray}
			result={result} error={error} loading={loading} isMovie={isMovie} isModalOpen={isModalOpen}
			handleModalOpen={this.handleModalOpen} handleModalClose={this.handleModalClose} handleOnClick={this.handleOnClick} handleKeyDown={this.handleKeyDown}
		/>;
	}
}