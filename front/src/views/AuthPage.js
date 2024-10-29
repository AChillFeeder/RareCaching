import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState(''); // Ajout de l'état pour le surnom
  const navigate = useNavigate();

  const handleSwitchMode = () => {
    setIsLogin((prevMode) => !prevMode);
    resetFields();
  };

  const resetFields = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setNickname(''); // Réinitialisation du surnom
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    const userData = {
      email: email,
      password: password,
       ...(isLogin ? {} : { username: nickname }), // Inclure le surnom uniquement si on est en mode inscription
    };

    const url = isLogin ? 'login' : 'users';

    console.log("Données envoyées : ", JSON.stringify(userData, null, 2));

    try {
      const response = await fetch(`http://localhost:5000/${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate('/Dashboard');
      
    } else {
        console.error('Erreur lors de la connection');
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
    }



    if (isLogin) {
      console.log('Connexion:', userData);
      // Appel à une API pour se connecter
    } else {
      console.log('Inscription:', userData);
      // Appel à une API pour s'inscrire
    }
  };

  useEffect(() => {
    const headers = document.getElementsByClassName("header");
    for (let i = 0; i < headers.length; i++) {
      headers[i].style.display = 'none';
    }
  }, []);
  

  return (
    <div className='auth-page-container'>

    
    <div className="auth-page">
      <h1>{isLogin ? 'Connexion' : 'Inscription'}</h1>
      <form onSubmit={handleSubmit}>
      {!isLogin && (
          <div className="form-group">
            <input
              type="text"
              placeholder="Pseudo"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </div>
        )}
        <div className="form-group">
          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {!isLogin && (
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}
        <button className="AuthPageButton" type="submit">
          {isLogin ? 'Se connecter' : 'S’inscrire'}
        </button>
      <hr />
      <p>
        {isLogin ? 'Vous n\'est pas encore inscrit ?' : 'Vous avez déjà un compte ?'}
      </p>
      <button className="AuthPageButton" type="submit" onClick={handleSwitchMode}>
        {isLogin ? 'S’inscrire' : 'Se connecter'}
      </button>

      </form>
    </div>
    </div>
  );
};

export default AuthPage;
