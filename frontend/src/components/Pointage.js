import React, { useState } from 'react';

const Pointage = ({ agent }) => {
  const [arrivalTime, setArrivalTime] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [message, setMessage] = useState('');

  const handlePointage = (type) => {
    const now = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    if (type === 'arrival') {
      setArrivalTime(now);
      setMessage('✅ Pointage d\'arrivée enregistré : ' + now);
    } else {
      setDepartureTime(now);
      setMessage('✅ Pointage de départ enregistré : ' + now);
    }
  };

  return (
    <div className="pointage-container">
      <div className="main-content">
        <h1>Pointage, {agent?.prenom} {agent?.nom} !</h1>

        {/* Formulaire de pointage */}
        <div className="pointage-card">
          <h2>⏰ Enregistrer un pointage</h2>
          {message && <div className="update-message">{message}</div>}
          <div className="form-container">
            <button
              className="pointage-button"
              onClick={() => handlePointage('arrival')}
              disabled={arrivalTime !== ''}
            >
              📥 Pointage d'arrivée
            </button>
            <button
              className="pointage-button"
              onClick={() => handlePointage('departure')}
              disabled={departureTime !== '' || arrivalTime === ''}
            >
              📤 Pointage de départ
            </button>
          </div>
          <div className="time-display">
            <p><strong>Arrivée :</strong> {arrivalTime || '-'}</p>
            <p><strong>Départ :</strong> {departureTime || '-'}</p>
          </div>
        </div>

        {/* Historique fictif (à remplacer par des données du backend) */}
        <div className="pointage-section">
          <h2>📋 Historique des pointages</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Arrivée</th>
                  <th>Départ</th>
                  <th>Durée</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>02/05/2025</td>
                  <td>08:05</td>
                  <td>17:10</td>
                  <td>9h05</td>
                  <td>✅ Présent</td>
                </tr>
                <tr>
                  <td>01/05/2025</td>
                  <td>08:02</td>
                  <td>16:50</td>
                  <td>8h48</td>
                  <td>✅ Présent</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pointage-container {
          display: flex;
          width: 100%;
          background-color: #f5f5f5; /* Fond gris clair, comme Dashboard */
          min-height: 100vh;
        }

        .main-content {
          margin-left: 250px; /* La largeur de la sidebar */
          padding: 40px;
          width: calc(100% - 250px);
          background-color: #f5f5f5; /* Fond gris clair */
          min-height: 100vh;
        }

        h1 {
          color: #0A5C36; /* Vert foncé OCP */
          margin-bottom: 30px;
          font-size: 32px;
          font-weight: 700;
        }

        .pointage-card {
          background-color: #ffffff;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 40px;
        }

        .pointage-card h2 {
          color: #0A5C36; /* Vert foncé OCP */
          margin-bottom: 20px;
          font-size: 24px;
          font-weight: 600;
          display: flex;
          align-items: center;
        }

        .pointage-card h2::before {
          margin-right: 10px;
        }

        .update-message {
          text-align: center;
          margin-bottom: 20px;
          font-size: 16px;
          color: #0A5C36; /* Vert foncé OCP pour succès */
        }

        .update-message::before {
          margin-right: 10px;
        }

        .form-container {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
        }

        .pointage-button {
          display: flex;
          align-items: center;
          padding: 12px 20px;
          background-color: #66BB6A; /* Vert clair OCP */
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s;
        }

        .pointage-button:disabled {
          background-color: #e0e0e0;
          color: #666;
          cursor: not-allowed;
        }

        .pointage-button:hover:not(:disabled) {
          background-color: #0A5C36; /* Vert foncé OCP */
          transform: translateY(-2px);
        }

        .pointage-button::before {
          margin-right: 10px;
        }

        .time-display {
          margin-top: 20px;
        }

        .time-display p {
          margin: 10px 0;
          font-size: 16px;
          color: #333;
        }

        .time-display p strong {
          color: #0A5C36; /* Vert foncé OCP */
          margin-right: 10px;
        }

        .pointage-section {
          margin-bottom: 40px;
        }

        .pointage-section h2 {
          color: #0A5C36; /* Vert foncé OCP */
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
        }

        .pointage-section h2::before {
          margin-right: 10px;
        }

        .table-container {
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        table th, table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }

        table th {
          background-color: #0A5C36; /* Vert foncé OCP */
          color: #ffffff;
          font-weight: 600;
        }

        table tr:nth-child(even) {
          background-color: #f9f9f9;
        }

        table tr:hover {
          background-color: #e8f5e9; /* Vert très clair pour le survol */
        }
      `}</style>
    </div>
  );
};

export default Pointage;