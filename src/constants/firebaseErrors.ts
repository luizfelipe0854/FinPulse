export const firebaseErrors: Record<string, string> = {
  "auth/email-already-in-use": "Este e-mail já está em uso.",
  "auth/weak-password": "Senha deve ter pelo menos 6 caracteres.",
  "auth/invalid-email": "O e-mail informado é inválido.",
  "auth/user-disabled": "Esta conta foi desativada.",
  "auth/user-not-found": "Usuário não encontrado.",
  "auth/wrong-password": "Senha incorreta.",
  "auth/missing-email": "Informe um e-mail.",
  "auth/missing-password": "Informe uma senha.",

  // Credenciais
  "auth/invalid-credential": "Credenciais inválidas.",
  "auth/credential-already-in-use":
    "Esta credencial já está associada a outra conta.",
  "auth/account-exists-with-different-credential":
    "Já existe uma conta com este e-mail usando outro método de login.",

  // Login / sessão
  "auth/user-token-expired": "Sua sessão expirou. Faça login novamente.",
  "auth/id-token-expired": "Sua sessão expirou. Faça login novamente.",
  "auth/id-token-revoked": "Sua sessão foi revogada.",
  "auth/invalid-user-token": "Sessão inválida. Faça login novamente.",

  // Rede
  "auth/network-request-failed": "Erro de conexão. Verifique sua internet.",
  "auth/timeout": "A operação demorou demais. Tente novamente.",
  "auth/internal-error": "Erro interno. Tente novamente mais tarde.",

  // Popup / OAuth
  "auth/popup-closed-by-user": "Login cancelado.",
  "auth/popup-blocked": "O popup foi bloqueado pelo navegador.",
  "auth/cancelled-popup-request": "A solicitação foi cancelada.",
  "auth/unauthorized-domain": "Este domínio não está autorizado.",

  // Telefone
  "auth/invalid-phone-number": "Número de telefone inválido.",
  "auth/missing-phone-number": "Informe um número de telefone.",

  // Limites e segurança
  "auth/too-many-requests": "Muitas tentativas. Tente novamente mais tarde.",
  "auth/requires-recent-login": "Faça login novamente para continuar.",
  "auth/operation-not-allowed": "Este tipo de login não está habilitado.",

  // Genérico
  "auth/unknown": "Ocorreu um erro desconhecido.",
};
