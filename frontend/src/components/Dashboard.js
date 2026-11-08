import React from 'react';

const Dashboard = ({ agent }) => {
  // Données fictives pour l'historique de la semaine (à remplacer par des données du backend)
  const weeklyHistory = [
    { date: '29/04/2025', arrival: '08:04', departure: '17:15', duration: '9h11', delay: '4 min', status: '✅ Présent' },
    { date: '28/04/2025', arrival: '08:01', departure: '17:00', duration: '8h59', delay: '1 min', status: '✅ Présent' },
    { date: '27/04/2025', arrival: '-', departure: '-', duration: '-', delay: '-', status: '❌ Absent' },
    { date: '26/04/2025', arrival: '08:00', departure: '16:45', duration: '8h45', delay: '0 min', status: '✅ Présent' },
  ];

  // Données fictives pour le résumé mensuel (à remplacer par des données du backend)
  const monthlySummary = {
    daysWorked: 18,
    daysAbsent: 2,
    delays: 6,
    totalHours: '144h 20min',
  };

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <h1>Bienvenue, {agent?.prenom} {agent?.nom} !</h1>

        {/* Informations de l'agent */}
        <div className="dashboard-card">
          <h2 align="center ">Informations de l'agent</h2>
          <p><strong>Matricule :</strong> {agent?.matricule}</p>
          <p><strong>Poste :</strong> {agent?.poste}</p>
          <p><strong>Département :</strong> {agent?.departement}</p>
          <p><strong>Site :</strong> {agent?.site}</p>
          <p><strong>Email :</strong> {agent?.email}</p>
          <p><strong>Téléphone :</strong> {agent?.telephone}</p>
        </div>

        {/* Historique de la semaine */}
        <div className="dashboard-section">
          <h2>📆 Historique de la semaine</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Arrivée</th>
                  <th>Départ</th>
                  <th>Durée</th>
                  <th>Retard</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {weeklyHistory.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.date}</td>
                    <td>{entry.arrival}</td>
                    <td>{entry.departure}</td>
                    <td>{entry.duration}</td>
                    <td>{entry.delay}</td>
                    <td>{entry.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions disponibles */}
        <div className="dashboard-section">
          <h2>⚙️ Actions disponibles</h2>
          <div className="actions-container">
            <button className="action-button">
              📄 Télécharger mes rapports
            </button>
            <button className="action-button">
              🕓 Demander une régularisation
            </button>
            <button className="action-button">
              🧾 Voir mes justificatifs
            </button>
          </div>
        </div>

        {/* Résumé mensuel */}
        <div className="dashboard-section">
          <h2>📊 Résumé mensuel (avril 2025)</h2>
          <div className="summary-container">
            <div className="summary-card">
              <p><strong>Jours travaillés :</strong> {monthlySummary.daysWorked}</p>
              <p><strong>Jours d'absence :</strong> {monthlySummary.daysAbsent}</p>
              <p><strong>Retards :</strong> {monthlySummary.delays}</p>
              <p><strong>Heures totales :</strong> {monthlySummary.totalHours}</p>
            </div>
            <div className="summary-graph">
              <div className="graph-bar">
                <span>Jours travaillés</span>
                <div className="bar" style={{ width: `${(monthlySummary.daysWorked / 30) * 100}%` }}></div>
              </div>
              <div className="graph-bar">
                <span>Jours d'absence</span>
                <div className="bar absence" style={{ width: `${(monthlySummary.daysAbsent / 30) * 100}%` }}></div>
              </div>
              <div className="graph-bar">
                <span>Retards</span>
                <div className="bar delay" style={{ width: `${(monthlySummary.delays / 30) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-container {
          display: flex;
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

        .dashboard-card {
          background-color: #ffffff;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          margin-bottom: 40px;
        }

        .dashboard-card h2 {
          color: #0A5C36; /* Vert foncé OCP */
          margin-bottom: 20px;
          font-size: 24px;
          font-weight: 600;
        }

        .dashboard-card p {
          margin: 10px 0;
          font-size: 16px;
          color: #333;
        }

        .dashboard-card p strong {
          color: #0A5C36; /* Vert foncé OCP */
          margin-right: 10px;
        }

        .dashboard-section {
          margin-bottom: 40px;
        }

        .dashboard-section h2 {
          color: #0A5C36; /* Vert foncé OCP */
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
        }

        .dashboard-section h2::before {
          margin-right: 10px;
        }

        /* Styles pour le tableau */
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

        /* Styles pour les actions */
        .actions-container {
          display: flex;
          flex-wrap: wrap;
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

        /* Styles pour le résumé mensuel */
        .summary-container {
          display: flex;
          gap: 30px;
          flex-wrap: wrap;
        }

        .summary-card {
          background-color: #ffffff;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          flex: 1;
          min-width: 250px;
        }

        .summary-card p {
          margin: 10px 0;
          font-size: 16px;
          color: #333;
        }

        .summary-card p strong {
          color: #0A5C36; /* Vert foncé OCP */
          margin-right: 10px;
        }

        .summary-graph {
          flex: 1;
          min-width: 300px;
        }

        .graph-bar {
          margin-bottom: 15px;
        }

        .graph-bar span {
          display: block;
          margin-bottom: 5px;
          font-size: 14px;
          color: #0A5C36;
          font-weight: 500;
        }

        .bar {
          height: 20px;
          background-color: #66BB6A; /* Vert clair OCP */
          border-radius: 5px;
          transition: width 0.5s ease;
        }

        .bar.absence {
          background-color: #D32F2F; /* Rouge pour les absences */
        }

        .bar.delay {
          background-color: #FFCA28; /* Jaune pour les retards */
        }
      `}</style>
    </div>
  );
};

export default Dashboard;