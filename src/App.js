import logo from './logo.svg';
import './App.css';
import NoteState from './useContext/NotState';
import Main from './Main';

function App() {
  return (
    <div >
            <NoteState>
              <Main/>
            </NoteState>

    </div>
  );
}

export default App;
