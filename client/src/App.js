import React from 'react';
import axios from 'axios';
import {getToken, authContext} from './adal-config';
import Bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';

export class App extends React.Component {
    state = {
        values: null,
        user: null
    };

    async componentDidMount() {
        const config = {
            headers: {
                Authorization: "Bearer" + getToken(),
                Accept: "application/json, text/plain, */*",
                'Context-Type': "application/json"
            }
        }

        var response = await axios.get(`https://jolly-bush-061573503.azurestaticapps.net/api/Books`, config);

        this.setState({values: response.data, user: authContext.getCachedUser().profile});
    }

    render() {
        if(this.state.values) {
            console.log(this.state.values);
            
            return (
                <div>
                    Hello React {this.state.user.name}!
                    <ul>
                    {
                        this.state.values.map((item) => {
                            return(<li>{item.Title}</li>);
                        })
                    }
                    </ul>
                </div>
            );
        } else {
            return(<div class="container py4">Loading...</div>)
        }
    }
}

export default App;