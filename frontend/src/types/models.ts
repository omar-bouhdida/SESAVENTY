export enum RoleEnum {
  ETUDIANT = 'ETUDIANT',
  COORDINATEUR = 'COORDINATEUR',
  RESPONSABLE = 'RESPONSABLE'
}

export enum StatutDemandeEnum {
  EN_ATTENTE = 'EN_ATTENTE',
  ACCEPTEE = 'ACCEPTEE',
  REFUSEE = 'REFUSEE'
}

export enum StatutMembreEnum {
  MEMBRE = 'MEMBRE',
  SUSPENDU = 'SUSPENDU'
}

export enum RoleMembreEnum {
  MEMBRE = 'MEMBRE',
  COORDINATEUR = 'COORDINATEUR'
}

export interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  motDePassee: string;
  photo?: string;
  role: RoleEnum;
}

export interface Club {
  id: string;
  nom: string;
  description: string;
  domaine: string;
  logo?: string;
  objectifs: string;
  estValide: boolean;
  coordinateur: User;
}

export interface Evenement {
  id: string;
  titre: string;
  description: string;
  dateHeure: Date;
  lieu: string;
  estPublic: boolean;
  club: Club;
}

export interface DemandeCreationClub {
  id: string;
  nomClub: string;
  objectifs: string;
  logo?: string;
  typeActivite: string;
  statut: StatutDemandeEnum;
  dateDemande: Date;
  createur: User;
}

export interface DemandeAdhesion {
  id: string;
  lettreMotivation: string;
  statut: StatutDemandeEnum;
  dateDemande: Date;
  utilisateur: User;
  club: Club;
}

export interface Membre {
  id: string;
  statut: StatutMembreEnum;
  role: RoleMembreEnum;
  utilisateur: User;
  club: Club;
}