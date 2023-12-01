import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';

import { useUserContext } from '../../contexts/UserContext';

export default function PageHeader() {

    const { loggedUser, handleLogout } = useUserContext();
    const [activeItem, setActiveItem] = useState({});

    function handleItemClick(e, {name}) {
        setActiveItem(name);
    }

    return (
        <Menu borderless icon='labeled'>
            <Link to="/">
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={handleItemClick}
                >
                    <Icon name="home" />
                    PlantPal
                </Menu.Item>
            </Link>
            <Link to={`/${loggedUser.username}`} >
                <Menu.Item
                    name='profile'
                    active={activeItem === 'profile'}
                    onClick={handleItemClick}
                >
                    <Icon name="user" />
                    Profile Page
                </Menu.Item>
            </Link>

            <Link to="" onClick={handleLogout} >
                <Menu.Menu position="right">
                    <Menu.Item
                        name='logout'
                        active={activeItem === 'logout'}
                        onClick={handleItemClick}
                    >
                        <Icon name='log out' />
                        Log out
                    </Menu.Item>
                </Menu.Menu>
            </Link>
        </Menu>
    )
}