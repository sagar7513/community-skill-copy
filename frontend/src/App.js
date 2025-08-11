import React, { useEffect, useState } from 'react';
import './App.css';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({name:'', offered:[], wanted:[], newSkill:''});
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [matches, setMatches] = useState([]);

  useEffect(()=>{ fetchSkills(); fetchUsers(); }, []);

  async function fetchSkills(){
    const res = await fetch(API + '/skills');
    const data = await res.json();
    setSkills(data);
  }
  async function fetchUsers(){
    const res = await fetch(API + '/users');
    const data = await res.json();
    setUsers(data);
  }

  async function addSkill(){
    if (!form.newSkill) return;
    await fetch(API + '/skills', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({name:form.newSkill})});
    setForm({...form, newSkill:''});
    fetchSkills();
  }

  function toggleSkill(listName, skill){
    const arr = form[listName];
    if (arr.includes(skill)) setForm({...form, [listName]: arr.filter(s=>s!==skill)});
    else setForm({...form, [listName]: arr.concat([skill])});
  }

  async function createUser(e){
    e.preventDefault();
    const payload = { name: form.name, offered_skills: form.offered, wanted_skills: form.wanted };
    await fetch(API + '/users', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)});
    setForm({name:'', offered:[], wanted:[], newSkill:''});
    fetchUsers();
  }

  async function viewMatches(user){
    setSelectedUser(user);
    const res = await fetch(API + '/matches/' + user.id);
    const data = await res.json();
    setMatches(data);
  }

  return (
    <div className="container">
      <h1>🌟 Community Skill Exchange</h1>

      <div className="card">
        <h3>Available Skills</h3>
        <div>
          {skills.map(s=> <span key={s.id} className="skill-tag">{s.name}</span>)}
        </div>
        <div style={{marginTop:10}}>
          <input type="text" placeholder="Add new skill" value={form.newSkill} onChange={e=>setForm({...form, newSkill:e.target.value})} />
          <button onClick={addSkill} style={{marginLeft:8}}>Add</button>
        </div>
      </div>

      <div className="card">
        <h3>Create User</h3>
        <form onSubmit={createUser}>
          <div style={{marginBottom:8}}>
            <input type="text" placeholder="Your name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
          </div>
          <div style={{display:'flex', gap:20}}>
            <div>
              <h4>Offered</h4>
              {skills.map(s=>(
                <div key={s.id}>
                  <label>
                    <input type="checkbox" checked={form.offered.includes(s.name)} onChange={()=>toggleSkill('offered', s.name)} /> {s.name}
                  </label>
                </div>
              ))}
            </div>
            <div>
              <h4>Wanted</h4>
              {skills.map(s=>(
                <div key={s.id}>
                  <label>
                    <input type="checkbox" checked={form.wanted.includes(s.name)} onChange={()=>toggleSkill('wanted', s.name)} /> {s.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div style={{marginTop:8}}>
            <button type="submit">Create User</button>
          </div>
        </form>
      </div>

      <div className="card">
        <h3>Users</h3>
        {users.map(u=>(
          <div key={u.id} className="user-item">
            <strong>{u.name}</strong> — offers: {u.offered_skills.join(', ')}; wants: {u.wanted_skills.join(', ')}
            <button style={{marginLeft:8}} onClick={()=>viewMatches(u)}>View Matches</button>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div className="card">
          <h3>Matches for {selectedUser.name}</h3>
          {matches.length === 0 ? <div>No matches found (create more users)</div> : (
            matches.map(m=>(
              <div key={m.id} className="match-item">
                <strong>{m.name}</strong> — offers: {m.offered_skills.join(', ')}; wants: {m.wanted_skills.join(', ')}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default App;
