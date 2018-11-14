# MedicalExaminationsManager
Medical Examinations Manager for Software Engineering Project

---

## Storico incontri

*   Iterazione 1: 30/10/'18 - 13/11/'18
    *   Incontro 1: (30/10) 10:40 - 12:00
        *   Identificazione attori
    *   Incontro 2: (31/10) 10:30 - 12:15
        *   Identificazione casi d'uso
        *   Casi d'uso descritti nell'iterazione:
            *   effettuaLogin
            *   prenotaVisita
            *   ottineListaVisita
            *   visualizzaListaPaziente
    *   Incontro 3: (13/11) 10:00 - 13:00
        *   Integrazione classi
        *   Merge del progetto github

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

*NOTA*: Durante il secondo incontro è stato appurato che utilizzare un management della coda basandosi completamente sulla reputazione comporterebbe più disagi ai pazienti e non migliorerebbe perciò il sistema attuale: si ipotizzi, per esempio, che 4 pazienti A, B, C, D siano in coda e un paziente E con reputazione maggiore di B si prenoti. La coda si riorganizzerebbe in AEBCD e questo porterebbe a un posticipo della visita per 3 pazienti a beneficio di uno solo, il che è svantaggioso.
È stato perciò scelto un altro metodo di queuing: la coda delle prenotazioni è gestita in modo FIFO ma, nel momento in cui un paziente annulla la visita prenotata, il suo posto viene preso (dopo la conferma) dal paziente in coda con priorità e reputazione maggiore.
