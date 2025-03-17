rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /trades/{tradeId} {
      allow read, write: if request.auth != null;
    }
    
    match /admin/{document} {
      allow read, write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}