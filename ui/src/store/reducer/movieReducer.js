import * as actionTypes from "../movieActionTypes";
const initalstore ={
    movies:[],
    singlemovie:{},
    loading:false,
    error:"",
}

const store = (state = initalstore,action) =>{
    switch(action.type){
        case actionTypes.INIT_FETCH_MOVIES:
            return{
                ...state,
                loading:true,
            }
        case actionTypes.FETCH_MOVIES_SUCCESS:
            return{
                ...state,
                loading:false,
                movies:action.movies
            }

        case actionTypes.FETCH_MOVIES_FAILED:
            return{
                ...state,
                loading:false,
                error:action.error,
            }
        case actionTypes.INIT_ADD_MOVIES:
                    return{
                        ...state,
                        loading:true,
                    };
        case actionTypes.ADD_MOVIES_SUCCESS:
                return{
                    ...state,
                    loading:false                  
                }
        case actionTypes.ADD_MOVIES_FAILED:
                return{
                    ...state,
                    loading:false,
                    error:action.error
                }
        case actionTypes.INIT_DELETE_MOVIES:
                    return{
                        ...state,
                        loading:true,
    
                    };
        case actionTypes.DELETE_MOVIES_SUCCESS:
                let movies = state.movies.filter(movies => movies._id !== action.id);
                // let studentst = state.states.filter(student => student._id !== action.id);
                return{
                    ...state,
                    loading:false,   
                    states:statees,
                }
        case actionTypes.DELETE_MOVIES_FAILED:
                return{
                    ...state,
                    loading:false,
                    error:action.error
                }
        // case actionTypes.INIT_SINGLE_MOVIES:
        //             return{
        //                 ...state,
        //                 loading:true,    
        //             };
        // case actionTypes.SINGLE_MOVIES_SUCCESS:
        //     // console.log(action.singlestate)
        //         return{
        //             ...state,
        //             loading:false, 
        //             singlestate:action.singlestate             
        //         }
        // case actionTypes.SINGLE_MOVIES_FAILED:
        //         return{
        //             ...state,
        //             loading:false,
        //             error:action.error
        //         }
        // case actionTypes.INIT_UPDATE_MOVIES:
        //             return{
        //                 ...state,
        //                 loading:true,
        //             };
        // case actionTypes.UPDATE_MOVIES_SUCCESS:
        //     let statesst = [...state.states];
        //     statesst.map(order => {
        //         if(order._id === action.states._id)
        //         {
        //             order.state_name = action.states.state_name                    
        //         }
        //     });
        //     // console.log(action.singlestates);
        //         return{
        //             ...state,
        //             loading:false, 
        //             states:statesst             
        //         }
        // case actionTypes.UPDATE_MOVIES_FAILED:
        //         return{
        //             ...state,
        //             loading:false,
        //             error:action.error
        //         }
            default :
                return state;
    }
}

export default store;