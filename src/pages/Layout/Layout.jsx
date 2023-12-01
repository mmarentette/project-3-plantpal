import { Outlet } from "react-router-dom";
import { Grid } from "semantic-ui-react";

import { UserProvider } from "../../contexts/UserContext";
import PageHeader from "../../components/Header/Header";

export default function Layout({ loggedUser, handleLogout }) {
    return (
        <UserProvider loggedUser={loggedUser} handleLogout={handleLogout}>
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <PageHeader />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Outlet />
        </UserProvider>
    )
}
