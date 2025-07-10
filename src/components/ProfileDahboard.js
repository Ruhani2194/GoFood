

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProfileDashboard() {
  const [profiles, setProfiles] = useState([]);
  const [profile, setProfile] = useState({ name: '', email: '', bio: '' });
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editProfileId, setEditProfileId] = useState(null);

  const fetchProfiles = async () => {
    try {
      const response = await fetch(`https://gofood-3back.onrender.com/api/user-profiles/${id}`, {
  method: 'DELETE'
});

      const data = await response.json();
      setProfiles(data);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('name', profile.name);
      formData.append('email', profile.email);
      formData.append('bio', profile.bio);
      if (profilePicture) formData.append('profilePicture', profilePicture);

      const method = editProfileId ? 'PUT' : 'POST';
      const url = editProfileId
        ? `https://gofood-3back.onrender.com/api/user-profiles/${editProfileId}`
        : 'https://gofood-3back.onrender.com/api/user-profiles';

      const response = await fetch(url, {
        method,
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        if (editProfileId) {
          setProfiles(profiles.map(p => (p._id === data._id ? data : p)));
        } else {
          setProfiles([...profiles, data]);
        }
        setProfile({ name: '', email: '', bio: '' });
        setProfilePicture(null);
        setPreview(null);
        setEditProfileId(null);
      } else {
        throw new Error(data.message || 'Error saving profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleDelete = async (id) => {
    console.log('Deleting profile with ID:', id); // Check if the ID is correct
    try {
      const response = await fetch(fetch(`https://gofood-3back.onrender.com/api/user-profiles/${id}`)
, { method: 'DELETE' });
      if (response.ok) {
        setProfiles(profiles.filter(p => p._id !== id));
      } else {
        throw new Error('Error deleting profile');
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  const handleEdit = (profile) => {
    setProfile({ name: profile.name, email: profile.email, bio: profile.bio });
    setEditProfileId(profile._id);
    setPreview(profile.profilePicture);
    setProfilePicture(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="bg-dark text-light min-vh-100 p-4">
      <h2 className="text-center mb-4">Profile Dashboard</h2>
      <div className="container">
        <div className="mb-4">
          <h3>{editProfileId ? 'Edit Profile' : 'Add New Profile'}</h3>
          <div className="mb-3">
            <input
              type="text"
              className="form-control mb-2"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              placeholder="Name"
            />
            <input
              type="email"
              className="form-control mb-2"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              placeholder="Email"
            />
            <textarea
              className="form-control mb-2"
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              placeholder="Bio"
              rows="3"
            />
            <input
              type="file"
              className="form-control mb-2"
              onChange={handleFileChange}
              accept="image/jpeg, image/png, image/jpg"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={{ width: '100px', height: '100px', marginBottom: '10px' }}
              />
            )}
            <button className="btn btn-primary" onClick={handleSave}>
              {editProfileId ? 'Update Profile' : 'Save Profile'}
            </button>
          </div>
        </div>
        <ul className="list-group">
          {profiles.map(p => (
            <li
              key={p._id}
              className="list-group-item d-flex justify-content-between align-items-center bg-secondary text-light mb-2"
            >
              <div>
                {p.profilePicture && (
                  <img
                    src={p.profilePicture}
                    alt="Profile"
                    style={{
                      width: '50px',
                      height: '50px',
                      marginRight: '10px',
                      borderRadius: '50%',
                    }}
                  />
                )}
                <strong>{p.name}</strong> ({p.email}): {p.bio}
              </div>
              <div>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(p)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(p._id)} // Ensure correct ID is passed here
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProfileDashboard;
