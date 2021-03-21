import React, {useState} from 'react';
import './postFoodPack.less';
import {Button, Checkbox, FormControlLabel, TextField} from "@material-ui/core";
import {ArrowBack} from '@material-ui/icons';
import {CurrentUser} from "services/auth.service";
import axios from "axios";
import {useHistory} from "react-router-dom";

type Props = {
    closeModal: () => void
}

export const PostFoodPack = (props: Props) => {

    const { closeModal } = props;
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isHalal, setIsHalal] = useState(false);
    const [isKosher, setIsKosher] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);
    const [date, setDate] = useState("");
    const [user, setUser] = useState<CurrentUser | null>(localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!): null);


    const onChangeTitle = (e:any) => {
        setTitle(e.target.value);
    }

    const onChangeDescription = (e:any) => {
        setDescription(e.target.value);
    }


    const onChangeIsHalal = () => {
        setIsHalal(!isHalal);
    }

    const onChangeIsKosher = () => {
        setIsKosher(!isKosher);
    }

    const onChangeIsVegetarian = () => {
        setIsVegetarian(!isVegetarian);
    }

    const onChangeDate = (e: any) => {
        setDate(e.target.value);
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        if (user){
            const foodPack = {
                title,
                user: user.pk,
                description,
                categories: ["Meat, food"],
                timestamp: date,
                is_halal: isHalal,
                is_kosher: isKosher,
                is_vegan: isVegetarian
            }
            axios.post("http://127.0.0.1:8000/dashboard/new_food_pack", foodPack, {
                headers: {
                    Authorization: `Bearer <${user.access_token}>`
                }
            }).then((res) => {
                alert("Food pack added");
                closeModal()
                // history.push('/dashboard');
            })
        }

    };


    return (
        <>
            <div className="background"></div>
            <div className="post-food-pack-container">
                <div className="post-food-pack_close" onClick={closeModal}>
                    <div>
                        <ArrowBack/>
                    </div>
                    <div style={{marginLeft: "5px"}}>
                        Back
                    </div>
                </div>
                <div className="post-food-pack_title">
                    Create food pack
                </div>
                <div className="post-food-pack-form">
                    <div className="form-control-container_input">
                        <TextField
                            fullWidth={true}
                            id='title'
                            label='title'
                            placeholder='enter the title'
                            variant='outlined'
                            value={title}
                            onChange={onChangeTitle}
                        />
                    </div>
                    <div className="form-control-container_input">
                        <TextField
                            fullWidth={true}
                            id='description'
                            label='description'
                            placeholder='enter the description'
                            variant='outlined'
                            value={description}
                            onChange={onChangeDescription}
                        />
                    </div>
                    <div className="form-control-container_checkboxes">
                        <FormControlLabel
                            control={<Checkbox checked={isHalal} onChange={onChangeIsHalal} name="halal" />}
                            label="halal"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={isVegetarian} onChange={onChangeIsVegetarian} name="vegetarian" />}
                            label="vegetarian"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={isKosher} onChange={onChangeIsKosher} name="kosher" />}
                            label="kosher"
                        />
                    </div>
                    <div className="form-control-container_input" style={{marginBottom: "40px"}}>
                        <label htmlFor={"date"} style={{marginBottom: "5px"}}>Date</label>
                        <TextField
                            type="datetime-local"
                            fullWidth={true}
                            id='date'
                            value={date}
                            onChange={onChangeDate}
                        />
                    </div>
                    <div className="form-control-container_btn">
                        <Button
                            style={{
                                maxWidth: '100%', maxHeight: '100%', minWidth: '100%', minHeight: '100%',
                                backgroundColor: "#1565D8"
                            }}
                            fullWidth={true}
                            variant="contained"
                            onClick={onSubmit}
                        >
                            Take food pack
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
};

