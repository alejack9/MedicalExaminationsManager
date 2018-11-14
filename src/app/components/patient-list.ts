import { Patient } from 'src/app/classes/patient';
import { User } from '../classes/user';
import { Visit } from '../classes/visit';

export const PATIENTS: Patient[] = [
  new Patient(1, '', new User('Alessandro', 'Giacche', new Date()),
    [ new Visit('Chirurgia', 'ospedale', new Date(2018, 10, 13), 1, false) ]),
  new Patient(2, '', new User('Manuel', 'Cretone', new Date()),
    [ new Visit('Dentista', 'ospedale', new Date(2018, 10, 19), 1, false) ]),
  new Patient(3, '', new User('Michele', 'Celozzi', new Date()),
    [ new Visit('Ortopedia', 'ospedale', new Date(2018, 10, 13), 1, false) ]),
  new Patient(4, '', new User('Alessandra', 'Boccuto', new Date()),
    [ new Visit('Oculista', 'ospedale', new Date(2018, 10, 22), 1, false) ])
];
