import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Dashboard() {
  const { badges } = useAuth();

  return (
    <div style={{minHeight: '100vh', background: 'linear-gradient(135deg, #8b5cf6, #14b8a6)', padding: '2rem'}}>
      <Link to="/" style={{color: '#008080', fontSize: '1.25rem', fontWeight: 'bold'}}>← Back</Link>
      <div style={{maxWidth: '800px', margin: '2rem auto', background: 'rgba(255,255,255,0.9)', padding: '2rem', borderRadius: '24px'}}>
        <h1 style={{fontSize: '2.5rem', color: '#8b5cf6', textAlign: 'center'}}>Your Badges</h1>
        {badges.length > 0 ? (
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem'}}>
            {badges.map(badge => (
              <div key={badge.id} style={{background: '#fef3c7', border: '3px solid #f59e0b', borderRadius: '16px', padding: '2rem', textAlign: 'center'}}>
                <div style={{fontSize: '4rem'}}>{badge.icon}</div>
                <h3 style={{fontSize: '1.5rem', color: '#92400e', margin: '1rem 0'}}>{badge.name}</h3>
                <p style={{color: '#92400e'}}>Earned: {badge.date}</p>
              </div>
            ))}
          </div>
        ) : (
          <div style={{textAlign: 'center', padding: '4rem'}}>
            <div style={{fontSize: '4rem', marginBottom: '1rem'}}>🎉</div>
            <h3 style={{fontSize: '1.5rem', color: '#6b7280'}}>No badges yet!</h3>
            <Link to="/profile">
              <button style={{marginTop: '1rem', padding: '1rem 2rem', background: '#0ea5e9', color: 'white', border: 'none', borderRadius: '50px'}}>
                Complete Profile First
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
