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

	// Fixed Screen.
	toggleScrollLock = () => document.querySelector('html').classList.toggle("scroll-lock");

	// Open the modal and add focus.
	modalOpen = () => {
		this.setState({
			isModalOpen: true
		}, () => this.modalRef.current.focus());
		this.toggleScrollLock();
	}

	// Close the modal.
	modalClose = () => {
		this.setState({
			isModalOpen: false
		});
		this.toggleScrollLock();
	}

	// Add Modal Hash.
	handleModalOpen = (modalType) => {
		let hashString = "#modal";
		if(Object.keys(modalType).length) {
			for(let key in modalType){
				hashString += `&${key}=${modalType[key]}`;
			}
		}
		this.props.history.push(hashString);
	};

	// Remove Modal Hash.
	handleModalClose = () => {
		const { location: { pathname } } = this.props;
		this.props.history.push(pathname);
	};

	// Click on an area other than modal.
	handleOnClick = (event) => {
		if (this.modalRef && this.modalRef.current.contains(event.target)) return;
		this.handleModalClose();
	}

	// Press the esc key.
	handleKeyDown = (event) => event.keyCode === 27 && this.handleModalClose();

	// Check Hash to show or close Modal.
	modalHashCheck = () => {
		const {
			location: { hash }
		} = this.props;

		if(hash === "" && !this.state.isModalOpen) return false;

		if ( hash.includes("#modal") ) {
			const hashArray = hash.split("&");
			this.modalContentType = hashArray.find(item => item.includes("type=")).split("type=")[1];
			this.currentVideoKey = hashArray.find(item => item.includes("key=")).split("key=")[1];
			if (this.modalContentType === "video" && this.currentVideoKey) {
				this.modalOpen();
			} else {
				this.handleModalClose(); // It's not a valid hash.
			}
		} else {
			this.modalClose();
			if (this.modalContentType === "video" && this.currentVideoKey){
				this.videoArray.find(video => video.dataset.youtubeKey === this.currentVideoKey).focus(); // Put the focus in the same element with the video key.
			}
			this.modalContentType = null;
			this.currentVideoKey = null;
		}
	}

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

		// First run after page lander
		this.modalHashCheck();
	}

	componentDidUpdate(prevProps){
		// Run whenever location hash changes.
		if (this.props.location.hash !== prevProps.location.hash) {
			this.modalHashCheck();
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