import React, { useState, useEffect } from 'react';

const Profil = ({ agent }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    matricule: '',
    email: '',
    telephone: '',
    fonction: '',
    departement: '',
    dateNaissance: '',
    dateEmbauche: '',
    adresse: '',
  });
  const [originalData, setOriginalData] = useState(formData);
  const [updateMessage, setUpdateMessage] = useState('');
  const [errors, setErrors] = useState({});

  // Récupérer les données de l'agent depuis la table agents
  useEffect(() => {
    const fetchAgentData = async () => {
      // Vérifier si agent et agent.id existent
      if (!agent || !agent.id) {
        setUpdateMessage('❌ Agent ou ID de l\'agent non défini');
        return;
      }

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setUpdateMessage('❌ Aucun token d\'authentification trouvé');
          return;
        }

        const response = await fetch(`http://localhost:3000/api/agents/${agent.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Erreur lors de la récupération des données');
        }
        const data = await response.json();
        const agentData = {
          nom: data.nom || '',
          prenom: data.prenom || '',
          matricule: data.matricule || '',
          email: data.email || '',
          telephone: data.telephone || '',
          fonction: data.poste || '',
          departement: data.departement || '',
          dateNaissance: data.dateNaissance || '',
          dateEmbauche: data.dateEmbauche || '',
          adresse: data.adresse || '',
        };
        setFormData(agentData);
        setOriginalData(agentData);
      } catch (error) {
        setUpdateMessage(`❌ ${error.message}`);
        console.error(error);
      }
    };
    fetchAgentData();
  }, [agent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Réinitialiser l'erreur pour ce champ
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      newErrors.email = 'Veuillez entrer un email valide';
    }
    if (!formData.telephone.match(/^\+212\s\d{1}\s\d{2}\s\d{2}\s\d{2}\s\d{2}$/)) {
      newErrors.telephone = 'Format attendu : +212 6 12 34 56 78';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = () => {
    setIsEditing(true);
    setOriginalData(formData); // Sauvegarder les données originales pour annuler
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(originalData); // Réinitialiser les données
    setErrors({});
    setUpdateMessage('');
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setUpdateMessage('❌ Aucun token d\'authentification trouvé');
        return;
      }

      const response = await fetch(`http://localhost:3000/api/agents/${agent.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la mise à jour');
      }
      setIsEditing(false);
      setUpdateMessage('✅ Profil mis à jour avec succès');
      setErrors({});
    } catch (error) {
      setUpdateMessage(`❌ ${error.message}`);
      console.error(error);
    }
  };

  // Si agent n'est pas défini, afficher un message d'attente
  if (!agent) {
    return <div className="profil-page">Chargement des données de l'agent...</div>;
  }

  return (
    <div className="profil-page">
      <div className="main-content">
        {/* En-tête : Informations rapides */}
        <div className="header-card">
          <div className="header-info">
            <h1>{formData.prenom} {formData.nom}</h1>
            <p>{formData.fonction}</p>
            <p>{formData.departement}</p>
          </div>
        </div>

        {/* Formulaire d'informations personnelles */}
        <div className="info-card">
          <h2>📋 Informations personnelles</h2>
          {updateMessage && <div className="update-message">{updateMessage}</div>}
          <div className="form-container">
            <div className="form-group">
              <label>👤 Prénom</label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>👤 Nom</label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>🆔 Matricule</label>
              <input
                type="text"
                name="matricule"
                value={formData.matricule}
                disabled
              />
            </div>
            <div className="form-group">
              <label>📧 Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label>📞 Numéro de téléphone</label>
              <input
                type="text"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                disabled={!isEditing}
              />
              {errors.telephone && <span className="error">{errors.telephone}</span>}
            </div>
            <div className="form-group">
              <label>💼 Fonction</label>
              <input
                type="text"
                name="fonction"
                value={formData.fonction}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>🏢 Département</label>
              <input
                type="text"
                name="departement"
                value={formData.departement}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>🎂 Date de naissance</label>
              <input
                type="date"
                name="dateNaissance"
                value={formData.dateNaissance}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>📅 Date d'embauche</label>
              <input
                type="date"
                name="dateEmbauche"
                value={formData.dateEmbauche}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>🏠 Adresse</label>
              <input
                type="text"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Boutons principaux */}
          <div className="button-group">
            {!isEditing ? (
              <button className="edit-button" onClick={handleEdit}>
                🖉 Modifier
              </button>
            ) : (
              <>
                <button className="save-button" onClick={handleSave}>
                  💾 Sauvegarder
                </button>
                <button className="cancel-button" onClick={handleCancel}>
                  ❌ Annuler
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .profil-page {
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

        /* En-tête */
        .header-card {
          background-color: #ffffff;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 40px;
        }

        .header-info h1 {
          color: #0A5C36; /* Vert foncé OCP */
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 10px 0;
        }

        .header-info p {
          color: #333;
          font-size: 16px;
          margin: 5px 0;
        }

        /* Formulaire d'informations */
        .info-card {
          background-color: #ffffff;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .info-card h2 {
          color: #0A5C36; /* Vert foncé OCP */
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
        }

        .info-card h2::before {
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
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-size: 14px;
          font-weight: 500;
          color: #0A5C36; /* Vert foncé OCP */
          margin-bottom: 8px;
          display: flex;
          align-items: center;
        }

        .form-group label::before {
          margin-right: 8px;
        }

        .form-group input {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 16px;
          transition: border-color 0.3s ease;
          background-color: #f5f5f5; /* Gris clair par défaut */
        }

        .form-group input:disabled {
          background-color: #e0e0e0; /* Gris plus foncé pour désactivé */
          color: #666;
        }

        .form-group input:not(:disabled) {
          background-color: #e3f2fd; /* Bleu clair pour l'édition */
          border-color: #42a5f5; /* Bleu clair pour l'édition */
        }

        .form-group input:focus {
          outline: none;
          border-color: #0A5C36; /* Vert foncé OCP */
        }

        .form-group .error {
          color: #D32F2F; /* Rouge pour les erreurs */
          font-size: 12px;
          margin-top: 5px;
        }

        /* Boutons */
        .button-group {
          display: flex;
          gap: 15px;
          justify-content: center;
          margin-top: 30px;
        }

        .edit-button, .save-button, .cancel-button {
          display: flex;
          align-items: center;
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s;
        }

        .edit-button {
          background-color: #42a5f5; /* Bleu clair pour Modifier */
          color: #ffffff;
        }

        .edit-button:hover {
          background-color: #1e88e5;
          transform: translateY(-2px);
        }

        .save-button {
          background-color: #66BB6A; /* Vert clair OCP pour Sauvegarder */
          color: #ffffff;
        }

        .save-button:hover {
          background-color: #0A5C36; /* Vert foncé OCP */
          transform: translateY(-2px);
        }

        .cancel-button {
          background-color: #e0e0e0; /* Gris pour Annuler */
          color: #333;
        }

        .cancel-button:hover {
          background-color: #bdbdbd;
          transform: translateY(-2px);
        }

        .edit-button::before,
        .save-button::before,
        .cancel-button::before {
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
};

export default Profil;