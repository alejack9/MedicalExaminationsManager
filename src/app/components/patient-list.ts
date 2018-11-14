import { Patient } from 'src/app/classes/patient';
import { User } from '../classes/user';
import { Examination } from '../classes/examination';

export const PATIENTS: Patient[] = [
  new Patient(1, '', new User('Alessandro', 'Giacche', new Date()),
    [ new Examination('Chirurgia', 'ospedale', new Date(2018, 10, 13), 1, false) ]),
  new Patient(2, '', new User('Manuel', 'Cretone', new Date()),
    [ new Examination('Dentista', 'ospedale', new Date(2018, 10, 19), 1, false) ]),
  new Patient(3, '', new User('Michele', 'Celozzi', new Date()),
    [ new Examination('Ortopedia', 'ospedale', new Date(2018, 10, 13), 1, false) ]),
  new Patient(4, '', new User('Alessandra', 'Boccuto', new Date()),
    [ new Examination('Oculista', 'ospedale', new Date(2018, 10, 22), 1, false) ])
];
