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
      
      <h1 className="notes-title">Your Notes</h1>

      <form onSubmit={handleCreateNote} className="note-form">
        <input
          type="text"
          placeholder="Note title..."
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
        <p style={{ color: "#ccc" }}>Loading notes...</p>
      ) : (
        <div className="notes-grid">
          {notes.length === 0 ? (
            <p style={{ color: "#888" }}>No notes yet</p>
          ) : (
            notes.map((note) => (
              <div key={note._id} className="note-card">
                <h3>{note.title}</h3>
                <p>{note.content}</p>

                <div className="btn-row">
                  <button className="edit-btn" onClick={() => handleEdit(note)}>
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(note._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Notes;
