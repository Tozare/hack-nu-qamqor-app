import React, {useEffect, useState} from 'react';
import {Navigation} from "components/pages/dashboardCompany/navigation";
import {Button} from "@material-ui/core";
import {CloudUpload, Add, AccountCircle} from "@material-ui/icons";
import './companyDashboard.less';


import { useHistory } from "react-router-dom";
import {authenticationService, CurrentUser} from "services/auth.service";
import axios from "axios";
import {number} from "prop-types";
import {PostFoodPack} from "components/pages/dashboardCompany/postFoodPack";
import {Menu} from "components/pages/dashboardCompany/userDashboard";


const foodTest = [
    {
        title: "cake",
        description: "250 g",
    },

    {
        title: "meat",
        description: "240 g",
    },

    {
        title: "hamburget",
        description: "250 g",
    }
    ];

export const CompanyDashboard = () => {

    const history = useHistory();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState<CurrentUser | null>(JSON.parse(localStorage.getItem('currentUser')!));

    const [oldFoods, setOldFoods] = useState<any[]>([]);
    const [currentFoods, setCurrentFoods] = useState<any[]>([]);
    const [numberOldFoods, setNumberOldFoods] = useState<any>("");
    const [bonus, setBonus] = useState(0);

    useEffect(() => {
        authenticationService.currentUser.subscribe(x => {
            setUser(x);
        });

        axios.get("http://127.0.0.1:8000/dashboard/number_of_shipped_food_packs", {
            headers: {
                Authorization: `Bearer ${user!.access_token}`
            }
        }).then((res) => {

            setNumberOldFoods(res.data);
        });


        axios.get("http://127.0.0.1:8000/dashboard/shipped_food_packs", {
            headers: {
                Authorization: `Bearer ${user!.access_token}`
            }
        }).then((res) => {
            setOldFoods(res.data);
        })

        axios.get("http://127.0.0.1:8000/dashboard/sheduled_food_packs", {
            headers: {
                Authorization: `Bearer ${user!.access_token}`
            }
        }).then((res) => {
            setCurrentFoods(res.data);
        })

    },[]);

    //
    // const countOldFood = (data: any[]) => {
    //     let count = 0;
    //     data.forEach(() => {
    //       count++;
    //     });
    //     setNumberOldFoods(count);
    // };

    const onChangeIsModalOpen = () => {
        setIsModalOpen(!isModalOpen);
    };

    if (!user){
        // setUser()
        return <div>You are not authorized</div>
    }
    // return (
    //     <div>hello mtgf</div>
    // )
    return (
        <div className="dashboard-container">
            <Navigation openModal={onChangeIsModalOpen}/>
            {
                user && user.is_company ?
                    <>
                        <div className="main-container">
                            <div className="main-container_header">
                                <div className="main-container_header_name">Overview</div>
                                <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginRight: "30px"}}>
                                    <div style={{fontSize: "14px", marginRight: "10px"}}>
                                        {user ? user.full_name : "Name Surname"}
                                    </div>
                                    <div>
                                        <AccountCircle/>
                                    </div>
                                </div>
                            </div>
                            <div className="main-container_menu">
                                <div className="main-container_menu_analysis">
                                    <div className="main-container_menu_analysis_card">
                                        <div className="main-container_menu_analysis_card_title">
                                            Taken Food sets
                                        </div>
                                        <div className="main-container_menu_analysis_card_value">
                                            {numberOldFoods}
                                        </div>
                                    </div>
                                    <div className="main-container_menu_analysis_card">
                                        <div className="main-container_menu_analysis_card_title">
                                            Gained bonuses
                                        </div>
                                        <div className="main-container_menu_analysis_card_value">
                                            {numberOldFoods * 3}
                                        </div>
                                    </div>
                                </div>
                                <div className="main-container_menu_addbutton">
                                    <Button
                                        style={{maxWidth: '100%', maxHeight: '100%', minWidth: '100%', minHeight: '100%', backgroundColor: "#1565D8", color: "white", zIndex: 0}}
                                        fullWidth={true}
                                        variant="contained"
                                        startIcon={<Add/>}
                                        onClick={onChangeIsModalOpen}

                                    >
                                        Create food pack
                                    </Button>
                                </div>
                                <div className="main-container_menu_scheduled-food">
                                    <div className="main-container_menu_scheduled-food_title">
                                        Scheduled food
                                    </div>
                                    <div className="main-container_menu_scheduled-food_companyname">
                                        {user ? user.email : "Company name"}
                                    </div>

                                    <div className="main-container_menu_scheduled-food_items">
                                        {currentFoods.map((food) => {
                                            return (<div style={{height: "65px", borderBottom: "2px solid gray", display: "flex", flexDirection: "row",
                                                justifyContent: "space-between",
                                                alignItems: "center"
                                            }}>
                                                <div>{food.title}</div>
                                                <div>{food.description}</div>
                                            </div>)
                                        })}
                                    </div>
                                </div>
                                <div className="main-container_menu_history">
                                    <div className="main-container_menu_history_header">
                                        <div className="main-container_menu_scheduled-food_title">History</div>
                                        <div className="main-container_menu_scheduled-food_companyname">View details</div>
                                        {oldFoods.map((food) => {
                                            return (<div style={{height: "65px", borderBottom: "2px solid gray", display: "flex", flexDirection: "row",
                                                justifyContent: "space-between",
                                                alignItems: "center"
                                            }}>
                                                <div>{food.title}</div>
                                                <div>{food.description}</div>
                                            </div>)
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            isModalOpen && <PostFoodPack closeModal={onChangeIsModalOpen}/>
                        }
                    </>
                :
                    <>
                        <div className="main-container">
                            <div className="main-container_header">
                                <div className="main-container_header_name">Overview</div>
                                <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginRight: "30px"}}>
                                    <div style={{fontSize: "14px", marginRight: "10px"}}>
                                        {user ? user.full_name : "Name Surname"}
                                    </div>
                                    <div>
                                        <AccountCircle/>
                                    </div>
                                </div>
                            </div>
                            <Menu user={user}/>
                        </div>
                    </>
            }
        </div>
    )
};