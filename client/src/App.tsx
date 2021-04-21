import { ReactElement, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { IProfile, IPoll } from './@types';
import Poll from './screens/poll';
import { getUserProfile, getPollsForUser } from './services/api';

function App():ReactElement {
  const [profile, setProfile] = useState<IProfile>();
  const [polls, setPolls] = useState<IPoll[]>([]);

  const initData = async () => {
    const userProfile = await getUserProfile();
    setProfile(userProfile);
    const userPolls = await getPollsForUser(userProfile.id);
    setPolls(userPolls);
  }

  useEffect(() => {
    initData();
  }, []);

  return (
    <div className="App">
      Hello {profile?.firstName}!

      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/polls">Polls</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/" exact>
              <h2>Home</h2>
            </Route>
            <Route path="/polls">
              <h2>Polls</h2>
              {polls.map((poll:any) => (
                <li key={poll.id}>
                  <Link key={poll.slug} to={`/polls/${poll.slug}`}>{poll.title}</Link>
                </li>
              ))}
              <Route path="/polls/:slug" exact>
                <Poll userId={profile?.id} />
              </Route>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
