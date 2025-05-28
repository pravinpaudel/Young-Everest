
// Middleware to ensure that the request body is present
async function requireBody(req, res, next) {
    if (!req.body || Object.keys(req.body).length === 0) {
        console.error('Request body is missing or empty');
        return res.status(400).json({ error: 'Request body is required' });
    }
    else if(!req.body.url) {
        console.error('Request body must contain a URL');
        return res.status(400).json({ error: 'Request body must contain a URL' });
    }
    next();
}

module.exports = requireBody;