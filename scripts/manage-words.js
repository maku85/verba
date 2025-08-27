#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const wordsPath = path.join(__dirname, '../src/data/words.json');

// Funzione per validare una parola
function validateWord(word, index) {
  const errors = [];
  
  if (!word.word || typeof word.word !== 'string') {
    errors.push(`Parola ${index}: campo 'word' mancante o non valido`);
  }
  
  if (!word.definition || typeof word.definition !== 'string') {
    errors.push(`Parola ${index}: campo 'definition' mancante o non valido`);
  }
  
  if (!word.example || typeof word.example !== 'string') {
    errors.push(`Parola ${index}: campo 'example' mancante o non valido`);
  }
  
  if (!word.category || !['Verbo', 'Sostantivo', 'Aggettivo'].includes(word.category)) {
    errors.push(`Parola ${index}: campo 'category' deve essere 'Verbo', 'Sostantivo' o 'Aggettivo'`);
  }
  
  if (!word.difficulty || ![1, 2, 3].includes(word.difficulty)) {
    errors.push(`Parola ${index}: campo 'difficulty' deve essere 1, 2 o 3`);
  }
  
  if (!word.points || ![10, 15, 20].includes(word.points)) {
    errors.push(`Parola ${index}: campo 'points' deve essere 10, 15 o 20`);
  }
  
  // Verifica che i punti corrispondano alla difficoltà
  const expectedPoints = word.difficulty === 1 ? 10 : word.difficulty === 2 ? 15 : 20;
  if (word.points !== expectedPoints) {
    errors.push(`Parola ${index}: i punti (${word.points}) non corrispondono alla difficoltà (${word.difficulty}). Dovrebbero essere ${expectedPoints}`);
  }
  
  return errors;
}

// Funzione per validare tutto il file
function validateWordsFile() {
  try {
    const wordsData = fs.readFileSync(wordsPath, 'utf8');
    const words = JSON.parse(wordsData);
    
    if (!Array.isArray(words)) {
      console.error('❌ Il file deve contenere un array di parole');
      return false;
    }
    
    console.log(`📚 Validazione di ${words.length} parole...`);
    
    let hasErrors = false;
    const allErrors = [];
    
    words.forEach((word, index) => {
      const errors = validateWord(word, index + 1);
      if (errors.length > 0) {
        hasErrors = true;
        allErrors.push(...errors);
      }
    });
    
    if (hasErrors) {
      console.error('❌ Errori di validazione trovati:');
      allErrors.forEach(error => console.error(`  - ${error}`));
      return false;
    }
    
    // Statistiche
    const categories = {};
    const difficulties = {};
    
    words.forEach(word => {
      categories[word.category] = (categories[word.category] || 0) + 1;
      difficulties[word.difficulty] = (difficulties[word.difficulty] || 0) + 1;
    });
    
    console.log('✅ Tutte le parole sono valide!');
    console.log('\n📊 Statistiche:');
    console.log('  Categorie:');
    Object.entries(categories).forEach(([cat, count]) => {
      console.log(`    ${cat}: ${count} parole`);
    });
    console.log('  Difficoltà:');
    Object.entries(difficulties).forEach(([diff, count]) => {
      const level = diff === '1' ? 'Facile' : diff === '2' ? 'Medio' : 'Difficile';
      console.log(`    ${level} (${diff}): ${count} parole`);
    });
    
    return true;
  } catch (error) {
    console.error('❌ Errore nella lettura del file:', error.message);
    return false;
  }
}

// Funzione per aggiungere una nuova parola
function addWord(wordData) {
  try {
    const wordsData = fs.readFileSync(wordsPath, 'utf8');
    const words = JSON.parse(wordsData);
    
    // Valida la nuova parola
    const errors = validateWord(wordData, words.length + 1);
    if (errors.length > 0) {
      console.error('❌ Errore di validazione per la nuova parola:');
      errors.forEach(error => console.error(`  - ${error}`));
      return false;
    }
    
    // Aggiungi la parola
    words.push(wordData);
    
    // Salva il file
    fs.writeFileSync(wordsPath, JSON.stringify(words, null, 2));
    
    console.log('✅ Nuova parola aggiunta con successo!');
    return true;
  } catch (error) {
    console.error('❌ Errore nell\'aggiunta della parola:', error.message);
    return false;
  }
}

// Funzione per mostrare l'aiuto
function showHelp() {
  console.log(`
📚 Gestore Parole - Verba

Uso: node scripts/manage-words.js [comando]

Comandi disponibili:
  validate    - Valida tutte le parole nel file JSON
  help        - Mostra questo messaggio di aiuto

Esempi:
  node scripts/manage-words.js validate
  node scripts/manage-words.js help
`);
}

// Main
const command = process.argv[2] || 'help';

switch (command) {
  case 'validate':
    validateWordsFile();
    break;
  case 'help':
  default:
    showHelp();
    break;
} 