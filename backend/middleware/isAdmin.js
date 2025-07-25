const isAdmin = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role === 'admin') {
            req.user = decoded;
            next();
        } else {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
