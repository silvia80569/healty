const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');
const Nutrition = require('../models/nutritionModel');

dotenv.config();

// Verifică dacă variabila DB_URI este citită corect
console.log('DB_URI:', process.env.DB_URI);

const JSON_FILE_PATH = path.join(__dirname, '..', 'data', 'products.json');

try {
  const rawData = fs.readFileSync(JSON_FILE_PATH, 'utf-8');
  console.log(rawData);
  let data = JSON.parse(rawData);
  console.log(data);
} catch (error) {
  console.error('❌ Error reading or parsing the JSON file:', error);
}


mongoose.connect(process.env.DB_URI,)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ Connection error:', err));

const importProducts = async () => {
  try {
    let data = JSON.parse(fs.readFileSync(JSON_FILE_PATH, 'utf-8'));

    const missingCalories = data.filter(item => item.calories === undefined);
    console.log(`🔍 Produse fără calorii: ${missingCalories.length}`);

    if (missingCalories.length > 0) {
      console.log(missingCalories);
    }

    // ✅ Conversie și adaptare la MongoDB
    data = data.map(item => ({
      title: item.title,
      categories: item.categories,
      weight: item.weight || 0,
      calories: item.calories ?? 0,
      groupBloodNotAllowed: item.groupBloodNotAllowed.map(g => g === null ? false : g) // Înlocuiește null cu false
    }));

    // ✅ Șterge datele vechi (opțional)
    await Nutrition.deleteMany();
    console.log('✅ Deleted old data');

    // ✅ Importă noile date în bucăți de 500 pentru a evita suprasolicitarea
    const chunkSize = 500;
    for (let i = 0; i < data.length; i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize);
      await Nutrition.insertMany(chunk);
      console.log(`✅ Imported ${i + chunk.length} products`);
    }

    console.log('✅ Products imported successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error importing products:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Execută importul
importProducts();
