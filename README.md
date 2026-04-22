# Waiter App - Restaurant Order Frontend

Applicazione web moderna per la gestione delle ordinazioni al ristorante. Frontend React production-ready deployato su Vercel, progettato specificamente per l'uso da parte dei camerieri su tablet/dispositivi mobili.

## 🎯 Panoramica

Applicazione intuitiva e reattiva che consente ai camerieri di:
- Selezionare rapidamente un tavolo
- Creare nuovi tavoli direttamente dall'app
- Aggiungere piatti agli ordini con quantità e prezzo
- Visualizzare il totale in tempo reale
- Chiudere gli ordini con conferma

Interfaccia ottimizzata per **tablet e dispositivi touch**, tema scuro per ambienti ristorante.

## 🛠️ Tecnologie

- **React 18.2** - UI library
- **React Router 6** - Navigazione SPA
- **Axios** - HTTP client
- **Tailwind CSS 3** - Utility-first styling
- **Vercel** - Deployment hosting
- **Node.js** - Runtime environment

## 📁 Struttura del Progetto

```
restaurant-order-frontend/
├── public/
│   └── index.html                          # HTML base
├── src/
│   ├── components/
│   │   ├── TableSelector.jsx               # Selezione/creazione tavoli
│   │   ├── ItemForm.jsx                    # Form aggiunta piatto
│   │   ├── ItemList.jsx                    # Lista piatti ordinati
│   │   └── SuccessScreen.jsx               # Schermata conferma
│   ├── pages/
│   │   ├── Home.jsx                        # Landing page
│   │   └── OrderPage.jsx                   # Flusso principale ordine
│   ├── services/
│   │   └── api.js                          # Axios client REST
│   ├── App.jsx                             # Router principale
│   ├── index.js                            # Entry point React
│   └── index.css                           # Tailwind imports
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── .env.example
├── .env.local                              # (non committare)
├── .gitignore
└── README.md
```

## 🚀 Avvio Locale

### Prerequisiti
- Node.js 14+
- npm 6+

### Passaggi

```bash
# Clone repository
git clone https://github.com/lmarino773/restaurant-order-frontend.git
cd restaurant-order-frontend

# Install dependencies
npm install

# Crea file .env.local
echo "REACT_APP_API_URL=http://localhost:8080" > .env.local

# Avvia dev server
npm start
```

L'app sarà disponibile su `http://localhost:3000`

## 🎨 Flusso dell'Applicazione

### 1. Home Page
- Landing page con branding ristorante
- Bottone grande "Nuova Ordinazione"
- Accesso al flusso principale

### 2. Selezione Tavolo
- Griglia di tavoli disponibili
- Ogni tavolo mostra numero e numero di posti
- Bottone "+ Aggiungi Tavolo" per crearne di nuovi
- Form inline per numero tavolo e posti
- Automatica creazione dell'ordine al click

### 3. Pagina Ordine
- **Header sticky:** Mostra numero tavolo e totale aggiornato in tempo reale
- **Form aggiunta piatto:**
  - Nome piatto (input text)
  - Quantità (stepper con +/-)
  - Prezzo unitario (input number con € symbol)
- **Lista piatti:**
  - Nome articolo
  - Quantità × prezzo unitario = subtotale
  - Subtotale evidenziato in colore ambra
- **Footer sticky:** 
  - Totale complessivo grande e leggibile
  - Bottone "Chiudi Ordine" verde (disabilitato se nessun piatto)

### 4. Schermata Successo
- Checkmark animato
- Numero ordine e tavolo
- Totale finale
- Bottone "Nuova Ordinazione" per ricominciare

## 🔌 Integrazione API

### Servizio API (`services/api.js`)

```javascript
// Configurazione automatica da variabile d'ambiente
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/json' }
});
```

### Endpoints utilizzati

```javascript
getTables()                  // GET /tables
createTable(number, seats)   // POST /tables
createOrder(tableId)         // POST /orders
addItem(orderId, item)       // POST /orders/{orderId}/items
closeOrder(orderId)          // PUT /orders/{orderId}/close
```

## 🎨 Design & UX

### Tema
- **Sfondo:** Slate-950 (nero-blu molto scuro)
- **Colore primario:** Amber-500 (arancione caldo, ristorante)
- **Colore secondario:** Green-500 (conferma/azione positiva)
- **Testo:** White e slate-gray per contrasto

### Responsive Design
- **Mobile-first** approach con Tailwind CSS
- Layout ottimizzato per **tablet verticale** (uso camerieri)
- Touch targets grandi (minimo 44px)
- Font leggibile in ambienti semi-bui

### Animazioni
- Transizioni smooth (150-200ms)
- Active states su bottoni
- Loading spinners per async operations
- Nessuna animazione distrattiva

## 📦 Deploy su Vercel

### Configurazione Vercel

1. Crea account su [vercel.com](https://vercel.com)
2. Connetti il repository GitHub
3. Vercel auto-rileva React → configurazione automatica
4. Aggiunge variabili d'ambiente in Settings

### Impostare Variabili d'Ambiente su Vercel

1. **Dashboard Vercel** → progetto `restaurant-order-frontend`
2. **Settings** → **Environment Variables**
3. Aggiungi:
   - **Name:** `REACT_APP_API_URL`
   - **Value:** `https://restaurantorderapirepo.onrender.com`
4. **Salva e redeploy**

### URL di Produzione

```
https://restaurant-order-frontend.vercel.app
```

**Auto-deploy:** Ogni push a `main` su GitHub triggera build e deploy automatico su Vercel.

## 🔗 Repository Git

**GitHub:** https://github.com/lmarino773/restaurant-order-frontend

```bash
# Clone
git clone https://github.com/lmarino773/restaurant-order-frontend.git

# Feature branch
git checkout -b feature/nome-feature

# Commit e push (auto-deploy su Vercel)
git add .
git commit -m "Descrizione modifiche"
git push origin feature/nome-feature
```

## 📋 Componenti Dettaglio

### TableSelector
- Carica lista tavoli via `getTables()`
- Mostra griglia responsive
- Form inline per creazione tavoli
- Callback al click per selezionare tavolo

### ItemForm
- Stepper quantità con bottoni +/-
- Input decimale per prezzo con symbol €
- Validazione campi required
- Reset form dopo aggiunta

### ItemList
- Visualizzazione real-time degli articoli
- Calcolo automatico subtotale
- Contatore piatti
- Design list con separatori

### OrderPage (container)
- Gestione stato ordine
- Orchestrazione delle API calls
- Error handling e loading states
- Gestione transizioni tra step

## 🧪 Testing

### Test Manuale
1. **Crea tavolo:** Numero 1, 4 posti
2. **Aggiungi piatti:** Es. "Carbonara" x2 @ €12.50
3. **Verifica totale:** 2 × 12.50 = 25.00 €
4. **Chiudi ordine:** Controlla conferma
5. **Nuova ordinazione:** Torna a Home

### Test Browser DevTools
- **Network tab:** Verifica richieste API
- **Console:** Controlla assenza di errori
- **Application → Storage:** Vedi che .env è caricato

## 🌐 CORS & Backend Integration

L'app comunica con backend REST su dominio diverso. Il backend deve avere CORS abilitato:

```java
@CrossOrigin(origins = "*", allowedMethods = {"GET", "POST", "PUT", "DELETE"})
```

L'app usa Axios che gestisce automaticamente CORS preflight requests.

## 📝 Variabili d'Ambiente

### Sviluppo Locale
Crea `.env.local`:
```
REACT_APP_API_URL=http://localhost:8080
```

### Produzione (Vercel)
Impostare in Vercel Dashboard → Environment Variables:
```
REACT_APP_API_URL=https://restaurantorderapirepo.onrender.com
```

**Nota:** Le variabili con prefisso `REACT_APP_` sono iniettate al build time.

## 🚨 Troubleshooting

| Problema | Soluzione |
|---|---|
| "Impossibile caricare i tavoli" | Controlla che backend sia online e CORS abilitato |
| Errore CORS nel browser | Verifica REACT_APP_API_URL e @CrossOrigin nel backend |
| .env.local non caricato su Vercel | Le env vanno impostate in Vercel Dashboard, non nel file |
| Totale non aggiornato | Assicurati che ogni item ha `subtotal` calcolato |

## 📊 Stack Tecnico

| Componente | Versione | Ruolo |
|---|---|---|
| React | 18.2 | UI library |
| React Router | 6.22 | Navigazione |
| Axios | 1.6 | HTTP client |
| Tailwind CSS | 3.4 | Styling |
| Vercel | - | Deployment |

## 🎯 Funzionalità Future (Roadmap)

- [ ] Autenticazione camerieri
- [ ] Cronologia ordini
- [ ] Gestione menu da database
- [ ] Stampa scontrino
- [ ] Offline-first con service workers
- [ ] Gestione tavoli multiple contemporaneamente
- [ ] Statistiche ordini/incassi

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS 12+)
- Chrome Mobile (Android)

## 👥 Autore

Sviluppato come progetto portfolio per dimostrare competenze in:
- React hooks e state management
- Responsive design
- REST API integration
- Tailwind CSS
- Deployment su Vercel

---

**Ultimo aggiornamento:** Aprile 2026  
**Versione App:** 1.0.0  
**Linked Backend:** https://github.com/lmarino773/restaurant-order-api
