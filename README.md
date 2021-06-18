# nodejs-challenge
## Code Name RED

Herzlichen Glückwunsch, Du erhältst heute unsere Coding Challenge! Weiter unten findest Du die Aufgaben-Stellung.
Alles, was Du (neben NodeJS) brauchst, findest du in diesem Paket.

### Kriterien
1. Es werden nur Lösungen gewertet die mit NodeJS/TypeScript programmiert wurden. 
2. Externe npm module sind nur zur Entwicklung (= devDependencies) gestattet.
3. Zeitansatz ~ 1 Stunde
4. Abgabe der Lösung erfolgt als Repository (github oder bitbucket). Du kannst einfach ein Repository anlegen, deine Lösung pushen und
 uns den Link zukommen lassen. Bitte achte darauf, dass das Repository alle zur Ausführung benötigten Dateien und Anweisungen enthält.

### Aufgabe

Gegeben ist eine geheime Datei (-> `secret.enc`), deren Inhalt uns brennend interessiert.
1. Entschlüssele die Datei mit dem Schlüssel `secret.key`. Der Verschlüsselungs-Algorithmus ist AES256-GCM. Alle Dateien, die du hierfür 
   benötigst, findest du im Paket. 
    - Die entschlüsselte Datei ist ein ZIP-Archiv, das noch entpackt werden muss.
    - Die nativen Node-Module sind vollkommen ausreichend, um die Aufgabe zu lösen. Du musst keine weiteren Module installieren.
    - Achte darauf, den Schlüssel als String der Länge 32 zu verwenden.
    

2. Die CLI-Anwendung sollte zwei Parameter verarbeiten können und das x-te Wort im y-ten Satz der entschlüsselten und entpackten Datei 
   zurück geben. 
   Beispiel:
   ```
   Text: "Heute ist ein schöner Tag im Sommer. Am See spielen die Kinder im Wasser, während die Eltern auf der Wiese sitzen und zusehen. 
   Auf dem Weg läuft ein Hund vorbei, der gerade seinem Ball hinterher jagt."
   Parameter: x = 2, y = 7
   Ergebnis: "Wasser" 
   ```
   Die Namen der Parameter können natürlich frei gewählt werden, x & y dienen hier nur der Veranschaulichung.
