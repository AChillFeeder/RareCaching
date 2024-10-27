import React, { useState } from 'react';
import '../css/AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState(''); // Ajout de l'état pour le surnom

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    const userData = {
      email,
      password,
      ...(isLogin ? {} : { nickname }), // Inclure le surnom uniquement si on est en mode inscription
    };

    if (isLogin) {
      console.log('Connexion:', userData);
      // Appel à une API pour se connecter
    } else {
      console.log('Inscription:', userData);
      // Appel à une API pour s'inscrire
    }
  };

  return (
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
      </form>
      <hr />
      <p>
        {isLogin ? 'Vous n\'est pas encore inscrit ?' : 'Vous avez déjà un compte ?'}
      </p>
      <button className="AuthPageButton" type="submit" onClick={handleSwitchMode}>
        {isLogin ? 'S’inscrire' : 'Se connecter'}
      </button>

    </div>
  );
};

export default AuthPage;
