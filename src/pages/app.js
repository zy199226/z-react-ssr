import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import 'normalize.css'; // 重置 css
import list2 from '../router/routes2';
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
                <Switch>
                    {list2.map(v => (<Route key={v.path} {...v} />))}
                </Switch>
            </div>
        );
    }
}

export default App;
