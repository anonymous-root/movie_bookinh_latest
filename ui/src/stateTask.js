import React from 'react';
import { Switch, Route } from 'react-router'
import StateList from './components/State_All_Form/stateList';
import StateAddForm from './components/State_All_Form/addForm';
import CityAddForm from './components/City_All_Form/addForm';
import MovieAddForm from './components/Movie_All_Form/addMovie';
import Header from './components/common/Header';
import cityList from './components/City_All_Form/cityList';
import movieList from './components/Movie_All_Form/movieList';
import Footer from './components/common/Footer';
const StateTask = (props) => {
    return <>
        <Header />
        <div>
            <Switch>
                <Route path="/state" exact component={StateList}/>
                <Route path="/state/stateAdd" exact component={StateAddForm}/>
                <Route path="/city/cityAdd" exact component={CityAddForm}/>
                <Route path="/city" exact component={cityList}/>
                <Route path="/movie/movieAdd" exact component={MovieAddForm}/>
                <Route path="/movie" exact component={movieList}/>
            </Switch>
        </div>
        {/* <Footer/> */}
    </>
}

export default StateTask