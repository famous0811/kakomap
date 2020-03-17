import React, { Fragment } from 'react';
import find from 'images/findimg.jpg';
import my_location from 'images/my_location.svg';
import search from 'images/search-outline.svg';
import bigger from 'images/bigger.svg';
import smaller from 'images/smaller.svg';

function Navgation(props) {
    function closeNavgation(){
        var width =document.getElementById("navigation").offsetWidth;
        if(width>0){
            document.getElementsByClassName("close")[0].classList.remove("back");
            document.getElementById("navigation").classList.add("closenav");
            document.getElementsByClassName("close")[0].children[0].src=smaller;
            document.getElementsByClassName("close")[0].classList.add("remove");
        }
        else{
            document.getElementById("navigation").classList.remove("closenav");
            document.getElementsByClassName("close")[0].children[0].src=bigger;
            document.getElementsByClassName("close")[0].classList.remove("remove");
            document.getElementsByClassName("close")[0].classList.add("back");
        }
    }
    return (
        <Fragment>
            <div className="close" onClick={closeNavgation}>
                <img src={bigger} alt="bigger"/>
            </div>
        <div id="navigation">
            <div className="close" onClick={closeNavgation}>
            </div>
            <div className="title">
                <h2>where hospital</h2>
            </div>
            <div className="boder"/>
            <div className="navgation">
                <div className="navgationInput">
                    <input type="text" placeholder="내 위치 검색"/>
                    <div className="navgationbutton">
                        <button onClick={props.Agreepos}>
                            <img src={my_location} alt="mypos" title="내위치"/>
                        </button>
                        <button>
                        <img src={search} alt=""/>
                        </button>
                    </div>
                </div>

                <div className="navgationInput2">
                    <select name="" id="SelectPlace">
                        <option value="hospital">병원</option>
                        <option value="clinic">선별진료소</option>
                    </select>
                    <select name="" id="SelectLength">
                        <option value="100">100m</option>
                        <option value="500">500m</option>
                        <option value="1000">1km</option>
                    </select>
                </div>

                <div className="navgationbody">
                    <div className="foundamount" id="count">0개</div>
                    <div className="navgationdata">
                        <img src={find} alt="searchImg"/>
                        <div>
                            검색버튼을 눌러 내 주변에 있는 병원들을 찾아 보세요!
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Fragment>
    );
}

export default Navgation;