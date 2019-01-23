# MedicalExaminationsManager

Medical Examinations Manager for Software Engineering Project

---

## Storico incontri

- Iterazione 1: 30/10/'18 - 13/11/'18
  - Incontro 1: (30/10) 10:40 - 12:00
    - Identificazione attori
  - Incontro 2: (31/10) 10:30 - 12:15
    - Identificazione casi d'uso
    - Casi d'uso descritti nell'iterazione:
      - effettuaLogin
      - prenotaVisita
      - ottineListaVisita
      - visualizzaListaPaziente
  - Incontro 3: (06/11) 09:00 - 12:00
    - identificazione classi
  - Incontro 4: (13/11) 10:00 - 13:00
    - Integrazione classi
    - Diagrammi di sequenza
    - Merge del progetto github
  - Incontro 5: (21/11) 16:00 - 18:00
    - Sistemato errori Diagramma dei casi d'uso
  - Incontro 6: (26/11) 14:30 - 17:00
    - Sistemati errori Sequence diagram
- Iterazione 2: 27/11/'18 - 04/01/'19
  - Incontro 1: (27/11) 15:00 - 17:00
    - Identificazione attori
    - Identificazione casi d'uso
    - Casi d'uso descritti nell'iterazione:
      - risponde a modifica data
      - associa prenotazione annullata
      - comunica assenza
      - carica referto
      - annulla prenotazione
      - carica ricetta
  - Incontro 2: (28/11) 16:45 - 18:00
    - Descrizione dei casi d'uso
      - comunica assenza
      - carica referto
  - Incontro 3: (29/11) 14:30 - 16:40
    - Descrizione dei casi d'uso
      - annulla prenotazione
      - carica ricetta
  - Incontro 4: (4/12) 11:15 - 12:50
    - CD e SD del caso d'uso
      - carica ricetta
  - Incontro 5: (6/12) 16:30 - 18:30
    - CD e SD del caso d'uso
      - annulla prenotazione
    - analisi CD del caso d'uso
      - comunica assenza
    - identificazione nuovo caso d'uso "cerca date"
      - carica ricetta
  - Incontro 6: (11/12) 15:30 - 18:30
    - CD e SD del caso d'uso
      - comunica assenza
  - Incontro 7: (12/12) 10:30 - 12:30
    - CD e SD del caso d'uso
      - carica ricetta
  - Incontro 8: (17/12) 15:45 - 18:15
    - Descrizione dei caso d'uso
      - risponde a modifica data
      - associa prenotazione annullata
  - Incontro 9: (19/12) 10:30 - 13:15
    - CD e SD dei casi d'uso
      - associa prenotazione annullata
      - risponde a modifica data
  - Incontro 10: (19/12) 15:15 - 16:30
    - Divisione in sottogruppi per implementazione prototipi UCs
      - Sottogruppo Celozzi - Cretone
        - carica ricetta
        - comunica assenza
        - carica referto
      - Sottogruppo Boccuto - Giacchè
        - risponde a modifica data
        - annulla prenotazione
        - associa prenotazione annullata
- Iterazione 3: 16/01/'19 - 1/02/'19
  - Incontro 1: (16/01) 16:00 - 18:00
    - Identificazione nuovo attore
      - Tempo
    - Identificazione casi d'uso
      - Visualizza Referto
      - Sposta Notifica
  - Incontro 2: (21/01) 10:30 - 12:45
    - Revisione casi d'uso
      - Ottiene lista visite
      - Filtra Visite
      - Seleziona Ricetta
      - Prenota Visita
      - Visualizza Referto
      - Risponde a modifica data
      - Annulla Prenotazione
      - Contrassegna Visita Effettuata
      - Associa Prenotazione
  - Incontro 3: (23/01) 9:10 - 11:15
    - Revisione casi d'uso
      - Aggiunge Personale
      - Visualizza Lista Visite Paziente
      - Carica Ricetta
      - Risponde A Modifica Data
        - Aggiunti 2 casi d'uso
          - Risponde A Possibilità Anticipo
          - Risponde Ad Assenza Doctor's Office
      - Visualizza Notifiche
      - Effettua Login
        - Aggiunti 3 casi d'uso
          - Seleziona Ruolo
          - Logout
          - Modifica Password
      - Carica Referto
      - Visualizza Lista Prenotazioni

---

## Descrizione Progetto

Il progetto propone di realizzare un sistema software che consenta ai pazienti di effettuare prenotazioni di visite mediche senza recarsi fisicamente allo sportello.

Differentemente dai sistemi attualmente in circolazione, che gestiscono la coda dei pazienti basandosi sulla metodologia FIFO, nel sistema proposto questa verrà gestita in maniera più “smart”: come spiegato successivamente, infatti, il paziente avrà una propria reputazione che influenzerà la rispettiva posizione in coda.

I pazienti potranno scegliere la struttura (clinica od ospedaliera) dove effettuare la visita, a prescindere dalla regione o la provincia in cui questa è situata, ordinando quelle disponibili in base alla distanza, al costo della visita e/o alla prima data disponibile.

La gestione della coda delle prenotazioni avviene in base a un “sistema di punteggio” calcolato per ogni paziente in base alla sua affidabilità (cioè dal numero di visite posticipate e/o rimandate, dal numero di ritardi accumulati, ecc…) e all’urgenza della visita prenotata.

A parità di urgenza, verrà favorito il paziente con il punteggio più elevato.

Il paziente potrà controllare la propria reputazione e posizione in graduatoria per ogni prenotazione effettuata e avrà accesso a una vista delle visite effettuate e prenotate con, eventualmente, il relativo referto in allegato.

Il sistema permetterà alle strutture di comunicare al paziente eventuali modifiche alle visite (es. modifica di orario e/o data) o, nel caso in cui il referto non possa essere redatto immediatamente dopo la visita, la disponibilità di quest’ultimo (cartaceo e digitale).

È degno di nota che, ad oggi, nella maggior parte delle cliniche, se l’esito non può essere consegnato immediatamente, viene fornito all’utente l’indicazione circa la sede, la data, gli orari e le modalità di ritiro e deve essere ritirato dall’utente stesso o da un delegato.

Le strutture potranno inoltre visualizzare un report delle visite effettuate e in programma, filtrandole in base a diversi criteri (come il tipo di visita e/o la residenza dei pazienti).

I medici di base che hanno caricato la ricetta potranno visualizzare in tempo reale lo stato della visita, l’eventuale referto.

Il sistema permette a tutti gli utenti di visualizzare il numero di prenotazioni in coda per ogni tipologia di visita e le strutture nelle vicinanze.

_NOTA_: Durante il secondo incontro è stato appurato che utilizzare un management della coda basandosi completamente sulla reputazione comporterebbe più disagi ai pazienti e non migliorerebbe perciò il sistema attuale: si ipotizzi, per esempio, che 4 pazienti A, B, C, D siano in coda e un paziente E con reputazione maggiore di B si prenoti. La coda si riorganizzerebbe in AEBCD e questo porterebbe a un posticipo della visita per 3 pazienti a beneficio di uno solo, il che è svantaggioso.
È stato perciò scelto un altro metodo di queuing: la coda delle prenotazioni è gestita in modo FIFO ma, nel momento in cui un paziente annulla la visita prenotata, il suo posto viene preso (dopo la conferma) dal paziente in coda con priorità e reputazione maggiore.
