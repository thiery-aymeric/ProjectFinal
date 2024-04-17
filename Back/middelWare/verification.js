import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization'); // Récupérer le JWT de l'en-tête

    //si le token n'est pas présente, on renvoi un message d'erreur
    if (!token) {
      return res.status(401).json({  msg: 'Token manquant. Authentification requise.' });
    }

    //sinon, on vérifie le token
    try {
      const decoded = jwt.verify(token, process.env.SECRET_JWT); // Vérifier et décoder le JWT
      req.datas = decoded; 
      next(); 
    } catch (error) {
      return res.status(403).json({ response:false, msg: 'Token invalide. Authentification requise.' });
    }
  };