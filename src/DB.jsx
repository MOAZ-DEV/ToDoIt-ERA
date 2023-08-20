import fs from "vite-plugin-fs/browser";

function noteBookDB(state, action) {

  switch (action.type) {
    case "ACTIVE_NOTE":
      let active = null;
      state.notes.map((note) => {
        note? 
        () => {if (note = state.activeNote) active = note}
        :
        () => active = state.activeNote;
        
      });
      return {
        ...state,
        activeNote: action.payload.note || active || state.notes[0],
      };
    case "ADD_NOTE":
      return {
        ...state,
        notes: [...state.notes, action.payload],
        activeNote: action.payload.id,
      };
    case "EDIT_NOTE":
      const { id, title, content } = action.payload;
      const newNotes = state.notes.map((note) => {
        if (note.id === id) {
          return { ...note, title, content };
        }
        return note;
      });
      return {
        ...state,
        notes: newNotes,
      };
    case "DELETE_NOTE":
      const { targetId } = action.payload;
      const virtualBook = [];
      if (targetId) {
        state.notes.map((note) => {
          if (note.id !== targetId) {
            virtualBook.push(note);

          }
        });
      }
      return {
        ...state,
        notes: virtualBook,
      };
    case "SYNC_NOTES":
      // Store the notes in AsyncStorage
      const storeData = async () => {
        try {
          await window.localStorage.setItem("notes", JSON.stringify([...state.notes]));
          await window.localStorage.setItem("activeNote", JSON.stringify(state.activeNote));
        } catch (e) {
          // Handle error
        }
      };
      storeData();
      return {
        ...state,
      };
    case "LOAD_NOTES":
      // Load the notes from AsyncStorage
      const notes = window.localStorage.getItem("notes");
      const activeNote = window.localStorage.getItem("activeNote");
      const getData = () => {
        let x, y;
        if (notes !== null) {
          // Parse the JSON string and update the state
          const parsedValue = JSON.parse(notes);
          x = [...parsedValue];
        }
        if (activeNote !== null && activeNote !== "undefined") {
          // Parse the JSON string and update the state
          const parsedValue = JSON.parse(activeNote);
          y = parsedValue;
        }
        return { oldNotes: x, oldActiveNote: y };
      };
      const { oldNotes, oldActiveNote } = getData();
      return {
        ...state,
        notes: oldNotes || [],
        activeNote: oldActiveNote,
      };
    default:
      return state;
  }
}

export default noteBookDB;
