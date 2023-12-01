import { useState } from 'react';
import { Icon, Menu, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';

export default function PageHeader() {
    const {loggedUser, handleLogout} = useUserContext();
    console.log(loggedUser, handleLogout);
    const [activeItem, setActiveItem] = useState('home');

    function handleItemClick(e) {
        setActiveItem(e.target.name);
    }

    return (
        <Menu icon='labeled'>
            <Link to="/">
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={handleItemClick}
                >
                    {/* <Icon name='home' /> */}
                    <Image src="https://i.imgur.com/CPGiTkJ.jpg" size="tiny" />
                    PlantPal
                </Menu.Item>
            </Link>
            <Link to={`/${loggedUser.username}`} >
                <Menu.Item
                    name='profile'
                    active={activeItem === 'profile'}
                    onClick={handleItemClick}
                >
                    <Image
                        avatar
                        size="tiny"
                        src={loggedUser.photoUrl ? loggedUser.photoUrl : "https://react.semantic-ui.com/images/wireframe/square-image.png"} />
                    Profile Page
                </Menu.Item>
            </Link>

            <Link to="" onClick={handleLogout} >
                <Menu.Item
                    name='logout'
                    active={activeItem === 'logout'}
                    onClick={handleItemClick}
                >
                    <Icon name='log out' />
                    Log out
                </Menu.Item>
            </Link>
        </Menu>
    )
}