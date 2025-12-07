
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { getNotes, createNote, updateNote, deleteNote } from "../api/notes";
import "../styles/notes.css";


function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await getNotes();
      setNotes(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log("Error fetching notes", err);
    }
    setLoading(false);
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setSaving(true);

    try {
      if (editingId) {
        await updateNote(editingId, title, content);
        setEditingId(null);
      } else {
        await createNote(title, content);
      }

      setTitle("");
      setContent("");
      fetchNotes();
    } catch (err) {
      console.log("Error creating/updating note:", err);
    }

    setSaving(false);
  };

  const handleEdit = (note) => {
    setEditingId(note._id);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this note?")) return;

    try {
      await deleteNote(id);
      fetchNotes();
    } catch (err) {
      console.log("Error deleting note:", err);
    }
  };

  return (
    <div className="notes-page">
      <Navbar />
      <h2>Your Notes</h2>

      <form onSubmit={handleCreateNote} className="note-form">
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : editingId ? "Update Note" : "Add Note"}
        </button>
      </form>

      {loading ? (
        <p>Loading notes...</p>
      ) : (
        <div className="notes-list">
          {notes.length === 0 ? (
            <p>No notes yet</p>
          ) : (
            Array.isArray(notes) && notes.map((note) => (
              <div key={note._id} className="note-card">
                <h3>{note.title}</h3>
                <p>{note.content}</p>

                <button onClick={() => handleEdit(note)}>Edit</button>
                <button onClick={() => handleDelete(note._id)}>Delete</button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Notes;
