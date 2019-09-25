import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "api";

export default class extends React.Component {
	constructor(props) {
		super(props);

		this.El = {
			html: document.querySelector("html"),
			root: document.querySelector("#root")
		};
		this.videoArray = [];
		this.modalRef = React.createRef();

		const { location: { pathname } } = props;
		this.state = {
			result: null,
			error: null,
			loading: true,
			isMovie: pathname.includes("/movie/"),
			isModalOpen: false,
			modalContentType: null,
			currentVideoKey: null
		};
	}

	// Fixed Screen.
	toggleScrollLock = () => this.El.html.classList.toggle("scroll-lock");

	// Open the modal and add focus.
	modalOpen = () => {
		this.setState({
			isModalOpen: true
		}, () => {
			this.modalRef.current.focus();
			this.El.root.setAttribute("tabindex", -1);
			this.El.root.setAttribute("aria-hidden", true);
		});
		this.toggleScrollLock();
	}

	// Close the modal.
	modalClose = () => {
		this.setState({
			isModalOpen: false
		}, () => {
			this.El.root.removeAttribute("tabindex");
			this.El.root.removeAttribute("aria-hidden");
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

	// Press the key.
	handleKeyDown = (event) => {
		const focusAbleEls = this.modalRef.current.querySelectorAll('a, button, textarea, input, *[tabIndex]');
		const firstFocusAbleEl = focusAbleEls[0];  
		const lastFocusAbleEl = focusAbleEls[focusAbleEls.length - 1];

		// Press the key "Esc".
		if ( event.keyCode === 27 ) return this.handleModalClose();
		// Press the key except "Tab".
		if ( event.keyCode !== 9 ) return false;
		
		if ( event.shiftKey ) { // Press the key "Tab" + "Shift".
			if (document.activeElement === firstFocusAbleEl) {
				lastFocusAbleEl.focus();
				event.preventDefault();
			}
		} else { // Press the key "Tab".
			if (document.activeElement === lastFocusAbleEl) {
				firstFocusAbleEl.focus();
				event.preventDefault();
			}
		}
	}

	// Check Hash to show or close Modal.
	modalHashCheck = () => {
		const {
			location: { hash }
		} = this.props;

		if ( hash === "" && !this.state.isModalOpen ) return false;

		if ( hash.includes("#modal") ) {
			const hashArray = hash.split("&");
			const modalContentType = hashArray.find(item => item.includes("type=")).split("type=")[1];
			const currentVideoKey = hashArray.find(item => item.includes("key=")).split("key=")[1];
			if (modalContentType === "video" && currentVideoKey) {
				this.setState({
					modalContentType,
					currentVideoKey
				});
				this.modalOpen();
			} else {
				this.handleModalClose(); // It's not a valid hash.
			}
		} else {
			this.modalClose();
			if (this.state.modalContentType === "video" && this.state.currentVideoKey){
				const currentVideoItem = this.videoArray.find(video => video.dataset.videoKey === this.state.currentVideoKey) || null;
				currentVideoItem && currentVideoItem.focus(); // Put the focus in the same element with the video key.
			}
			this.setState({
				modalContentType: null,
				currentVideoKey: null
			});
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
		const { result, error, loading, isMovie, isModalOpen, modalContentType, currentVideoKey } = this.state;
		return <DetailPresenter
			modalRef={this.modalRef} videoArray={this.videoArray}
			result={result} error={error} loading={loading} isMovie={isMovie} isModalOpen={isModalOpen} modalContentType={modalContentType} currentVideoKey={currentVideoKey}
			handleModalOpen={this.handleModalOpen} handleModalClose={this.handleModalClose} handleOnClick={this.handleOnClick} handleKeyDown={this.handleKeyDown}
		/>;
	}
}