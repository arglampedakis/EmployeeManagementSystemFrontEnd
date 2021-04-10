[![CircleCI](https://circleci.com/gh/arglampedakis/EmployeeManagementSystemFrontEnd.svg?style=svg)](https://circleci.com/gh/arglampedakis/EmployeeManagementSystemFrontEnd)

# CiteEmployeeMngmntFrontend

## Περιγραφή

Σκοπός της εργασίας είναι να φτιαχτεί ένα πλήρες web application που να προσφέρει τις
παρακάτω λειτουργικές δυνατότητες:

- Ορισμό κατηγορίας χαρακτηριστικών (attributes).
- Ορισμό Εργαζομένων (employees).
- Ανάθεση Χαρακτηριστικών σε Εργαζομένους.
- Παρουσίαση θέσης εργαζομένων.
- Δρομολόγηση μεταξύ εργαζομένων.
  Για την λειτουργία του Web Application θα απαιτηθεί να κατασκευαστούν:
    - Η βάση δεδομένων σε σύστημα που υποδεικνύεται.
    - Το υπόστρωμα υπηρεσιών (backend business logic / data access etc).
    - Η προγραμματιστική διεπαφή (REST API)
    - Η γραφική διεπαφή χρήστη.

## Η Άσκηση

### Μοντέλο Δεδομένων Εφαρμογής

Το παρακάτω σχήμα δείχνει τις οντότητες και τις αντίστοιχες συσχετίσεις τους:

![alt text](https://github.com/arglampedakis/EmployeeManagementSystem/blob/master/src/main/resources/static/img/sample%20database%20schema.png?raw=true)

Η Βάση δεδομένων θα πρέπει να υλοποιηθεί σε MySQL.

### Λειτουργικότητα Εφαρμογής

Από πλευράς οθονών και διαδικασίας χρήσης της εφαρμογής, θα πρέπει να παρέχονται τα
παρακάτω:

- ‘Ένα κεντρικό view από όπου θα παρέχεται πρόσβαση σε υπο-οθόνες. Οι υπο-
  οθόνες θα είναι οι παρακάτω:
  o Attributes
  o Employees
  o Map

- Η οθόνη Attributes θα παρέχει
  o Λίστα των υπαρχόντων attributes
  o Υπάρχει κουμπί «add» που επιτρέπει τη δημιουργία νέου attribute
  ▪ Πατώντας το κουμπί add, ο χρήστης οδηγείται σε νέα οθόνη όπου
  μπορεί να εισάγει το όνομα του attribute
  o Πατώντας σε υπάρχον attribute ο χρήστης οδηγείται σε view επεξεργασίας
  όπου επιτρέπεται η μετονομασία και η διαγραφή του χαρακτηριστικού
  ▪ Σε περίπτωση διαγραφής, αφαιρείται η σύνδεση του
  χαρακτηριστικού από όλους τους συνδεδεμένους εργαζομένους
- H οθόνη Employees θα παρέχει
  o Λίστα των υπαρχόντων employees
  o Υπάρχει κουμπί «add» που επιτρέπει τη δημιουργία νέου employee.
  ▪ Πατώντας το κουμπί add, ο χρήστης οδηγείται σε νέα οθόνη όπου
  μπορεί να εισάγει τα στοιχεία του εργαζομένου
  o Πατώντας σε υπάρχον employee ο χρήστης οδηγείται σε view επεξεργασίας
  όπου επιτρέπεται η επεξεργασία των στοιχείων του εργαζομένου και η
  διαγραφή του
  o Μέσω της οθόνης δημιουργίας / επεξεργασίας του εργαζομένου τα εξής
  στοιχεία μπορούν να εισαχθούν / επεξεργαστούν
  ▪ Όνομα εργαζομένου
  ▪ Ημερομηνία γέννησης εργαζομένου
  ▪ Αν διαθέτει αυτοκίνητο
  ▪ Η διεύθυνση κατοικίας του
  ▪ Η λίστα των attributes που τον χαρακτηρίζει
    - Τα διαθέσιμα attributes είναι αυτά που έχουν οριστεί μέσω
      της αντίστοιχης οθόνης των attributes
    - Σε αυτό το component ο χρήστης μπορεί να αφαιρέσει
      υπάρχοντα attributes ή να προσθέσει νέα.
    - Κάθε εργαζόμενος μπορεί να έχει μόνο μία σύνδεση με
      κάθε attribute
- Η οθόνη του χάρτη έχει την εξής λειτουργικότητα 
o Αναζήτηση και επιλογή εργαζομένου
▪ Σαν κριτήριο αναζήτησης, ο χρήστης μπορεί να επιλέξει από μία λίστα ένα χαρακτηριστικό που θέλει να έχουν οι εργαζόμενοι από τη λίστα των attributes όπως αυτά δημιουργήθηκαν από την αντίστοιχη οθόνη των attributes
▪ Εμφανίζεται η λίστα των εργαζομένων που ικανοποιούν τα κριτήρια
▪ Ο χρήστης επιλέγει έναν από τους εργαζόμενους που εμφανίζονται
▪ Πατάει το κουμπί «Continue»
▪ Πηγαίνει σε επόμενη οθόνη δρομολόγησης
o Δρομολόγηση εργαζομένου
▪ Στην οθόνη αυτή εμφανίζεται ένα χάρτης της google
▪ Πάνω στον χάρτη εμφανίζονται με pins όλοι οι employees που έχουν οριστεί από την αντίστοιχη οθόνη εργαζομένων βάσει διεύθυνσης κατοικίας
▪ Ο εργαζόμενος που επιλέχθηκε από το προηγούμενο βήμα αναζήτησης και επιλογής εμφανίζεται με διαφορετικό pin
▪ Εμφανίζεται στο χάρτη μια διαδρομή που συνδέει τον επιλεγμένο εργαζόμενο με όλους τους υπόλοιπους εργαζομένους
▪ Ανάλογα με το αν ο επιλεγμένος εργαζόμενος έχει στα στοιχεία του ορισμένο ότι διαθέτει αυτοκίνητο ή όχι, η διαδρομή που εμφανίζεται θα πρέπει να είναι για μετακίνηση μέσω αυτοκινήτου ή οδοιπορικώς
o Σημείωση για το routing και την τοποθέτηση των εργαζομένων στον χάρτη
▪ Ανάλογα με το διαθέσιμο χρόνο ολοκλήρωσης και τη διαθεσιμότητα των αντίστοιχων Google API δίνονται οι παρακάτω επιλογές:
- Στα στοιχεία του εργαζομένου, αντί για διεύθυνση, μπορεί να γίνει εισαγωγή συντεταγμένων της κατοικίας του εργαζομένου
- Στη δρομολόγηση, αντί για routing βάσει διαδρομής και είδους μετακίνησης, μπορεί να γίνει σχεδίαση διαδοχικών γραμμών σύνδεσης ασχέτως διαδρομής / δρόμων / είδους     μετακίνησης. Τα edges θα συνδέουν απλά τις θέσεις των εργαζομένων
