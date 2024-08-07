// src/admin/ClientsPage.jsx
import React, { useEffect, useState } from 'react';
import { fetchClients } from "./api";

const ClientsPage = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    function loadClients() {
      fetchClients()
        .then(data => {
          setClients(data);
        })
        .catch(error => {
          console.error("Failed to fetch clients:", error);
        });
    }
    loadClients();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Clients</h2>
      {clients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map(client => (
            <div key={client.id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-700">{client.name}</h3>
              <p className="text-gray-600">{client.email}</p>
              <div className="mt-2 flex justify-end">
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No clients available</p>
      )}
    </div>
  );
};

export default ClientsPage;
