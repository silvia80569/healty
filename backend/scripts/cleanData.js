const fs = require('fs');
const mongoose = require('mongoose');

const data = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'));

const cleanedData = data.map(item => {
  if (item._id) {
    // Transformă _id într-un ObjectId valid dacă este necesar
    item._id = mongoose.Types.ObjectId(item._id.$oid);
  }
  // Poți adăuga și alte transformări aici, dacă ai nevoie
  return item;
});

// Scrie fișierul curățat într-un nou fișier
fs.writeFileSync('./data/cleaned_products.json', JSON.stringify(cleanedData, null, 2));
console.log('✅ Fișierul a fost curățat de câmpul _id!');
