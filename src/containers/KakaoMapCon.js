import React,{useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import KakaoMap from 'components/KakaoMap';
import Navgation from 'components/Navgation';

import 'styles/map.scss';

import * as mapactions from 'store/modules/kakomap';


/* image*/
import MarkerImg from 'images/location.svg';

var sw=false;
let map,Circle;
function KakaoMapCon(props) {
    const {kakao}=window;

    const firstpos ={
        x:37.450897, 
        y:126.910940
    };
    
    const [latitude,setlatitude]=useState(0);
    const [longitude,setlongitude]=useState(0);

    function Agreepos(){
        console.log(Circle);
        var e=document.getElementById("SelectLength");
        var radius=e.options[e.selectedIndex].value;
        var bounds = new kakao.maps.LatLngBounds();

        navigator.geolocation.getCurrentPosition((pos)=>{
            setlatitude(pos.coords.latitude);//위도
            setlongitude(pos.coords.longitude);//경도
            
            var postion=new kakao.maps.LatLng(pos.coords.latitude,pos.coords.longitude)
            var postion2=new kakao.maps.LatLng(pos.coords.latitude,pos.coords.longitude+radius*0.00001);
            bounds.extend(postion);
            bounds.extend(postion2);
            setmaker(postion,"현위치");
            if(Circle){
                Circle.setMap(null); 
            }
                Circle = new kakao.maps.Circle({
                    center : new kakao.maps.LatLng(pos.coords.latitude,pos.coords.longitude),  // 원의 중심좌표 입니다 
                    radius: radius, // 미터 단위의 원의 반지름입니다 
                    strokeWeight: 1, // 선의 두께입니다 
                    strokeColor: '#f1c40f', // 선의 색깔입니다
                    strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                    strokeStyle: 'solid', // 선의 스타일 입니다
                    fillColor: '#f1c40f', // 채우기 색깔입니다
                    fillOpacity: 0.5  // 채우기 불투명도 입니다   
                });
                Circle.setMap(map); 
        });
        map.setBounds(bounds);
      }

    function setmaker(pos,text){
        var imageSize = new kakao.maps.Size(24, 35); //마커크기
        var markerImg=new kakao.maps.MarkerImage(MarkerImg, imageSize); //마커이미지

        var infowindow =new kakao.maps.InfoWindow({
            content:'<div>'+text+'</div>',
        })
        var marker=new kakao.maps.Marker({
            map: map,
            position: pos
        });


        // 이벤트 리스너로는 클로저를 만들어 등록합니다 
        // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
        kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
        kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
    }

    function makeOverListener(map, marker, infowindow) {
        return function() {
            infowindow.open(map, marker);
        };
    }
    
    // 인포윈도우를 닫는 클로저를 만드는 함수입니다 
    function makeOutListener(infowindow) {
        return function() {
            infowindow.close();
        };
    }
    //create map
    useEffect(()=>{
        if(sw)
            return;
        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        var options = { //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(firstpos.x,firstpos.y), //지도의 중심좌표.
        level: 4 //지도의 레벨(확대, 축소 정도)
        };
        map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
        var zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);
        console.log(map);
        sw=true;
    });

    return (
        <div>
            <KakaoMap/>
            <Navgation Agreepos={Agreepos}/>
        </div>
    );
}

export default connect(
    (state)=>{
        return{
            history: state.KakaoMapCon.get("history")
        }
    },
    (dispatch) =>({
        Mapactions: bindActionCreators(mapactions,dispatch)
    })
)(KakaoMapCon);