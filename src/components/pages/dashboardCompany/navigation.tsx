import React from 'react';
import './navigation.less';
import {Button} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import {Dashboard, Kitchen, Settings, AccountBox, People} from '@material-ui/icons';
import {useHistory} from "react-router-dom";
import {authenticationService} from "services/auth.service";

type Props = {
    openModal: () => void
}

export const Navigation = (props: Props) => {

    const { openModal } = props;

    const history = useHistory();
    //
    const logout = () => {
        authenticationService.logout();
        history.push('/');
    };

    return (
        <div className="navigation">
            <div className="navigation_header">
                <div className="navigation_header_title">
                    QADAM FOOD
                </div>
            </div>
            <div className="navigation_items">
                <div className="navigatio_items_item">
                    <div className="navigatio_items_item_icon">
                        <Dashboard/>
                    </div>
                    <div className="navigatio_items_item_name">
                        Overview
                    </div>
                </div>
                <div className="navigatio_items_item">
                    <div className="navigatio_items_item_icon">
                        <Kitchen/>
                    </div>
                    <div className="navigatio_items_item_name">
                        Food packs
                    </div>
                </div>
                <div className="navigatio_items_item">
                    <div className="navigatio_items_item_icon">
                        <AccountBox/>
                    </div>
                    <div className="navigatio_items_item_name">
                        Profile
                    </div>
                </div>
                <div className="navigatio_items_item">
                    <div className="navigatio_items_item_icon">
                        <People/>
                    </div>
                    <div className="navigatio_items_item_name">
                        Clients
                    </div>
                </div>
            </div>
            <div className="divider"/>
            <div className="navigation_settings">
                <div className="navigatio_items_item">
                    <div className="navigatio_items_item_icon">
                        <Settings/>
                    </div>
                    <div className="navigatio_items_item_name">
                        Settings
                    </div>
                </div>
            </div>

            <div className="navigation_settings">
                <div className="navigatio_items_item">
                    <div className="navigatio_items_item_icon">
                        {/*<ExitToApp/>*/}
                    </div>
                    <div className="navigatio_items_item_name" onClick={logout}>
                        Logout
                    </div>
                </div>
            </div>


            <div className="navigation-add-button">
                <Button
                    style={{maxWidth: '100%', maxHeight: '100%', minWidth: '100%', minHeight: '100%', color: "white", borderColor: "white"}}
                    fullWidth={true}
                    variant="outlined"
                    onClick={openModal}
                >
                    Create food pack
                </Button>
            </div>
        </div>
    )
}