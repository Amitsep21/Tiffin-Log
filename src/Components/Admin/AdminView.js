import React from 'react';
import AdminPanel from './AdminPanel.js';
import Header1 from '../Layout/Header1.js';
import Footer1 from '../Layout/Footer1.js';

function AdminView() {
  return (
    <div>
      <Header1 />
      <AdminPanel />
      <Footer1 />
    </div>
  );
}

export default AdminView;

