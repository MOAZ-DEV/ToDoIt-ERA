import React, { useState, useEffect, useReducer, useRef } from 'react';
import Side_Bar from './views/SideBar';
import Main from './views/Main';
import Alert_Pop from './componenet/alert_pop';
import noteBookDB from './DB.jsx';
import './scss/App.scss';

function App() {

  const
  AppView = useRef(),
    [alert, setAlert] = useState(),
    [state, dispatch] = useReducer(noteBookDB, { notes: [], activeNote: "" }),
    DB = {
      activeNote: note => {
        dispatch({
          type: 'ACTIVE_NOTE',
          payload: { note: note },
        });
      },
      loadNote: () => {
        dispatch({
          type: 'LOAD_NOTES',
        });
      },
      asyncNote: () => {
        dispatch({
          type: 'SYNC_NOTES',
        });
      },
      addNote: () => {
        dispatch({
          type: 'ADD_NOTE',
          payload: { id: Date.now(), title: "", content: "" },
        });
        AppView.current.append(...<Alert_Pop alert={"alert"}/>);
        dispatch({
          type: 'ACTIVE_NOTE',
          payload: { note: { id: Date.now(), title: "", content: "" } },
        });
      },
      editNote: (id, title, content) => {
        dispatch({
          type: 'ACTIVE_NOTE',
          payload: { note: { id, title, content } },
        });
        dispatch({
          type: 'EDIT_NOTE',
          payload: { id, title, content },
        });
      },
      deleteNote: (targetId, note) => {
        dispatch({
          type: 'DELETE_NOTE',
          payload: { targetId },
        });
        dispatch({
          type: 'ACTIVE_NOTE',
          payload: { note: state.notes[state.notes.length - 1] },
        });
        console.log(state.notes[state.notes.length - 1])
      },
    };

  useEffect(() => {
    DB.loadNote();
    DB.activeNote(state.activeNote);
  }, []);
  useEffect(() => {
    DB.asyncNote();
  }, [state.notes]);
  useEffect(() => {
    DB.asyncNote();
  }, [state.activeNote]);

  return (<>
    <div ref={AppView} className="App">
      <Side_Bar
        DB={DB}
        state={state} />
      <Main
        DB={DB}
        state={state} />
    </div >
  </>);
}

export default App;
/**
 * <Main
  Data={state.activeNote}
  dispatch={data => dispatch(data)}
  activeNote={state.activeNote}
  onChange={({ id, title, content }) => DB.editNote(id, title, content)}
  deleteNote={(targetId) => DB.deleteNote(targetId)} />*/
