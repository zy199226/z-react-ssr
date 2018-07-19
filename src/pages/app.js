import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './app.sass';

class App extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li>
                        <Link to="/aaa">
                            aaa
                        </Link>
                    </li>
                    <li>
                        <Link to="/bbb">
                            bbb
                        </Link>
                    </li>
                    <li>
                        <Link to="/ccc">
                            ccc
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default App;
