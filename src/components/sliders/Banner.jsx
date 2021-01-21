// @ts-nocheck
import React, {useState} from 'react';
import {default as NativeBanner} from "../../app/middleware/Banner";
import SearchBar from '../../app/middleware/SearchBar';

import GoogleApp from '../../components/google-maps';

//bunları şimdilik ekliyoruz
import s1 from "../../images/banner/dw1.jpg";
import s2 from "../../images/banner/download.jpg";
import s3 from "../../images/banner/dw2.jpg";

import { connect } from "react-redux";
import {searchChangeNameButton} from '../../redux/reducers/search';
import { bindActionCreators } from "redux";

const Banner = (props) => {
    const {actionSearchButton, searchChangeNameButton} = props;

    const virtuals = {
        pt: {
            className: "",
            text: "Eğitmen Ara",
            component: () => {
                return (
                    <>
                        <div className="img" style={{ backgroundImage: `url(${s1})` }}></div>
                    </>
                )
            }
        },
        living: {
            className: "",
            text: "Salon veya Salonlar Ara",
            component: () => {
                return (
                    <>
                        <div className="img" style={{ backgroundImage: `url(${s2})` }}></div>
                    </>
                )
            }
        },
        nutritionist: {
            className: "",
            text: "Diyetisyen Ara",
            component: () => {
                return (
                    <>
                        <div className="img" style={{ backgroundImage: `url(${s3})` }}></div>
                    </>
                )
            }
        },
        map: {
            className: "have-map",
            text: "Konum Ara",
            component: () => {
                return (
                    <div className="img">
                        <GoogleApp frame={{width: "100%", height: "660px"}}/>
                    </div>
                )
            }
        }
    }

    const slider_settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: true,
        lazyLoad: true,
    };

    const search_bar = {
        status: true,
        className: "search-bar",
        element: () => <SearchBar className={search_bar.className} virtual={actionSearchButton} setVirtual={searchChangeNameButton} virtuals={virtuals}/>
    }

    return (
        <NativeBanner
            settings={slider_settings}
            searchBar={search_bar}
            virtual={actionSearchButton}
            setVirtual={searchChangeNameButton}
            virtuals={virtuals}
        />
    );
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch,
        ...bindActionCreators({ searchChangeNameButton }, dispatch),
    }
}

const mapStateToProps = ({ actionSearchButton }) => ({ actionSearchButton });

export default connect(mapStateToProps, mapDispatchToProps)(Banner);