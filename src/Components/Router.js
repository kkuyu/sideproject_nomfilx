import React from "react";
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Header from "Components/Header";
import Home from "Routes/Home";
import TV from "Routes/TV";
import Search from "Routes/Search";
import Detail from "Routes/Detail";
import Collection from "Routes/Collection";
import Season from "Routes/Season";

export default () => (
	<Router>
		<>
			<Header />
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/tv" exact component={TV} />
				<Route path="/search" component={Search} />
				<Route path="/movie/:id" exact component={Detail} />
				<Route path="/movie/:id/collection/:number" component={Collection} />
				<Route path="/show/:id" exact component={Detail} />
				<Route path="/show/:id/season/:number" component={Season} />
				<Redirect from="*" to="/" />
			</Switch>
		</>
	</Router>
);