import {createAction,handleActions} from 'redux-actions';
import {Map,List} from 'immutable';

//명령어
const INPUT = "kakomap/input";
const REMOVE ="Kakomap/remove";
const CHANGE ="Kakomap/change";//기록에 있는 걸활용

export const input=createAction(INPUT,text=>text);
export const remove=createAction(REMOVE,id=>id);
export const change=createAction(CHANGE);
let id=0;

const initialState =Map({
    histoy: List(),
})

export default handleActions({
    [INPUT]: (state,{payload:text})=>{
        const item =Map({id:id++,text:text});
        return state.updated("histoy",histoy=>histoy.push(item));
    },
    [REMOVE]: (state,{payload:id})=>{
        
    },
    [CHANGE]: (state,payload)=>{
        
    }
},initialState);