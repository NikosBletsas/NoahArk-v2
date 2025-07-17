/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface NEmergencyCase {
  patientId?: string | null;
  gender?: string | null;
  name?: string | null;
  surname?: string | null;
  otherIdentifier?: string | null;
  fathersName?: string | null;
  erAge?: string | null;
  erProselefsi?: string | null;
  erOros?: string | null;
  erAllo?: string | null;
  histSymptom?: string | null;
  histSmoker?: string | null;
  histAlergic?: string | null;
  histLoimodi?: string | null;
  trauma?: string | null;
  vitalTime?: string | null;
  vitalPulses?: string | null;
  vitalAP?: string | null;
  vitalInhale?: string | null;
  vitalSpo2?: string | null;
  vitalT?: string | null;
  derma?: string | null;
  erComments?: string | null;
  genikiSimeiologia?: string | null;
  genOther?: string | null;
  xeirourgikiSimeiologia?: string | null;
  neurologikiSimeiologia?: string | null;
  neuroParesi?: string | null;
  neuroHmipligia?: string | null;
  neuroSergApoleiaSineidisis?: string | null;
  neuroSergAnoiktoiOfthalmoi?: string | null;
  neuroSergKalyteriProforikiApantisi?: string | null;
  neuroSergKalyteriKinitikiApantisi?: string | null;
  neuroSergKoresMegethosDeksi?: string | null;
  neuroSergKoresMegethosAristero?: string | null;
  neuroSergKoresAntidrasiDeksi?: string | null;
  neuroSergKoresAntidrasiAristero?: string | null;
  neuroSergSynoloVathmwn?: string | null;
  cardioThorakikoAlgos?: string | null;
  cardioXaraktiras?: string | null;
  cardioEnarxi?: string | null;
  cardioDiarkeia?: string | null;
  cardioanapneustikiSimeiologia?: string | null;
  psychoDiathesi?: string | null;
  psychoSymperifora?: string | null;
  psychoSkepseis?: string | null;
}

export interface NPatient {
  name?: string | null;
  surname?: string | null;
  fathersName?: string | null;
  ssn?: string | null;
  mobilePhone?: string | null;
  homephone?: string | null;
  /** @format date-time */
  birthDate?: string | null;
  id?: string | null;
  otherIdentifier?: string | null;
  nationalityId?: string | null;
  gender?: string | null;
  sex?: string | null;
  addressStreet?: string | null;
  addressZip?: string | null;
  workPhone?: string | null;
  insuranceName?: string | null;
  lang?: string | null;
  /** @format int32 */
  age?: number;
}
