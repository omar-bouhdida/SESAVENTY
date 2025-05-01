export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatTime = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDateTime = (date) => {
  if (!date) return '';
  return `${formatDate(date)} à ${formatTime(date)}`;
};

export const formatUserName = (user) => {
  if (!user) return '';
  return `${user.prenom} ${user.nom}`;
};

export const formatRole = (role) => {
  if (!role) return '';
  const roles = {
    ETUDIANT: 'Étudiant',
    COORDINATEUR: 'Coordinateur',
    RESPONSABLE: 'Responsable',
  };
  return roles[role] || role;
};

export const formatMemberRole = (role) => {
  if (!role) return '';
  const roles = {
    MEMBRE: 'Membre',
    COORDINATEUR: 'Coordinateur',
  };
  return roles[role] || role;
};

export const formatMemberStatus = (status) => {
  if (!status) return '';
  const statuses = {
    MEMBRE: 'Membre actif',
    SUSPENDU: 'Suspendu',
  };
  return statuses[status] || status;
};

export const formatRequestStatus = (status) => {
  if (!status) return '';
  const statuses = {
    EN_ATTENTE: 'En attente',
    ACCEPTEE: 'Acceptée',
    REFUSEE: 'Refusée',
  };
  return statuses[status] || status;
};

export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

export const formatFileSize = (bytes) => {
  if (!bytes) return '0 o';
  const k = 1024;
  const sizes = ['o', 'Ko', 'Mo', 'Go', 'To'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const getInitials = (user) => {
  if (!user) return '';
  return `${user.prenom.charAt(0)}${user.nom.charAt(0)}`.toUpperCase();
};

export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return '';
  const cleaned = phoneNumber.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
  if (match) {
    return `${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
  }
  return phoneNumber;
};