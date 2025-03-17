// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "ipl-stockx.firebaseapp.com",
    projectId: "ipl-stockx",
    storageBucket: "ipl-stockx.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// DOM Elements
const authSection = document.getElementById('auth-section');
const dashboard = document.getElementById('dashboard');
const adminDashboard = document.getElementById('admin-dashboard');

// State
let currentUser = null;

// Auth Providers
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Auth Event Listeners
document.getElementById('google-login').addEventListener('click', () => {
    auth.signInWithPopup(googleProvider);
});

// Auth State Listener
auth.onAuthStateChanged(user => {
    if(user) {
        currentUser = user;
        checkAdminStatus(user.uid);
        authSection.classList.add('hidden');
        dashboard.classList.remove('hidden');
        loadUserData(user.uid);
    } else {
        authSection.classList.remove('hidden');
        dashboard.classList.add('hidden');
        adminDashboard.classList.add('hidden');
    }
});

// Trading Functions
function buyStock(playerId, quantity) {
    db.collection('trades').add({
        userId: currentUser.uid,
        playerId,
        action: 'buy',
        quantity,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
}

function sellStock(playerId, quantity) {
    db.collection('trades').add({
        userId: currentUser.uid,
        playerId,
        action: 'sell',
        quantity,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
}

// Payment Handling
document.getElementById('withdraw-btn').addEventListener('click', async () => {
    const amount = document.getElementById('withdraw-amount').value;
    if(amount > 0) {
        try {
            const response = await fetch('/api/withdraw', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await currentUser.getIdToken()}`
                },
                body: JSON.stringify({
                    amount,
                    upiId: 'dkdeepkong55@axl'
                })
            });
            
            if(response.ok) {
                alert('Withdrawal initiated successfully!');
            }
        } catch(error) {
            console.error('Withdrawal error:', error);
        }
    }
});

// Admin Functions
async function checkAdminStatus(uid) {
    const userDoc = await db.collection('users').doc(uid).get();
    if(userDoc.exists && userDoc.data().isAdmin) {
        dashboard.classList.add('hidden');
        adminDashboard.classList.remove('hidden');
        loadAdminData();
    }
}

// UI Updates
function updateMatchData(matches) {
    const container = document.querySelector('.match-cards');
    container.innerHTML = matches.map(match => `
        <div class="player-card">
            <h3>${match.team1} vs ${match.team2}</h3>
            <p>Status: ${match.status}</p>
            <p>Start Time: ${new Date(match.timestamp).toLocaleTimeString()}</p>
        </div>
    `).join('');
}

// Initial Load
function init() {
    // Load real-time match data
    db.collection('matches').onSnapshot(snapshot => {
        const matches = snapshot.docs.map(doc => doc.data());
        updateMatchData(matches);
    });
}

// Initialize App
window.addEventListener('load', init);