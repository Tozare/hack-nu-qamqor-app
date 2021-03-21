import React, {useEffect, useState} from 'react';
import axios from "axios";
import {CurrentUser} from "services/auth.service";
import './userDashboard.less'
import {Button} from "@material-ui/core";


type Props = {
    user: CurrentUser
}

export const Menu = (props: Props) => {

    const { user } = props;

    const [availableFood, setAvailableFood] = useState<any[]>([]);


    useEffect(() => {
        axios.get("http://127.0.0.1:8000/dashboard/food_packs", {
            headers: {
                Authorization: `Bearer <${user.access_token}>`
            }
        }).then((res) => {
            setAvailableFood(res.data);
        }, () => {setAvailableFood([
            {
                pk: 5,
                user: 13,
                title: "Future food 2",
                description: "250 g",
                timestamp: "2021-03-21T14:08:43Z"
            },
            {
                pk: 4,
                user: 13,
                title: "Future Food",
                description: "Food that was not shipped yet",
                timestamp: "2021-03-30T14:07:08Z"
            },
            {
                pk: 3,
                user: 13,
                title: "Cake",
                description: "Cake",
                timestamp: "2021-03-18T13:53:20Z"
            }
        ])});
    }, []);

    const takePost = (pk: string) => {
        axios.post("http://127.0.0.1:8000/dashboard/pickup", {pk}, {
            headers: {
                Authorization: `Bearer <${user.access_token}>`
            }
        }).then((res) => {
            alert("You took the pack");
            // history.push('/dashboard');
        }, () => {
            alert("Oops... Error occurred")
            }
        );
        const newAvailableFood: any[] = [];
        availableFood.forEach((pack) => {
            if (pack.pk !== pk){
                newAvailableFood.push(pack);
            }
        });
        setAvailableFood(newAvailableFood);
    }

    return <div className="menu-container">
        <div className="menu-container_map">
            <div>
                Map for seeing location of food pack and choose appropriate one
            </div>
        </div>
        <div className="menu-container_food">
            <div className="menu-container-food-header">
                <div className="menu-container-food-header_name">
                    Available food packs
                </div>
            </div>
            <div className="menu-container-food_items">
                {availableFood.map(pack => {
                    return (
                        <div className="menu-container-food_items_item">
                            <div className="menu-container-food_items_item_name">
                                {pack.title}
                            </div>
                            <div className="menu-container-food_items_item_description">
                                {pack.description}
                            </div>
                            <div className="menu-container-food_items_item_loc">
                                {pack.timestamp}
                            </div>
                            <div className="menu-container-food_items_item_btn">
                                <Button
                                    style={{
                                        maxWidth: '100%', maxHeight: '100%', minWidth: '100%', minHeight: '100%',
                                        backgroundColor: "green"
                                    }}
                                    fullWidth={true}
                                    variant="contained"
                                    onClick={() => takePost(pack.pk)}
                                >
                                    Create food pack
                                </Button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
};