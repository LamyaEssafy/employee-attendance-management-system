import React from 'react';

const Rapport = ({ agent }) => {
  // Données fictives pour les rapports (à remplacer par des données du backend)
  const rapports = [
    { id: 1, date: '01/05/2025', type: 'Mensuel', status: 'Généré', downloadLink: '#' },
    { id: 2, date: '15/04/2025', type: 'Hebdomadaire', status: 'En attente', downloadLink: '#' },
    { id: 3, date: '10/04/2025', type: 'Mensuel', status: 'Généré', downloadLink: '#' },
  ];

  return (
    <div className="rapport-container">
      <div className="main-content">
        <h1>Rapports, {agent?.prenom} {agent?.nom} !</h1>

        {/* Liste des rapports */}
        <div className="rapport-card">
          <h2>📈 Liste des rapports</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Statut</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rapports.map((rapport) => (
                  <tr key={rapport.id}>
                    <td>{rapport.id}</td>
                    <td>{rapport.date}</td>
                    <td>{rapport.type}</td>
                    <td>{rapport.status}</td>
                    <td>
                      {rapport.status === 'Généré' ? (
                        <a href={rapport.downloadLink} className="download-button">
                          📥 Télécharger
                        </a>
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions disponibles */}
        <div className="rapport-section">
          <h2>⚙️ Générer un nouveau rapport</h2>
          <div className="actions-container">
            <button className="action-button">📅 Rapport mensuel</button>
            <button className="action-button">📅 Rapport hebdomadaire</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .rapport-container {
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

        .rapport-card {
          background-color: #ffffff;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 40px;
        }

        .rapport-card h2 {
          color: #0A5C36; /* Vert foncé OCP */
          margin-bottom: 20px;
          font-size: 24px;
          font-weight: 600;
          display: flex;
          align-items: center;
        }

        .rapport-card h2::before {
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

        .download-button {
          display: flex;
          align-items: center;
          padding: 8px 12px;
          background-color: #66BB6A; /* Vert clair OCP */
          color: #ffffff;
          text-decoration: none;
          border: none;
          border-radius: 5px;
          font-size: 14px;
          transition: background-color 0.3s, transform 0.2s;
        }

        .download-button:hover {
          background-color: #0A5C36; /* Vert foncé OCP */
          transform: translateY(-1px);
        }

        .download-button::before {
          margin-right: 5px;
        }

        .rapport-section {
          margin-bottom: 40px;
        }

        .rapport-section h2 {
          color: #0A5C36; /* Vert foncé OCP */
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
        }

        .rapport-section h2::before {
          margin-right: 10px;
        }

        .actions-container {
          display: flex;
          gap: 15px;
        }

        .action-button {
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

        .action-button:hover {
          background-color: #0A5C36; /* Vert foncé OCP */
          transform: translateY(-2px);
        }

        .action-button::before {
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
};

export default Rapport;