import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const car_list = ["ALFA ROMEO", "AUDI", "BMW", "CHRYSLER",
"CITROEN", "DAIHATSU", "FIAT", "FORD",
"HONDA", "JAGUAR", "LANCIA", "MAZDA",
"MERCEDES", "MITSUBISHI", "NISSAN", "OPEL",
"PEUGEOT", "PORSCHE", "RENAULT", "ROVER",
"SAAB", "SEAT", "SKODA", "SUBARU",
"SUZUKI", "TOYOTA", "VOLVO", "VW"];

app.post('/', (req, res) => {
    const query = req.body.value || '';
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    const result = car_list.filter(name =>
        name.toLowerCase().startsWith(query.toLowerCase())
    );
    res.json({ cars: result });
});

app.put('/', (req, res) => {
    const name = req.body.name;
    if (name && !car_list.includes(name.toUpperCase())) {
        car_list.push(name.toUpperCase());
        res.json({ message: "Dodano marke" });
    } else {
        res.status(400).json({ message: "Marka juz istnieje lub jest pusta" });
    }
});

app.delete('/', (req, res) => {
    const name = req.body.name;
    const index = car_list.indexOf(name ? name.toUpperCase() : "");
    if (index !== -1) {
        car_list.splice(index, 1);
        res.json({ message: "Usunieto marke" });
    } else {
        res.status(404).json({ message: "Nie znaleziono marki" });
    }
});

app.listen(3000, () => console.log('Serwer na porcie http://localhost:3000'));