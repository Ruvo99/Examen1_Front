const fetch = require('node-fetch');
const router = require('express').Router();
const path = require('path');


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '../../html/service.html'));
});

router.post('/', (req, res) => {
    
    fetch('https://examen1cloud.us-south.cf.appdomain.cloud/service', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ textToAnalyze: req.body.textToAnalyze })
    }).then((resp) => resp.json()).then(resp => res.send((resp)?`<h1>Analysis</h1>
        <p>Score: ${resp.score}</p>
        <p>Tone ID: ${resp.tone_id}</p>
        <p>Tone name: ${resp.tone_name}</p>`:`<h1>No se pudo encontrar el tono</h1>`)).catch(console.log)
});

module.exports = router;